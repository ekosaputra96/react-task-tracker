import { useState } from "react";

const AddTask = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }
    if (!day) {
      alert("Please add day and time");
      return;
    }
    onAdd({ text, day, reminder });
    setText("");
    setReminder(false);
    setDay("");
  };
  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <label htmlFor="task">Task</label>
        <input
          type="text"
          name="task"
          id="task"
          placeholder="Add Task..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="daytime">Day & Time</label>
        <input
          type="text"
          name="daytime"
          id="daytime"
          placeholder="Add Day & Time..."
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control form-control-check">
        <label htmlFor="reminder">Set Reminder</label>
        <input
          type="checkbox"
          name="reminder"
          id="reminder"
          checked={reminder}
          value={reminder}
          onChange={(e) => {
            setReminder(e.target.checked);
          }}
        />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  );
};

export default AddTask;
