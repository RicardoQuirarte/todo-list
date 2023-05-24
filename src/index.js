import { check } from "prettier";
import "./style.css";
import { format } from 'date-fns'

// // Creating new todos
// function  todoFactory(title, description, dueDate, priority) {
//   return { title, description, dueDate, priority };
// }

const todos = [];

// Get todo from input
function getTodoFromInput() {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const newDate = new Date(`${document.querySelector('#due-Date').value}T00:00`);
  const dueDate = format(newDate, 'dd/MMM/yy');
  const priority = document.querySelector('input[name="priority"]:checked').value;
  return {title, description, dueDate, priority};
}

// Display todos
const todosDiv = document.querySelector('.todos');

function displayTodos() {
  todos.forEach( userTodo => {
    const grandpaDiv = document.createElement('div');
    grandpaDiv.classList.add('grandpa-todo');

    const fatherDiv = document.createElement('div');
    fatherDiv.classList.add('todos-side');
    const checklist = document.createElement('input');
    checklist.setAttribute('type', 'checkbox');
    checklist.classList.add('check');
    checklist.addEventListener('click', () => {
      fatherDiv.classList.toggle('line');
    });
    fatherDiv.appendChild(checklist);
    const div0 = document.createElement('div');
    div0.textContent = userTodo.title;
    fatherDiv.appendChild(div0);
    const div1 = document.createElement('div');
    div1.textContent = userTodo.description;
    fatherDiv.appendChild(div1);
    const div2 = document.createElement('div');
    div2.textContent = userTodo.dueDate;
    fatherDiv.appendChild(div2);
    if(userTodo.priority === 'top') {
      grandpaDiv.classList.add('red');
    } else if (userTodo.priority === 'mid'){
      grandpaDiv.classList.add('orange');
    } else {
      grandpaDiv.classList.add('green');
    }

    const motherDiv = document.createElement('div');
    motherDiv.classList.add('buttons-side');
    const edite = document.createElement('button');
    edite.textContent = 'Edite'
    edite.classList.add('todo-buttons', 'edite');
    motherDiv.appendChild(edite);
    const details = document.createElement('button');
    details.textContent = 'Details'
    details.classList.add('todo-buttons', 'details');
    motherDiv.appendChild(details);
    const erase = document.createElement('button');
    erase.textContent = 'Delete'
    erase.classList.add('todo-buttons', 'delete');
    motherDiv.appendChild(erase);

    grandpaDiv.appendChild(fatherDiv);
    grandpaDiv.appendChild(motherDiv);
    todosDiv.appendChild(grandpaDiv);
  })
}

// DOM for new todo pop up form
const newTodo = document.querySelector(".new-todo");
const popUpForm = document.querySelector(".pop-up-form");
const cancelButton = document.querySelector(".cancel-button");
const addButton = document.querySelector('.add-todo');


function popUp() {
  popUpForm.style.display = "flex";
}

function closePopUP() {
  popUpForm.style.display = "none";
}

function addTodo() {
  const userTodo = getTodoFromInput();
  todos.push(userTodo);
  popUpForm.style.display = "none";
  displayTodos();
  console.log(todos);
}

newTodo.addEventListener("click", popUp);
cancelButton.addEventListener("click", closePopUP);
addButton.addEventListener('click', addTodo);





// // Changing todo priority

// const topPriority = red;
// const midPriority = orange;
// const lightProprity = green;

// function changePriority() {
//     if() {

//     }
// }




// // Create new Project
// function createProject(project) {
//     let (project) = [];
//     (project).push(todos);

//     return project;
// }