import { check } from "prettier";
import "./style.css";

// Creating new todos
function  todoFactory(title, description, dueDate, priority) {
  return { title, description, dueDate, priority };
}

const todos = [];

// Get todo from input
function getTodoFromInput() {
  const title = document.querySelector('#title').value;
  const description = document.querySelector('#description').value;
  const dueDate = document.querySelector('#due-Date').value;
  const priority = document.querySelector('input[name="priority"]:checked').value;
  return todoFactory(title, description, dueDate, priority);
}

// Display todos
const todosDiv = document.querySelector('.todos');

function displayTodos() {
  todos.forEach( userTodo => {
    const fatherDiv = document.createElement('div');
    fatherDiv.classList.add('each-todo');

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
      fatherDiv.classList.add('red');
    } else if (userTodo.priority === 'mid'){
      fatherDiv.classList.add('orange');
    } else {
      fatherDiv.classList.add('green');
    }

    todosDiv.appendChild(fatherDiv);
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
}

newTodo.addEventListener("click", popUp);
cancelButton.addEventListener("click", closePopUP);
addButton.addEventListener('click', addTodo);








// Playing with date-fns

// import { format, compareAsc } from 'date-fns'
// format(new Date ('2023-08-30'))




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