//import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
import backgroundImageGreen from "@/assets/img/background.jpg";
import Dashboard from "@/pages/Home/components/Dashboard";
import NavBar from "@/components/Navigations/NavBar";

function Home() {
  return (
    <div
      className="flex h-screen bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: `url(${backgroundImageGreen})` }}
    >
      <SideBar />
      <div className="flex flex-col">
        <NavBar />
        <Dashboard />
      </div>
    </div>
  );
}

export default Home;
