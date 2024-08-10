import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import { useEffect, useState } from "react";

const Home = () => {
  const [userDetails, setUserDetails] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userDetails");
    if (userData) {
      setUserDetails(JSON.parse(userData));
    } else {
      navigate("/login", { replace: true });
    }
  }, []);

  const renderUserDetails = () => {
    return (
      <>
        <div className="welcome-container">
          <div className="welcome-content">
            <h1 className="welcome-title">
              Welcome to our community <h1>{userDetails?.user_firstname}!</h1>
            </h1>
            <p className="welcome-description">
              Fuse helps developers to build organized and well-coded dashboards
              full of beautiful and rich modules. Join us and start building
              your application today.
            </p>
            <div className="community-info">
              <div className="user-details-card">
                <h2>Your Details</h2>
                <p>
                  <strong>First Name:</strong> {userDetails?.user_firstname}
                </p>
                <p>
                  <strong>Last Name:</strong> {userDetails?.user_lastname}
                </p>
                <p>
                  <strong>Email:</strong> {userDetails?.user_email}
                </p>
                <p>
                  <strong>Phone:</strong> {userDetails?.user_phone}
                </p>
                <p>
                  <strong>City:</strong> {userDetails?.user_city}
                </p>
                <p>
                  <strong>Zipcode:</strong> {userDetails?.user_zipcode}
                </p>
              </div>
              <p className="community-text">
                More than 17K people joined us, it's your turn
              </p>
            </div>
            <Link to="/login">
              <button className="btn">Back To Login Page &#9787; </button>
            </Link>
          </div>
        </div>
      </>
    );
  };

  const renderErrorPage = () => {
    return <h3>No User Data Found in Local Storage!</h3>;
  };

  return (
    <div className="home-page__main-container">
      {userDetails ? renderUserDetails() : renderErrorPage()}
    </div>
  );
};

export default Home;
