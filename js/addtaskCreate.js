/**
 * Creates and saves a new task.
 * Handles collecting input data, validating input fields, and adding the task to the user's tasks.
 */
async function addTask() {
  await saveCheckedContacts();
  await setCheckedSubtasksAsDone();
  const newTask = getNewTaskObjectFromInput();

  if (checkRelevantInputFields(newTask)) {
      activeUser.tasks.push(newTask);
      await saveUserData();
      closeOrResetAddTask();
      if (!addTaskIsOpenAsOverlay()) {
          showThenHideOverlay('task-successfully-added');
      }
      window.location.href = 'board.html';
  }
}

/**
* Saves checked contacts from the add task form into the 'contacts' array.
*/
async function saveCheckedContacts() {
  let contactsArray = activeUser.contacts;

  for (let i = 0; i < contactsArray.length; i++) {
      const contact = contactsArray[i];
      const contactCheckbox = document.getElementById(`addtask-assigned-contact-checkbox-${i}`);

      if (contactCheckbox.checked) {
          contacts.push(contact);
      }
  }
}

/**
* Synchronizes the 'done' status of subtask objects with their corresponding checkbox elements.
*/
async function setCheckedSubtasksAsDone() {
  for (let i = 0; i < subtasks.length; i++) {
      const subtask = subtasks[i];
      const subtaskCheckbox = document.getElementById(`subtask-checkbox-${i}`);

      if (subtaskCheckbox.checked) {
          subtask.done = true;
      }
  }
}

/**
* Creates a new task object using input values from the add task form.
* @returns {Object} - The new task object.
*/
function getNewTaskObjectFromInput() {
  const newTask = {
      "title": document.getElementById('addtask-title-input').value,
      "description": document.getElementById('addtask-description-input').value,
      "dueDate": document.getElementById('addtask-dueDate-input').value,
      "prio": getPrioViaActiveButton('addtask'),
      "category": category[selectCategory],
      "assignedTo": contacts,
      "subtasks": subtasks,
      "boardColumn": localStorage.getItem('boardColumnToAddTask'),
  };
  return newTask;
}

/**
* Checks the add task input fields for content (form validation).
* @param {Object} newTask - The new task object to be checked.
* @returns {boolean} - True if input fields are valid, false otherwise.
*/
function checkRelevantInputFields(newTask) {
  return newTask.title.trim() &&
      newTask.description.trim() &&
      newTask.category &&
      newTask.dueDate.trim() &&
      newTask.prio !== undefined;
}

/**
* Sets a red frame around all unfilled input fields in the add task form.
* Uses validation functions to highlight invalid input fields.
*/
function putFrameAroundUnfilledInputFields() {
  const newTask = getNewTaskObjectFromInput();
  putFrameAroundUnfilledInput('addtask-title-input', newTask.title.trim());
  putFrameAroundUnfilledInput('addtask-description-input', newTask.description.trim());
  putFrameAroundUnfilledInput('addtask-category-dropdown', newTask.category);
  putFrameAroundUnfilledInput('addtask-dueDate-input', newTask.dueDate);
  putFrameAroundUnfilledInput('addtask-prio', (newTask.prio !== undefined));
}

/**
* Sets a red frame around a specified input field in the add task form if its input value is invalid.
* @param {string} idToBeFramed - The id of the input field to be framed.
* @param {boolean} valueToBeChecked - The value to be checked.
*/
function putFrameAroundUnfilledInput(idToBeFramed, valueToBeChecked) {
  const element = document.getElementById(idToBeFramed);

  if (!valueToBeChecked) {
      element.classList.add('border-red');
  } else {
      element.classList.remove('border-red');
  }
}
