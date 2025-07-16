import React, { useState, useEffect } from "react";
import prediction from '../assets/p1.jpeg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const primaryColor = "#007bff";

  const [showArrow, setShowArrow] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    // Check scroll on mount
    handleScroll();

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToFeatures = () => {
    const elem = document.getElementById('features-section');
    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div>
      <section
        className="d-flex align-items-center"
        style={{
          height: "100vh",
          backgroundColor: "#f8f9fa",
          padding: "2rem",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <div className="row align-items-center">
            {/* Text */}
            <div className="col-md-8 mb-4">
              <p className="text-primary mb-1 fw-bold fs-2">
                Welcome to churn prediction
              </p>
              <h1 className="display-5 fw-bold">
                Your trusted partner for smart,
                <br />
                prediction solutions.
              </h1>
              <div className="mt-4">
                <button
                  className="btn fw-bold"
                  onClick={() => navigate('/prediction')}
                  style={{ backgroundColor: primaryColor, color: "white" }}
                >
                  PREDICTION
                </button>
              </div>
            </div>

            {/* Image */}
            <div className="col-md-4 d-flex justify-content-center">
              <img
                src={prediction}
                alt="Team working"
                className="img-fluid"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            </div>
          </div>
        </div>

        {/* Down arrow - fixed at bottom center */}
        {showArrow && (
          <div
            onClick={scrollToFeatures}
            style={{
              position: "fixed",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              cursor: "pointer",
              zIndex: 1000,
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "0.5rem",
              boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            }}
            aria-label="Scroll down"
            role="button"
            tabIndex={0}
            onKeyDown={e => { if(e.key === 'Enter') scrollToFeatures(); }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill={primaryColor}
              viewBox="0 0 16 16"
            >
              <path fillRule="evenodd" d="M1.646 3.646a.5.5 0 0 1 .708 0L8 9.293l5.646-5.647a.5.5 0 0 1 
               .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
              <path fillRule="evenodd" d="M1.646 7.646a.5.5 0 0 1 .708 0L8 13.293l5.646-5.647a.5.5 0 0 1
               .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section id="features-section" className="py-5" style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <div className="row text-center">
            {[
              {
                number: "01",
                title: "Improved Customer Retention",
                description:
                  "By identifying at-risk customers, businesses can implement targeted strategies to retain them, reducing churn rates.",
              },
              {
                number: "02",
                title: "Enhanced Customer Insights",
                description:
                  "Analyzing churn data provides valuable insights into customer behavior and preferences, allowing for more personalized experiences.",
              },
              {
                number: "03",
                title: "Cost Efficiency",
                description:
                  "Retaining existing customers is often cheaper than acquiring new ones, making churn prediction a cost-effective strategy for your company.",
              },
              {
                number: "04",
                title: "Informed Decision-Making",
                description:
                  "Data-driven insights from churn prediction can guide marketing, sales, and customer service strategies.",
              },
              {
                number: "05",
                title: "Increased Revenue",
                description:
                  "By minimizing churn, companies can maintain a stable revenue stream and maximize the lifetime value of customers.",
              },
              {
                number: "06",
                title: "Resource Allocation",
                description:
                  "Understanding which customers are likely to churn helps in prioritizing resources for retention efforts.",
              },
            ].map((feature, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="feature-box animate-box">
                  <div
                    className="feature-number"
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: primaryColor,
                      color: "white",
                      borderRadius: "50%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontWeight: "700",
                      fontSize: "1.6rem",
                      margin: "0 auto",
                      userSelect: "none",
                    }}
                  >
                    {feature.number}
                  </div>
                  <h4 className="mt-4 fw-bold" style={{ color: primaryColor }}>
                    {feature.title}
                  </h4>
                  <p className="fs-5">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
