import Navigation from "../components/navigation";
import Cards from "../components/cards";
import Footer from "../components/footer";
import { useEffect, useState } from "react";
import config from "../config.json";
import { useParams } from 'react-router-dom';
import Loading from "../components/loading";


const Edit = () => {
  let params = useParams();
  let [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  let loadingVal = 0;

  const addLoading = (val) => {
    if(loadingVal <= 0 && loadingVal + val > 0){
      setLoading(true);
    }
    else if(loadingVal > 0 && loadingVal + val <= 0){
      setLoading(false);
    }
    loadingVal += val;
  }

  useEffect(() => {
    if(user != null){
      return;
    }
    (async () => {
      addLoading(1);
      try{
        const fullUser = JSON.parse(await (await fetch(config.apiUrl + '/users?user_id=' + params.userId)).text());
        setUser(fullUser);
      } catch(e){
        console.error(e);
        console.log('Connection Failed');
        alert("User does not exist");
        setUser({subscribed: []});
      }
      addLoading(-1);
    })();
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

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
    addLoading(1);
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
      addLoading(-1);
      return;
    }
    alert('Saving success!');
    addLoading(-1);
  }

  const updateCourse = (course) => {
    for (var i = 0; i < user.subscribed.length; i++) if (user.subscribed[i].course_id === course.course_id) {
      let temp = Object.assign({}, user);
      if(course.del){
        temp.subscribed.splice(i,1);
      }
      else{
        temp.subscribed[i] = course;
      }
      setUser(temp);
    }
  }
  return (
    <div className="flex flex-col min-h-screen justify-between text-gray-600">
      <Navigation curEmail={user !== null? user.email:"Loading..."} />
      <div className="my-[2vh] mx-[4vw] flex-grow">
        <p className="text-[4.5vmin] font-semibold mb-[3vh] w-fit py-[1.5vmin] rounded-3xl">
          Your watchlist
        </p>
        {user !== null? (<Cards coursesRaw={JSON.stringify(user.subscribed)} addCard={addCard} updateCourse={updateCourse} addLoading={addLoading}/> ):
        (<div>Loading...</div>)}       
      </div>
      <Footer handleUpdate={handleUpdate} curDelay={user !== null && user.delay !== undefined? user.delay:null}/> 
      <Loading open={loading}/>
    </div>
  );
};

export default Edit;
