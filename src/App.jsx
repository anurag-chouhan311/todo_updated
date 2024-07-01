import { useEffect, useState } from "react";
import "./App.css";
import Data from "./Data";

function App() {
  const [userName, setUsername] = useState("");
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [price, setPrice] = useState("");
  const [allTodo, setAllTodo] = useState([]);
  const [currentEdit, setCurrentEdit] = useState(-1);
  const [editedData, setEditedData] = useState("");

  const handleAdd = () => {
    if (
      userName === "" ||
      bookName === "" ||
      authorName === "" ||
      price === ""
    ) {
      alert("please fill all the fields");
      return false;
    }
    let data = {
      userName,
      bookName,
      authorName,
      price,
    };
    let finalOutcome = [...allTodo];
    finalOutcome.push(data);
    setAllTodo(finalOutcome);

    localStorage.setItem("todolist", JSON.stringify(finalOutcome));

    setUsername("");
    setBookName("");
    setAuthorName("");
    setPrice("");
  };

  const handleDelete = (index) => {
    let dlt = [...allTodo];
    dlt.splice(index, 1);
    localStorage.setItem("todolist", JSON.stringify(dlt));
    setAllTodo(dlt);
  };

  const handleEdit = (item, index) => {
    setCurrentEdit(index);
    setEditedData(item);
  };

  const handleEditUserName = (value) => {
    setEditedData((prev) => {
      return { ...prev, userName: value };
    });
  };
  const handleEditBookName = (value) => {
    setEditedData((prev) => {
      return { ...prev, bookName: value };
    });
  };
  const handleEditAuthorName = (value) => {
    setEditedData((prev) => {
      return { ...prev, authorName: value };
    });
  };
  const handleEditPrice = (value) => {
    setEditedData((prev) => {
      return { ...prev, price: value };
    });
  };

  const handleUpdate = () => {
    let newtodo = [...allTodo];
    newtodo[currentEdit] = editedData;
    setAllTodo(newtodo);
    // console.log(allTodo)
    if (currentEdit != -1) {
      localStorage.setItem("todolist", JSON.stringify(newtodo));
    }
    setCurrentEdit(-1);
  };

  const handlePrev = (item) => {
    alert(
      item.userName +
        " " +
        item.bookName +
        " " +
        item.authorName +
        " " +
        item.price
    );
  };

  useEffect(() => {
    let saved = JSON.parse(localStorage.getItem("todolist"));
    if (saved) {
      setAllTodo(saved);
    }
  }, []);
  return (
    <>
      <div className="container">
        <h1>ToDO List</h1>
        <div className="todo-wrapper">
          <div className="todo-input">
            <label className="label">Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="todo-input">
            <label className="label">Book Name</label>
            <input
              type="text"
              value={bookName}
              onChange={(e) => setBookName(e.target.value)}
            />
          </div>
          <div className="todo-input">
            <label className="label">Author Name</label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
            />
          </div>
          <div className="todo-input">
            <label className="label">Price</label>
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="todo-input">
            <button onClick={handleAdd}>Add</button>
          </div>
        </div>

        {allTodo.length !== 0 &&
          allTodo.map((item, index) => {
            if (currentEdit === index) {
              return (
                <div key={index} className="todo-display-update">
                  <input
                    type="text"
                    value={editedData.userName}
                    onChange={(e) => handleEditUserName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedData.bookName}
                    onChange={(e) => handleEditBookName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedData.authorName}
                    onChange={(e) => handleEditAuthorName(e.target.value)}
                  />
                  <input
                    type="text"
                    value={editedData.price}
                    onChange={(e) => handleEditPrice(e.target.value)}
                  />
                  <button onClick={handleUpdate}>update</button>
                </div>
              );
            } else {
              return (
                <div key={index} className="todo-display">
                  <h4>{item.userName}</h4>
                  <h4>{item.bookName}</h4>
                  <h4>{item.authorName}</h4>
                  <h4>{item.price}</h4>
                  <button onClick={() => handleDelete(index)}>Dlt</button>
                  <button onClick={() => handleEdit(item, index)}>Edit</button>
                  <button onClick={() => handlePrev(item, index)}>Prev</button>
                </div>
              );
            }
          })}
      </div>
    </>
  );
}

export default App;
