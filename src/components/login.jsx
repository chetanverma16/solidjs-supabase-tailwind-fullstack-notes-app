import Button from "./Button";
import { supabase } from "../supabaseClient";
import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
const Login = () => {
  const [email, setEmail] = createSignal("");
  const [loading, setLoading] = createSignal(false);
  const navigate = useNavigate();

  createEffect(() => {
    if (supabase.auth.session()) {
      navigate("/");
    }
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email: email() });
      if (error) {
        throw error;
      }
      alert("Chek your email to verify your account");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex mt-20 items-center justify-center">
      <div className="flex flex-col border p-4 rounded-lg shadow-lg w-64">
        <h1 className="text-2xl">Login.</h1>
        {loading() ? (
          <div className="text-center">Sending magic link...</div>
        ) : (
          <>
            <input
              id="email"
              className="mt-2 border p-2 rounded-sm"
              type="email"
              placeholder="Your email"
              value={email()}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
            <Button onClick={handleLogin}>Send Magic Link</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
