document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    
    const loadTodos = () => {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoToDOM(todo.text, todo.completed));
    };

    
    const saveTodos = () => {
        const todos = [];
        document.querySelectorAll('#todo-list li').forEach(todoItem => {
            todos.push({
                text: todoItem.textContent,
                completed: todoItem.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    };

    
    const addTodoToDOM = (text, completed = false) => {
        const todoItem = document.createElement('li');
        todoItem.textContent = text;
        todoItem.classList.add('todo-item');
        if (completed) {
            todoItem.classList.add('completed');
        }

        
        todoItem.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTodos();
        });

        todoItem.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            todoItem.remove();
            saveTodos();
        });

        todoList.appendChild(todoItem); 
    };

    
    input.addEventListener('keypress', (event) => {
        if (event.key === 'Enter' && input.value.trim() !== '') {
            addTodoToDOM(input.value.trim()); 
            saveTodos(); 
            input.value = ''; 
        }
    });

    
    loadTodos();
});