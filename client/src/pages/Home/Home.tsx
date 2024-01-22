//import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
import Tasks from "./components/Tasks";
import { api } from "@/hooks/api";
import { useQuery } from "@tanstack/react-query";
//import Tasks from "./components/Tasks";
import backgroundImageGreen from "@/assets/img/background.jpg";

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
      className="flex flex-col h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImageGreen})` }}
    >
      <SideBar />
    </div>
  );
}

export default Home;
