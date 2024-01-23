//import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
import { api } from "@/hooks/api";
import { useQuery } from "@tanstack/react-query";
import backgroundImageGreen from "@/assets/img/background.jpg";
import Dashboard from "@/pages/Home/components/Dashboard";
import NavBar from "@/components/Navigations/NavBar";

function Home() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const response = await api.get("/api/v1/tasks?page=1");
      return response.data;
    },
  });

  if (isPending) return <span>Loading...</span>;
  if (isError) return <span>Loading...</span>;

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
