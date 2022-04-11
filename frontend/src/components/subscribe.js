import {useState} from 'react';
import config from "../config.json";

const Subscribe = ({handleRouteChange, handlePageChange, setLoading}) => {
  const [email, setEmail] = useState("")

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!email.match('^[A-Za-z0-9._%+-]+@wisc.edu$')){
      alert('Your must use @wisc.edu email to register');
      return;
    }
    setLoading(true);
    try{
      await fetch(config.apiUrl + '/users', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email})
      })
    } catch(e){
      console.log('Connection Failed');
      alert('Connection error, please try again later');       // TODO: decorate this?
      setLoading(false);
      return;
    }
    setLoading(false);
    handlePageChange("completed");
  }

  return (
    <>
      <form className="mt-8 flex flex-row w-full" onSubmit={handleSubmit} method="POST">
        <div className="rounded-md shadow-sm w-full">
          <div>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-4 py-2 text-[2.5vmin] font-medium border border-gray-300 placeholder-gray-400 text-gray-500 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10"
              placeholder="Your @wisc.edu email"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="ml-3 w-fit">
          <button
            type="submit"
            className="group whitespace-nowrap relative w-fit flex justify-center transition ease-in-out hover:scale-[1.05] border border-transparent px-4 py-2 text-[2.5vmin] font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Get Started!
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-5">
        <p
          className="text-[1.5vmin] font-medium text-gray-400 "
        >
          Already have an account? Type in your email again to re-retrieve the link to the subscription management portal.
        </p>
      </div>
    </>
  );
};

export default Subscribe;
