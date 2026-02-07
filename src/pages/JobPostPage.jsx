import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const {
      title,
      companyName,
      location,
      salary,
      jobType,
      description,
      qualifications,
    } = formData;

    if (!title) {
      return setError("Title is required");
    }

    if (!companyName) {
      return setError("Company name is required");
    }

    if (!location) {
      return setError("Location is required");
    }

    if (!salary) {
      return setError("Salary is required");
    }

    if (!jobType) {
      return setError("Job type is required");
    }

    if (!qualifications) {
      return setError("Qualifications is required");
    }

    try {
      setLoading(true);
      setError("");

      const res = await fetch(`${baseUrl}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          companyName,
          location,
          salary: Number(salary),
          jobType,
          description,
          qualifications,
        }),
      });

      await res.json();

      setFormData({
        title: "",
        companyName: "",
        location: "",
        salary: "",
        jobType: "",
        description: "",
        qualifications: "",
      });

      navigate("/");
    } catch (error) {
      setError(error.message || "Failed to create job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="container py-4">
          <h2>Post a Job</h2>

          <form action="">
            <div className="mb-2">
              <label htmlFor="" className="form-label">
                Job Title:
              </label>
              <span className="text-danger fw-semibold">*</span>
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
              <span className="text-danger fw-semibold">*</span>
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
              <span className="text-danger fw-semibold">*</span>
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
              <span className="text-danger fw-semibold">*</span>
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
              <span className="text-danger fw-semibold">*</span>
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
              <span className="text-danger fw-semibold">*</span>
              <input
                type="text"
                name="qualifications"
                className="form-control"
                value={formData.qualifications}
                onChange={handleChange}
              />
            </div>

            {error && (
              <div className="text-danger fw-semibold">
                <p className="p-0">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="mt-2 btn btn-dark"
              onClick={handleClick}
              disabled={loading}
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </form>
        </div>
      </main>
    </>
  );
}

export default JobPostPage;
