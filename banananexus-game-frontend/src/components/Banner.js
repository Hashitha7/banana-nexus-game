import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import headerImg from "../assets/1.jpg";
//change banana image 1 
import { ArrowRightCircle, PersonCircle, StarFill } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BoxArrowRight } from "react-bootstrap-icons"; // Import logout icon
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Banner = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [index, setIndex] = useState(1);
  const toRotate = ["Hashitha Danidu"];
  const period = 2000;
  const navigation = useNavigate();
  
  //  Correct way to handle user data
  const storedUser = localStorage.getItem("User");
  const user = storedUser ? JSON.parse(storedUser) : null;


  useEffect(() => {
    console.log(user);
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);

    setText(updatedText);

    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }

    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setIndex((prevIndex) => prevIndex - 1);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setIndex(1);
      setDelta(500);
    } else {
      setIndex((prevIndex) => prevIndex + 1);
    }
  };



  const startGame = () => {
    axios({
      url: "http://localhost:8080/api/v1/game/start",
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
      },
    }).then((response) => {
      if (response?.data?.success) {
        sessionStorage.setItem(
          "SCORE_ID",
          response?.data.body.score_id ? response.data.body.score_id : null
        );
        sessionStorage.setItem(
          "SCORE_DETAILS_ID",
          response.data.body.score_details_id
            ? response.data.body.score_details_id
            : null
        );
        sessionStorage.setItem(
          "URL",
          response.data.body.question ? response.data.body.question : null
        );
        navigation("/quiz");
      }
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("User");
    sessionStorage.clear();
    toast.success("Logged out successfully!");
    setTimeout(() => navigation("/"), 1000); // Redirect to login page after 1 second
};

  return (
    <section className="banner" id="home">
      <Container>
        <div className="profile-sec">
        <h5>
  <span className="person-icon"><PersonCircle size={22} /></span>
  
  {user ? (
    <span>
      {user.username} - <span className="level">{user.userDetails?.level_eum}</span>{" "}
      <span className="points">
        <StarFill size={16} />
        <span>{user.userDetails?.level}</span>
      </span>
    </span>
  ) : (
    <span>Guest</span> //  Show 'Guest' when user is null
  )}
</h5>
        </div>
        <Row className="aligh-items-center">
          <Col xs={12} md={6} xl={7}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__fadeIn" : ""
                  }
                >
                  <span className="tagline">Welcome To My Banana Nexus Game</span>
                  <h1>{`Hi! I'm `} <span className="txt-rotate" dataPeriod="1000" data-rotate='[ "Learnfi.lk", "Learnfi.lk"]'><span className="wrap">{text}</span></span></h1>
                  <p>
                  "Banana Nexus Game" is an exciting 2D platformer where players control a nimble character navigating through a jungle of bananas. The objective is to collect as many bananas as possible while avoiding obstacles and enemies.collect bananas to level up your score.The game offers fun, fast-paced action and colorful visuals to keep players hooked!et ready for an addictive, action-packed journey through the Banana Nexus!"
                  </p>
                  <button style={{ fontSize: "30px", color:"#f9ca24" }} onClick={startGame}>
                    Start Game <ArrowRightCircle size={35} />
                  </button>
                  <button style={{ fontSize: "30px", color:"#95a5a6" }}  onClick={logoutHandler}>
                  Logout <BoxArrowRight size={35} />
                 </button>
                </div>
              )}
            </TrackVisibility>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <TrackVisibility>
              {({ isVisible }) => (
                <div
                  className={
                    isVisible ? "animate__animated animate__zoomIn" : ""
                  }
                >
                  <img src={headerImg} alt="Header Img" />
                </div>
              )}
            </TrackVisibility>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
