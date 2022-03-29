import { useSearchParams } from "react-router-dom";
import Navigation from "../components/navigation";
import Cards from "../components/cards";
import Footer from "../components/footer";

const Edit = () => {
  let [searchParam, setSearchParam] = useSearchParams();

  return (
    <div className="top-0">
      <Navigation />
      <div className="my-[2vh] mx-[4vw] ">
        <p className="text-[4vmin] text-white bg-red-700 font-semibold mb-[3vh] w-fit px-[3vmin] py-[1.5vmin] rounded-3xl">
          Your watching list
        </p>
        <Cards />        
      </div>
      <Footer /> 
    </div>
  );
};

export default Edit;
