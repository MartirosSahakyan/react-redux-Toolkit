import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTodos } from "../../service/service";

export const asyncGetTodos = createAsyncThunk(
    "todo/getTodos", 
    async () => {
        
       return fetchTodos()
});

const initialState = {
  todos: [
    // {
    //     "id": 1,
    //     "title": "delectus aut autem",
    //     "completed": false
    //   },
  ],
  inputValue: "",
  loading: false,
  error: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state) => {
      state.todos.push({
        id: Date.now(),
        title: state.inputValue,
        completed: false,
      });
      state.inputValue = "";
    },

    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    handleInputValue: (state, action) => {
      state.inputValue = action.payload;
    },

},
extraReducers: (builder) => {
  builder
    .addCase(asyncGetTodos.pending, (state) => {
      state.loading = true;
    })
    .addCase(asyncGetTodos.fulfilled, (state, action) => {
      state.loading = false;
      state.todos.push(action.payload);
    })
    .addCase(asyncGetTodos.rejected, (state, action) => {
      state.loading = false;
      state.state = action.payload;
    });
},
});

export const todoSelector = (state) => state.todo;

export const { addTodo, deleteTodo, handleInputValue } = todoSlice.actions;

export default todoSlice.reducer;
