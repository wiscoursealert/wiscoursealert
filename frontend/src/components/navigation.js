import Logo from "../images/logo3-edit.png";

const Navigation = ({curEmail}) => {
  return (
    <nav className="w-full z-10 sticky top-0 bg-white">
      <div className="flex items-center justify-between h-[10vh] px-[4vw]">
        <div className="flex-1 flex sm:items-stretch sm:justify-start">
          <img
            className="h-[6vmin] bg-gray-200 rounded-lg p-[1vmin]"
            src={Logo}
            alt="logofull"
          />
        </div>
        <div className="px-[2vmin] py-[1vmin] text-[2.5vmin] font-normal bg-gray-200 text-gray-500 rounded-lg">
          {curEmail}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;