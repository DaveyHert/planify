import { useRef, useState, useEffect } from "react";
import CustomSelectDropdown from "../../components/CustomSelectDropdown";
import CustomDatePicker from "../../components/CustomDatePicker";
import AssignUsers from "../../components/AssignUsers";
import ErrorToast from "../../components/ErrorToast";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import "./Create.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { createTimeStamp } from "../../firebase/config";
import { useAddDocument } from "../../hooks/useAddDocument";
import ProgressIcon from "../../components/ProgressIcon";
import { useNavigate } from "react-router-dom";

// categories
const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
];

// create component
function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formError, setFormError] = useState(null);
  const [showError, setShowError] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const { user } = useAuthContext(); // get current user
  const { addItem, isPending, error, response } = useAddDocument("projects");

  // Assigns project to users
  const assignToUser = (user) => {
    if (!assignedUsers.some((u) => u.id === user.id)) {
      setAssignedUsers((prevUsers) => [...prevUsers, user]);
    } // prevent duplicate

    closeModal();
  };

  // handle delete
  const handleRemoveUser = (user) => {
    setAssignedUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
  };

  // close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // handle category selection
  const handleSumit = (e) => {
    e.preventDefault();

    setFormError(null);
    if (!validateForm()) return; //validate each form input

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    // create and upload project data
    const projectData = {
      name,
      details,
      category,
      assignedUsers,
      createdBy,
      comments: [],
      dueDate: createTimeStamp.fromDate(new Date(dueDate)),
      createdAt: createTimeStamp.now(),
    };

    addItem(projectData);
  };

  // handle form validation on submit
  const validateForm = () => {
    if (!formRef.current[0].value) {
      setFormError("Title required!");
      return formRef.current[0].focus();
    }
    if (!formRef.current[1].value) {
      setFormError("Project details required!");
      return formRef.current[1].focus();
    }
    if (!category) {
      setFormError("Project category required!");
      return formRef.current[2].focus();
    }
    if (!dueDate) {
      setFormError("Set project due date!");
      return formRef.current.querySelector(".date-input").click();
    }
    if (assignedUsers.length === 0) {
      setFormError("Assign at least one user");
      formRef.current
        .querySelector(".assign-user-icon")
        .classList.add("active");
      return;
    }

    return true;
  };

  // handle error toast
  useEffect(() => {
    if (formError || error) {
      setShowError(true);
      let timer = setTimeout(() => {
        setShowError(false);
        setFormError(null);
      }, 3000);

      return () => clearTimeout(timer); // cleanup timer on unmount
    }

    if (response) {
      navigate("/");
    }
  }, [formError, error, response]);

  return (
    <div className="create-form">
      <h2 className="page-title">Create a new project</h2>

      <form onSubmit={handleSumit} ref={formRef}>
        <label>
          <span>Project name:</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            type="text"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </label>

        <div className="select-options">
          <span>Project category:</span> {/* custom made select dropdown */}
          <CustomSelectDropdown
            options={categories}
            onOptChange={(option) => setCategory(option)}
          />
        </div>

        <div className="date-picker">
          <span>Set due date:</span>
          <CustomDatePicker
            value={dueDate}
            onChange={setDueDate}
            placeholder="Select due date"
          />
        </div>

        <label>
          <span>Assign to:</span>
          {showModal && (
            <Modal type="no-style" onClose={closeModal}>
              <AssignUsers
                handleAssignToUser={assignToUser}
                closeModal={closeModal}
              />
            </Modal>
          )}

          <ul className="assigned-list">
            {assignedUsers &&
              assignedUsers.map((user) => (
                <li key={user.id} data-user-name={user.displayName}>
                  <Avatar src={user.photoURL} />
                  <span
                    className="delete"
                    title="remove"
                    onClick={() => handleRemoveUser(user)}
                  >
                    -
                  </span>
                </li>
              ))}

            <li
              className={`assign-user-icon ${showModal ? "active" : ""}`}
              onClick={() => setShowModal(true)}
            >
              +
            </li>
          </ul>
        </label>

        <button className="btn">Add Project</button>
      </form>
      {formError && showError && <ErrorToast message={formError} />}
      {isPending && <ProgressIcon />}
      {error && showError && <ErrorToast message={error} />}
    </div>
  );
}

export default Create;
