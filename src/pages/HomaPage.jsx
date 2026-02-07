import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function HomaPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  console.log(jobs);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${baseUrl}/jobs`);
      const json = await res.json();

      setJobs(json?.jobs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-vh-100 py-4 bg-light">
        <div className="container bg-light">
          <h2 className="mb-4">All jobs</h2>

          {loading && (
            <div className="py-5 text-center">
              <div className="spinner-border text-dark" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}

          {!loading && error && (
            <div className="py-5 text-danger text-center">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && (
            <>
              {jobs.length > 0 ? (
                <div className="row">
                  {jobs.map((job) => (
                    <div key={job.id} className="col-md-4 mb-3">
                      <div className="card p-2 border-0 shadow">
                        <div className="card-body">
                          <h5 className="card-title">{job.title}</h5>
                          <div className="mb-2">
                            <span className="fw-semibold">Company name: </span>
                            {job.companyName}
                          </div>
                          <div className="mb-2">
                            <span className="fw-semibold">Location: </span>
                            {job.location}
                          </div>
                          <div className="mb-2">
                            <span className="fw-semibold">Job Type: </span>
                            {job.jobType}
                          </div>

                          <div className="mt-3 d-flex gap-3">
                            <button className="btn btn-dark">
                              See Details
                            </button>
                            <button className="btn btn-danger">Delete</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-5 text-danger text-center">
                  <p>No Jobs Available</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default HomaPage;
