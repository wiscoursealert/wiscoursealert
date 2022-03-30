import { useState } from "react";
import AddForm from "./addform";
import Sections from "./sections";

const Card = ({ cardCourse }) => {
  let [course, setCourse] = useState(cardCourse);

  const addSection = (section) => {
    if (section.lecture_name !== "Select a section") {
      for (var own of course.sections) if (own.section_id === section) return;

      let temp = Object.assign({}, course);
      temp.sections.push({ section_id: section });
      setCourse(temp);
    }
  };

  const deleteSection = (section) => {
    let temp = Object.assign({}, course);

    for (var i = 0; i < temp.sections.length; i++)
      if (temp.sections[i].section_id === section) temp.sections.splice(i, 1);

    setCourse(temp);
  };

  return (
    <div className="grow h-[58vh] sm:max-h-[510px] lg:max-h-[600px] rounded-3xl transition ease-in-out duration-300 hover:scale-[1.02] hover:shadow-xl z-0">
      <div className="h-[28%] rounded-t-3xl border-gray-300 border-x-4 border-t-4 border-b-2">
        <div className="px-[7%] h-full flex flex-col justify-center">
          <p className="text-[4vmax] sm:text-[1.8rem] font-bold pb-[0.8vh]">
            {course.course_id}
          </p>
          <p className="text-[2vmax] sm:text-[1.1rem]">{course.course_name}</p>
        </div>
      </div>
      <div className="h-[72%] rounded-b-3xl border-gray-300 border-x-4 border-t-2 border-b-4">
        <div className="px-[7%] py-[5%] h-full flex flex-col justify-between">
          <p className="text-[3vmax] sm:text-[1.6rem] font-bold">Sections</p>
          <Sections
            deleteSection={deleteSection}
            sections={course.sections}
            subjectID={course.subjectID}
            courseID={course.course_id}
          />
          <AddForm
            addSection={addSection}
            subjectID={course.subjectID}
            courseID={course.course_id}
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
