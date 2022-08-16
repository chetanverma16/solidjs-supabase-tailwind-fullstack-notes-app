import Button from "./Button";
import { createSignal } from "solid-js";
import { supabase } from "../supabaseClient";
import { useNavigate } from "@solidjs/router";
const AddNotes = () => {
  const [title, setTitle] = createSignal("");
  const [description, setDescription] = createSignal("");
  const navigate = useNavigate();

  const handleSave = async () => {
    if (title().length > 0 && description().length > 0) {
      try {
        await supabase
          .from("notes")
          .insert({ title: title(), description: description() });
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
        <h1 className="text-2xl mt-5">Create Note</h1>
        <input
          value={title()}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter Title"
          className="border w-full rounded-md p-4 mt-2"
        />
        <textarea
          value={description()}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2 border rounded-md p-4"
          rows="5"
          placeholder="Notes Description"
        ></textarea>
        <Button onClick={handleSave} classes="py-5">
          Save
        </Button>
      </div>
    </div>
  );
};

export default AddNotes;
