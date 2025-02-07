import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const RegisterPage = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState(null);
  const [redirect, setRedirect] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { userName, password, confirm };
    const url = import.meta.env.VITE_APP_BACKENDURL;

    try {
      const response = await fetch(url + "/register", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        console.log(errorMessage);
        setErr(errorMessage.error);
        return;
      }
      const res = await response.json();
      console.log(res);
      setRedirect(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <div className="md:hidden w-4/5 sm:w-3/4 md:w-3/4 mx-auto mt-[100px] sm:mt-[20px] md:mt-[100px] flex flex-col items-center justify-center gap-7 sm:gap-2 md:gap-10 md:p-4 shadow-[0_0_20px_green,0_0_40px_blue]">
        <h2 className="font-semibold text-2xl ">Register a new account</h2>
        <form
          onSubmit={handleRegister}
          className="md:w-3/4 flex flex-col gap-3 w-3/4"
        >
          <input
            className="bg-gray-200 p-4 sm:p-2 md:p-5"
            type="text"
            placeholder="Username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="bg-gray-200 p-4 sm:p-2 md:p-5"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="bg-gray-200 p-4 sm:p-2 md:p-5"
            type="password"
            placeholder="confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
          {err && <div className="text-yellow-600">{err}</div>}
          <button className="bg-blue-700 p-2 rounded-3xl font-semibold">
            Register
          </button>
        </form>
        <Link to={"/login"} className="underline ml-2">
          Login
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

export default RegisterPage;
