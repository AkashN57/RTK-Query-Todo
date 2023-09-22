import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";

import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "../api/apiSlice";

function TodoList() {
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({userId:1,title:newTodo,completed:false})
    setNewTodo("");
  };
  const { data: todos, isLoading, isError, isSuccess } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

  const newItem = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new todo item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );

  let content;
  if (isLoading) {
    content = <p>{isLoading}</p>;
  } else if (isSuccess) {
   content = todos.map((todo)=>{
    return (
      <article key={todo.id}>
          <div className="todo">
              <input
                  type="checkbox"
                  checked={todo.completed}
                  id={todo.id}
                  onChange={() => updateTodo({ ...todo, completed: !todo.completed })}
              />
              <label htmlFor={todo.id}>{todo.title}</label>
          </div>
          <button className="trash" onClick={() => deleteTodo({ id: todo.id })}>
              <FontAwesomeIcon icon={faTrash} />
          </button>
      </article>
  )
   })
  } else if (isError) {
    content = <p>{isError}</p>;
  }

  return (
    <main>
      <h1>Todo List</h1>
      {newItem}
      {content}
    </main>
  );
}

export default TodoList;
