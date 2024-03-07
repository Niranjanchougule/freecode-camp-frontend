import { useEffect, useState } from "react";
import "./Signin.css";
import axios from "axios";
import AuthPageLayout from "../components/layouts/AuthPageLayout";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const [isExsiting, setIsExisting] = useState(null);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const existingToken = localStorage.getItem("token");
    if (existingToken) {
      setTimeout(() => navigate("/course-list"));
    }
  }, []);
  return (
    <AuthPageLayout>
      <div className="signinbox-container">
        <div className="header">
          <img
            src="https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/freecodecamp-512.png"
            alt="freecodecamp"
            width="90"
          />
          <p>Log in to freeCodeCamp Learn</p>
        </div>
        {isExsiting === null && (
          <VerifyEmail
            setIsExisting={setIsExisting}
            setVerifiedEmail={setVerifiedEmail}
            verifedEmail={verifiedEmail}
          />
        )}
        {isExsiting && (
          <Login verifiedEmail={verifiedEmail} setIsExisting={setIsExisting} />
        )}
        {isExsiting === false && (
          <SignUp verifiedEmail={verifiedEmail} setIsExisting={setIsExisting} />
        )}
      </div>
    </AuthPageLayout>
  );
}

export default SignInPage;

function VerifyEmail({ verifedEmail, setIsExisting, setVerifiedEmail }) {
  const [email, setEmail] = useState(verifedEmail);
  const [isValid, setIsValid] = useState(true);
  const [isEmpty, setIsEmpty] = useState(false);

  function handelchange(event) {
    setEmail(event.target.value);
  }

  function handelemail() {
    if (!email.trim()) {
      setIsEmpty(true); // Set isEmpty state to true if email is empty or contains only whitespace
      setIsValid(false); // Mark email as invalid
      return; // Exit function early if email is empty
    }
    // Simple email validation using a regular expression
    const emailRegex = /\S+@\S+\.\S+/;
    const validEmail = emailRegex.test(email);
    setIsValid(validEmail);

    if (validEmail) {
      axios
        .get(
          `https://pacific-lake-83566-ac3ea723e471.herokuapp.com/verify-existing-email?email=${email}`
        )
        .then(function (response) {
          console.log(response.data);
          if (response.data) {
            setIsExisting(true);
          } else {
            setIsExisting(false);
          }
          setVerifiedEmail(email);
        });
    }
  }
  return (
    <div className="signinbox-form">
      <input
        type="email"
        placeholder="Email Address"
        value={email}
        onChange={handelchange}
      ></input>
      {isEmpty && <div className="error-message">Email cannot be empty.</div>}
      {!isValid && !isEmpty && (
        <div className="error-message">Please enter a valid email address.</div>
      )}
      <button className="signin-button-custom" onClick={handelemail}>
        Continue with Email
      </button>
    </div>
  );
}

function Login({ verifiedEmail, setIsExisting }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: verifiedEmail,
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make API call to login using formData
      const response = await axios.post(
        "https://pacific-lake-83566-ac3ea723e471.herokuapp.com/signin",
        formData
      );

      // Handle successful login
      console.log("Login successful:", response.data);
      // get the jwt and store in localstorage
      localStorage.setItem("token", response.data.token);
      navigate("/course-list");
    } catch (error) {
      // Handle login error
      console.error("Login error:", error);
    }
  };

  return (
    <form className="signinbox-form" onSubmit={handleSubmit}>
      <div className="login-emailbox">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          readOnly // Make email input read-only since it's verified
        ></input>
        <span
          className="loginbox-edit"
          onClick={() => {
            setIsExisting(null);
          }}
        >
          edit
        </span>
      </div>
      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
        required // Make password input required
      ></input>

      <button type="submit" className="signin-button-custom">
        Continue
      </button>
    </form>
  );
}

function SignUp({ verifiedEmail, setIsExisting }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: verifiedEmail,
    name: "",
    password: "",
  });

  const { email, name, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    try {
      // Make API call to create user using formData
      const response = await axios.post(
        "https://pacific-lake-83566-ac3ea723e471.herokuapp.com/signup",
        formData
      );

      if (response.data) {
        // User created successfully
        console.log("User created successfully");
        // get the jwt and store in localstorage
        localStorage.setItem("token", response.data.token);
        navigate("/course-list");
      } else {
        // Handle error
        console.error("Failed to create user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form className="signinbox-form" onSubmit={handleSubmit}>
      <div className="signup-emailbox">
        <input
          type="email"
          placeholder="Email Address"
          name="email"
          value={email}
          readOnly // Make email input read-only since it's verified
        ></input>
        <span
          className="signup-emailbox-edit"
          onClick={() => {
            setIsExisting(null);
          }}
        >
          edit
        </span>
      </div>
      <input
        type="text"
        placeholder="Name"
        name="name"
        value={name}
        onChange={handleChange}
        required // Make name input required
      ></input>

      <input
        type="password"
        placeholder="Password"
        name="password"
        value={password}
        onChange={handleChange}
        required // Make password input required
      ></input>

      <button type="submit" className="signin-button-custom">
        Continue
      </button>
    </form>
  );
}
