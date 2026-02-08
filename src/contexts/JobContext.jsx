import { createContext, useContext, useEffect, useState } from "react";

const JobContext = createContext();

const useJobContext = () => useContext(JobContext);
export default useJobContext;

export function JobProvider({ children }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchJobs = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/jobs`);
      const json = await res.json();

      setJobs(json?.jobs);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteJob = async (id) => {
    try {
      setError(null);
      setDeleting(true);

      const res = await fetch(`${baseUrl}/jobs/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();

      setJobs((prev) => prev.filter((job) => job.id !== json.job.id));
    } catch (error) {
      setError(error.message || "Failed to delete the job ");
    } finally {
      setDeleting(false);
    }
  };

  const searchJobs = async (query) => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${baseUrl}/jobs/search?query=${query}`);
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
    <JobContext.Provider
      value={{
        jobs,
        loading,
        error,
        deleting,
        fetchJobs,
        deleteJob,
        searchJobs,
      }}
    >
      {children}
    </JobContext.Provider>
  );
}
