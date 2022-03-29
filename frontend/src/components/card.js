import AddForm from "./addform";

const Card = () => {
  return (
    <div className="grow h-[58vh] sm:max-h-[510px] lg:max-h-[600px] rounded-3xl transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-xl z-0">
      <div className="h-[28%] rounded-t-3xl border-gray-300 border-x-4 border-t-4 border-b-2">
        <div className="px-[7%] h-full flex flex-col justify-center">
          <p className="text-[4vmax] sm:text-[1.8rem] font-bold pb-[0.8vh]">
            COMP SCI 577
          </p>
          <p className="text-[2vmax] sm:text-[1.1rem]">
            Introduction to Algorithms
          </p>
        </div>
      </div>
      <div className="h-[72%] rounded-b-3xl border-gray-300 border-x-4 border-t-2 border-b-4">
        <div className="px-[7%] py-[5%] h-full flex flex-col justify-between">
          <p className="text-[3vmax] sm:text-[1.6rem] font-bold">Sections</p>
          <div>sectionsssss</div>
          <AddForm />
        </div>
      </div>
    </div>
  );
};

export default Card;
