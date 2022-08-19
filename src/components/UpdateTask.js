import { useState, useEffect } from "react";
import moment from "moment";

const UpdateTask = ({ data, onUpdate }) => {
  const {
    id: idData,
    day: dayData,
    text: textData,
    reminder: reminderData,
  } = data;
  const getDay = moment(dayData).format("YYYY-MM-DD");
  const getTime = moment(dayData).format("HH:mm");
  const [id, setId] = useState(idData);
  const [text, setText] = useState(textData);
  const [day, setDay] = useState(getDay);
  const [time, setTime] = useState(getTime);
  const [reminder, setReminder] = useState(reminderData);

  useEffect(() => {
    setText(textData);
    setDay(getDay);
    setReminder(reminderData);
    setTime(getTime);
    setId(idData);
  }, [textData, getDay, reminderData, idData, getTime]);
  const onSubmit = (e) => {
    e.preventDefault();
    if (!text) {
      alert("Please add a task");
      return;
    }
    if (!day) {
      alert("Please add day");
      return;
    }
    if (!time) {
      alert("Please add time");
    }
    const timeFormat = new Date(day + " " + time);
    onUpdate({
      id,
      text,
      day: moment(timeFormat).format("dddd, MMMM Do YYYY"),
      isoDay: timeFormat.toISOString(),
      reminder,
    });
    setText("");
    setReminder(false);
    setDay("");
    setTime("");
    setId("");
  };
  return (
    <form action="" className="add-form" onSubmit={onSubmit}>
      <div className="form-control">
        <input type="hidden" name="id" value={id} />
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
        <label htmlFor="daytime">Day</label>
        <input
          type="date"
          name="daytime"
          id="daytime"
          placeholder="Add Day & Time...."
          value={day}
          onChange={(e) => setDay(e.target.value)}
        />
      </div>
      <div className="form-control">
        <label htmlFor="daytime">Time</label>
        <input
          type="time"
          name="daytime"
          id="daytime"
          placeholder="Add Day & Time...."
          value={time}
          onChange={(e) => setTime(e.target.value)}
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
      <input type="submit" value="Update Task" className="btn btn-block" />
    </form>
  );
};

export default UpdateTask;
