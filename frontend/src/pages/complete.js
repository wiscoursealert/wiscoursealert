import React from "react";
import Logo from "../images/logo3-edit.png";
import Contact from "../components/contact";
import { useState } from "react";
import { Link } from "react-router-dom";

const Complete = () => {
  const [open, setOpen] = useState(false);
  var id = 1;

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <nav className="px-[4vw] h-[10vh] flex items-center">
          <img
            className="h-[6vmin] bg-gray-200 hover:bg-gray-300 rounded-lg p-[1vmin] transition ease-out duration-300 hover:scale-[1.04]"
            src={Logo}
            alt="logofull"
          />
        </nav>
        <div className="flex flex-grow flex-col items-center justify-center w-full ">
          <div className="flex flex-col px-[7vw]">
            <p className="text-[8vmin] font-bold text-gray-600">
              Your registration is
              <br />
              completed!
            </p>
            <p className="text-[3vmin] mt-14 text-gray-400">
              You can now edit your watching list using the link we sent to your
              email
              <br />
              Please keep it for future use.
            </p>
            <Link to={`/edit?id=${id}`}>
              <p className="text-[3vmin] mt-5 text-red-500  hover:text-red-600">
                {`wiscourse.com/edit?=${id}`}
              </p>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mb-5">
          <p
            className="text-[2vmin] font-medium text-blue-600 hover:text-blue-700"
            onClick={() => setOpen(true)}
          >
            Contact us!
          </p>
        </div>
      </div>
      <Contact open={open} setOpen={setOpen} />
    </>
  );
};

export default Complete;
