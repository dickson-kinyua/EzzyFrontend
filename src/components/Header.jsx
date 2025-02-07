import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
import { ItemsContext } from "../ListItemsContext/ItemsContext";

const Header = () => {
  const { logged, setLogged } = useContext(UserContext);
  const { setListItems } = useContext(ItemsContext);
  const url = import.meta.env.VITE_APP_BACKENDURL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(url + "/profile", {
          credentials: "include",
        });

        if (!response.ok) {
          const errorMessage = await response.json();
          console.log(errorMessage);
          return;
        }

        const user = await response.json();
        // console.log(user);

        if (JSON.stringify(logged) !== JSON.stringify(user)) {
          setLogged(user);
        }
        // console.log(logged);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, [logged, setLogged, url]);

  // setInterval(() => {
  //   setDate(new Date().toLocaleTimeString());
  // }, 1000);

  const logoutFn = async () => {
    try {
      const response = await fetch(url + "/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        return;
      }

      const message = await response.json();
      setLogged({});
      setListItems([]);

      console.log(message);
      // setRedirect(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-row justify-between items-center text-yellow-400 bg-blue-800 p-2 md:p-10 h-[50px] md:hidden">
      <Link to={"/"} className="uppercase font-extrabold text-xl md:text-3xl">
        EzzyLst
      </Link>
      <div className="flex flex-row gap-4 items-center font-semibold">
        {logged?.userName ? (
          <div className="flex flex-row gap-2">
            <p>Welcome {logged.userName.slice(0, 2)}</p>
            <button onClick={logoutFn}>Logout</button>
          </div>
        ) : (
          <div className="flex flex-row gap-4">
            <Link to={"/register"}>Register</Link>
            <Link to={"/login"}>Login</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
