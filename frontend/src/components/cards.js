import Card from "./card.js";
import AddCard from "./addCard.js";
import { useSearchParams } from "react-router-dom";

let courses = [
  // {
  //   course_id:      "COMP SCI 577",
  //   course_name:    "Introduction to Algorithms",
  //   subject_id:     "577",
  //   sections:
  //   [
  //     {
  //       section_id: "10001"
  //     },
  //     {
  //       section_id: "10002"
  //     },
  //     {
  //       section_id: "10003"
  //     },
  //     {
  //       section_id: "10004"
  //     }
  //   ]
  // },
  {
    course_id: "COMP SCI 300",
    course_name: "Programming II",
    subject_id: "300",
    sections: [
      {
        section_id: "000",
      },
    ],
  },
];

const Cards = () => {
  let [searchParam, setSearchParams] = useSearchParams();

  console.log(searchParam.get("id"));

  return (
    <div className="w-full h-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
      {courses.map((course) => {
        return <Card key={course.course_id} cardCourse={course} />;
      })}
      <AddCard />
    </div>
  );
};

export default Cards;
