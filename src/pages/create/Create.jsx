import { useState } from "react";
import AssignUsers from "../../components/AssignUsers";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import SelectDropDown from "../../components/Dropdown";
import "./Create.css";
import CustomDatePicker from "../../components/CustomDatePicker";

function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [currentMonth, setCurrentMonth] = useState(() => {
    const today = new Date();
    return new Date(today.getFullYear(), today.getMonth());
  });

  console.log(currentMonth);

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
  const saveCategory = (option) => {
    setCategory(option);
  };

  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new project</h2>

      <form>
        <label>
          <span>Project name:</span>
          <input
            type='text'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          <span>Project details:</span>
          <textarea
            type='text'
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          ></textarea>
        </label>

        <div className='select-options'>
          <span>Project category:</span>{" "}
          <SelectDropDown
            options={["Frontend", "Backend", "Design", "Project management"]}
            category={category}
            saveCategory={saveCategory}
          />
        </div>

        <div className='date-picker'>
          <span>Set due date:</span>
          <CustomDatePicker placeholder='Select due date' />
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
      </form>
    </div>
  );
}

export default Create;
