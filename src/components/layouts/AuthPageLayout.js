import { useNavigate } from "react-router-dom";
import "./Layout.css";

function AuthPageLayout(props) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="nav-container">
        <span className="title">
          freeCodeCamp{" "}
          <img
            src="https://www.pngkey.com/png/full/303-3036579_free-code-camp-logo-transparent.png"
            alt="freecodecamp"
            width="30"
          />
        </span>
      </div>
      <div className="child-container">{props.children}</div>
    </div>
  );
}

export default AuthPageLayout;
