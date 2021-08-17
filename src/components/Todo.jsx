import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  asyncGetTodos,
  deleteTodo,
  handleInputValue,
  todoSelector,
} from "../features/todo/todoSlice";

export default function Todo() {
  const dispatch = useDispatch();
  const { todos, inputValue } = useSelector(todoSelector);

  const handleInput = ({ target: { value } }) => {
    dispatch(handleInputValue(value));
  };

  const handleAddTodo = () => {
    dispatch(addTodo());
  };

  const handleDeleteTodo = (id) => () => {
    dispatch(deleteTodo(id));
  };

  const handleShowAsyncTodos = () => {
    dispatch(asyncGetTodos())  
  }
  
  return (
    <>
      <h1>Todo Redux App</h1>
      <button onClick={handleShowAsyncTodos}> get async todos </button>
      <br></br>
      <input value={inputValue} onChange={handleInput} type="text" />
      <button onClick={handleAddTodo}>add todo</button>
      <div>
        {todos.map((todo, index) => {
          return (
            <p key={index}>
              {todo.title}
              <button onClick={handleDeleteTodo(todo.id)}>Delete todo</button>
            </p>
          );
        })}
      </div>
    </>
  );
}
