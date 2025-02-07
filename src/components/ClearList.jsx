import { useContext } from "react";
import { ItemsContext } from "../ListItemsContext/ItemsContext";

const Clearlist = () => {
  const { setListItems } = useContext(ItemsContext);
  const url = import.meta.env.VITE_APP_BACKENDURL;

  const deleteAll = async () => {
    try {
      const response = await fetch(url + "/deleteAllPosts", {
        method: "DELETE",
        credentials: "include",
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }
      const res = await response.json();
      setListItems([]);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center">
      <button
        onClick={deleteAll}
        className="px-3 border-s border-2 border-green bg-green-700 text-yellow-500 my-2  w-fit md:px-6 lg:rounded-3xl"
      >
        CLEAR LIST
      </button>
    </div>
  );
};

export default Clearlist;
