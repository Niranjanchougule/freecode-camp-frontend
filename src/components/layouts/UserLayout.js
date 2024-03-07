import { useNavigate } from "react-router-dom";
import "./Layout.css";
import { useEffect, useState } from "react";
import axios from "axios";

function UserLayout(props) {
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    // API call to get courseList
    axios
      .get(
        "https://pacific-lake-83566-ac3ea723e471.herokuapp.com/user-by-tokan",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        setUser(result.data);
      });
  }, []);

  const logout = () => {
    // Clear token from local storage
    localStorage.removeItem("token");
    navigate("/signinpage");
  };
  return (
    <div>
      <div className="nav-container">
        <span className="title">freeCodeCamp</span>

        <div className="butt-container">
          {user?.email}
          <button className="logout-button" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="child-container">{props.children}</div>
    </div>
  );
}

export default UserLayout;
