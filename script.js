// script.js
// Section 1: TODOs
// TODO: Register submissions from the user on the form.
// TODO: Determine the value of the data submitted and add it to a JavaScript array calle
// TODO: Call the render function to update the table with the new tasks.

const taskForm = document.getElementById("taskForm");
const taskTable = document.getElementById("taskTable");

// script.js
// Section 2: App State Variables
let tasks = [];

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
        deadline: taskDeadline
    });

    render();
}
// Function to render tasks in the table
function render() {
    console.log(tasks)
    // TODO: Use array methods to create a new table row of data for each item in the arr
    taskTable.innerHTML = tasks.map(task => `
        <tr>
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.deadline}</td>
            <td><button onclick="markTaskComplete(this)">Complete</button></td>
            <td><button onclick="removeTask(this)">Remove</button></td>
        </tr>
    `).join(' ');
}

// Function to initialize the table
function init() {
    taskTable.innerHTML = ''; // Clear the table
    tasks = []; // Reset the tasks array
    render(); // Call the render function
    taskForm.addEventListener("submit", handleSubmission);
}

init();