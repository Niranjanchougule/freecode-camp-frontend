import { useNavigate } from "react-router-dom";
import "./Layout.css";

function Layout(props) {
  const navigate = useNavigate();

  function handelSignIn() {
    navigate("/signinpage");
  }

  return (
    <div>
      <div className="nav-container">
        <span className="title">
          freeCodeCamp{" "}
          <img
            src="https://www.pngkey.com/png/full/303-3036579_free-code-camp-logo-transparent.png"
            alt="freecodecamp"
            width="50"
          />
        </span>

        <div className="butt-container">
          <button className="logout-button">Menu</button>
          <button className="signinbutton" onClick={handelSignIn}>
            Sign in
          </button>
        </div>
      </div>
      <div className="child-container">{props.children}</div>
    </div>
  );
}

export default Layout;
