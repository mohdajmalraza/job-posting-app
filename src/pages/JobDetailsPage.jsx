import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";

function JobDetailsPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const { id } = useParams();

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/jobs/${id}`);

      const json = await res.json();

      if (res.status !== 200) {
        throw new Error(json.message);
      }

      setJob(json?.job);
    } catch (error) {
      setError(error.message || "Failed to fetch job details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobDetails();
  }, []);

  return (
    <>
      <Navbar />
      <main className="container py-4">
        {loading && (
          <div className="py-5 text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        )}

        {!loading && error && (
          <div className="py-5 text-danger text-center">
            <p className="fw-semibold">{error}</p>
          </div>
        )}

        {!loading && !error && job && (
          <div>
            <h2 className="mb-3">{job.title}</h2>

            <div className="card border-0 shadow">
              <div className="card-body">
                <div className="card-text mb-2">
                  <span className="fw-bold">Company Name: </span>
                  <span>{job?.company}</span>
                </div>
                <div className="card-text mb-2">
                  <span className="fw-bold">Location: </span>
                  <span>{job?.location}</span>
                </div>
                <div className="card-text mb-2">
                  <span className="fw-bold">Salary: </span>
                  <span>{job?.salary}</span>
                </div>
                <div className="card-text mb-2">
                  <span className="fw-bold">Job Type: </span>
                  <span>{job?.type}</span>
                </div>
                <div className="card-text mb-2">
                  <span className="fw-bold">Description: </span>
                  <span>{job?.description}</span>
                </div>
                <div className="card-text mb-2">
                  <span className="fw-bold">Qualifications: </span>
                  <ol>
                    {job?.qualifications.split(". ").map((s, i) => (
                      <li key={i}>{s.trim()}</li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default JobDetailsPage;
