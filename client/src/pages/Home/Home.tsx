//import NavBar from "@/components/Navigations/NavBar";
import SideBar, { IsFilterActiveProps } from "@/components/Navigations/SideBar";
import backgroundImageGreen from "@/assets/img/background.jpg";
import Dashboard from "@/pages/Home/components/Dashboard";
import NavBar from "@/components/Navigations/NavBar";
import { useState } from "react";

function Home() {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const [criteria, setCriteria] = useState<string>("");
  const [type, setType] = useState<string>("");

  const handleActiveFilter = (options: IsFilterActiveProps) => {
    setIsFilterActive(options.isActive);
    setCriteria(options.criteria);
    setType(options.type);
  };
  return (
    <div
      className="flex h-screen bg-cover bg-center overflow-hidden pr-2.5"
      style={{ backgroundImage: `url(${backgroundImageGreen})` }}
    >
      <SideBar handleIsActive={handleActiveFilter} />
      <div className="flex flex-col w-full">
        <NavBar />
        <Dashboard isActive={isFilterActive} type={type} criteria={criteria} />
      </div>
    </div>
  );
}

export default Home;
