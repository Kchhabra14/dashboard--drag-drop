// Select all draggable tasks and droppable swim lanes
const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swim-lane");

// Add drag and drop event listeners to the draggable tasks
draggables.forEach((task) => {
  // Add class "is-dragging" when the drag starts
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
  });

  // Remove class "is-dragging" when the drag ends
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
  });
});

// Add drag and drop event listeners to the droppable swim lanes
droppables.forEach((zone) => {
  // Prevent the default dragover behavior and handle the drop event
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    // Get the current dragged task and the task list in the swim lane
    const curTask = document.querySelector(".is-dragging");
    const taskList = zone.querySelector(".task-list");

    // Append the dragged task to the task list if it's not already there
    if (!taskList.contains(curTask)) {
      taskList.appendChild(curTask);
      showSuccessToaster();
    }

    // Get an array of all tasks in the task list
    const tasks = Array.from(taskList.querySelectorAll(".task"));

    // Get the current mouse position
    const mouseY = e.clientY;

    // Find the closest task to the current mouse position
    const closestTask = getClosestTask(tasks, mouseY, curTask);

    // Move the dragged task based on its position relative to the closest task
    if (closestTask && closestTask !== curTask) {
      const taskRect = closestTask.getBoundingClientRect();
      const offset = mouseY - taskRect.top;

      if (offset < taskRect.height / 2) {
        taskList.insertBefore(curTask, closestTask);
      } else {
        taskList.insertBefore(curTask, closestTask.nextSibling);
      }
    }
  });

  // Add class "is-drag-over" when a task enters the swim lane
  zone.addEventListener("dragenter", (e) => {
    e.target.classList.add("is-drag-over");
  });

  // Remove class "is-drag-over" when a task leaves the swim lane
  zone.addEventListener("dragleave", (e) => {
    e.target.classList.remove("is-drag-over");
  });

  // Remove class "is-drag-over" when a task-div is dropped in the swim lane
  zone.addEventListener("drop", (e) => {
    e.target.classList.remove("is-drag-over");
  });
});

// Function to find the closest task-div to the current mouse position
function getClosestTask(tasks, mouseY, curTask) {
  let closestTask = null;
  let minDistance = Infinity;

  for (const task of tasks) {
    if (task === curTask) continue;
    const taskRect = task.getBoundingClientRect();
    const taskCenterY = taskRect.top + taskRect.height / 2;
    const distance = Math.abs(mouseY - taskCenterY);

    if (distance < minDistance) {
      minDistance = distance;
      closestTask = task;
    }
  }

  return closestTask;
}

function showSuccessToaster() {
  // Create the toaster element
  const toaster = document.createElement('div');
  toaster.classList.add('toaster');
  toaster.textContent = 'Moved Successfully!';

  // Append the toaster to the document body
  document.body.appendChild(toaster);

  // Remove the toaster after a certain duration (e.g., 3 seconds)
  setTimeout(() => {
    toaster.remove();
  }, 3000);
}
