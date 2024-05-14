function About(){
  return(
    <div className="about-page">
      <div className="main-dash mobile">
        <div className="banner">
          <div className="banner-title">
            <h1>About Air Quality</h1>
            <span>What is Air Smart?</span>
          </div>
        </div>
        <div className="description">
          <h1>Summary</h1>
          <p>
          AirSmart is an innovative IoT (Internet of Things)--powered web system designed to offer predictive insights into the air quality of specific indoor environments. Its primary objective revolves around continuously monitoring and assessing air quality within its installed space, providing users with a proactive understanding of potential anomalies in the air composition.
          Central to AirSmart's functionality is its utilization of machine learning models, particularly leveraging time series analysis techniques. By harnessing the power of machine learning, AirSmart can effectively forecast changes and trends in air quality over time. This predictive capability enables users to anticipate fluctuations in air composition, empowering them to take timely actions to maintain a healthy indoor environment.
          AirSmart is a comprehensive solution for monitoring air quality, leveraging IoT technology and advanced data analytics to offer actionable insights. These insights contribute to better indoor air quality management and enhanced occupant well-being, making AirSmart a sophisticated and reliable choice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;