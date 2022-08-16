import { createSignal, createEffect } from "solid-js";
import Button from "./components/Button";
import { supabase } from "./supabaseClient";
import { Routes, useNavigate, Route } from "@solidjs/router";
import Login from "./components/login";
import AddNotes from "./components/AddNotes";
import Dashboard from "./components/Dashboard";
import EditNotes from "./components/EditNotes";

function App() {
  const [session, setSesion] = createSignal(null);
  const navigate = useNavigate();

  createEffect(() => {
    setSesion(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSesion(session);
    });
  });

  const handleLogout = () => {
    supabase.auth.logout();
    navigate("/login");
  };

  return (
    <div className="container max-w-2xl mx-auto mt-10">
      <div className="flex items-center justify-between">
        <h1>solid-notes</h1>
        {session() && <Button onClick={handleLogout}>Logout</Button>}
      </div>
      <Routes>
        <Route path="/login" component={Login} />
        <Route path="/add" component={AddNotes} />
        <Route path="/" component={Dashboard} />
        <Route path="/edit">
          <Route path="/:id" component={EditNotes} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
