import Navigation from "../components/navigation";
import Cards from "../components/cards";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import config from "../config.json";
import { useParams } from 'react-router-dom';


const Edit = () => {
  let params = useParams();
  let [user, setUser] = useState(null);

  useEffect(() => {
    if(user != null){
      return;
    }
    (async () => {
      try{
        const fullUser = await (await fetch(config.apiUrl + '/users?user_id=' + params.userId)).json();
        setUser(fullUser);
      } catch(e){
        console.log('Connection Failed');
        alert("User does not exist");
        setUser({subscribed: []});
      }
    })();
  }, [user, params]);

  const addCard = (toAdd) => {
    for (var course of user.subscribed) if (course.course_id === toAdd.course_id) {
      alert("The selected course is already added.");
      return ;
    }
    toAdd.sections = [];
    let temp = Object.assign({}, user);
    temp.subscribed.push(toAdd);
    setUser(temp);
  }

  const handleUpdate = async (delay) => {
    let temp = Object.assign({}, user);
    temp.delay = parseInt(delay);
    setUser(temp);

    try{
      await fetch(config.apiUrl + '/users', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(temp)
      })
    } catch(e){
      console.log('Connection Failed');
      alert('Saving failed, please try again later');       // TODO: decorate this?
    }
  }

  const updateCourse = (course) => {
    for (var i = 0; i < user.subscribed.length; i++) if (user.subscribed[i].course_id === course.course_id) {
      let temp = Object.assign({}, user);
      temp.subscribed[i] = course;
      setUser(temp);
    }
  }
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navigation />
      <div className="my-[2vh] mx-[4vw] flex-grow">
        <p className="text-[4vmin] text-white bg-red-700 font-semibold mb-[3vh] w-fit px-[4vmin] py-[1.5vmin] rounded-3xl">
          Your watching list
        </p>
        {user !== null? (<Cards initialCourses={user.subscribed} addCard={addCard} updateCourse={updateCourse}/> ):
        (<div>Loading...</div>)}       
      </div>
      <Footer handleUpdate={handleUpdate} curDelay={user !== null && user.delay != null? user.delay:config.minDelay}/> 
    </div>
  );
};

export default Edit;
