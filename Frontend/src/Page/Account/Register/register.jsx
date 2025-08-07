import "./register.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import AppleIcon from "@mui/icons-material/Apple";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false); // State for success message
  const [error, setError] = useState(""); // State for error message
  const formRef = useRef(); // Ref for form

  const handleClick = async (event) => {
    event.preventDefault(); // Prevent form submission refresh

    // Create a FormData object from the form
    const formData = new FormData(formRef.current);

    // Convert FormData to a plain object
    const formObject = {};
    formData.forEach((value, key) => {
      formObject[key] = value;
    });

    // Convert the object to a JSON string
    const jsonData = JSON.stringify(formObject);

    // Check if all fields are filled
    if (!formObject.name || !formObject.email || !formObject.password || !formObject.mobilenumber || !formObject.role) {
      setError("⚠️ Fill Proper");
      return;
    }
    setError("");

    // API call to register user
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Ensure we send JSON
        },
        body: jsonData, // Send JSON data
      });

      const data = await response.json();

      if (response.ok) {
        console.log("User registered:", data);
        setIsRegistered(true);

        // Redirect to login page after 2 seconds
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred while registering. Please try again.");
      console.error("Error registering user:", error);
    }
  };

  return (
    <section className="d-flex justify-content-center align-items-center">
      <div className="container mt-5">
        <div className="row justify-content-center mt-5 mb-5">
          <div className="col-md-6 form-section text-center mt-5 mb-5">
            <h2 className="fw-bold mb-2">Create an Account</h2>
            <p>
              Already have an account?
              <Link to={"/login"} className="text-success ms-1">
                Login
              </Link>
            </p>
            {error && <div className="alert alert-danger">{error}</div>}
            <form ref={formRef} className="mx-auto">
              <table className="table-borderless medium-width mx-auto">
                <tbody>
                  {/* Username */}
                  <tr>
                    <td>
                      <input
                        name="name"
                        type="text"
                        className="form-control"
                        placeholder="Username"
                        required
                      />
                    </td>
                  </tr>
                  {/* Email */}
                  <tr>
                    <td>
                      <input
                        name="email"
                        type="email"
                        className="form-control"
                        placeholder="Email"
                        required
                      />
                    </td>
                  </tr>
                  {/* Password */}
                  <tr>
                    <td>
                      <input
                        name="password"
                        type="password"
                        className="form-control"
                        placeholder="Password"
                        required
                      />
                    </td>
                  </tr>
                  {/* Mobile Number */}
                  <tr>
                    <td className="d-flex align-items-center">
                      <input
                        name="mobilenumber"
                        type="number"
                        minLength={10}
                        maxLength={10}
                        className="form-control me-2"
                        placeholder="Mobile Number"
                        required
                      />
                    </td> 
                  </tr>
                  {/* Role Dropdown */}
                  <tr>
                    <td>
                      <div className="text-start">
                        <select name="role" className="form-control" required>
                          <option value="">Select Role</option>
                          <option value="admin">Admin</option>
                          <option value="user">User</option>
                        </select>
                      </div>
                    </td>
                  </tr>
                  {/* Terms Checkbox */}
                  <tr>
                    <td>
                      <div className="form-check text-start">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="terms"
                          required
                        />
                        <label className="form-check-label" htmlFor="terms">
                          I agree to terms & Policy.{" "}
                          <a href="#" className="text-success">
                            Learn more
                          </a>
                        </label>
                      </div>
                    </td>
                  </tr>
                  {/* Submit Button */}
                  <tr>
                    <td>
                      <button
                        onClick={handleClick}
                        type="submit"
                        className="btn btn-success w-100"
                      >
                        Submit & Register
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
            {isRegistered && (
              <div className="alert alert-success mt-4">
                Registration successful! 🎉 Redirecting to login page...
              </div>
            )}
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

export default Register;
