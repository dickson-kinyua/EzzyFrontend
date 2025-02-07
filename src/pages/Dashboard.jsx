// import { useContext } from "react";
import Input from "../components/Input";
import Footer from "../components/Footer";
import Items from "../components/Items";
// import UserContext from "../UserContext/UserContext";

const Dashboard = () => {
  // const { logged } = useContext(UserContext);

  return (
    <>
      <div className="flex flex-col h-full md:hidden">
        <Input />
        <Items />
        <Footer />
      </div>
      <div className="hidden md:flex justify-center items-center h-screen bg-red-600 text-white text-4xl">
        <p className="text-center font-bold">
          This website is not optimized for medium and large screens.Please use
          a smaller screen
        </p>
      </div>
    </>
  );
};

export default Dashboard;
