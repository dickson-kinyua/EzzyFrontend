import { useContext, useEffect } from "react";
// import Footer from "./Footer";
import { ItemsContext } from "../ListItemsContext/ItemsContext";
import UserContext from "../UserContext/UserContext";

const Items = () => {
  const { ListItems, setListItems } = useContext(ItemsContext);
  const { logged } = useContext(UserContext);
  // const [owner, setOwner] = useState(null);

  const url = import.meta.env.VITE_APP_BACKENDURL;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(url + "/fetchPosts", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }

        const posts = await response.json();
        // setOwner(posts.author.userName);
        if (JSON.stringify(ListItems) !== JSON.stringify(posts)) {
          setListItems(posts);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [ListItems, setListItems, url]);

  const deletePost = async (id) => {
    try {
      const response = await fetch(url + `/deletePost/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }
      const res = await response.json();
      setListItems(ListItems.filter((item) => item._id !== id));
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {logged?.userName ? (
        <ul className="max-h-[calc(100vh-340px)] sm:h-[170px] flex flex-wrap gap-2 sm:flex-nowrap sm:grid sm:grid-cols-5 sm:gap-1 md:grid-cols-4  md:gap-4 p-1  overflow-x-hidden md:overflow-x-auto border-solid border-green-200 border-2 m-2">
          {ListItems?.map((i) => (
            <li
              key={i._id}
              className="flex flex-row gap-2 border-solid border-green-200 border-2 p-1 flex-wrap  text-green-900 bg-yellow-100"
            >
              <p className="flex flex-row gap-1">
                <span>{i.quantity}</span>
                <span>{i.item}</span>
              </p>

              <button
                onClick={() => deletePost(i._id)}
                className="text-black font-bold  self-center"
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="grow bg-blue-700 text-yellow-500 flex flex-col justify-center items-center h-3/4 sm:h-[170px]   overflow-x-hidden sm:overflow-x-auto">
          No Items to display
        </div>
      )}
    </>
  );
};

export default Items;
