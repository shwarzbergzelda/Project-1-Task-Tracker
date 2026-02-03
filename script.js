// script.js
// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array calle
// TODO: Call the render function to update the table with the new tasks.
const deleteIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';

const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

// script.js
// Section 2: App State Variables
const savedTasks = localStorage.getItem("tasks");
let tasks = savedTasks ? JSON.parse(savedTasks) : []

// Function to handle form submissions
function handleSubmission(event) {
    event.preventDefault(); // this function stops our form from reloading the page
   
    // TODO: Get form input values
    const taskName = document.getElementById("taskName").value;
    const taskDescription = document.getElementById("taskDescription").value;
    const taskDeadline = document.getElementById("taskDeadline").value;
    
    // TODO: Validate input fields
    if (!taskName.trim() || !taskDeadline) {
        alert("Task name and deadline are required fields.");
        return;
    }
    // TODO: Update the tasks array
    tasks.push({
        name: taskName,
        description: taskDescription,
        deadline: taskDeadline,
        completed: false,
        showDescription: true
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    render();
    taskForm.reset();
}
// Function to render tasks in the table
function render() {
    // TODO: Use array methods to create a new table row of data for each item in the arr
    taskTable.innerHTML = tasks.map((task, index) => `
        <tr class= ${task.completed ? 'taskCompleted' : ''}>
            <td><input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleCompletion(${index})"></td>
            <td>${task.name}</td>
            <td>${task.deadline}</td>
            <td class="deleteButton" onclick="removeTask(${index})">${deleteIcon}</td>
        </tr>
        ${task.description ? `
            <tr class = ${task.completed ? 'taskCompleted' : ''}>
                <td></td>
                <td class="taskDescriptionCell" colspan="2">
                    <div class="descriptionSlide ${task.showDescription ? 'open' : ''}" onclick="toggleDescription(${index})" role="button" tabindex="0">
                    ${!task.showDescription ? '<span class="descriptionLabel">Description</span>' : ''}
                    <div class="descriptionContent">${task.description}</div>
                    </div>
                </td>
            </tr>
        ` : ''}
        
    `).join(' ');
}

function toggleDescription(taskIndex) {
    if (tasks[taskIndex]) {
        tasks[taskIndex].showDescription = !tasks[taskIndex].showDescription;
        render();
    }
}

function toggleCompletion(taskIndex) {
    if (tasks[taskIndex]) {
        tasks[taskIndex].completed = !tasks[taskIndex].completed;
        render();
    }
}

function removeTask(taskIndex) {
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    render();
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ''; // Clear the table
    render(); // Call the render function
    taskForm.addEventListener("submit", handleSubmission);
}

init();