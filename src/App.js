import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import UpdateTask from "./components/UpdateTask";
import Footer from "./components/Footer";
import About from "./components/About";
import Register from "./components/Register";
import Login from "./components/Login";
import User from "./components/User";
import axios from "axios";
import Button from "./components/Button";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [showUpdateTask, setshowUpdateTask] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [updateTask, setUpdateTask] = useState("");
  const [user, setUser] = useState("");

  useEffect(() => {
    if (user !== "") {
      fetchAlltasks(user.token);
    }
  }, [user]);

  const fetchAlltasks = async (token) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_TODOS_LIST_API}/todos`,
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
      if (data.data) {
        setTasks(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // get a task
  const fetchTask = async (id) => {
    try {
      const data = await axios.get(
        `${process.env.REACT_APP_TODOS_LIST_API}/todos/${id}`,
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      return data.data.data;
    } catch (error) {
      console.log(error);
    }
  };

  // delete a task
  const onDelete = async (id) => {
    await axios.delete(`${process.env.REACT_APP_TODOS_LIST_API}/todos/${id}`, {
      headers: { authorization: `Bearer ${user.token}` },
    });
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // set a reminder
  const toggleReminder = async (id) => {
    try {
      const taskToToggle = await fetchTask(id);
      if (taskToToggle) {
        const updToggle = !taskToToggle.reminder;
        const updReminder = await axios.put(
          `${process.env.REACT_APP_TODOS_LIST_API}/todos/reminder/${id}`,
          {
            reminder: updToggle,
          },
          {
            headers: { authorization: `Bearer ${user.token}` },
          }
        );
        setTasks(
          tasks.map((task) =>
            task.id === id
              ? { ...task, reminder: updReminder.data.data.reminder }
              : task
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  // add Task
  const addTask = async (addTask) => {
    const { data } = await axios.post(
      `${process.env.REACT_APP_TODOS_LIST_API}/todos`,
      {
        todo: addTask.text,
        createdAt: addTask.day,
        reminder: addTask.reminder,
      },
      {
        headers: { authorization: `Bearer ${user.token}` },
      }
    );
    if (tasks === "No Todos") {
      return setTasks([
        {
          id: data.data.id,
          day: data.data.updatedAt,
          text: data.data.todo,
          reminder: data.data.reminder,
        },
      ]);
    }
    setTasks([
      ...tasks,
      {
        id: data.data.id,
        day: data.data.updatedAt,
        text: data.data.todo,
        reminder: data.data.reminder,
      },
    ]);
  };

  // edit a task
  const editTask = async (id) => {
    const res = await axios.get(
      `${process.env.REACT_APP_TODOS_LIST_API}/todos/${id}`,
      {
        headers: { authorization: `Bearer ${user.token}` },
      }
    );
    if (res) {
      setshowUpdateTask(true);
      setShowAddTask(false);
      const oldTask = {
        id: res.data.data._id,
        day: res.data.data.updatedAt,
        text: res.data.data.todo,
        reminder: res.data.data.reminder,
      };
      setUpdateTask(oldTask);
    }
  };

  // update task
  const updHandler = async (updTask) => {
    const { id, text, day, reminder, isoDay } = updTask;
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_TODOS_LIST_API}/todos/${id}`,
        {
          todo: text,
          updatedAt: isoDay,
          reminder,
        },
        {
          headers: { authorization: `Bearer ${user.token}` },
        }
      );
      if (res) {
        setTasks(
          tasks.map((task) =>
            task.id === id ? { ...task, reminder, text, day } : task
          )
        );
        setshowUpdateTask(!showUpdateTask);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const login = (user) => {
    setUser(user);
  };

  return (
    <Router>
      <div className="container">
        <Header
          onAddToggle={() => {
            setShowAddTask(!showAddTask);
          }}
          showAdd={showAddTask}
        />
        {user && <User user={user.name} />}
        <Route path="/" exact render={() => <>{<Register />}</>} />
        <Route
          path="/login"
          exact
          render={() => <>{<Login setToken={login} />}</>}
        />
        {user ? (
          <Route
            path="/todos"
            exact
            render={() => (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {showUpdateTask && (
                  <UpdateTask data={updateTask} onUpdate={updHandler} />
                )}
                {tasks.length !== 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={onDelete}
                    onToggle={toggleReminder}
                    onEdit={editTask}
                  />
                ) : (
                  "No Task To Show"
                )}
                <br />
                <Button
                  color={"red"}
                  text={"Logout"}
                  teken={() => {
                    setUser("");
                    setTasks([]);
                  }}
                />
              </>
            )}
          />
        ) : (
          <Redirect to="/login" />
        )}
        <Route
          exact
          path="/about"
          render={() => (
            <>
              <About isLogin={user} />
            </>
          )}
        />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
