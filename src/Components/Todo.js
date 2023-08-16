import React from 'react'
import './Todo.css'
import { useState , useRef , useEffect} from 'react' // useRef and useEffect are hook
import { IoMdDoneAll } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';

//function 
function Todo() {
    const [todo,setTodo] = useState('')//state creating used variables for todo and setTodo
    const [todos,setTodos] = useState([])// state for storing todos form add inputs
    const [eidtId,setEditID] = useState(0)

    const handleSubmit = (e) =>{
        e.preventDefault(); // it used for prevent loading page for form submission
    };

    const addTodo = () =>{
      if(todo !== ''){
       // adding input todo in an array using addTodo() function
        setTodos([...todos,{list : todo , id : Date.now() , status : false}]) /*spread operator used to add datas or inputs to array.spread operator used
                                    for first enterd data lose preventing */
        console.log(todos)
        setTodo('') // used for after type input filed showing free
    }
    if(eidtId){
      const editTodo = todos.find((todo)=>todo.id === eidtId)
      const updateTodo = todos.map((to)=>to.id === editTodo.id
     ? (to = {id : to.id , list : todo})
     : (to = {id :to.id , list : to.list}))
     setTodos(updateTodo)
     setEditID(0);
     setTodo('')
    }
  }
    const inputRef = useRef('null') // useref variable , for accessing input field
    useEffect(()=>{ // when application load first call useEffect. it have two parameter callback function and dependency
      inputRef.current.focus(); // current variable used for getting current access
    });

    const onDelete = (id)=>{
      setTodos(todos.filter((to)=> to.id !== id)) // it only delete secleted item and show others using filter
    }

    const onComplete = (id)=>{
        let complete = todos.map((list)=>{
        if(list.id === id){
          return ({...list , status : !list.status})
        }
        return list
      })
      setTodos(complete)
    }

    const onEdit = (id)=>{
        const editTodo = todos.find((to)=> to.id === id)
        setTodo(editTodo.list)
        setEditID(editTodo.id)
    }

  return (
    <div className='container'>
      <h2>TODO APP</h2>
      <form className='form-group' onSubmit={handleSubmit}>
        <input type="text" ref={inputRef} placeholder='Enter your todo' className='form-control' value={todo} onChange={(event)=>setTodo(event.target.value)}></input>
        <button onClick={ addTodo }>{ eidtId ? 'UPDATE' : 'ADD' }</button>
      </form>
      <div className='list'>
        <ul>
          {
            todos.map((to) =>(  // map used to list array values , map used to manipulate ayyary values
              <li className='list-items'>
                <div className='list-item-list' id= {to.status ? 'list-item' : ''}>{to.list}</div>
                <span className='d-flex gap-3'>
                  <IoMdDoneAll 
                  className='list-item-icons ' 
                  id='complete' 
                  title='Complete'
                  onClick={()=>onComplete(to.id)}
                  />
                  <FiEdit 
                  className='list-item-icons ' 
                  id='edit' 
                  title='Edit'
                  onClick={()=>onEdit(to.id)}
                  />
                  <MdDelete 
                     className='list-item-icons'
                     id='delete' 
                     title='Delete'
                     onClick={()=>onDelete(to.id)}
                     />
                </span>
              </li>
            ))
          }
        </ul>
      </div>
    </div>

  )
}

export default Todo