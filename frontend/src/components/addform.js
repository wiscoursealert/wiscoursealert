import { useEffect, useState } from "react";
import config from "../config.json";

const AddForm = ({ addSection, subjectID, courseID }) => {
  let [allSections, setAllSections] = useState(null);

  let [value, setValue] = useState("Select a section");

  const getSectionName = (section) => {
    var name = "";
    if (section.lecture_name.length !== 0)
      name = name.concat("LEC ", section.lecture_name);
    if (section.discussion_name.length !== 0)
      name = name.concat(" / DIS ", section.discussion_name);
    if (section.lab_name.length !== 0)
      name = name.concat(" / LAB ", section.lab_name);
    return name;
  };

  useEffect(() => {
    (async () => {
      try{
        setAllSections(await (await fetch(config.apiUrl + '/sections', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({subject_id: subjectID, course_id: courseID})
        })).json());
      } catch(e){
        console.log('Connection Failed');
        alert('Sections fetching failed, please try again later');       // TODO: decorate this?
      }
    })();
  }, [subjectID, courseID]);

  const handleChange = (event) => {
    setValue(event.target.value);
    //setValue(event.target.value);
  };

  const handleClick = () => {
    if (value === "Select a section") return;
    for (var section of allSections) {
      if (section.section_id === value) {
        addSection(value);
        break;
      }
    }
  };

  return (
    allSections !== null? (
      <div className="h-[2.5rem] w-auto flex">
        <div className="flex justify-between items-center relative h-full w-4/5 border-b border-sky-600 rounded-bl-lg">
          <select
            value={value}
            onChange={handleChange}
            className="appearance-none w-full px-[6%] h-full rounded-l-lg leading-tight focus:outline-none focus:shadow-outline text-left hover:bg-gray-200"
          >
            <option value={"Select a section"}>Select a section</option>
            {allSections.map((section) => {
              return (
                <option key={section.section_id} value={section.section_id}>
                  {getSectionName(section)}
                </option>
              );
            })}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <button
          className="w-1/5 text-sm text-white px-2 rounded-r-md bg-sky-600 hover:bg-sky-700 border-sky-600 hover:border-sky-700 transition ease-in-out duration-300 hover:scale-105"
          type="submit"
          onClick={handleClick}
        >
          Add
        </button>
      </div>
    ) : (
      <div>
        Loading...
      </div>
    )
  );
};

export default AddForm;
