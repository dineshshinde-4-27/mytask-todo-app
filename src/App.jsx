import { useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const checkBox = useRef(null);
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFineshed] = useState(false);
  useEffect(() => {
    const toDoString = localStorage.getItem("todos");
    if (toDoString) {
      setTodos(JSON.parse(toDoString));
    }
  }, []);

  // Save todos to localStorage whenever `todos` state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // const saveToLS = (params) => {
  // const saveToLS = (params) => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };

  //  handaling saving event
  const handelSave = (e) => {
    if (!todo == "") {
      setTodos([...todos, { id: uuidv4(), todo, isCompeleted: false }]);
    } else {
      alert("You cannot add an empty to-do. Please enter a task...!");
    }
    setTodo("");
    // saveToLS("HandelSave");
  };
  const handelSubmit = (e) => {
    e.preventDefault();
  };
  // handlingEdit Event
  const handelEdit = (e) => {
    let id = e.target.id;
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    let changeTodo;
    todos.filter((i) => {
      if (i.id == id) {
        changeTodo = i.todo;
      }
    });
    setTodo(changeTodo);
    let newTodos = todos.filter((item) => {
      if (item.id !== id) return item;
    });
    setTodos(newTodos);
    // saveToLS("HandelEdid");
  };
  // handaling Delete Event
  const handelDelete = (e) => {
    let id = e.target.name;
    let currentTodo;

    todos.filter((item) => {
      if (item.id == id) {
        currentTodo = item.todo;
        return currentTodo;
      }
      return "";
    });

    let isConfirm = confirm(
      `Are you sure you want to delete the to-do: '${currentTodo}'?`
    );
    if (!isConfirm) {
      return "";
    } else {
      let index = todos.findIndex((item) => {
        return item.id == id;
      });
      let newTodos = [...todos];

      newTodos = newTodos.filter((item) => {
        return item.id !== id;
      });
      setTodos(newTodos);
    }
    // saveToLS("HandelDelete");
  };
  const handelChange = (e) => {
    setTodo(e.target.value);
  };

  // handle check
  const handelCheckBox = (e) => {
    // to get the id
    let id = e.target.name;
    //  to get the currect todo
    let currentTodo;
    todos.filter((item) => {
      if (item.id == id) {
        currentTodo = item.todo;
        return currentTodo;
      }
      return "";
    });
    //  setting Confermation  is it complete or not
    let isConfirm = confirm(`Have you completed the to-do: '${currentTodo}'?`);
    // refrencing the array through new todo
    let newTodos = [...todos];
    // to get the index of current todo
    let index = todos.findIndex((item) => {
      return item.id == id;
    });
    // geting the congin ot of the iscomplited
    let isCompletedValue;
    newTodos.filter((item) => {
      if (item.id == id) {
        isCompletedValue = item.isCompeleted;
        return isCompletedValue;
      }
    });

    // main is here what will happen
    if (isConfirm) {
      if (isCompletedValue == false || isConfirm == true) {
        newTodos[index].isCompeleted = true;
        if (showFinished) {
          checkBox.current.checked = true;
        }
      }
      setTodos(newTodos);
    } else {
      checkBox.current.checked = false;
      newTodos[index].isCompeleted = false;
      setTodos(newTodos);
    }
  };

  // handeling show finish
  const handelShowFineshed = (e) => {
    setShowFineshed(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="md:container  mx-auto rounded-xl bg-[#dee7ff]  p-5 h-[90vh] md:h-fit">
        <div className="addTodo my-3">
          <form
            action=""
            onSubmit={handelSubmit}
            className="m-1 p-1 flex flex-col"
          >
            <label htmlFor="addTodos" className="cursor-pointer">
              <h2 className="text-lg font-bold text-center">Add Todo</h2>
              <input
                type="text"
                className="w-full focus:outline-none bg-[#b2c5ff] text-[#041955] px-2 py-3 my-2 rounded-xl  placeholder:text-center placeholder:text-[#041955] first-letter:capitalize focus:outline focus:outline-[#041955]"
                placeholder=" Create Todo...!"
                onChange={handelChange}
                value={todo}
                id="addTodos"
              />
            </label>
            <button
              type="submit"
              className=" bg-[#041955] px-5 py-3 rounded-full text-white hover:text-yellow-300 active:bg-[#97b4ff] active:border active:border-[#041955] border-[#97b4ff] border active:text-[#041955] transition-all duration-75
           "
              onClick={handelSave}
            >
              Save
            </button>
          </form>
        </div>
        <h2 className="text-xl font-bold py-2 text-center">Your ToDo's</h2>
        <label htmlFor="showTodo" className="block text-center">
          <input
            type="checkbox"
            name="chekBox"
            id="showTodo"
            className="cursor-pointer font-bold"
            checked={showFinished}
            onChange={handelShowFineshed}
          />{" "}
          Including Finished Todos
        </label>
        <div
          className={`todos w-full overflow-auto h-[45vh] flex  px-3 border border-[#041955]
          rounded-md ${todos.length > 0 && "flex-col"}`}
        >
          {todos.length == 0 && (
            <div className="emptyMsg text-[2.5rem] text-center w-full self-center font-bold  text-[#041955] italic  ">
              Empty
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompeleted) && (
                <div
                  className="todo flex flex-col md:flex-row px-4 mt-4 w-full justify-between h-fit items-center  cursor-pointer transition-all space-y-2   "
                  key={item.id}
                >
                  <div className="textTodo w-full flex relative transition-all duration-[0.8s] ">
                    <input
                      type="checkbox"
                      ref={checkBox}
                      name={item.id}
                      checked={item.isCompeleted}
                      onChange={handelCheckBox}
                      className={`input  mx-3 md:opacity-0  transition-all duration-[1.5s] scale-[1.5] rounded-full absolute left-[10px] md:left-[-10px] top-[25px] ${
                        item.isCompeleted && "left-[10px] opacity-100"
                      }`}
                    />
                    <div
                      className={`Todo  pr-5 bg-[#041955] w-full rounded-lg  py-5 pl-12 text-[#abc2ff]  first-letter:uppercase ${
                        item.isCompeleted ? "line-through" : ""
                      }`}
                    >
                      {item.todo + "."}
                    </div>
                  </div>
                  <div className="buttons w-full md:w-fit flex justify-center">
                    <button
                      className=" bg-[#041955] px-3 py-3 ml-4 rounded-md text-white hover:text-yellow-300 active:bg-[#97b4ff] active:border active:border-[#041955] border-[#97b4ff] border active:text-[#041955] "
                      onClick={handelEdit}
                      id={item.id}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className=" bg-[#041955] px-3 py-3 ml-4 rounded-md text-white hover:text-yellow-300 active:bg-[#97b4ff] active:border active:border-[#041955] border-[#97b4ff] border active:text-[#041955] transition-all duration-75 "
                      onClick={handelDelete}
                      name={item.id}
                    >
                      <MdDelete />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
