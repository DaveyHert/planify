import styles from "./ProgressIcon.module.css";
import ActivityIcon from "../assets/progress-activity.svg";

function ProgressIcon() {
  return <img src={ActivityIcon} className={styles.icon}></img>;
}

export default ProgressIcon;
