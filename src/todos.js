import uuidv4 from 'uuid/v4'

//Set up the empty todos array, let todos = []
let todos = []

//Fetch existing todos from localStorage, getSavedTodos. In other words, loadTodos, Arguments:none, Return value: none
const loadTodos = () => {
    const todosJSON = localStorage.getItem(`todos`)
    //return todosJSON !== null ? JSON.parse(todosJSON) : []//This is an empty array
    try {
        /*if (todosJSON !== null) {
          //todos = JSON.parse(todosJSON)
          return JSON.parse(todosJSON)
        } else {
          return []
        }*/
        todos = todosJSON ? JSON.parse(todosJSON) : []
        //return todosJSON ? JSON.parse(todosJSON) : [] //todosJSON is truthy, parse it. If todosJSON is falsey, return it into an empty array.
    } catch (e) {
        //return []
        todos = []
    }
}

//Save todos to localStorage, saveTodos. In otherwords, saveTodos, Arguments:none, Return value: none.
const saveTodos = () => {
    localStorage.setItem(`todos`, JSON.stringify(todos)) //The JSON.stringify() method converts a JavaSciprt object or value to a JSON string, optionally replacing values if a replacer function is specified or optionally including only the specified properties if a replacer array is specified.
}

//get Todos, Arguments: none, Return value: todos array
const getTodos = () => {
    return todos
}

//createTodo, Arguments: todo text, Return value: none
const createTodo = (text) => {
    todos.push({//What we'll push into is an object {...}
        id:/*AS soon as writing id: in the object, we have to import and call that FUNCTION*/ uuidv4(),
        //text:/*This is the next property */ text //Remember that if we're setting an object property equal to avariable with the same name we can write the following!
        text,
        completed: false //This false is a default value
    })
    saveTodos() //The new item we add into the array gets saved in the local storage.
}

//removeTodo, Arguments: id of todo to remove, Return value: none 
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => {
        return todo.id === id
    })
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)//The second argument in the splice function is the number of the things we want to remove
        //If we indeed find something to remove and we remove it, we'll call saveTodos().
        saveTodos()
    }
}

//Toggle the completed value for a given todo. toggleTodo, Arguments: id of todo to toggle, Return value: none
const toggleTodo = (id) => {
    const todo = todos.find((todo) => {
        return todo.id === id //If this circumstance is correct, it necessarily means that I've found my match.
    })
    if (todo) { //if(todo !== undefined) {
        //We know objects are truthy as undefined as falsey. I wrote this comment and I didn't get what it means.
        todo.completed = !todo.completed
        saveTodos()
    }
}

//Make sure to call loadTodos and setup the exports, loadTodos()
loadTodos()
//export { getTodos, createTodo, removeTodo, toggleTodo}
export { loadTodos, getTodos, createTodo, removeTodo, toggleTodo } //saveTodos is included inside createTodo. Hence, we deleted that in this exports property.