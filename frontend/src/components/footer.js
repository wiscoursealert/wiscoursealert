import { useEffect, useState } from "react";
import config from "../config.json";

const Footer = ({ handleUpdate, curDelay }) => {
  let [delay, setDelay] = useState(curDelay);

  const handleDelay = (event) => {
    setDelay(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    handleUpdate(delay);
  }

  useEffect(() => {
    setDelay(curDelay);
  }, [curDelay]);

  return (
    <form onSubmit={handleSubmit} className="w-full sticky bottom-0 bg-white border-2 border-gray-200">
      <div className="my-[2vh] mx-[4vw] h-[10vh] flex justify-between items-center">
        <div className="flex flex-row items-center">
          <p className="text-[3vmin] lg:text-[3.3vmin] font-base">
            For each section, don't email me twice in
          </p>
          {
            (curDelay !== null)? (
              <input
                onChange={handleDelay}
                id="time"
                name="minute"
                type="number"
                min={config.minDelay}
                required
                className="w-[4vw] mx-[1vw] py-[0.8vh] text-[2.5vmin] text-center font-base border-2 border-gray-300 placeholder-gray-400 text-gray-500 rounded-lg hover:border-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10"
                defaultValue={curDelay}
              />
            ) : (
              <div></div>
            )
          }
          <p className="text-[3.3vmin] font-base">minute(s).</p>
        </div>
        <button
          type="submit"
          className="text-[3.3vmin] px-[3vmin] py-[1.3vmin] rounded-xl bg-green-500 text-white hover:bg-green-600 transition ease-in-out duration-300 hover:scale-105 hover:-translate-y-1"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Footer;
