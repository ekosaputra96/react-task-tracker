import { FaTimes, FaEdit } from "react-icons/fa";

const Task = ({ task, onDelete, onToggle, onEdit }) => {
  return (
    <div
      className={`task ${task.reminder ? "reminder" : ""}`}
      onDoubleClick={() => onToggle(task.id)}
    >
      <h3>
        {task.text}{" "}
        <div>
          <FaTimes
            style={{ color: "red", cursor: "pointer", marginRight: "2px" }}
            onClick={() => onDelete(task.id)}
          />
          <FaEdit
            style={{ color: "green", cursor: "pointer", marginLeft: "2px" }}
            onClick={() => onEdit(task.id)}
          />
        </div>
      </h3>
      <p>{task.day}</p>
    </div>
  );
};

export default Task;
