import { useContext, useState } from "react";
import { ItemsContext } from "../ListItemsContext/ItemsContext";
import UserContext from "../UserContext/UserContext";

const Input = () => {
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const { ListItems, setListItems } = useContext(ItemsContext);
  const { logged } = useContext(UserContext);
  const [inputStatus, setInputStatus] = useState("openInput");

  const url = import.meta.env.VITE_APP_BACKENDURL;

  const clearInputs = () => {
    setItem("");
    setQuantity("");
  };

  async function handleInputs(e) {
    e.preventDefault();
    const data = { item, quantity };
    try {
      const response = await fetch(url + "/createPost", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        // console.log(errorMessage);
        alert(errorMessage.error);
        return;
      }

      const post = await response.json();
      clearInputs();
      setListItems([...ListItems, post]);
    } catch (error) {
      console.log(error);
    }
  }

  function toggleInput() {
    if (inputStatus !== "openInput") {
      setInputStatus("openInput");
    } else {
      setInputStatus("closeInput");
    }
  }

  return (
    <>
      {logged?.userName ? (
        <>
          <div className="sm:py-[70px] md:py-[100px] sm:hidden relative flex flex-col  md:flex-col justify-center sm:justify-between md:items-center  sm:px-10 items-center  bg-[url(/bg.jpg)] bg-cover bg-center py-7  md:p-8 gap-2 md:gap-10 h-[200px] sm:h-auto text-yellow-400 border-solid border-2   border-black">
            <div className="absolute inset-0 bg-black bg-opacity-80"></div>
            <h2 className="relative z-10 font-bold  md:text-5xl">
              What do you need today?
            </h2>
            <form
              onSubmit={handleInputs}
              className="flex flex-col md:flex-row gap-2 relative z-10 "
            >
              <input
                type="text"
                maxLength={6}
                placeholder="item..."
                className="p-2 md:p-3 rounded-xl bg-blue-800 border-s border-2 border-green-500"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <input
                type="number"
                placeholder="quantity"
                className="p-2 md:p-3 rounded-xl bg-blue-800 border-s border-2 border-green-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="bg-blue-700 py-2 px-5 rounded-2xl">Add</button>
            </form>
          </div>
          <button
            onClick={toggleInput}
            className="hidden sm:block text-yellow-500 font-bold  bg-green-700 w-fit mx-auto mt-2 p-2"
          >
            Add a New Item
          </button>
          <div className={inputStatus}>
            <div className="absolute inset-0 bg-black bg-opacity-90"></div>
            <button
              onClick={toggleInput}
              className="z-10 text-white absolute top-[15%] right-[33%] text-4xl font-bold"
            >
              &times;
            </button>
            <form
              onSubmit={handleInputs}
              className="flex flex-col md:flex-row gap-2 relative z-10 "
            >
              <input
                type="text"
                maxLength={6}
                placeholder="item..."
                className="p-2 md:p-3 rounded-xl bg-blue-800 border-s border-2 border-green-500"
                value={item}
                onChange={(e) => setItem(e.target.value)}
              />
              <input
                type="number"
                placeholder="quantity"
                className="p-2 md:p-3 rounded-xl bg-blue-800 border-s border-2 border-green-500"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              <button className="bg-green-700 text-yellow-500 py-2 px-5 rounded-2xl">
                Add
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="sm:py-[20px] md:py-[90px] text-yellow-500 flex flex-col justify-center items-center bg-[url(/bg.jpg)] bg-cover bg-center bg-gray-800 py-7  md:p-8 gap-2 md:gap-4 relative">
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
          <>
            <p className="font-extrabold sm:font-bold relative z-10 uppercase text-xl md:text-5xl md:font-bold">
              Cart full of happiness{" "}
            </p>
            <p className="font-bold relative z-10 text-xl md:text-4xl">
              and healthy choices
            </p>
          </>
        </div>
      )}
    </>
  );
};

export default Input;
