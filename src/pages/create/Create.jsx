import { useState, useRef } from "react";
import { useCollection } from "../../hooks/useCollections";
import Avatar from "../../components/Avatar";
import "./Create.css";
import AssignUsers from "../../components/AssignUsers";
import Modal from "../../components/Modal";

function Create() {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef();
  const { data, error, isPending } = useCollection("users");
  const handleAssignTo = (e) => {
    const selectedUser = data.find((u) => u.id === e.target.value);

    //  only add user if not already added
    if (
      assignedUsers &&
      !assignedUsers.some((user) => user.id === selectedUser.id)
    ) {
      setAssignedUsers((prevUsers) =>
        setAssignedUsers([...prevUsers, selectedUser])
      );
    }
    console.log(selectedUser);
  };

  const handleModal = (e) => {
    console.log(e);
    setShowModal(false);
    // console.log(e);
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
            <Modal type='no-style' onClose={handleModal}>
              <AssignUsers />
            </Modal>
          )}
          <ul className='assigned-list'>
            {assignedUsers &&
              assignedUsers.length > 0 &&
              assignedUsers.map((user) => (
                <li key={user.id}>
                  <Avatar src={user.photoURL} />
                  <span>{user.displayName}</span>
                </li>
              ))}
            <li className='assign-user-icon' onClick={() => setShowModal(true)}>
              +
            </li>
          </ul>
        </label>
      </form>
    </div>
  );
}

export default Create;
