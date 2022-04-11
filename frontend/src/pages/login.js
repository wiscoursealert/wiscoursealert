import React, { useState } from "react";
import Logo from "../images/logo5.png";
import Badger from "../images/badger2.png";
import Subscribe from "../components/subscribe";
import SignIn from "../components/signin";
import Contact from "../components/contact";
import Loading from "../components/loading";

const Login = ({ handlePageChange }) => {
  const [status, setStatus] = useState("subscribe");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingVal, setLoadingVal] = useState(0);

  const addLoading = (val) => {
    if(loadingVal <= 0 && loadingVal + val > 0){
      setLoading(true);
    }
    else if(loadingVal > 0 && loadingVal + val <= 0){
      setLoading(false);
    }
    setLoadingVal(loadingVal + val);
  }

  const handleRouteChange = (route) => {
    setStatus(route);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="flex flex-grow items-center justify-center w-full">
          <div className="items-center justify-center">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex flex-row items-end">
                <img className="h-[7vmin]" src={Logo} alt="logo" />
                <img className="h-[9vmin] ml-9 transition ease-in-out hover:scale-110 duration-300" src={Badger} alt="badgee" />
              </div>

              <p className="mt-2 text-[2vmin] text-gray-600 font-[495]">
                Let our badgers email you when your classes are ready to be enrolled again
              </p>
            </div>
            {status === "subscribe" ? (
              <Subscribe
                handleRouteChange={handleRouteChange}
                handlePageChange={handlePageChange}
                addLoading={addLoading}
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
          <button
            className="text-[2vmin] font-medium text-blue-600 hover:text-blue-700"
            onClick={() => setOpen(true)}
          >
            Contact us!
          </button>
        </div>
      </div>
      <Contact open={open} setOpen={setOpen}/>
      <Loading open={loading}/>
    </>
  );
};
export default Login;
