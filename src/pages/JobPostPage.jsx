import { useState } from "react";
import Navbar from "../components/Navbar";

function JobPostPage() {
  const [formData, setFormData] = useState({
    title: "",
    companyName: "",
    location: "",
    salary: "",
    jobType: "",
    description: "",
    qualifications: "",
  });

  console.log(formData);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container py-5">
          <h2>Post a Job</h2>

          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Job Title:
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Company Name:
              </label>
              <input
                type="text"
                name="companyName"
                className="form-control"
                value={formData.companyName}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Location:
              </label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Salary:
              </label>
              <input
                type="number"
                min="1"
                name="salary"
                className="form-control"
                value={formData.salary}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Job Type:
              </label>
              <select
                name="jobType"
                id=""
                className="form-select"
                value={formData.jobType}
                onChange={handleChange}
              >
                <option value="">--select job type--</option>
                <option value="Full-time (On-site)">Full-time (On-site)</option>
                <option value="Full-time (Remote)">Full-time (Remote)</option>
                <option value="Part-time (On-site)">Part-time (On-site)</option>
                <option value="Part-time (Remote)">Part-time (Remote)</option>
              </select>
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Job Description:
              </label>
              <input
                type="text"
                name="description"
                className="form-control"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Job Qualifications:
              </label>
              <input
                type="text"
                name="qualifications"
                className="form-control"
                value={formData.qualifications}
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              className="mt-2 btn btn-dark"
              onClick={handleClick}
            >
              Post Job
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default JobPostPage;
