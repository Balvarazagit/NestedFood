import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import "./login.css";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState(""); // Email state
  const [password, setPassword] = useState(""); // Password state
  const [error, setError] = useState(""); // Error message state
  const navigate = useNavigate(); // Navigation hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Form submission default behavior stop karo

    try {
      // Sending POST request to the backend API using fetch
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST', // HTTP method
        headers: {
          'Content-Type': 'application/json', // Set the content type as JSON
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      // Handle response
      const data = await response.json();

      // Check if login is successful (response contains a token)
      if (response.ok && data.token) {
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token); // Store the token in localStorage
        setError(""); // Clear any previous error
        alert("Login successful!"); // Success message
        navigate("/"); // Redirect to the dashboard page
      } else {
        setError("Invalid email or password."); // Show error if login fails
      }
    } catch (err) {
      setError("An error occurred while logging in."); // General error message
    }
  };

  return (
    <section className="login-page d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 form-section text-center">
            <h2 className="fw-bold mb-2">Login to Your Account</h2>
            <p>
              Don&apos;t have an account?
              <Link to={"/register"} className="text-success ms-1">Register</Link>
            </p>
            <form className="mx-auto" onSubmit={handleLogin}>
              <table className="table-borderless medium-width mx-auto">
                <tbody>
                  {/* Email */}
                  <tr>
                    <td>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Email state update
                        required
                      />
                    </td>
                  </tr>
                  {/* Password */}
                  <tr>
                    <td>
                      <input
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Password state update
                        required
                      />
                    </td>
                  </tr>
                  {/* Error Message */}
                  {error && (
                    <tr>
                      <td>
                        <div className="text-danger">{error}</div>
                      </td>
                    </tr>
                  )}
                  {/* Submit Button */}
                  <tr>
                    <td>
                      <button type="submit" className="btn btn-success w-100">
                        Login
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
          {/* Social Buttons */}
          <div className="col-md-6 d-flex flex-column align-items-center justify-content-center mt-4 social-section">
            <button className="btn btn-primary mb-3 medium-width">
              <FacebookIcon /> Continue with Facebook
            </button>
            <button className="btn btn-light border mb-3 medium-width">
              <FontAwesomeIcon icon={faGoogle} /> Continue with Google
            </button>
            <button className="btn btn-dark medium-width">
              <AppleIcon /> Continue with Apple
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
