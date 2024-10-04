// Get elements from the DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);

// Add task event listener
addTaskBtn.addEventListener('click', addTask);

// Function to add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);
    saveTaskToLocalStorage(taskText);
    taskInput.value = '';
  }
}

// Function to load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(taskText => {
    const listItem = createTaskElement(taskText);
    taskList.appendChild(listItem);
  });
}

// Function to create task HTML element
function createTaskElement(taskText) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <span>${taskText}</span>
    <button class="delete-btn">Delete</button>
  `;
  
  // Add delete functionality
  listItem.querySelector('.delete-btn').addEventListener('click', function() {
    taskList.removeChild(listItem);
    deleteTaskFromLocalStorage(taskText);
  });

  return listItem;
}

// Function to save a task to localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to delete a task from localStorage
function deleteTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks = tasks.filter(task => task !== taskText);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


document.addEventListener('DOMContentLoaded', () => {
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    navToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});