import './style.css';

// // import { format, compareAsc } from 'date-fns'
// // format(new Date ('2023-08-30'))



// // Creating new todos
// function todoFactory(title, description, dueDate, priority, checklist) {
//     return { title, description, dueDate, priority, checklist };
// }

// const todos = [];


// const date = new Date('2023-08-30');
// let check = false;

// const firstTodo = todoFactory('Take a shower', 'Clean very well my colita', date, midPriority, check);

// firstTodo.push(projects);

// console.log(todos);


// // Setting todos as complete
// function todoComplete() {
//     check = !check;
// }


// // Changing todo priority

// const topPriority = red;
// const midPriority = orange;
// const lightProprity = green;

// // function changePriority() {
// //     if() {

// //     }
// // }



// // Create new Project
// // function createProject(project) {
// //     let (project) = [];
// //     (project).push(todos);

// //     return project;   
// // }

const newTodo = document.querySelector('.new-todo');
const cancelButton = document.querySelector('.cancel-button');
const popUpForm = document.querySelector('.pop-up-form');

function popUp() {
    popUpForm.style.display = 'flex';
}

function closePopUP() {
    popUpForm.style.display = 'none';
}

cancelButton.addEventListener('click', closePopUP);
newTodo.addEventListener('click', popUp);