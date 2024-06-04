import { useRoutes } from "react-router-dom";
import "./App.css";
import Post from "./pages/bai-viet";
import AddPost from "./pages/them-bai-viet";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "./layouts/MainLayout";

function App() {
  const element = useRoutes([
    {
      path: "/posts/",
      element: <Post />,
    },
    {
      path: "/posts/add",
      element: <AddPost />,
    },
    {
      path: "/posts/:id",
      element: <AddPost />,
    },
  ]);
  return (
    <div className="App ">
      <ToastContainer autoClose={1500} />
      <MainLayout>{element}</MainLayout>
    </div>
  );
}

export default App;
