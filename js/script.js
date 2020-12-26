// SELECTORS

const todoInput = document.querySelector(`.todo-input`);
const todoBtn = document.querySelector(`.todo-btn`);
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


// EVENT-LISTENERS 

todoBtn.addEventListener('click', addTodo);
todoList.addEventListener(`click`, deleteCheck);
filterOption.addEventListener('click', filterTodo);

document.addEventListener('DOMContentLoaded', getTodos); // Call this when loaded or REFRESHED!


// FUNCTIONS

function addTodo(event){
    if(todoInput.value === ""){
        alert("Its Empty!");
        return;
    }
    // prevent form submission - refresh issue
    event.preventDefault();

    // Todo Div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    
    // crete li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add('todo-item');

    todoDiv.appendChild(newTodo);

    // add todo to local storage
    saveLocalTodos(todoInput.value);

    // check mark btn
    const completedButton = document.createElement('button');
    completedButton.title = "DONE";
    completedButton.innerHTML = '<i class=" fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    todoDiv.appendChild(completedButton);

    // trash btn
    const trashButton = document.createElement('button');
    trashButton.title = "DELETE";
    trashButton.innerHTML = '<i class=" fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDiv.appendChild(trashButton);

    // append to todolist(main)
    todoList.appendChild(todoDiv);

    // clear out todo Input
    todoInput.value = "";
}



function deleteCheck(e) {
    const item = e.target;

    // delete
    if(item.classList[0] === 'trash-btn'){
        // animation- translation
        item.parentElement.classList.add("fall");

        // remove from LS as well
        removeTodos(item.parentElement);  //todo=item.parentElement

        // wait till the transition ends
        item.parentElement.addEventListener("transitionend", function(){
            item.parentElement.remove();
        });

    }

    // task complete
    if(item.classList[0] === 'complete-btn'){
        item.parentElement.classList.toggle("completed");
    }
    

}

// this fn checks the clicked value from the drop menu and uses it to display or hide the to-do notes list

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            
            case "completed":
                if(todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display = "flex";
                }
                else{
                    todo.style.display = "none";
                }
                break;

            
        }
    });
}

function saveLocalTodos(todo) {
    // check if already there or getting data from LS
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse( localStorage.getItem('todos') );
    }


    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));

}

// to display the to dos when refreshed
function getTodos() {
    // check if already there or getting data from LS
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse( localStorage.getItem('todos') );
    }

    todos.forEach(function(todo){
        // pasted from addTOdo fn
        // Todo Div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        
        // crete li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add('todo-item');

        todoDiv.appendChild(newTodo);

        // check mark btn
        const completedButton = document.createElement('button');
        completedButton.title = "DONE";
        completedButton.innerHTML = '<i class=" fas fa-check"></i>';
        completedButton.classList.add("complete-btn");

        todoDiv.appendChild(completedButton);

        // trash btn
        const trashButton = document.createElement('button');
        trashButton.title = "DELETE";
        trashButton.innerHTML = '<i class=" fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        todoDiv.appendChild(trashButton);

        // append to todolist(main)
        todoList.appendChild(todoDiv);
    });
}

// to remove todos from LS when trash btn clicked ( and refreshed)

function removeTodos(todo) {
    // check if already there or getting data from LS
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    }
    else{
        todos = JSON.parse( localStorage.getItem('todos') );
    }
    // console.log(todo.children[0].innerText)
    const todoIndex = todo.children[0].innerText;  // todoIndex is the actual note typed by user
    todos.splice(todos.indexOf(todoIndex), 1);

    // update LS
    localStorage.setItem('todos', JSON.stringify(todos));
}