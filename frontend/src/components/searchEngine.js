import Courses from "./courses";
import {useEffect, useState} from "react";

let initial_courses = [
  {
    course_id: "0001",
    course_name: "CS 300",
    course_title: "Programming II",
    subject_id: "300",
  }
]

const SearchBar = ({addCard}) => {
  let [toAdd, setToAdd] = useState({id:"-1"});
  let [key, setKey] = useState("");
  let [courses, setCourses] = useState([]);

  useEffect(() => {
    setCourses(initial_courses);
  }, [])

  const handleChange = (event) => {
    setToAdd({id:"-1"});
    setKey(event.target.value);
  }

  const handleID = (course) => {
    setToAdd(course);
    setKey(course.course_name.concat(" ", course.course_title));
  }

  const handleSubmit = (event) => {
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
        <p className="text-[4vmax] sm:text-5xl font-bold text-gray-700 mb-5">Search course</p>
        <form onSubmit={handleSubmit} className="flex flex-row justify-between w-full">
          <input
            value={key}
            onChange={handleChange}
            className="relative block flex-grow px-4 py-2 text-[2.5vmin] font-normal border border-gray-300 placeholder-gray-400 text-gray-500 rounded-lg focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10"
            placeholder="Search for a course"
          />
          <div className="ml-6">
            <button
              type="submit"
              className="group relative h-[100%] w-fit flex justify-center items-center transition ease-in-out hover:scale-[1.05] border border-transparent px-[2vmin] py-2[1vmin] text-[2.5vmin] font-normal rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              Add Course
            </button>
          </div>
        </form>
      </div>
      <Courses handleID={handleID} courses={courses}/>
    </div>
  );
};

export default SearchBar;