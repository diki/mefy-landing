import React, { useState } from "react";
import { useTodos } from "./TodoProvider";

const MyTodoApp: React.FC = () => {
  const { todos, addTodo, removeTodo, toggleTodo } = useTodos();

  const [newTask, setNewTask] = useState("");

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTodo(newTask);
      setNewTask("");
    }
  };

  return (
    <>
      <input
        type="text"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        placeholder="Add a new task..."
      />
      <button onClick={handleAddTask}>My Add task</button>
      <ul>
        {Object.entries(todos).map(([key, value]) => {
          return (
            <li key={key}>
              <input
                type="checkbox"
                checked={value.completed}
                onChange={() => toggleTodo(value.id)}
              />
              <div
                style={{
                  textDecoration: value.completed ? "line-through" : "none",
                }}
              >
                {value.text}
              </div>
              <button onClick={() => removeTodo(value.id)}>Delete todo</button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default MyTodoApp;
