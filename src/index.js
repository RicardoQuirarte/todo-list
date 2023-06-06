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
  const date = document.querySelector('#due-date').value;
  const dueDate = format(new Date(`${date}T00:00`), 'dd/MMM/yy');
  const priority = document.querySelector('input[name="priority"]:checked').value;
  const project = document.querySelector('.project-name').textContent;
  const id = Date.now();

  return {title, description, date, dueDate, priority, project, id};
}

// Display todos
const todosDiv = document.querySelector('.todos');
const displayName = document.querySelector('.project-name');

function cleanHtml() {
  while(todosDiv.firstChild) {
    todosDiv.removeChild(todosDiv.firstChild);
  }
}

function deleteTodo({ id }) {
  todos = todos.filter(userTodo => userTodo.id !== id);
  if(project) {
    const projectArray = todos.filter(elem => elem.project === displayName.textContent); 
    displayTodos(projectArray);
  } else {
    displayTodos(todos);
  }
}

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

function showDetails({ description }) {
  detailsDiv.textContent = description;
  detailsDiv.style.display = "flex";
}

const form = document.querySelector('#form');
const popUpForm = document.querySelector(".pop-up-form");

function removeRadioButtons() {
  form.querySelector('input[name="priority"][value="top"]').removeAttribute('checked');
  form.querySelector('input[name="priority"][value="mid"]').removeAttribute('checked');
  form.querySelector('input[name="priority"][value="low"]').removeAttribute('checked');
}

let index = '';
let edite = false;

function editButton({ title, description, date, priority, id }) {
  popUpForm.style.display = "flex";
  form.reset();
  removeRadioButtons();
  form.querySelector('.add-todo').textContent = 'Edit Todo';
  form.querySelector('#title').value = title;
  form.querySelector('#description').value = description;
  form.querySelector('#due-date').value = date;
  form.querySelector(`input[name="priority"][value=${priority}]`).setAttribute('checked', '');
  index = todos.findIndex(usertodo => usertodo.id === id)
  edite = true;
}

function editTodo(userTodo) {
  if (index !== -1) {
    todos[index] = userTodo;
  }
}

function displayTodos(array) {
  cleanHtml();
  array.forEach( userTodo => {
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
    const dueDateDiv = document.createElement('div');
    dueDateDiv.textContent = userTodo.dueDate;
    fatherDiv.appendChild(dueDateDiv);

    const {priority} = userTodo;
    changePriority(priority, grandpaDiv);

    const edit = document.createElement('button');
    edit.textContent = 'Edit'
    edit.classList.add('todo-buttons', 'edit');
    motherDiv.appendChild(edit);
    const details = document.createElement('button');
    details.textContent = 'Details'
    details.classList.add('todo-buttons', 'details');
    motherDiv.appendChild(details);
    const erase = document.createElement('button');
    erase.textContent = 'Delete'
    erase.classList.add('todo-buttons', 'delete');
    motherDiv.appendChild(erase);

    edit.addEventListener('click', () => {
      editButton(userTodo);
    });
    details.addEventListener('click', () => {
      showDetails(userTodo);
    });
    erase.addEventListener('click', () => {
      deleteTodo(userTodo);
    });

    grandpaDiv.appendChild(fatherDiv);
    grandpaDiv.appendChild(motherDiv);
    todosDiv.appendChild(grandpaDiv);
  })
}

// DOM for new todo pop up form
const newTodo = document.querySelector(".new-todo-button");

const cancelButton = document.querySelector(".cancel-button");
const addButton = document.querySelector('.add-todo');


function openPopUp() {
  form.querySelector('.add-todo').textContent = 'Add todo'
  popUpForm.style.display = "flex";
  removeRadioButtons();
  form.reset();
}

function closePopUP(e) {
  e.preventDefault();
  popUpForm.style.display = "none";
  edite = false;
}

let project = false;
let defaultProject = true;

function addTodo(e) {
  e.preventDefault();
  const userTodo = getTodoFromInput();
  if(edite && defaultProject) {
    editTodo(userTodo);
    displayTodos(todos);
    edite = false;
  } else if(edite && project) {
    editTodo(userTodo);
    const projectArray = todos.filter(elem => elem.project === displayName.textContent); 
    displayTodos(projectArray);
    edite = false;
  } else if(project) {
    todos.push(userTodo);
    const projectArray = todos.filter(elem => elem.project === displayName.textContent);
    displayTodos(projectArray);
  } else {
    todos.push(userTodo);
    displayTodos(todos);
  }
  popUpForm.style.display = "none";
}

newTodo.addEventListener("click", openPopUp);
cancelButton.addEventListener("click", closePopUP);
addButton.addEventListener('click', addTodo);

// Create new Project
const projectButton = document.querySelector('.new-project');
const projectForm = document.querySelector('.project-form');
const create = document.querySelector('.create');
const close = document.querySelector('.close');
const projects = document.querySelector('.projects-div');
const allTask = document.querySelector('.all-tasks');
const header = document.querySelector('.header');

function openNewProject() {
  projectForm.style.display = 'flex';
}

function closeForm(e) {
  e.preventDefault();
  projectForm.style.display = 'none';
}

function createProject(e) {
  e.preventDefault();
  cleanHtml();
  defaultProject = false;
  project = true;
  const projectName = document.querySelector('#project').value;
  const projectsDiv = document.createElement('div');
  projectsDiv.classList.add('projects-list');
  projects.appendChild(projectsDiv);
  projectsDiv.textContent = projectName;
  displayName.textContent = projectName;
  header.textContent = projectName
  projectForm.style.display = 'none';
  projectForm.reset();
  projectsDiv.addEventListener('click', () => {
    defaultProject = false;
    project = true;
    displayName.textContent = projectName;
    header.textContent = projectName
    const projectArray = todos.filter(userTodo => userTodo.project === projectName);
    displayTodos(projectArray);
  });
}

function displayAllTask() {
  defaultProject = true;
  project = false;
  displayTodos(todos);
  displayName.textContent = 'Default project'
  header.textContent = 'Todo list'
}

projectButton.addEventListener('click', openNewProject);
close.addEventListener('click', closeForm);
create.addEventListener('click', createProject);
allTask.addEventListener('click', displayAllTask);