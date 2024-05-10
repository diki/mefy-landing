import { createContext, useContext, useReducer } from "react";

interface Todo {
  text: string;
  id: number;
  completed: boolean;
}
interface StateContext {
  todos: Record<number, Todo>;
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const initialContext: StateContext = {
  todos: {},
  addTodo: () => {},
  removeTodo: () => {},
  toggleTodo: () => {},
};

const TodoContext = createContext(initialContext);

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error("useTodos cannot be used outside of TodoContext");
  }

  return context;
};

type AddActionType = {
  type: "ADD_TODO";
  payload: {
    id: number;
    text: string;
  };
};

type DeleteActionType = {
  type: "REMOVE_TODO";
  payload: number;
};

type ToggleActionType = {
  type: "TOGGLE_TODO";
  payload: number;
};

type ActionType = AddActionType | DeleteActionType | ToggleActionType;

const todoReducer = (state: Record<number, Todo>, action: ActionType) => {
  switch (action.type) {
    case "ADD_TODO": {
      return {
        ...state,
        [action.payload.id]: {
          ...action.payload,
          completed: false,
        },
      };
    }
    case "REMOVE_TODO": {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case "TOGGLE_TODO": {
      return {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          completed: !state[action.payload].completed,
        },
      };
    }
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
