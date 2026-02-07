import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomaPage from "./pages/HomaPage";
import JobsPage from "./pages/JobsPage";
import JobPostPage from "./pages/JobPostPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomaPage />,
  },
  {
    path: "/jobs",
    element: <JobsPage />,
  },
  {
    path: "/post-job",
    element: <JobPostPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
