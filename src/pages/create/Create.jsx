import { useState } from "react";
import AssignUsers from "../../components/AssignUsers";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import "./Create.css";

function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Assigns project to users
  const assignToUser = (user) => {
    // check if user is already added
    if (!assignedUsers.some((u) => u.id === user.id)) {
      setAssignedUsers((prevUsers) => [...prevUsers, user]);
    }
    closeModal();
  };

  // close modal
  const closeModal = () => {
    setShowModal(false);
  };

  // handle delete
  const handleDelete = (user) => {
    setAssignedUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
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

        <label>
          <span>Project category:</span>
          <select
            name='category'
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value='none'>None</option>
            <option value='frontend'>Frontend</option>
            <option value='backend'>Backend</option>
            <option value='design'>Design</option>
            <option value='project-management'>Project Management</option>
          </select>
        </label>

        <label>
          <span>Set due date:</span>
          <input
            type='date'
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

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
                    onClick={() => handleDelete(user)}
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
