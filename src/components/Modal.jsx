import { useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./Modal.css"; // Optional: for modal-specific styles

const Modal = ({ children, onClose, type }) => {
  const modalRef = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      // guard against unwanted clicks
      if (!e.target.classList.contains("modal-overlay")) return;

      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      } // close modal only if target clicked isn't modals content/children
    };
    document.addEventListener("mousedown", handleClickOutside);

    // cleanup to remove eventlistener once modal is closed
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // injects modal in the root index.html where id="portal-root"
  return ReactDOM.createPortal(
    <div className='modal-overlay'>
      <div className={`modal-content ${type}`} ref={modalRef}>
        {children}
      </div>
    </div>,
    document.getElementById("portal-root")
  );
};

export default Modal;
