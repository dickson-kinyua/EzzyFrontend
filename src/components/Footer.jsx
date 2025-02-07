import { useContext } from "react";
import { ItemsContext } from "../ListItemsContext/ItemsContext";
import UserContext from "../UserContext/UserContext";
import Clearlist from "./ClearList";

const Footer = () => {
  const { ListItems } = useContext(ItemsContext);
  const { logged } = useContext(UserContext);

  return (
    <div className=" bg-blue-800 text-white font-bold text-center flex flex-col justify-center  md:p-5 fixed bottom-0 right-0 left-0 md:relative">
      {ListItems?.length > 0 ? <Clearlist /> : ""}
      {logged?.userName ? (
        <p className="text-xl text-yellow-500">
          You have {ListItems?.length} items on your list
        </p>
      ) : (
        <p className="text-xl text-yellow-500">
          Sign in to add items on your List🛒
        </p>
      )}
    </div>
  );
};

export default Footer;
