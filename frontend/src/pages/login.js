import React, { useState } from "react";
import Logo from "../images/logo5.png";
import Badger from "../images/badger2.png";
import Subscribe from "../components/subscribe";
import SignIn from "../components/signin";
import Contact from "../components/contact";

const Login = ({ handlePageChange }) => {
  const [status, setStatus] = useState("subscribe");
  const [open, setOpen] = useState(false);

  const handleRouteChange = (route) => {
    setStatus(route);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-grow items-center justify-center w-full">
          <div className="items-center justify-center">
            <div>
              <div className="flex flex-row items-end">
                <img className="h-[7vmin]" src={Logo} alt="logo" />
                <img className="h-[9vmin] ml-9 transition ease-in-out hover:scale-110 duration-300" src={Badger} alt="badgee" />
              </div>

              <p className="mt-2 text-[3vmin] text-gray-600 font-[495]">
                Let badger emails you when your section becomes available
              </p>
            </div>
            {status === "subscribe" ? (
              <Subscribe
                handleRouteChange={handleRouteChange}
                handlePageChange={handlePageChange}
              />
            ) : (
              <SignIn
                handleRouteChange={handleRouteChange}
                handlePageChange={handlePageChange}
              />
            )}
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
      <Contact open={open} setOpen={setOpen}/>
    </>
  );
};
export default Login;
