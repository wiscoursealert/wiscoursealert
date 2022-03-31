import { useState } from "react";
import SearchModal from "./searchModal";

const AddCard = ({addCard}) => {
  let [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex justify-center items-center h-[58vh] sm:max-h-[510px] lg:max-h-[600px] rounded-3xl transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-xl border-4 border-gray-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-gray-300 transition duration-300 scale-[7] hover:scale-[8]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
      <SearchModal open={open} setOpen={setOpen} addCard={addCard} />
    </>
  );
};

export default AddCard;
