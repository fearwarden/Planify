import { Button, useDisclosure } from "@nextui-org/react";
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
            <label className="py-3 px-11 text-xs text-gray-200 uppercase leading-6 text-opacity-30 font-medium	">
              Tasks
            </label>
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
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
              <ul className="duration-400 peer-checked:max-h-96 ml-2 flex max-h-0 flex-col overflow-hidden rounded-2xl transition-all w-[90%] pl-10">
                <li className=" flex cursor-pointer rounded-xl">
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
                <li className="flex cursor-pointer rounded-xl">
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
                <li
                  onClick={() => {
                    handleFilters("status", "COMPLETE");
                  }}
                  className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white"
                >
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                  </span>
                  Complete
                </li>
                <li
                  onClick={() => {
                    handleFilters("status", "PROGRESS");
                  }}
                  className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white"
                >
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </span>
                  Progress
                </li>
                <li className="m-2 flex cursor-pointer rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-white">
                  <span className="mr-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </span>
                  On Hold
                </li>
              </ul>
            </li>
            <li className="relative transition">
              <div className="relative m-2 flex cursor-pointer items-center rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-gray-50">
                <span className="mr-5 flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                Personal Task 1
              </div>
            </li>
            <li className="relative transition">
              <div className="relative m-2 flex cursor-pointer items-center rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-gray-50">
                <span className="mr-5 flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                Personal Task 1
              </div>
            </li>
            <li className="relative transition">
              <div className="relative m-2 flex cursor-pointer items-center rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-gray-50">
                <span className="mr-5 flex w-5 text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </span>
                Personal Task 1
              </div>
            </li>
          </ul>
          <div className="w-full h-px max-w-6xl mx-auto bg-gradient-to-r from-transparent via-[#CC8B8B]/30 to-transparent"></div>
          <label className="px-11 py-3 text-xs text-gray-200 uppercase dark:text-gray-400 tracking-tighter leading-6 text-opacity-30 font-medium	">
            PINNED TASKS
          </label>
          <div className="relative m-2 flex cursor-pointer items-center rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-gray-50">
            <span className="mr-5 flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            Personal Task 1
          </div>
          <div className="relative m-2 flex cursor-pointer items-center rounded-xl py-3 pl-5 text-sm text-gray-500 hover:bg-gray-50">
            <span className="mr-5 flex w-5 text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </span>
            Personal Task 2
          </div>
          <Button color="success" onClick={clearFilters}>
            Clear Filters
          </Button>
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
