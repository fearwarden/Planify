import NavBar from "@/components/Navigations/NavBar";
import SideBar from "@/components/Navigations/SideBar";
import Tasks from "./components/Tasks";
import { api } from "@/hooks/api";
import { useQuery } from "@tanstack/react-query";

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
    <div>
      <NavBar />
      <SideBar />
      <Tasks />
    </div>
  );
}

export default Home;
