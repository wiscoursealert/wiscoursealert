import { useEffect, useState } from "react";
import AddForm from "./addform";
import Sections from "./sections";
import config from "../config.json";

const Card = ({ cardCourseRaw, updateCourse }) => {
  let [course, setCourse] = useState(JSON.parse(cardCourseRaw));
  let [allSections, setAllSections] = useState(null);

  const addSection = (section) => {
    for (var own of course.sections) if (own.section_id === section.section_id) return;

    let temp = Object.assign({}, course);
    temp.sections.push(section);
    
    setCourse(temp);
    updateCourse(temp);
  };

  const deleteSection = (section) => {
    let temp = Object.assign({}, course);

    for (var i = 0; i < temp.sections.length; i++)
      if (temp.sections[i].section_id === section) temp.sections.splice(i, 1);

    setCourse(temp);
    updateCourse(temp);
  };

  const close = () => {
    updateCourse({course_id: course.course_id, del: true});
  }

  useEffect(() => {
    (async () => {
      let asections = null;
      try{
        asections = await (await fetch(config.apiUrl + '/sections', {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({subject_id: course.subject_id, course_id: course.course_id})
        })).json();
      } catch(e){
        console.error(e);
        console.log('Connection Failed');
        alert('Sections fetching failed, please try again later');       // TODO: decorate this?
        return;
      }
      const trueCourse = JSON.parse(cardCourseRaw);
      setAllSections(asections);
      const detailedSections = [];
      for (const section of trueCourse.sections){
        detailedSections.push(asections.filter(asection => asection.section_id === section.section_id)[0]);
      }
      setCourse(Object.assign(trueCourse, {sections: detailedSections}));
    })();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="h-[58vh] sm:max-h-[510px] lg:max-h-[600px] rounded-3xl transition ease-in-out duration-300 hover:scale-[1.01] hover:shadow-xl z-0">
      <div className="h-[20%] rounded-t-3xl border-gray-300 border-x-4 border-t-4 border-b-2">
        <div className="px-[7%] h-full flex flex-col justify-center">
          <div className="flex justify-between">
            <p className="text-[4vmax] sm:text-[2rem] font-bold pb-[0.8vh]">
              {course.course_name}
            </p>
            <button className="mb-[0.8vh] hover:bg-gray-300 rounded-md" onClick={close}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 stroke-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="h-[80%] rounded-b-3xl border-gray-300 border-x-4 border-t-2 border-b-4">
        <div className="px-[7%] py-[5%] h-full flex flex-col justify-between">
          <p className="text-[3vmax] sm:text-[1.6rem] font-bold">Sections</p>
          <Sections
            deleteSection={deleteSection}
            sections={course.sections}
            subjectID={course.subject_id}
            courseID={course.course_id}
          />
          <AddForm
            addSection={addSection}
            allSections={allSections}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
