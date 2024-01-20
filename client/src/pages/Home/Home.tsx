//import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
//import Tasks from "./components/Tasks";
import backgroundImageGreen from "@/assets/img/background.jpg";

function Home() {
  return (
    <div
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageGreen})` }}
    >
      <SideBar />
    </div>
  );
}

export default Home;
