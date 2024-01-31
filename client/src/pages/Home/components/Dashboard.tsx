import { IsFilterActiveProps } from "@/components/Navigations/SideBar";
import Tasks from "./Tasks";

function Dashboard({ isActive, type, criteria }: IsFilterActiveProps) {
  return (
    <div className="h-screen w-screen overflow-hidden pb-5">
      <div className="mt-2.5 flex h-full w-full flex-col rounded-[28px] bg-black bg-opacity-60 bg-blend-normal">
        <Tasks isActive={isActive} type={type} criteria={criteria} />
      </div>
    </div>
  );
}

export default Dashboard;
