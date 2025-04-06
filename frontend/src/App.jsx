import { useEffect, useState } from "react";

import "./App.css";
import axios from "axios";
const apiUrl = import.meta.env.VITE_API_URL;

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState({ title: "", description: "" });

  const addTask = async (e) => {
    e.preventDefault();
    try {
      console.log(task);
      const { data } = await axios.post(apiUrl, task);
      task.title = "";
      task.description = "";
      console.log(data);

      getAllTasks();
    } catch (error) {
      console.error(error.message || error.response.data);
    }
  };

  const getAllTasks = async () => {
    try {
      const { data } = await axios(apiUrl);
      console.log(data.tasks);

      setTasks(data.tasks);
    } catch (error) {
      console.error(error.message || error.response.data);
    }
  };

  const updateHandler = async (status, _id) => {
    try {
      const updatedTask = await axios.put(`${apiUrl}${_id}`, { status });
      console.log(updatedTask.data);

      getAllTasks();
    } catch (error) {
      alert(error.response.data);
    }
  };

  const deleteHandler = async (_id) => {
    try {
      const deletedTask = await axios.delete(`${apiUrl}${_id}`);
      console.log(deletedTask.data);

      getAllTasks();
    } catch (error) {
      console.log(error.response);
      console.error(error.message || error.response.data);
    }
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  return (
    <main className="bg-green-200 w-full h-full">
      <form
        onSubmit={addTask}
        className="text-center bg-blue-300 py-3 rounded-lg"
      >
        <input
          type="text"
          placeholder="Title ...."
          className="p-2 m-2 w-1/2 rounded-md"
          name="title"
          required
          value={task.title}
          onChange={(e) => setTask({ ...task, title: e.target.value })}
        />
        <textarea
          placeholder="Description ..."
          className="p-2 m-2 w-1/2 rounded-md"
          name="description"
          required
          value={task.description}
          onChange={(e) => setTask({ ...task, description: e.target.value })}
        />
        <br />
        <button type="submit" className="bg-blue-500 p-2 rounded-md">
          Add Task
        </button>
      </form>
      <h1 className="text-center py-5 font-extrabold">
        Task Manager (Total Task: {tasks.length})
      </h1>
      <table className="table  m-auto ">
        <thead>
          <tr className="">
            <th>Sr No</th>
            <th border border-black>
              ID
            </th>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>

            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task, i) => (
            <tr key={task._id}>
              <td>{i + 1}</td>
              <td>{task._id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>

              <td>
                <select
                  defaultValue={task.status}
                  onChange={(e) => updateHandler(e.target.value, task._id)}
                  className={
                    task.status === "pending"
                      ? "bg-red-500 p-5 rounded-lg"
                      : "bg-green-500 p-5 rounded-lg"
                  }
                >
                  <option name="" value="pending">
                    pending
                  </option>
                  <option name="" value="done">
                    done
                  </option>
                </select>
              </td>
              <td className="p-2">
                <button
                  className="bg-red-700 rounded-md p-2"
                  onClick={() => deleteHandler(task._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default App;
