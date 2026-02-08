import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { JobProvider } from "./contexts/JobContext";
import HomaPage from "./pages/HomaPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import JobPostPage from "./pages/JobPostPage";
import SearchPage from "./pages/SearchPage";
import { ToastContainer } from "react-toastify";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomaPage />,
  },
  {
    path: "/jobs/:id",
    element: <JobDetailsPage />,
  },
  {
    path: "/post-job",
    element: <JobPostPage />,
  },
  {
    path: "/search",
    element: <SearchPage />,
  },
]);

function App() {
  return (
    <>
      <JobProvider>
        <RouterProvider router={router} />
        <ToastContainer />
      </JobProvider>
    </>
  );
}

export default App;
