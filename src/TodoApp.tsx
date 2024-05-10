import React, { useState } from "react";
import { useTodo } from "./TodoProvider";

const TodoApp: React.FC = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodo();
  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTodo(newTask.trim());
      setNewTask("");
    }
  };

  return (
    <div>
      <h1>To-Do App</h1>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask}>Add Task</button>

      <ul>
        {Object.keys(todos).map((key) => {
          const task = todos[parseInt(key)];
          return (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTodo(task.id)}
              />
              <span
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.text}
              </span>
              <button onClick={() => removeTodo(task.id)}>Remove Task</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoApp;
