import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import UserContext from "../UserContext/UserContext";
// import { dotenv } from "dotenv";
// dotenv.config();

const url = import.meta.env.VITE_APP_BACKENDURL;

const LoginPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const { setLogged } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { userName, password };

    try {
      const response = await fetch(new URL("/login", url), {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        setErr(errorMessage.error);
        return;
      }
      const res = await response.json();
      console.log(res);
      setLogged(res);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="md:hidden w-4/5 sm:w-3/4 mx-auto mt-[100px] sm:mt-[20px] md:mt-[100px] p-3 md:p-5 flex flex-col items-center justify-center gap-7 sm:gap-3 md:gap-10 shadow-[0_0_20px_green,0_0_40px_blue] ">
        <h4 className="font-semibold text-2xl">Login</h4>
        <form className="w-3/4 flex flex-col gap-3" onSubmit={handleLogin}>
          <input
            className="bg-gray-200 p-4 md:p-5"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="bg-gray-200 p-4 md:p-5"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {err && <div className="text-yellow-500">{err}</div>}
          <button className="bg-blue-700 text-yellow-500 p-2 md:p-5 rounded-3xl font-semibold">
            Login
          </button>
        </form>

        <Link to={"/register"} className="underline ml-2">
          Create new account
        </Link>
      </div>
      <div className="hidden md:flex justify-center items-center h-screen bg-red-600 text-white text-3xl">
        <p className="text-center">
          This page is not optimized for medium and large screens.Please use a
          smaller screen
        </p>
      </div>
    </>
  );
};

export default LoginPage;

// MONGODB=mongodb://localhost:27017/PackingList
