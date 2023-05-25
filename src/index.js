import { check } from "prettier";
import "./style.css";
import { format } from 'date-fns'

// // Creating new todos
// function  todoFactory(title, description, dueDate, priority) {
//   return { title, description, dueDate, priority };
// }

let todos = [];

// Get todo from input
function getTodoFromInput() {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const newDate = new Date(`${document.querySelector('#due-Date').value}T00:00`);
  const dueDate = format(newDate, 'dd/MMM/yy');
  const priority = document.querySelector('input[name="priority"]:checked').value;
  const id = Date.now();

  return {title, description, dueDate, priority, id};
}

// Display todos
const todosDiv = document.querySelector('.todos');

function cleanHtml() {
  while(todosDiv.firstChild) {
    todosDiv.removeChild(todosDiv.firstChild);
  }
}

function deleteTodo(id) {
  todos = todos.filter(userTodo => userTodo.id !== id);
  cleanHtml();
  displayTodos();
}

// function edite() {

// }

function changePriority(priority, div) {
  if(priority === 'top') {
    div.classList.add('red');
  } else if (priority === 'mid'){
    div.classList.add('orange');
  } else {
    div.classList.add('green');
  }
}


const detailsDiv = document.querySelector('.show-details');

function showDetails(description) {
  // const div1 = document.createElement('div');
  detailsDiv.textContent = description;
  detailsDiv.style.display = "flex";
    // detailsDiv.appendChild(div1);
}


function displayTodos() {
  cleanHtml();
  todos.forEach( userTodo => {
    const grandpaDiv = document.createElement('div');
    grandpaDiv.classList.add('grandpa-todo');
    const fatherDiv = document.createElement('div');
    fatherDiv.classList.add('todos-side');
    const motherDiv = document.createElement('div');
    motherDiv.classList.add('buttons-side');

    const checklist = document.createElement('input');
    checklist.setAttribute('type', 'checkbox');
    checklist.classList.add('check');
    checklist.addEventListener('click', () => {
      fatherDiv.classList.toggle('line');
    });
    fatherDiv.appendChild(checklist);

    const titleDiv = document.createElement('div');
    titleDiv.textContent = userTodo.title;
    fatherDiv.appendChild(titleDiv);
    // 
    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = userTodo.dueDate;
    fatherDiv.appendChild(dueDateDiv);

    const {priority} = userTodo;
    changePriority(priority, grandpaDiv);

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

    edite.addEventListener('click', () => {
      edite();
    });
    
    const {description} = userTodo;
    details.addEventListener('click', () => {
      showDetails(description);
    });

    const {id} = userTodo;
    erase.addEventListener('click', () => {
      deleteTodo(id);
    });

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
const form = document.querySelector('#form');

function popUp() {
  popUpForm.style.display = "flex";
}

function closePopUP(e) {
  e.preventDefault();
  popUpForm.style.display = "none";
}

function addTodo(e) {
  e.preventDefault();
  const userTodo = getTodoFromInput();
  todos.push(userTodo);
  popUpForm.style.display = "none";
  displayTodos();
  form.reset();
}

newTodo.addEventListener("click", popUp);
cancelButton.addEventListener("click", closePopUP);
addButton.addEventListener('click', addTodo);









// // Create new Project
// function createProject(project) {
//     let (project) = [];
//     (project).push(todos);

//     return project;
// }