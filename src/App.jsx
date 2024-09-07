import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import { v4 as uuidv4 } from 'uuid';
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, settodo] = useState([]);
  const [todos, settodos] = useState([]);
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(todoString);
      settodos(todos);
    }
  }, [])

  const SavetoLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
    console.log
  }

  const HandleAdd = () => {
    if(textInput.value==""){
      document.getElementById("warning").style.visibility="visible";
      document.getElementById("textInput").style.border="2px solid red";
    }
    else{
      document.getElementById("warning").style.visibility="hidden";
      document.getElementById("textInput").style.border="2px solid green";
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    settodo("")
    SavetoLS();
  }
  }

  const HandleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    settodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    settodos(newTodos)
    SavetoLS();
  }

  const HandleDelete = (e, id) => {
    if (confirm("Do you want to delete this Todo!") == true) {
      let newTodos = todos.filter(item => {
        return item.id !== id
      });
      settodos(newTodos);
      SavetoLS();
    }
  }


  const HandleChange = (e) => {
    settodo(e.target.value)
  }


  const HandleCheckBox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos)
    SavetoLS();
  }

  return (
    <>
      <Navbar />
      <div className="container bg-blue-100 max-w-[100vw] min-h-screen flex">
        <div className="max-md:w-[100vw] max-md:my-0 box bg-blue-300 h-1000 font-bold text-black  rounded-xl h-[100] w-[60vw] mx-auto my-10">
          <p className='max-md:text-3xl max-md:mx-2 my-6 mx-[40px] text-5xl'>Add your Todos...</p>
          <input id='textInput' onChange={HandleChange} value={todo} className="max-md:w-[75vw] max-md:mx-0 mx-20 mt-10 w-[66%] text-2xl rounded-xl h-10 p-5" type="text" placeholder='Enter Here'/>
          <button type='submit' onClick={HandleAdd} className='bg-green-600 text-white w-20 rounded-xl h-10 max-md:mx-2'>Save</button>
          <p className='mx-20 text-red-700 invisible' id='warning'>Write Something!!!!!!</p>
          <p className="mx-20 text-2xl my-8">Your Todos</p>

          {todos.map(item => {
            return <div key={item.id} className='todos flex h-12 max-md:w-[100vw] max-md:text-[10px] w-[50vw] mx-auto my-5 justify-center text-xl shadow-xl shadow-black rounded-xl'>
              <input name={item.id} onChange={HandleCheckBox} type="checkbox" value={item.isCompleted} />
              <h3 className={item.isCompleted ? "line-through mx-5 my-2 min-w-[35vw]" : "mx-5 my-2 min-w-[35vw]"}>{item.todo}</h3>
              <button onClick={(e) => { HandleEdit(e, item.id) }} className='bg-blue-600 text-white w-10 rounded-xl mx-2  text-2xl flex justify-center items-center h-10 '><FaRegEdit /></button>
              <button onClick={(e) => { HandleDelete(e, item.id) }} className='bg-red-600 text-white w-10 rounded-xl text-2xl flex justify-center items-center h-10'><MdDelete /></button>
            </div>
          })}
        </div>
      </div>
    </>
  )
}
export default App
