import Login from "./pages/login";
import Complete from "./pages/complete";
import { useState } from "react";

const App = () => {
  const [page, setPage] = useState("login");

  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      {page === "login" ? (
        <Login handlePageChange={handlePageChange} />
      ) : <Complete />}
    </>
  );
};

export default App;
