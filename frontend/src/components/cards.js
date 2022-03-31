import Card from "./card.js";
import AddCard from "./addCard.js";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";

const Cards = ({initialCourses, addCard, updateCourse}) => {

  return (
    <div className="w-full h-full grid gap-4 grid-cols-[repeat(auto-fill,minmax(250px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(340px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(380px,1fr))]">
      {initialCourses.map((course) => {
        return <Card key={course.course_id} cardCourse={course} updateCourse={updateCourse}/>;
      })}
      <AddCard addCard={addCard} />
    </div>
  );
};

export default Cards;
