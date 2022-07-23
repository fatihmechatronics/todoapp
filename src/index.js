/*We can delete all the code frome when we tested out our filters since we know those work
import { getFilters, setFilters } from './filters'
console.log(getFilters())
setFilters({
  searchText: `Philadelphia`,
  hideCompleted: true
})
console.log(getFilters())
*/
/*
import { getTodos, createTodo, removeTodo, toggleTodo } from './todos'
console.log(getTodos())
//createTodo(`Finish another course video`)
toggleTodo(`bf2c2b38-6ec0-49a2-89bd-fda5cb5df47b`)*/
/*(3) [{…}, {…}, {…}]
0: {id: '65eff2a5-eb5b-45da-9bd6-15a52882c2de', text: 'Finish another course video', completed: false}
1: {id: 'bf2c2b38-6ec0-49a2-89bd-fda5cb5df47b', text: 'Finish another course video', completed: true}
2: {id: 'fab9160d-affe-48f5-ba08-a8b48f8b2100', text: 'Finish another course video', completed: false}
length: 3
[[Prototype]]: Array(0)*/
/*removeTodo(`bf2c2b38-6ec0-49a2-89bd-fda5cb5df47b`)*/
/*(2) [{…}, {…}]
0: {id: '65eff2a5-eb5b-45da-9bd6-15a52882c2de', text: 'Finish another course video', completed: false}
1: {id: 'fab9160d-affe-48f5-ba08-a8b48f8b2100', text: 'Finish another course video', completed: false}
length: 2
[[Prototype]]: Array(0)*/
/*console.log(getTodos())*/

/*let todos = getSavedTodos()

const filters = {
  searchText: ``,
  hideCompleted: false
}*/

import { renderTodos } from './views'
import { setFilters } from './filters'
import { createTodo, loadTodos } from './todos'

renderTodos()

document.querySelector(`#search-text`).addEventListener(`input`, (e) => {
    //filters.searchText = e.target.value
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector(`#new-todo`).addEventListener(`submit`, (e) => {
    const text = e.target.elements.text.value.trim()
    e.preventDefault()

    if (text.length > 0) {
        /*todos.push({
          id: uuidv4(),
          text,
          completed: false
        })
        saveTodos(todos)*/
        createTodo(text)
        renderTodos()
        e.target.elements.text.value = ``
    }
})

document.querySelector(`#hide-completed`).addEventListener(`change`, (e) => {
    //filters.hideCompleted = e.target.checked
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

//Bonus: Add a watcher for local storage(Everything even on the other duplicated page is in synchronization)
window.addEventListener(`storage`, (e) => {
    if (e.key === `todos`) {
        loadTodos()
        renderTodos()
    }
})
// Set up index.html to load the bundle
// Make sure to load uuid via an npm module when necessary

// --

/*
// Add necessary imports

// Render initial todos

// Set up search text handler

// Set up checkbox handler

// Set up form submission handler
*/