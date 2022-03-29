import {useState} from 'react';

const Subscribe = ({handleRouteChange, handlePageChange}) => {
  const [email, setEmail] = useState("")

  const handleChange = (event) => {
    setEmail(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
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
              placeholder="Your email address"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="ml-3">
          <button
            type="submit"
            className="group relative w-full flex justify-center transition ease-in-out hover:scale-[1.05] border border-transparent px-4 py-2 text-[2.5vmin] font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
          >
            Subscribe
          </button>
        </div>
      </form>
      <div className="flex justify-center mt-5">
        <p
          onClick={() => handleRouteChange("signin")}
          className="text-[2.5vmin] font-medium text-red-600 hover:text-red-700"
        >
          Already have an account?
        </p>
      </div>
    </>
  );
};

export default Subscribe;
