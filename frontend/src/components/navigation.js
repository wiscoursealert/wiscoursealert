import Logo from "../images/logo3-edit.png";

const Navigation = () => {
  return (
    <nav className="w-full sticky top-0 z-50 bg-red-700">
      <div className="flex items-center justify-between h-[10vh] px-[4vw]">
        <div className="flex-1 flex sm:items-stretch sm:justify-start">
          <img
            className="h-[6vmin] bg-gray-200 hover:bg-gray-300 rounded-lg p-[1vmin] transition ease-out duration-300 hover:scale-[1.04]"
            src={Logo}
            alt="logofull"
          />
        </div>
        <button className="px-[2vmin] py-[1vmin] text-[2.5vmin] font-normal bg-gray-200 text-gray-500 hover:bg-gray-600 hover:text-gray-100 rounded-lg transition ease-out hover:scale-[1.04] duration-300">
          ith@gmail.com
        </button>
      </div>
    </nav>
  );
}

export default Navigation;