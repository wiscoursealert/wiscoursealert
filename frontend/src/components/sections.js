import { useEffect } from "react";

let allSections = [
  {
    section_id: "000",
    status: "CLOSED",
    lecture_name: "002",
    discussion_name: "001",
    lab_name: "",
  },
  {
    section_id: "100",
    status: "OPEN",
    lecture_name: "001",
    discussion_name: "001",
    lab_name: "",
  },
  {
    section_id: "200",
    status: "WAITLISTED",
    lecture_name: "001",
    discussion_name: "002",
    lab_name: "",
  },
  {
    section_id: "300",
    status: "CLOSED",
    lecture_name: "001",
    discussion_name: "003",
    lab_name: "001",
  },
];
const Sections = ({ deleteSection, sections, subjectID, courseID }) => {
  useEffect(() => {
    async function getAllSections() {}
  }, []);

  const getSectionName = (section) => {
    var name = "";
    if (section.lecture_name !== undefined)
      name = name.concat("LEC ", section.lecture_name);
    if (section.discussion_name !== undefined)
      name = name.concat(" / DIS ", section.discussion_name);
    if (section.lab_name !== undefined)
      name = name.concat(" / LAB ", section.lab_name);
    return name;
  };

  const findSection = (section) => {
    for (var allSection of allSections) {
      if (allSection.section_id === section.section_id) return allSection;
    }
  };

  const handleClick = (event) => {
    const sectionID = event.currentTarget.getAttribute("data-id");
    deleteSection(sectionID);
  };

  return (
    <div className="overflow-y-auto h-[60%] w-full">
      {sections.map((section) => {
        const trueSection = section;
        if(section === null){
          return (<div></div>);
        }
        console.log(section);
        let attr =
          trueSection.status === "OPEN"
            ? "bg-green-500"
            : trueSection.status === "CLOSED"
            ? "bg-red-500"
            : "bg-yellow-500";
        attr = attr.concat(
          " h-[20%] mb-[1vh] rounded-lg flex items-center transition ease-out duration-300 hover:-translate-y-[2px]"
        );
        return (
          <div className={attr} key={trueSection.section_id}>
            <div className="flex justify-between w-full ml-[1vmax] mr-[0.8vmax]">
              <p className="text-[2vmax] sm:text-[2vmin] text-white font-medium">
                {getSectionName(trueSection)}
              </p>
              <button
                onClick={handleClick}
                data-id={trueSection.section_id}
                className={
                  trueSection.status === "OPEN"
                    ? "hover:bg-green-600 rounded-md"
                    : trueSection.status === "CLOSED"
                    ? "hover:bg-red-700 rounded-md"
                    : "hover:bg-yellow-600 rounded-md"
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 stroke-white scale-75"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Sections;
