const AddForm = () => {
  return (
    <form class="h-[2.5rem] w-auto flex">
      <div class="flex justify-between items-center relative h-full w-4/5 border-b border-sky-600 rounded-bl-lg">
        <select className="appearance-none w-full px-[6%] h-full rounded-l-lg leading-tight focus:outline-none focus:shadow-outline text-left hover:bg-gray-200">
          <option selected>Select a section</option>
          <option>Section 1</option>
          <option>Section 2</option>
          <option>Section 3</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            class="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
      <button
        className="w-1/5 text-sm text-white px-2 rounded-r-md bg-sky-600 hover:bg-sky-700 border-sky-600 hover:border-sky-700 transition ease-in-out duration:500 hover:scale-105"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export default AddForm;
