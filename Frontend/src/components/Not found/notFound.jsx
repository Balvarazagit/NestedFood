import "./notFound.css";
import NotImage from "../../assets/images/page not found image.png";
import { Link } from "react-router-dom";
import { Home as HomeIcon } from '@mui/icons-material'; // Import HomeIcon
const NotFound = () => {
  return (
    <section className="notFound d-flex justify-content-center align-items-center text-center">
      <div className="container-fluid">
        <img src={NotImage} alt="Page Not Found" />
        <h1>Page Not Found</h1>
        <p>
          Oops! The page you are looking for doesn’t exist or has been moved. <br />
          Please check the URL or return to the homepage.
        </p>
        <div className="button-container">
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="back-to-home-button">
          <HomeIcon  /> {/* Material UI Home Icon */}
          Back to Home
        </button>
      </Link>
    </div>

      </div>
    </section>
  );
};

export default NotFound;
