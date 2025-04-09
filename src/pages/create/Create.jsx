import { useRef, useState, useEffect } from "react";
import AssignUsers from "../../components/AssignUsers";
import CustomSelectDropdown from "../../components/CustomSelectDropdown";
import CustomDatePicker from "../../components/CustomDatePicker";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import "./Create.css";
import ErrorToast from "../../components/ErrorToast";
import CustomDate from "../../components/CustomDate";

const categories = [
  { value: "development", label: "Development" },
  { value: "design", label: "Design" },
  { value: "sales", label: "Sales" },
  { value: "Marketing", label: "Marketing" },
];

function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const assignUsersRef = useRef();
  const formRef = useRef();

  // Assigns project to users
  const assignToUser = (user) => {
    // prevent duplicate
    if (!assignedUsers.some((u) => u.id === user.id)) {
      setAssignedUsers((prevUsers) => [...prevUsers, user]);
    }
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
    setError(null);

    const valid = validateInput();
    if (!valid) return;

    const projectData = {
      name,
      details,
      category,
      dueDate,
      assignedUsers,
    };
    console.log(projectData);
  };

  const validateInput = () => {
    if (!formRef.current[0].value) {
      setError("Title required!");
      return formRef.current[0].focus();
    }
    if (!formRef.current[1].value) {
      setError("Project details required!");
      return formRef.current[1].focus();
    }
    if (!category) {
      setError("Project category required!");
      return formRef.current[2].focus();
    }
    if (!dueDate) {
      setError("Set project due date!");
      return formRef.current[3].focus();
    }
    if (assignedUsers.length === 0) {
      setError("At least one user must be assigned");
      assignUsersRef.current.classList.add("active");
      return;
    }

    return "passed";
  };

  // handle error toast
  useEffect(() => {
    if (error) {
      setShowError(true);
      let timer = setTimeout(() => {
        setShowError(false);
        setError(null);
      }, 3000);

      return () => clearTimeout(timer); // cleanup timer on unmount
    }
  }, [error]);

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
            placeholder="Select due date"
            selectedDate={dueDate}
            onDateChange={setDueDate}
          />
        </div>
        <div className="date-picker">
          <span>Set due date:</span>
          <CustomDate
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
              ref={assignUsersRef}
            >
              +
            </li>
          </ul>
        </label>

        <button className="btn">Add Project</button>
      </form>
      {showError && <ErrorToast message={error} />}
    </div>
  );
}

export default Create;
