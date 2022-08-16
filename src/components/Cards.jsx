import Button from "./button";
import { useNavigate } from "@solidjs/router";
import { supabase } from "../supabaseClient";

const Cards = ({ title, description, id, reload }) => {
  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      const { data, error } = await supabase
        .from("notes")
        .delete()
        .match({ id: id });
      if (data) {
        reload();
      }
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="w-full border p-2 mt-5 rounded-md">
      <h1 className="text-2xl">{title}</h1>
      <p className="opacity-50">{description}</p>
      <Button onClick={() => navigate(`/edit/${id}`)}>Edit</Button>
      <Button onClick={handleDelete} classes="bg-red-500 ml-2">
        Delete
      </Button>
    </div>
  );
};

export default Cards;
