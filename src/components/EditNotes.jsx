import Button from "./Button";
import { createEffect, createSignal } from "solid-js";
import { useParams, useNavigate } from "@solidjs/router";
import { supabase } from "../supabaseClient";
const EditNotes = () => {
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const params = useParams();
  const navigate = useNavigate();

  createEffect(async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .select("title, description")
        .match({ id: params.id });
      setTitle(data[0].title);
      setDescription(data[0].description);
    } catch (error) {
      console.error(error.message);
    }
  }, []);

  const handleEdit = async () => {
    if (title().length > 0 && description().length > 0) {
      try {
        await supabase
          .from("notes")
          .update({ title: title(), description: description() })
          .match({ id: params.id });
      } catch (error) {
        console.error(error.message);
      } finally {
        navigate("/");
      }
    }
  };

  return (
    <div className=" max-w-2xl flex items-center">
      <div className="flex flex-col w-full">
        <h1 className="text-2xl mt-5">Edit Note</h1>
        <input
          value={title()}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Update Title"
          className="border w-full rounded-md p-4 mt-2"
        />
        <textarea
          value={description()}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 border rounded-md p-4"
          rows="5"
          placeholder="Update Description"
        ></textarea>
        <Button onClick={handleEdit} classes="py-5">Update</Button>
      </div>
    </div>
  );
};

export default EditNotes;
