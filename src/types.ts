export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface TodoContextType {
  todos: Record<number, Todo>;
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

interface AddTaskAction {
  type: "ADD_TODO";
  payload: {
    id: number;
    text: string;
    completed: boolean;
  };
}

interface ToggleTaskAction {
  type: "TOGGLE_TODO";
  payload: number;
}

interface RemoveTaskAction {
  type: "REMOVE_TODO";
  payload: number;
}

// Discriminated union for all possible actions
export type TodoAction = AddTaskAction | ToggleTaskAction | RemoveTaskAction;
