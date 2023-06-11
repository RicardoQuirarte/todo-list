import "./style.css";
import { format } from "date-fns";

let todos = [];

// Factory for todos
function getTodoFromInput() {
  const title = document.querySelector("#title").value;
  const description = document.querySelector("#description").value;
  const date = document.querySelector("#due-date").value;
  const dueDate = format(new Date(`${date}T00:00`), "dd/MMM/yy");
  const priority = document.querySelector(
    'input[name="priority"]:checked'
  ).value;
  const project = document.querySelector("#proyecto").value;
  const id = Date.now();

  return { title, description, date, dueDate, priority, project, id };
}

// Display todos
const todosDiv = document.querySelector(".todos");
const popUpNameProject = document.querySelector(".project-name");

function cleanHtml(div) {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
}

function sortArray() {
  todos.sort((a, b) => new Date(a.date) - new Date(b.date));
  const sortOrder = { top: 0, mid: 1, low: 2 };
  todos.sort((p1, p2) => sortOrder[p1.priority] - sortOrder[p2.priority]);
}

function deleteTodo({ id }) {
  todos = todos.filter((userTodo) => userTodo.id !== id);
  saveTodos();
  if (project) {
    const projectArray = todos.filter(
      (elem) => elem.project === popUpNameProject.textContent
    );
    displayTodos(projectArray);
  } else {
    displayTodos(todos);
  }
}

function changePriority(priority, div) {
  if (priority === "top") {
    div.classList.add("red");
  } else if (priority === "mid") {
    div.classList.add("orange");
  } else {
    div.classList.add("green");
  }
}

const detailsDiv = document.querySelector(".show-details");
const container = document.querySelector(".container");

function showDetails({ description }) {
  detailsDiv.style.display = "flex";
  cleanHtml(container);
  const div = document.createElement("div");
  div.textContent = description;
  container.appendChild(div);
}

const closeButton = document.querySelector('img[alt="close-window"]');
closeButton.addEventListener("click", () => {
  detailsDiv.style.display = "none";
});

const form = document.querySelector("#form");
const popUpForm = document.querySelector(".pop-up-form");

function removeRadioButtons() {
  form
    .querySelector('input[name="priority"][value="top"]')
    .removeAttribute("checked");
  form
    .querySelector('input[name="priority"][value="mid"]')
    .removeAttribute("checked");
  form
    .querySelector('input[name="priority"][value="low"]')
    .removeAttribute("checked");
}

let index = "";
let edite = false;

function editButton({ title, description, date, priority, project, id }) {
  edite = true;
  removeRadioButtons();
  popUpForm.style.display = "flex";
  index = todos.findIndex((usertodo) => usertodo.id === id);
  form.querySelector(".add-todo").textContent = "Edit Todo";
  form.querySelector("#proyecto").value = project;
  form.querySelector("#title").value = title;
  form.querySelector("#description").value = description;
  form.querySelector("#due-date").value = date;
  form
    .querySelector(`input[name="priority"][value=${priority}]`)
    .setAttribute("checked", "");
  popUpNameProject.textContent = project;
  projectOptions();
}

// Hasta aqui cheque que todo estuviera bien con la edicion de proyectos

function editTodo(userTodo) {
  if (index !== -1) {
    todos[index] = userTodo;
  }
}

function displayTodos(array) {
  cleanHtml(todosDiv);
  array.forEach((userTodo) => {
    const grandpaDiv = document.createElement("div");
    grandpaDiv.classList.add("grandpa-todo");
    const fatherDiv = document.createElement("div");
    fatherDiv.classList.add("todos-side");
    const motherDiv = document.createElement("div");
    motherDiv.classList.add("buttons-side");

    const checklist = document.createElement("input");
    checklist.setAttribute("type", "checkbox");
    checklist.classList.add("check");
    checklist.addEventListener("click", () => {
      fatherDiv.classList.toggle("line");
    });
    fatherDiv.appendChild(checklist);

    const titleDiv = document.createElement("div");
    titleDiv.textContent = userTodo.title;
    fatherDiv.appendChild(titleDiv);
    const dueDateDiv = document.createElement("div");
    dueDateDiv.textContent = userTodo.dueDate;
    fatherDiv.appendChild(dueDateDiv);

    const { priority } = userTodo;
    changePriority(priority, grandpaDiv);

    const edit = document.createElement("button");
    edit.textContent = "Edit";
    edit.classList.add("todo-buttons", "edit");
    motherDiv.appendChild(edit);
    const details = document.createElement("button");
    details.textContent = "Details";
    details.classList.add("todo-buttons", "details");
    motherDiv.appendChild(details);
    const erase = document.createElement("button");
    erase.textContent = "Delete";
    erase.classList.add("todo-buttons", "delete");
    motherDiv.appendChild(erase);

    edit.addEventListener("click", () => {
      editButton(userTodo);
    });
    details.addEventListener("click", () => {
      showDetails(userTodo);
    });
    erase.addEventListener("click", () => {
      deleteTodo(userTodo);
    });

    grandpaDiv.appendChild(fatherDiv);
    grandpaDiv.appendChild(motherDiv);
    todosDiv.appendChild(grandpaDiv);
  });
}

// DOM for new todo pop up form
const newTodo = document.querySelector(".new-todo-button");

const cancelButton = document.querySelector(".cancel-button");
const addButton = document.querySelector(".add-todo");

function openPopUp() {
  form.querySelector(".add-todo").textContent = "Add todo";
  popUpForm.style.display = "flex";
  removeRadioButtons();
  form.reset();
  edite = false;
  projectOptions();
}

function closePopUP(e) {
  e.preventDefault();
  popUpForm.style.display = "none";
  edite = false;
}

let project = false;

function addTodo(e) {
  e.preventDefault();
  const userTodo = getTodoFromInput();
  if (edite && project) {
    editTodo(userTodo);
    sortArray();
    const projectArray = todos.filter(
      (elem) => elem.project === popUpNameProject.textContent
    );
    displayTodos(projectArray);
    edite = false;
  } else if (edite) {
    editTodo(userTodo);
    sortArray();
    displayTodos(todos);
    edite = false;
  } else if (project) {
    todos.push(userTodo);
    sortArray();
    const projectArray = todos.filter(
      (elem) => elem.project === popUpNameProject.textContent
    );
    displayTodos(projectArray);
  } else {
    todos.push(userTodo);
    sortArray();
    displayTodos(todos);
  }
  saveTodos();
  popUpForm.style.display = "none";
}

newTodo.addEventListener("click", openPopUp);
cancelButton.addEventListener("click", closePopUP);
addButton.addEventListener("click", addTodo);

// Create and display new Projects
const redButton = document.querySelector('img[alt="top-priority"]');
const yellowButton = document.querySelector('img[alt="mid-priority"]');
const greenButton = document.querySelector('img[alt="low-priority"]');
const projectButton = document.querySelector(".new-project");
const projectForm = document.querySelector(".project-form");
const create = document.querySelector(".create");
const close = document.querySelector(".close");
const projects = document.querySelector(".father-projects-div");
const allTask = document.querySelector(".all-tasks");
const header = document.querySelector(".header");

let projectsNames = [];
let editeProject = false;
let indexProject = "";

function openProjectForm() {
  projectForm.style.display = "flex";
  document.querySelector(".create").textContent = "Create Project";
  projectForm.reset();
  editeProject = false;
}

function closeProjectForm(e) {
  e.preventDefault();
  projectForm.style.display = "none";
  projectForm.reset();
  editeProject = false;
  header.textContent = "Todo list";
}

function deleteProject(projectName) {
  projectsNames = projectsNames.filter(
    (projectTitle) => projectTitle !== projectName
  );
  todos = todos.filter((elem) => elem.project !== projectName);
  displayAllTask();
  displayProjects(projectsNames);
  saveProjects();
  saveTodos();
}

function editProject(projectName) {
  editeProject = true;
  projectForm.style.display = "flex";
  document.querySelector("#project").value = projectName;
  document.querySelector(".create").textContent = "Edit Project";
  header.textContent = projectName;
  indexProject = projectsNames.findIndex((nameP) => nameP === projectName);
}

function editProjectArray(userProject) {
  if (indexProject !== -1) {
    projectsNames[indexProject] = userProject;
  }
}

function displayProjects(array) {
  cleanHtml(projects);
  array.forEach((userProject) => {
    const projectsDiv = document.createElement("div");
    const buttonsDiv = document.createElement("div");
    const projectName = document.createElement("div");
    const projectDelete = document.createElement("div");
    const projectEdit = document.createElement("div");
    projectsDiv.classList.add("project-div");
    buttonsDiv.classList.add("buttons-project");
    projectName.classList.add("project-name");
    projectDelete.classList.add("projct-buttons", "project-delete");
    projectEdit.classList.add("projct-buttons", "project-edit");
    projectName.textContent = userProject;
    projectDelete.textContent = "Delete";
    projectEdit.textContent = "Edit";
    buttonsDiv.appendChild(projectDelete);
    buttonsDiv.appendChild(projectEdit);
    projectsDiv.appendChild(projectName);
    projectsDiv.appendChild(buttonsDiv);
    projects.appendChild(projectsDiv);
    projectName.addEventListener("click", () => {
      project = true;
      popUpNameProject.textContent = userProject;
      header.textContent = userProject;
      const projectArray = todos.filter(
        (userTodo) => userTodo.project === userProject
      );
      displayTodos(projectArray);
    });
    projectDelete.addEventListener("click", () => {
      if (
        confirm(
          "Deleting the project will also delete all the tasks it contains. Are you sure?"
        )
      ) {
        deleteProject(userProject);
      }
    });
    projectEdit.addEventListener("click", () => {
      editProject(userProject);
    });
  });
}

function createProject(e) {
  e.preventDefault();
  const projectName = document.querySelector("#project").value;
  project = true;
  popUpNameProject.textContent = projectName;
  header.textContent = projectName;
  if (editeProject) {
    todos.forEach((userTodo) => {
      if (userTodo.project === projectsNames[indexProject]) {
        userTodo.project = projectName;
      }
    });
    editProjectArray(projectName);
    const projectArray = todos.filter(
      (userTodo) => userTodo.project === projectName
    );
    displayTodos(projectArray);
    saveTodos();
    console.log("editando");
  } else {
    projectsNames.push(projectName);
    const projectArray = todos.filter(
      (userTodo) => userTodo.project === projectName
    );
    displayTodos(projectArray);
  }
  projectForm.reset();
  projectForm.style.display = "none";
  displayProjects(projectsNames);
  saveProjects();
}

function displayAllTask() {
  project = false;
  popUpNameProject.textContent = "Default project";
  header.textContent = "Todo list";
  displayTodos(todos);
}

function priorityCheck(color) {
  const priorityArray = todos.filter((userTodo) => userTodo.priority === color);
  displayTodos(priorityArray);
}

projectButton.addEventListener("click", openProjectForm);
close.addEventListener("click", closeProjectForm);
create.addEventListener("click", createProject);
allTask.addEventListener("click", displayAllTask);

redButton.addEventListener("click", () => {
  priorityCheck("top");
});
yellowButton.addEventListener("click", () => {
  priorityCheck("mid");
});
greenButton.addEventListener("click", () => {
  priorityCheck("low");
});

const userProjects = document.querySelector("#projects");

function projectOptions() {
  cleanHtml(userProjects);
  projectsNames.forEach((userProject) => {
    const option = document.createElement("option");
    option.setAttribute("value", userProject);
    option.textContent = userProject;
    userProjects.appendChild(option);
  });
}

// Store data
function saveTodos() {
  const todosData = JSON.stringify(todos);
  localStorage.setItem("todos", todosData);
}

function saveProjects() {
  const projectsData = JSON.stringify(projectsNames);
  localStorage.setItem("projects", projectsData);
}

window.addEventListener("load", () => {
  if (localStorage.getItem("todos")) {
    todos = JSON.parse(localStorage.getItem("todos"));
    displayTodos(todos);
  }
  if (localStorage.getItem("projects")) {
    projectsNames = JSON.parse(localStorage.getItem("projects"));
    displayProjects(projectsNames);
  }
});
