import { getTodos, toggleTodo, removeTodo } from './todos'
import { getFilters } from './filters'

//Render application todos based on filters, renderTodos, Arguments: none, Return value:none
const renderTodos = () => {
    const todoEl = document.querySelector(`#todos`)
    /*const filters = getFilters() //Destructure what comes back from getFilters()*/
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = getTodos().filter((todo) => {
        /*const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase())*/
        const searchTextMatch = todo.text.toLowerCase().includes(searchText.toLowerCase())
        /*const hideCompletedMatch = !filters.hideCompleted || !todo.completed*/
        const hideCompletedMatch = !hideCompleted || !todo.completed
        return searchTextMatch && hideCompletedMatch
    })
    const incompleteTodos = filteredTodos.filter((todo) => {
        return !todo.completed
    })
    //document.querySelector(`#todos`).innerHTML = ``
    todoEl.innerHTML = ``
    //document.querySelector(`#todos`).appendChild(generateSummaryDOM(incompleteTodos))
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))
    /*If todos to show, render them
    Else, p with class "empty-message" and message "No todos to show"
    */
    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            /*!const p = document.createdElement(`p`)
            p.textContent = todo.text*/
            //document.querySelector(`#todos`).appendChild(generateTodoDOM(todo))
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement(`p`)
        messageEl.classList.add(`empty-message`)
        messageEl.textContent = `There are no to-dos to show`
        //document.querySelector(`#todos`).appendChild(messageEl)
        todoEl.appendChild(messageEl)
    }
}

//Get the DOM elements for an individual note, generateTodoDOM //Document Object Model. generateTodoDOM. Arguments: todo. Return value: the todo element.
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement(`label`)
    const containerEl = document.createElement(`div`)
    const checkbox = document.createElement(`input`)
    const todoText = document.createElement(`span`)
    const removeButton = document.createElement(`button`)

    //Setup todo checkbox
    checkbox.setAttribute(`type`, `checkbox`)
    checkbox.checked = todo.completed
    //todoEl.appendChild(checkbox)
    containerEl.appendChild(checkbox)

    checkbox.addEventListener(`change`, () => {
        //Checkbox must be changed in the first argument of its. .addEvent Listener as the second argument of its .addEventListener is function() { }.
        toggleTodo(todo.id)
        //saveTodos(todos) I saw this line deleted from the resources attached
        renderTodos()
    })

    //Setup the todo text
    todoText.textContent = todo.text
    //todoEl.appendChild(todoText)
    containerEl.appendChild(todoText)

    //Setup container
    todoEl.classList.add(`list-item`)
    containerEl.classList.add(`list-item__container`)
    todoEl.appendChild(containerEl)

    //Set up the remove button
    //removeButton.textContent = `x`
    removeButton.textContent = `remove`
    removeButton.classList.add(`button`, `button--text`)
    todoEl.appendChild(removeButton)
    removeButton.addEventListener(`click`, () => {
        //We're listening for a click. What're we going to do when the button is clicked is defined by the function after the comme followed by `click`
        removeTodo(todo.id)
        renderTodos()
    })
    return todoEl
}


/*1.Add "list-title" class
2.Pluralize (todos) unless you only have one*/
//Get the DOM elements for list summary, generateSummaryDOM. generateSummaryDOM. Arguments: incompleteTodos. Return value: the summary element.
const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement(`h2`)
    const plural = incompleteTodos.length === 1/*If statement*/ ? `` :/*Otherwise*/ `s`
    summary.classList.add(`list-title`)
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    return summary
}

//Make sure to set up the exports
export { generateTodoDOM, renderTodos, generateSummaryDOM }