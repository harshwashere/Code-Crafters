import { useEffect, useState } from 'react';
import './Team.css';
import codecraftersImage from './codecrafters.jpg';

const Team = () => {
  const [visibleWords, setVisibleWords] = useState([]);

  useEffect(() => {
    const text = `We are a team of passionate developers committed to delivering innovative and impactful solutions. 
                  With a diverse skill set spanning frontend, backend, and full-stack development, we work together to craft exceptional experiences.
                  Our team thrives on collaboration, creativity, and precision, solving complex problems through technology. Currently, we are revolutionizing
                  the meal delivery space with our unique project a seamless integration of "tiffin" and "calendar." This solution is designed to streamline 
                  scheduled meal services, offering busy individuals greater convenience and control over their daily meals.
                  
                  At Code Crafters, we are driven by a shared mission to enhance everyday life through technology—one meal at a time.`;
    const words = text.split(" ");
    let currentWordIndex = 0;

    const interval = setInterval(() => {
      setVisibleWords((prevWords) => [...prevWords, words[currentWordIndex]]);
      currentWordIndex++;
      if (currentWordIndex === words.length) clearInterval(interval);
    }, 150); // Delay between each word

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-us-container">
      <h2 className="animate-heading">
        About Our Team
        <span className="heading-underline"></span> {/* Light below the heading */}
      </h2>
      <div className="about-us-content">
        <img
          src={codecraftersImage}
          alt="About Us"
          className="about-us-image animate-image"
        />
        <div className="team-description animate-description">
          <p className="animate-paragraph">
            {visibleWords.join(" ")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Team;
