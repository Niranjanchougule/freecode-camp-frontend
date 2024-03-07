import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./CourseList.css";
import axios from "axios";
import UserLayout from "../components/layouts/UserLayout";

function CourseList() {
  const [courseList, setCourseList] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      navigate("/signinpage");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // API call to get courseList
    axios
      .get("https://pacific-lake-83566-ac3ea723e471.herokuapp.com/courses", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        setCourseList(result.data);
      });
  }, []);

  return (
    <UserLayout>
      <div className="course-container">
        <div className="coursebox-text">
          <h3>Welcome to freeCodeCamp.org</h3>
          <p>
            "I have not failed. I've just found 10,000 ways that won't work."
          </p>
          <h6>- Thomas A. Edison</h6>
        </div>
        <div className="topic-container">
          {courseList ? (
            courseList.map((item, index) => {
              return <Topic key={index} course={item} />;
            })
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </UserLayout>
  );
}

export default CourseList;

function Topic({ course }) {
  const navigate = useNavigate();

  function handelCourseTopic() {
    navigate(`/course/${course._id}`);
  }
  return (
    <button className="topic" onClick={handelCourseTopic}>
      <img src={course.icon} width="25" alt="course" /> {course.name}
    </button>
  );
}
