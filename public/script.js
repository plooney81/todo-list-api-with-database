const todos = document.querySelector('.js-todos');

function getTodoHtml(todoData) {
    const html = `
        <li class="todo-item js-todo-item" data-id="${todoData.id}">
            <form class="todo-form" onsubmit="return updateTodo(${todoData.id})">
                <input type="text" class="todo-form-input js-todo-item-${todoData.id}" value="${todoData.todo}" />
                <button class="todo-button save" type="submit">Save</button>
            </form>
            <button class="todo-button delete" type="button" onclick="deleteTodo(${todoData.id})">X</button>
        </li>
    `
    return html;
}

function renderTodos() {
    axios.get('/api/todos')
        .then((response) => {
            todos.innerHTML = response.data.map(todoItem => {
                return getTodoHtml(todoItem)
            }).join('');
        })
        .catch((error) => {
            alert('could not get todos' + error);
        });
}

function addTodo(text) {
    axios.post('/api/todos', {
        todo: text
    })
        .then((response) => {
            todos.innerHTML += getTodoHtml(response.data);
        })
        .catch(error => {
            alert('could not add todo:' + error);
        })
}

function deleteTodo(id) {
    axios.delete(`/api/todos/${id}`)
        .then((response) => {
            todos.innerHTML = response.data.map(todoItem => {
                return getTodoHtml(todoItem)
            }).join('');
        })
        .catch(error => {
            alert('could not add todo:' + error);
        })
}

function updateTodo(id) {
    const todoField = document.querySelector(`.js-todo-item-${id}`)
    axios.put(`/api/todos/${id}`, {
        todo: todoField.value
    })
        .then(data => {
            todoField.value = data.todo
        })
        .catch(error => {
            alert('could not update todo:' + error);
        })
}

const addForm = document.querySelector('.js-add-form');
addForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = document.querySelector('.js-input').value;
    addTodo(text);
    addForm.reset();
})

renderTodos();
