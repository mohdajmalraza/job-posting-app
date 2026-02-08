import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useJobContext from "../contexts/JobContext";

function Navbar() {
  const { searchJobs } = useJobContext();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    event.preventDefault();
    await searchJobs(searchQuery);

    navigate(`/search?query=${searchQuery}`);
  };

  return (
    <header>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            Intern House
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to="/">
                  Job Postings
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/post-job">
                  Post a Job
                </NavLink>
              </li>
            </ul>
            <form className="w-75 col-6 d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search by job title..."
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="btn btn-outline-success"
                type="submit"
                onClick={handleSearch}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
