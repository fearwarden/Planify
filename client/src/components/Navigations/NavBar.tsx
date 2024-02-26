import SearchTaskModal from "@/pages/Home/modals/SearchTaskModal";
import { useDisclosure } from "@nextui-org/react";

function NavBar() {
  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className="h-[140px] w-full overflow-hidden pb-2.5">
      <div className="mt-2.5 flex h-full w-full flex-col rounded-[28px] bg-black bg-opacity-60 bg-blend-normal">
        <div className="h-[140px] flex items-center justify-between px-4">
          <form className="max-w-sm px-4">
            <a className="relative cursor-pointer" onClick={onOpen}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </a>
          </form>
          <div className="flex-grow flex justify-center">
            <div className="flex space-x-6 text-white">
              <div className="cursor-pointer">Tasks</div>
              <div className="cursor-pointer">Sticky Notes</div>
              <div className="cursor-pointer">Calories</div>
              <div className="cursor-pointer">Drive</div>
            </div>
          </div>
          <div className="mr-4">
            <div className="text-white cursor-pointer">Profile</div>
          </div>
        </div>
      </div>
      <SearchTaskModal isOpen={isOpen} onClose={onClose} />
    </div>
  );
}

export default NavBar;
