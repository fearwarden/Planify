function NavBar() {
  return (
    <div className="h-[140px] w-full overflow-hidden pb-2.5">
      <div className="mt-2.5 flex h-full w-full flex-col rounded-[28px] bg-black bg-opacity-60 bg-blend-normal">
        <div className="h-[140px] flex items-center justify-between px-4">
          <form className="max-w-sm px-4">
            <div className="relative">
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
              <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-[28px] outline-none bg-gray-50 focus:bg-white focus:border-indigo-600"
              />
            </div>
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
    </div>
  );
}

export default NavBar;
