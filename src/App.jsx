import { useState } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 0, content: "123" },
    { id: 1, content: "코딩 공부하기" },
    { id: 2, content: "잠 자기" },
  ]);

  return (
    <>
      <div className="todo-box">
        <h1 className="title">TodoList</h1>
        <TodoList todoList={todoList} setTodoList={setTodoList} />
        <TodoInput todoList={todoList} setTodoList={setTodoList} />
      </div>
    </>
  );
}

function TodoInput({ todoList, setTodoList }) {
  const [inputValue, setInputValue] = useState("");

  return (
    <>
      <div className="add-box">
        <input
          className="add-inp"
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
        />
        <button
          className="btn add-btn"
          onClick={() => {
            const newTodo = { id: Number(new Date()), content: inputValue };
            const newTodoList = [...todoList, newTodo];
            setTodoList(newTodoList);
            setInputValue("");
          }}
        >
          추가하기
        </button>
      </div>
    </>
  );
}

function TodoList({ todoList, setTodoList }) {
  return (
    <ul className="todo-list">
      {todoList.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodoList={setTodoList} />
      ))}
    </ul>
  );
}

function Todo({ todo, setTodoList }) {
  const [inputValue, setInputValue] = useState("");
  const [inputStatus, setInputStatus] = useState(false);
  return (
    <li>
      <div className="text-box">
        <input type="checkbox" name="checkbox" id={`check${todo.id}`} className="complete-check" />
        <label htmlFor={`check${todo.id}`} className="todo-content">{todo.content}</label>
        
        {
          inputStatus && 
          <input
            type="text"
            className="edit-inp"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        }
      </div>
      
      <div className="btn-box">
        {
          !inputStatus && 
          <button
            className="btn edit-btn"
            onClick={() => {
              setInputStatus(true)
            }}
          >
            수정
          </button>
        }
        {
          inputStatus && 
          <button
            className="btn complete-btn"
            onClick={() => {
              if (inputValue !== '') {
                setInputStatus(false)
                setTodoList((prev) =>
                  prev.map((el) =>
                    el.id === todo.id ? { ...el, content: inputValue } : el
                  )
                );
                setInputValue('');
              } else {
                alert('수정 내용을 입력하세요.');
              }
            }}
          >
            완료
          </button>
        }
        <button
          className="btn del-btn"
          onClick={() => {
            setTodoList((prev) => {
              return prev.filter((el) => el.id !== todo.id);
            });
          }}
        >
          삭제
        </button>
      </div>
    </li>
  );
}

export default App;
