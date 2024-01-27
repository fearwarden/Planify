import Tasks from "./Tasks";

function Dashboard() {
  return (
    <div className="h-screen w-screen overflow-hidden pb-5">
      <div className="mt-2.5 flex h-full w-full flex-col rounded-[28px] bg-black bg-opacity-60 bg-blend-normal">
        <Tasks />
      </div>
    </div>
  );
}

export default Dashboard;
