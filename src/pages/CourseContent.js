import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./CourseContent.css";
import UserLayout from "../components/layouts/UserLayout";
const Course = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  // const course = { id, name, icon, description, tags }

  const navigate = useNavigate();
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (!existingToken) {
      navigate("/signinpage");
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    // API call to get course by ID
    axios
      .get(
        `https://pacific-lake-83566-ac3ea723e471.herokuapp.com/course-detail?id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setCourse(result.data);
      });
  }, []);

  if (!course) {
    return (
      <UserLayout>
        <div>Data Loading</div>
      </UserLayout>
    );
  }
  return (
    <UserLayout>
      <div className="course">
        <div className="details">
          <h2>{course.id}</h2>
          <p>{course.description}</p>
          <div className="topics">
            <h3>Topics Covered:</h3>
            <ul>
              {course.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
          <div className="tags">
            {course.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Course;
