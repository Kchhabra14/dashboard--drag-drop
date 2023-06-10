// Select all swim lanes on the board
const swimLanes = document.querySelectorAll(".swim-lane");

// Loop through each swim lane
swimLanes.forEach((swimLane) => {
  // Get the add task button, task input, and task list for the current swim lane
  const addTaskButton = swimLane.querySelector(".add-task-btn");
  const taskInput = swimLane.querySelector(".task-input");
  const taskList = swimLane.querySelector(".task-list");
  const resetButton = swimLane.querySelector(".reset-btn");

   // Store the original tasks
   const originalTasks = Array.from(taskList.children);

  // Add event listener to the add task button
  addTaskButton.addEventListener("click", () => {
    // Get the trimmed value from the task input field
    const taskName = taskInput.value.trim();

    // Check if the task name is not empty
    if (taskName !== "") {
      // Create a new task element with the task name
      const task = createTaskElement(taskName);

      // Append the task element to the task list
      taskList.appendChild(task);

      // Clear the task input field
      taskInput.value = "";
    }
  });

  resetButton.addEventListener("click", () => {
    // Clear the task list
    taskList.innerHTML = "";

    // Restore the original tasks
    originalTasks.forEach((task) => {
      taskList.appendChild(task);
    });
  });

  // Function to create a new task element
  function createTaskElement(name) {
    // Create a div element for the task
    const task = document.createElement("div");
    task.classList.add("task");
    task.draggable = true;

    // Create a span element for the task text
    const taskText = document.createElement("span");
    taskText.classList.add("task-text");
    taskText.textContent = name;

    // Append the task text to the task element
    task.appendChild(taskText);

    // Add event listeners for drag and drop functionality
    task.addEventListener("dragstart", () => {
      task.classList.add("is-dragging");
    });

    task.addEventListener("dragend", () => {
      task.classList.remove("is-dragging");
    });

    // Return the created task element
    return task;
  }
});



