// ----------------- To-Do Function --------------
document.addEventListener('DOMContentLoaded', () => {
    // Get references to the input field, add task button, and task list container
    const taskInput = document.getElementById('newtask');
    const addTaskButton = document.getElementById('addtask');
    const taskList = document.getElementById('tasklist');

    // Function to load tasks from localStorage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => createTaskElement(task));
    }

    // Function to save the current tasks to localStorage
    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll('#tasklist li').forEach(taskElement => {
            tasks.push({
                text: taskElement.querySelector('input[type="text"]').value,
                completed: taskElement.querySelector('input[type="checkbox"]').checked
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to create a task element and add it to the task list
    const createTaskElement = task => {
        const li = document.createElement('li');

        // Create and configure the task text input
        const taskText = document.createElement('input');
        taskText.type = 'text';
        taskText.value = task.text.trim();
        taskText.disabled = true; 

        // Create and configure the edit button
        const editButton = document.createElement('button');
        editButton.className += 'task-btn';
        editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
        editButton.onclick = () => {
            if (taskText.disabled) {
                taskText.disabled = false;
                editButton.innerHTML = `<i class="fa-solid fa-floppy-disk"></i>`;
            } else {
                taskText.disabled = true;
                editButton.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
                saveTasks();
            }
        }

        // Create and configure the delete button
        const deleteButton = document.createElement('button');
        deleteButton.className += 'task-btn';
        deleteButton.innerHTML = `<i class="fa-solid fa-trash"></i>`;
        deleteButton.onclick = () => {
            taskList.removeChild(li); 
            saveTasks();
        }

        // Create and configure the task completion checkbox
        const taskCheckbox = document.createElement('input');
        taskCheckbox.type = 'checkbox';
        taskCheckbox.checked = task.completed;
        taskCheckbox.classList.add('checkbox');
        taskCheckbox.onchange = () => {
            taskText.classList.toggle('completed', taskCheckbox.checked);
            saveTasks();
        }

        // Apply the completed class if the task is marked as completed
        if (task.completed) {
            taskText.classList.add('completed');
        }

        // Append the created elements to the list item
        li.appendChild(taskCheckbox);
        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        // Append the list item to the task list
        taskList.appendChild(li);
    }

    // Add a new task when the add task button is clicked
    addTaskButton.onclick = () => {
        if (taskInput.value.trim() === '') {
            alert('Task cannot be empty');
            return;
        }

        const task = {
            text: taskInput.value,
            completed: false
        };

        createTaskElement(task);
        saveTasks();
        taskInput.value = '';
    }

    loadTasks(); // Load tasks from localStorage when the page loads
});

// ===================== Button ==================
const container = document.querySelector('.container');
const btnpopup = document.querySelector('.btntodo-popup');
const iconClose = document.querySelector('.icon-close');

// Show the task popup when the add task button is clicked
btnpopup.addEventListener('click', () => {
    container.classList.add('active-popup');
});

// Hide the task popup when the close icon is clicked
iconClose.addEventListener('click', () => {
    container.classList.remove('active-popup');
});
