/* Start Function Definitions */

/**
 * Gets the HTML for a single Todo List Item and returns it
 * @param {object} todoData Object of todo data. Expects the object to have an `id` property and a `todo` property
 * @returns {string} The HTML string for that todo list item
 */
function getTodoHtml(todoData) {
    // build the html string into the `html` variable
    const html = `
        <li class="todo-item js-todo-item" data-id="${todoData.id}">
            <form class="todo-form" onsubmit="return updateTodo(${todoData.id})">
                <input type="text" class="todo-form-input js-todo-item-${todoData.id}" value="${todoData.todo}" />
                <button class="todo-button save" type="submit">Save</button>
            </form>
            <button class="todo-button delete" type="button" onclick="deleteTodo(${todoData.id})">X</button>
        </li>
    `
    // return the built string back to the invoking function
    return html;
}

/**
 * Get the Todo Data from the API and export. Displays an alert if there is an error.
 */
function renderTodos() {
    // send a "GET" request to '/api/todos'
    axios.get('/api/todos')
        // once the response comes back, run this arrow function, passing the response back through as 'response'
        .then((response) => {
            // map over the response data (it should be an array) and stick the new array into the 'htmlArray' variable
            const htmlArray = response.data.map(todoItem => {
                // for the current item in the response.data array, return the html for that item into the new array
                return getTodoHtml(todoItem)
            });
            // take the htmlArray and join it into a single string so we can put it on the page
            const htmlString = htmlArray.join('');
            // Find the todos element on the page
            const todos = document.querySelector('.js-todos');
            // set to innerHTML of the todos element to the HTML that was generated
            todos.innerHTML = htmlString;
        })
        // 'catch' any errors that happen with the request and run this function
        .catch((error) => {
            // show an alert that contains a basic message, plus the error
            alert('could not get todos:' + error);
        });
}

/**
 * Add a todo via the API and then adds it to the page. Displays an alert if there is an error in the request.
 * @param {string} text The name of the todo that you wish to create
 */
function addTodo(text) {
    // send a "POST" request to '/api/todos'. Set the 'body' of the request to an object that contains the todo text
    axios.post('/api/todos', {
        todo: text
    })
        // once the response comes back, run this arrow function, passing the response back through as 'response'
        .then((response) => {
            // generate an HTML string from the response data (in this case it should be a string)
            const htmlString = getTodoHtml(response.data);
            // Find the todos element on the page
            const todos = document.querySelector('.js-todos');
            // Append (note the '+=' instead of just '=') to innerHTML of the todos element to the HTML that was generated
            todos.innerHTML += htmlString;
        })
        // 'catch' any errors that happen with the request and run this function
        .catch((error) => {
            // show an alert that contains a basic message, plus the error
            alert('could not add todo:' + error);
        })
}

/**
 * Delete a todo with the given ID and update the todos on the page. Displays an alert if there is an error in the request.
 * @param {integer} id the id of the todo item that should be deleted
 */
function deleteTodo(id) {
    // send a "DELETE" request to '/api/todos/id' where 'id' is the id to delete.
    axios.delete(`/api/todos/${id}`)
        // once the response comes back, run this arrow function, passing the response back through as 'response'
        .then((response) => {
            // map over the response data (it should be an array) and stick the new array into the 'htmlArray' variable
            const htmlArray = response.data.map(todoItem => {
                // for the current item in the response.data array, return the html for that item into the new array
                return getTodoHtml(todoItem)
            });
            // take the htmlArray and join it into a single string so we can put it on the page
            const htmlString = htmlArray.join('');
            // Find the todos element on the page
            const todos = document.querySelector('.js-todos');
            // set to innerHTML of the todos element to the HTML that was generated
            todos.innerHTML = htmlString;
        })
        // 'catch' any errors that happen with the request and run this function
        .catch((error) => {
            // show an alert that contains a basic message, plus the error
            alert('could not add todo:' + error);
        })
}

/**
 * Update the todo with the given ID. Text will be updated based on the input matching the id. Displays an alert if there is an error in the request.
 * @param {integer} id The ID of the todo to be updated.
 */
function updateTodo(id) {
    // find the todo field on tha page using the id from the parameter
    const todoField = document.querySelector(`.js-todo-item-${id}`)
    // send a "PUT" request to '/api/todos/id' where 'id' is the id to delete. 
    // Set the 'body' of the request to an object that contains the todo text that should be updated
    axios.put(`/api/todos/${id}`, {
        todo: todoField.value
    })
        // once the response comes back, run this arrow function, passing the response back through as 'response'
        .then(response => {
            // update the field value to the response data that came back from the server
            todoField.value = response.data.todo
        })
        // 'catch' any errors that happen with the request and run this function
        .catch((error) => {
            // show an alert that contains a basic message, plus the error
            alert('could not update todo:' + error);
        })
}

/* Strict Execution */

// find the `add todo` form on the page
const addForm = document.querySelector('.js-add-form');
// add an event listener to the `add todo` form
addForm.addEventListener('submit', e => {
    // prevent the form from doing its default behaviour (which is to refresh the page)
    e.preventDefault();
    // find the value of the text input for the `add todo` form
    const text = document.querySelector('.js-input').value;
    // pass the text to the `addTodo()` function
    addTodo(text);
    // reset the form back to the original state (empty the fields)
    addForm.reset();
})

// render the todos from the server onto the page
renderTodos();
