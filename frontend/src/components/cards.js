import Card from "./card.js";
import AddCard from "./addCard.js";

const Cards = ({coursesRaw, addCard, updateCourse, addLoading}) => {

  return (
    <div className="w-full h-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
      {JSON.parse(coursesRaw).map((course) => {
        return <Card key={course.course_id} cardCourseRaw={JSON.stringify(course)} updateCourse={updateCourse} addLoading={addLoading}/>;
      })}
      <AddCard addCard={addCard} addLoading={addLoading}/>
    </div>
  );
};

export default Cards;
