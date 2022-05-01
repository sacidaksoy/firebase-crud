import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todosReducer",
  initialState,
  reducers: {
    setTodo: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      // Adding a new to do
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          todo.name = action.payload.name;
        }
      });
    },
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
  },
});

export const { addTodo, setTodo, updateTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;

// const initialState = {
//   todos: [],
// };

// export const todosReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "SET_TODOS":
//       return {
//         ...state,
//         todos: action.payload,
//       };
//     case "ADD_TODOS":
//       return {
//         ...state,
//         todos: [...state.todos, action.payload],
//       };
//     default:
//       return state;
//   }
// };
