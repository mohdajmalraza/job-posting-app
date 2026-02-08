import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import useJobContext from "../contexts/JobContext";

function SearchPage() {
  const { jobs, loading, error } = useJobContext();

  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <main className="min-vh-100 py-4 bg-light">
        <div className="container bg-light">
          <h2 className="mb-4">Search results</h2>

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
                    <div key={job.id} className="col-md-6 col-lg-4 mb-3">
                      <div className="card p-2 border-0 shadow">
                        <div className="card-body">
                          <h5 className="card-title">{job.title}</h5>
                          <div className="mb-2">
                            <span className="fw-semibold">Company name: </span>
                            {job.company}
                          </div>
                          <div className="mb-2">
                            <span className="fw-semibold">Location: </span>
                            {job.location}
                          </div>
                          <div className="mb-2">
                            <span className="fw-semibold">Job Type: </span>
                            {job.type}
                          </div>

                          <div className="mt-3 d-flex gap-3">
                            <button
                              className="btn btn-dark"
                              onClick={() => navigate(`/jobs/${job.id}`)}
                            >
                              See Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-5 text-danger text-center">
                  <p className="fw-semibold">No Jobs Available</p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </>
  );
}

export default SearchPage;
