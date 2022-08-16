import { createSignal, createEffect } from "solid-js";
import Cards from "./Cards";
import { useNavigate } from "@solidjs/router";
import Button from "./Button";
import { supabase } from "../supabaseClient";

const Dashboard = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = createSignal([]);

  const fetchNotes = async () => {
    try {
      const { data, error } = await supabase.from("notes").select("*");
      if (data) {
        setNotes(data);
      }
      if (error) {
        console.error(error.message);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  createEffect(async () => {
    await fetchNotes();
  }, []);

  return (
    <div className="mt-10 flex items-center justify-center">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">All Notes</h1>
          <Button onClick={() => navigate("/add")} classes="bg-blue-500">
            Add Note
          </Button>
        </div>
        {notes().length
          ? notes().map(({ id, title, description }) => (
              <Cards
                key={id}
                id={id}
                title={title}
                description={description}
                reload={fetchNotes}
              />
            ))
          : "Add a note to get started"}
      </div>
    </div>
  );
};

export default Dashboard;
