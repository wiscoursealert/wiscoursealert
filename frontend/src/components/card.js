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
  }, []);

  return (
    <div className="h-[58vh] sm:max-h-[510px] lg:max-h-[600px] rounded-3xl transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-xl z-0">
      <div className="h-[28%] rounded-t-3xl border-gray-300 border-x-4 border-t-4 border-b-2">
        <div className="px-[7%] h-full flex flex-col justify-center">
          <div className="flex justify-between">
            <p className="text-[4vmax] sm:text-[2rem] font-bold pb-[0.8vh]">
              {course.course_name}
            </p>
            <p className="text-[4vmax] sm:text-[2rem] font-black pb-[0.8vh] text-gray-500 font-mono" onClick={close}>
              X
            </p>
          </div>
          <p className="text-[2vmax] sm:text-[1.5rem]">{course.course_title}</p>
        </div>
      </div>
      <div className="h-[72%] rounded-b-3xl border-gray-300 border-x-4 border-t-2 border-b-4">
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
