import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);

  // fetch all tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks/", {
      method: "GET",
    });
    const data = await res.json();
    return data;
  };

  // fetch a task with id

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "GET",
    });
    const data = await res.json();
    return data;
  };

  // delete a task
  const onDelete = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // set a reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  // add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAddToggle={() => setShowAddTask(!showAddTask)}
          showAdd={showAddTask}
        />
        <Route
          path="/"
          exact
          render={() => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={onDelete}
                  onToggle={toggleReminder}
                />
              ) : (
                "No Task To Show"
              )}
            </>
          )}
        />
        <Route exact path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
