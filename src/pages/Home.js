import { useNavigate } from "react-router-dom";
import Layout from "../components/layouts/Layout";
import "./Home.css";
import { useEffect } from "react";

function Home() {
  const navigate = useNavigate();
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      navigate("/course-list");
    }
  }, []);

  return (
    <Layout>
      <div className="mainbox-container">
        <div>
          <h1>Learn to code - for free.</h1>
          <h1>Build projects.</h1>
          <h1>Earn certifications.</h1>
        </div>
        <p>
          Since 2014, more than 40,000 freeCodeCamp.org graduates have gotten
          <br /> jobs at tech companies including:
        </p>
        <div>
          <img src="apple.svg" alt="apple logo" width="25" />
        </div>
        <button className="mainbutton">Get started (it's free) </button>
      </div>
    </Layout>
  );
}

export default Home;
