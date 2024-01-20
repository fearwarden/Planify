import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
import Tasks from "./components/Tasks";

function Home() {
  return (
    <div>
      <NavBar />
      <SideBar />
      <Tasks />
    </div>
  );
}

export default Home;
