import { useDisclosure } from "@nextui-org/react";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import CreateTaskModal from "@/pages/Home/modals/CreateTaskModal";
import Plus from "../../assets/img/Sidebar/PlusButton.svg";

export interface IsFilterActiveProps {
  isActive: boolean;
  type: string;
  criteria: string;
}

function SideBar({
  handleIsActive,
}: {
  handleIsActive: (filterData: IsFilterActiveProps) => void;
}) {
  const user = useSelector((state: RootState) => state.users);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleFilters = (type: string, criteria: string) => {
    handleIsActive({ isActive: true, type, criteria });
  };

  const clearFilters = () => {
    handleIsActive({ isActive: false, type: "", criteria: "" });
  };

  const handleOpen = () => onOpen();
  return (
    <div>
      <div className="h-screen overflow-hidden pb-5">
        <div className="m-2.5 flex h-full w-64 flex-col rounded-[28px] bg-[#0F090C] bg-opacity-65 backdrop-blur-3xl drop-shadow-lg">
          <ul className="mt-10 flex flex-col">
            <label className="px-11 text-xs text-white uppercase leading-6 text-opacity-30 font-medium">
              Task Manager
            </label>
            <label className="px-11 pb-4 text-sm text-white uppercase font-medium">
              {user.firstName + " " + user.lastName}
            </label>
            <div className="mx-4 h-px bg-gradient-to-r from-transparent via-[#A33B3B]/20 to-transparent"></div>
            <div className="flex items-center justify-between mr-8">
              <label className="px-11 py-3 text-xs text-gray-200 uppercase dark:text-gray-400 tracking-tighter leading-6 text-opacity-30 font-medium	">
                PINNED TASKS
              </label>
              <button
                onClick={clearFilters}
                className=" flex w-5 text-gray-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-trash"
                  width="20"
                  height="20"
                  viewBox="0 0 28 28"
                  strokeWidth="2"
                  stroke="#ffffff"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M4 7l16 0" />
                  <path d="M10 11l0 6" />
                  <path d="M14 11l0 6" />
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </svg>
              </button>
            </div>
            <li className="relative transition">
              <input className="peer hidden" type="checkbox" id="menu-1" />
              <div className="relative mx-6 mt-2 flex items-center rounded-xl bg-white bg-opacity-[2%] py-3 pl-5 text-sm text-gray-200 border-[0.5px] border-borderBtn/[12%]">
                <span className="mr-5 flex w-5 text-gray-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path
                      fill="currentColor"
                      d="M13 19h6V9.978l-7-5.444-7 5.444V19h6v-6h2v6zm8 1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.49a1 1 0 0 1 .386-.79l8-6.222a1 1 0 0 1 1.228 0l8 6.222a1 1 0 0 1 .386.79V20z"
                    />
                  </svg>
                </span>
                Dashboard
                <label
                  htmlFor="menu-1"
                  className="absolute inset-0 h-full w-full cursor-pointer"
                ></label>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="peer-checked:rotate-180 absolute right-4 top-6 mr-5 ml-auto h-4 text-gray-500 transition"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="duration-400 peer-checked:max-h-96 ml-2 flex max-h-0 flex-col overflow-hidden rounded-2xl transition-all w-[90%] pl-10">
                <li
                  onClick={() => {
                    handleFilters("status", "COMPLETE");
                  }}
                  className=" flex cursor-pointer rounded-xl"
                >
                  <div className="h-full w-full mx-2">
                    <div className="relative py-2 pl-4 text-sm text-white/55 hover:text-white h-full">
                      <div className="absolute left-0 top-0 -ml-px h-full w-6 border-l-2 border-white/15 text-transparent">
                        <div className="absolute left-0 top-0 -ml-px h-1/2 w-4 rounded-bl-xl border-b-2 border-white/15 text-transparent"></div>
                      </div>
                      <div className="hover:ring-white-2 hover:bg-white/[3%] py-4 px-[10px] rounded-[10px] flex items-center">
                        <div className="h-3 w-3 bg-green-400 rounded-full mr-[10px]"></div>
                        Complete
                      </div>
                    </div>
                  </div>
                </li>
                <li
                  onClick={() => {
                    handleFilters("status", "PROGRESS");
                  }}
                  className="flex cursor-pointer rounded-xl"
                >
                  <div className="h-full w-full mx-2">
                    <div className="relative py-2 pl-4 text-sm text-white/55 hover:text-white h-full">
                      <div className="absolute left-0 top-0 -ml-px h-full w-6 border-l-2 border-white/15 text-transparent">
                        <div className="absolute left-0 top-0 -ml-px h-1/2 w-4 rounded-bl-xl border-b-2 border-white/15 text-transparent"></div>
                      </div>
                      <div className="hover:ring-white-2 hover:bg-white/[3%] py-4 px-[10px] rounded-[10px] flex items-center">
                        <div className="h-3 w-3 bg-yellow-400 rounded-full mr-[10px]"></div>
                        Progress
                      </div>
                    </div>
                  </div>
                </li>
                <li className="flex cursor-pointer rounded-xl">
                  <div className="h-full w-full mx-2">
                    <div className="relative py-2 pl-4 text-sm text-white/55 hover:text-white h-full">
                      <div className="absolute left-0 top-0 -ml-px h-1/2 w-4 rounded-bl-xl border-l-2 border-b-2 border-white/15 text-transparent"></div>
                      <div className="hover:ring-white-2 hover:bg-white/[3%] py-4 px-[10px] rounded-[10px] flex items-center">
                        <div className="h-3 w-3 bg-red-400 rounded-full mr-[10px]"></div>
                        On Hold
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </li>
            <li className="relative mx-6 mb-2">
              <div className="relative  mt-2 flex items-center rounded-xl justify-between hover:bg-white hover:bg-opacity-[2%] py-3 px-5 text-sm text-gray-200">
                <span className=" flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-book"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <path d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0" />
                    <path d="M3 6l0 13" />
                    <path d="M12 6l0 13" />
                    <path d="M21 6l0 13" />
                  </svg>
                </span>
                Education
                <div className="w-6 h-6 bg-yellow-500 rounded text-black flex items-center justify-center text-xs">
                  3
                </div>
              </div>
              <div className="relative  mt-2 flex items-center rounded-xl justify-between hover:bg-white hover:bg-opacity-[2%] py-3 px-5 text-sm text-gray-200 ">
                <span className=" flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-coins"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14c0 1.657 2.686 3 6 3s6 -1.343 6 -3s-2.686 -3 -6 -3s-6 1.343 -6 3z" />
                    <path d="M9 14v4c0 1.656 2.686 3 6 3s6 -1.344 6 -3v-4" />
                    <path d="M3 6c0 1.072 1.144 2.062 3 2.598s4.144 .536 6 0c1.856 -.536 3 -1.526 3 -2.598c0 -1.072 -1.144 -2.062 -3 -2.598s-4.144 -.536 -6 0c-1.856 .536 -3 1.526 -3 2.598z" />
                    <path d="M3 6v10c0 .888 .772 1.45 2 2" />
                    <path d="M3 11c0 .888 .772 1.45 2 2" />
                  </svg>
                </span>
                Finance
                <div className="w-6 h-6 bg-yellow-500 rounded text-black flex items-center justify-center text-xs">
                  8
                </div>
              </div>
              <div className="relative mt-2 flex items-center rounded-xl justify-between hover:bg-white hover:bg-opacity-[2%] py-3 px-5 text-sm text-gray-200">
                <span className=" flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-id"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M3 4m0 3a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3z" />
                    <path d="M9 10m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                    <path d="M15 8l2 0" />
                    <path d="M15 12l2 0" />
                    <path d="M7 16l10 0" />
                  </svg>
                </span>
                Personal
                <div className="w-6 h-6 flex items-center justify-center text-xs"></div>
              </div>
              <div className="relative  mt-2 flex items-center rounded-xl justify-between hover:bg-white hover:bg-opacity-[2%] py-3 px-5 text-sm text-gray-200 ">
                <span className=" flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-checklist"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="#ffffff"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
                    <path d="M14 19l2 2l4 -4" />
                    <path d="M9 8h4" />
                    <path d="M9 12h2" />
                  </svg>
                </span>
                Other Tasks
                <div className="w-6 h-6 bg-yellow-500 rounded text-black flex items-center justify-center text-xs">
                  2
                </div>
              </div>
            </li>
          </ul>
          <div className="w-full h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-[#CC8B8B]/30 to-transparent"></div>
          <div className="flex items-center justify-between mr-8">
            <label className="px-11 py-3 text-xs text-gray-200 uppercase dark:text-gray-400 tracking-tighter leading-6 text-opacity-30 font-medium	">
              PINNED TASKS
            </label>
            <button className=" flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-plus"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 5l0 14" />
                <path d="M5 12l14 0" />
              </svg>
            </button>
          </div>
          <div className="relative mx-6 mt-2 flex items-center rounded-xl hover:bg-white hover:bg-opacity-[2%] py-3 pl-5 text-sm text-gray-200 ">
            <span className="mr-5 flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            Personal Task 1
          </div>
          <div className="relative mx-6 mt-2 flex items-center rounded-xl hover:bg-white hover:bg-opacity-[2%] py-3 pl-5 text-sm text-gray-200 ">
            <span className="mr-5 flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            Personal Task 2
          </div>
          <div className="relative mx-6 mt-2 flex items-center rounded-xl hover:bg-white hover:bg-opacity-[2%] py-3 pl-5 text-sm text-gray-200 ">
            <span className="mr-5 flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-user"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="#ffffff"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
              </svg>
            </span>
            Personal Task 3
          </div>
          <div className="m-6">
            <div className="px-4 pt-6 pb-4 rounded-[28px] bg-black bg-opacity-30 text-center border-2 border-green-500/20">
              <h2 className="text-base font-semibold text-white pb-[6px]">
                Start Organizing!
              </h2>
              <p className="pb-5 mt-1 text-sm opacity-80 font-medium text-white">
                Creating or adding new tasks couldn't be easier
              </p>
              <button
                className="py-3 px-5 w-full flex items-center justify-center rounded-[12px] bg-startBtn text-white text-sm font-semibold shadow-dropshadowBtn shadow-md"
                onClick={handleOpen}
              >
                <img src={Plus} className="h-3 mr-2"></img>
                Add New Task
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateTaskModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default SideBar;
