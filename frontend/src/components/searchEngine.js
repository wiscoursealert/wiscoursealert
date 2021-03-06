import Courses from "./courses";
import {useState} from "react";
import config from "../config.json";

/*let placeholder_courses = [
  {
    course_id: "0001",
    course_name: "CS 300",
    course_title: "Programming II",
    subject_id: "300",
  }
]*/

const SearchBar = ({addCard, addLoading}) => {
  let [toAdd, setToAdd] = useState({id:"-1"});
  let [key, setKey] = useState("");
  let [courses, setCourses] = useState([]);

  const handleChange = (event) => {
    setToAdd({id:"-1"});
    setKey(event.target.value);
  }

  const handleID = (course) => {
    setToAdd(course);
    setKey(course.course_name.concat(" ", course.course_title));
  }

  const handleSearchCourse = async (event) => {
    event.preventDefault();
    addLoading(1);
    setCourses([]);
    try{
      setCourses(await (await fetch(config.apiUrl + '/search', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({queryString: key})
      })).json());
    } catch(e){
      console.log('Connection Failed');
      alert('Searching failed, please try again later');       // TODO: decorate this?
    }
    addLoading(-1);
  }

  const handleAddCourse = (event) => {
    event.preventDefault();
    if (toAdd.id === "-1") {
      alert("Please select a course then, without changing anything in the search bar, click add course");
      return ;
    }
    addCard(toAdd);
  }

  return (
    <div className="w-full h-full overflow-auto">
      <div className="w-full">
        <p className="text-xl sm:text-5xl font-bold text-gray-700 mb-5">Search for courses</p>
        <form onSubmit={handleSearchCourse} className="flex flex-row w-full">
          <input
            value={key}
            onChange={handleChange}
            className="relative block flex-grow px-4 py-2 text-md font-normal border border-gray-300 placeholder-gray-400 text-gray-500 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10"
            placeholder="(e.g., COMP SCI 577)"
          />
          <div className="ml-[1vmin]">
            <button
              type="submit"
              className="group relative h-[100%] w-fit flex justify-center items-center transition ease-in-out border border-transparent px-[2vmin] py-2[1vmin] text-md font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Find
            </button>
          </div>
        </form>
      </div>
      <div className='flex flex-col mt-4'>
        <button
          onClick={handleAddCourse}
          className="group relative w-full flex justify-center items-center transition ease-in-out border border-transparent px-[2vmin] py-2 text-md font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
        >
          Add Selected Course
        </button>
        <Courses handleID={handleID} courses={courses}/>
        
      </div>
    </div>
  );
};

export default SearchBar;
