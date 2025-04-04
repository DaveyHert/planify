import { Link } from "react-router-dom";
import "./Home.css";
import ManMemoji from "../../assets/man-memoji.svg";
import LadyMemoji from "../../assets/lady-memoji.svg";
import Navbar from "../../components/Navbar";
import RightArror from "../../assets/right-arrow.svg";
import Lappy from "../../assets/lappy.svg";
import MemojiIconDeck from "../../components/MemojiIconDeck";
import IphoneIcon from "../../assets/iphone-15.svg";
import IosStore from "../../assets/ios-store.svg";

function Home() {
  return (
    <div className='home'>
      <Navbar />
      <div className='content'>
        <h1 className='hero-title'>
          <span>
            Manage your
            <div className='img-wrapper'>
              <img src={ManMemoji} />
            </div>
            <div className='img-wrapper'>
              <img src={LadyMemoji} />
            </div>
            project.
          </span>
          <span>Anywhere. Anytime.</span>
        </h1>
        <p className='hero-sub-title'>
          Planify is a simple app for managing your personal project. It's free,
          it's simple, and fully collaborative!
        </p>
        <div className='try-out'>
          <p>
            Let's create magic. <span>Try it out for free</span>
          </p>
          <Link to='/sign-up'>
            <img src={RightArror} />
          </Link>
        </div>
        <div className='hero-card'>
          <div className='left-card'>
            <div className='content-column'>
              <div className='img-wrapper'>
                <img src={Lappy} />
              </div>
              <p>
                Work together to create, manage, and work on personal projects.
              </p>
            </div>
            <div className='content-column'>
              <h3>12+</h3>
              <p>Assign tasks and chat with collaborators.</p>
              <div className='buttons'>
                <span>Designer</span>
                <span>Dev</span>
                <span>PM</span>
              </div>
            </div>
            <div className='content-column'>
              <h3>200+</h3>
              <p>Create as many personal project as needed.</p>
              <MemojiIconDeck />
            </div>
          </div>
          <div className='right-card'>
            <div className='text-content'>
              <a href='#'>
                <img src={IosStore} />
                Also on Mobile
              </a>
              <h3>
                4.9
                <sup>★</sup>
              </h3>
              <p> Explore our app experience on</p>
            </div>
            <img className='mockup' src={IphoneIcon} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
