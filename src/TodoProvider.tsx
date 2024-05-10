import React, { createContext, useContext, useReducer } from "react";
import { Todo, TodoAction, TodoContextType } from "./types";

const initialContext: TodoContextType = {
  todos: {},
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
};

const TodoContext = createContext<TodoContextType>(initialContext);

export const useTodos = (): TodoContextType => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodo must be in TodoProvider");
  }

  return context;
};

const todoReducer = (state: Record<number, Todo>, action: TodoAction) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          completed: false,
        },
      };
    case "REMOVE_TODO": {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case "TOGGLE_TODO":
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          completed: !state[action.payload].completed,
        },
      };
  }
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(todoReducer, {});

  const addTodo = (text: string) => {
    const id = Date.now();
    dispatch({
      type: "ADD_TODO",
      payload: {
        id,
        text,
        completed: false,
      },
    });
  };

  const removeTodo = (id: number) => {
    dispatch({
      type: "REMOVE_TODO",
      payload: id,
    });
  };

  const toggleTodo = (id: number) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: id,
    });
  };

  const value = {
    todos: state,
    addTodo,
    removeTodo,
    toggleTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
