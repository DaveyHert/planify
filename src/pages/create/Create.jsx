import { useRef, useState } from "react";
import AssignUsers from "../../components/AssignUsers";
import CustomSelectDropdown from "../../components/CustomSelectDropdown";
import CustomDatePicker from "../../components/CustomDatePicker";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import "./Create.css";
import Select from "react-select";
import ErrorToast

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
  const formRef = useRef();
  const [error, setError] = useState(null);

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
    console.log(formRef);
    validateInput();
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
      formRef.current[0].style.outline = "unset";
      return formRef.current[0].focus();
    }
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>

      <form onSubmit={handleSumit} ref={formRef}>
        <label>
          <span>Project name:</span>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            type='text'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            required
          ></textarea>
        </label>

        <div className='select-options'>
          <span>Project category:</span> {/* custom made select dropdown */}
          {/* <CustomSelectDropdown
            options={categories}
            onOptChange={(option) => setCategory(option)}
          /> */}
          <Select
            options={categories}
            onChange={(option) => setCategory(option)}
          />
        </div>

        <div className='date-picker'>
          <span>Set due date:</span>
          <CustomDatePicker
            placeholder='Select due date'
            selectedDate={dueDate}
            onDateChange={setDueDate}
          />
        </div>

        <label>
          <span>Assign to:</span>
          {showModal && (
            <Modal type='no-style' onClose={closeModal}>
              <AssignUsers
                handleAssignToUser={assignToUser}
                closeModal={closeModal}
              />
            </Modal>
          )}

          <ul className='assigned-list'>
            {assignedUsers &&
              assignedUsers.map((user) => (
                <li key={user.id} data-user-name={user.displayName}>
                  <Avatar src={user.photoURL} />
                  <span
                    className='delete'
                    title='remove'
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

        <button className='btn'>Add Project</button>
      </form>
    </div>
  );
}

export default Create;
