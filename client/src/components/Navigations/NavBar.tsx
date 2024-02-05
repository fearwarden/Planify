function NavBar() {
  return (
    <div className="h-[140px] w-full overflow-hidden pb-2.5">
      <div className="mt-2.5 flex h-full w-full flex-col rounded-[28px] bg-black bg-opacity-60 bg-blend-normal">
        <div className="h-[140px] flex items-center justify-between">
          <div className="ml-4 flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 rounded-md bg-gray-200 focus:outline-none text-black"
            />
          </div>
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
