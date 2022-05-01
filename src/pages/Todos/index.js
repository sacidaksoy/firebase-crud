import { useSelector, useDispatch } from "react-redux";
import { ToastContainer } from "react-toastify";

import CustomButton from "../../components/atoms/Button";
import { useNavigate } from "react-router-dom";
import { TodoService } from "../../service";

import "./Todos.scss";
import { useState } from "react";
import {
  addTodo,
  removeTodo,
  setTodo,
  updateTodo,
} from "../../store/reducers/todosReducer";
import { setLoading } from "../../store/reducers/appReducer";

function Todos() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState("");
  const [newUserName, setNewUsername] = useState("");

  const state = useSelector((state) => state);
  const { todosReducer } = state;
  const { appReducer } = state;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  const listTodos = async () => {
    dispatch(setLoading(true));
    try {
      const data = await TodoService.getTodosFirebase();
      dispatch(setTodo(data));
    } catch (error) {
      console.log("error while fetching data", error);
    } finally {
      dispatch(setLoading(false));
      console.log("finally listTodos");
    }
  };

  const createTodo = async (newName, newAge) => {
    dispatch(setLoading(true));
    try {
      const data_id = await TodoService.createTodosFirebase(newName, newAge);
      dispatch(
        addTodo({
          id: data_id,
          name: newName,
          age: newAge,
        })
      );
      console.log(data_id);
    } catch (error) {
      console.log("error while fetching data", error);
    } finally {
      dispatch(setLoading(false));
      setNewAge("");
      setNewName("");
      console.log("finally createTodo");
    }
  };

  console.log(todosReducer.todos);

  const reformTodo = async (id, newUserName) => {
    dispatch(setLoading(true));
    try {
      await TodoService.updateTodosFirebase(id, newUserName);
      dispatch(
        updateTodo({
          id: id,
          name: newUserName,
        })
      );
    } catch (error) {
      console.log("error while fetching data", error);
    } finally {
      dispatch(setLoading(false));
      console.log("finally reformTodo");
    }
  };

  const deleteTodo = async (id) => {
    dispatch(setLoading(true));
    try {
      await TodoService.deleteTodosFirebase(id);
      dispatch(removeTodo({ id: id }));
    } catch (error) {
      console.log("error while fetching data", error);
    } finally {
      dispatch(setLoading(false));
      console.log("finally deleteTodo");
    }
  };

  return (
    <div className="todos">
      <h1>Todos</h1>

      <div className="todos__list">
        <h1>Firebase Init</h1>
        <div className="todos__createInputs">
          <input
            type="text"
            placeholder="Name..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Age..."
            value={newAge}
            onChange={(e) => setNewAge(e.target.value)}
          />
          <CustomButton
            title={"Create User"}
            onClick={() => createTodo(newName, newAge)}
            loading={appReducer.isLoading}
          />
        </div>

        {todosReducer.todos.map((user) => (
          <div key={user.id} className="todos__content">
            <h3>Name : {user.name}</h3>
            <h4>Age : {user.age}</h4>
            <h4>Is Student: {user.isStudent ? "Yes" : "No"}</h4>
            <input
              type="text"
              placeholder="new Username : "
              onChange={(e) => setNewUsername(e.target.value)}
            />
            <button onClick={() => reformTodo(user.id, newUserName)}>
              Update UserName
            </button>
            <button onClick={() => deleteTodo(user.id)}>Delete User</button>
          </div>
        ))}
      </div>
      <div className="todos__bottom">
        <CustomButton title={"Back"} onClick={handleClick} />
        <CustomButton
          title={"List Todos"}
          onClick={listTodos}
          loading={appReducer.isLoading}
          async
        />
        <ToastContainer />
      </div>
    </div>
  );
}

export default Todos;
