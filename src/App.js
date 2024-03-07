import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignInPage from "./pages/Signin";
import CourseList from "./pages/CourseList";
import CourseContant from "./pages/CourseContent";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/signinpage" Component={SignInPage} />
        <Route path="/course-list" Component={CourseList} />
        <Route path="/course/:id" Component={CourseContant} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
