import "./MemojiIconDeck.css";
import Icon1 from "../assets/Icon1.svg";
import Icon2 from "../assets/icon2.svg";
import Icon3 from "../assets/icon3.svg";
import Icon4 from "../assets/icon4.svg";

const MemojiDeck = () => {
  return (
    <div className='icons'>
      <div>
        <img src={Icon1} />
      </div>
      <div>
        <img src={Icon2} />
      </div>
      <div>
        <img src={Icon3} />
      </div>
      <div>
        <img src={Icon4} />
      </div>
    </div>
  );
};

export default MemojiDeck;
