/**
 * Closes the add task form if displayed as an overlay, or resets the form if displayed on the site.
 */
function closeOrResetAddTask() {
  if (addTaskIsOpenAsOverlay()) {
      closeAddTaskOverlay();
  } else {
      resetInputFields();
  }
}

/**
* Resets all input fields within the add task form.
* Clears the form fields and resets various UI elements.
*/
async function resetInputFields() {
  document.getElementById('addtask-title-input').value = '';
  document.getElementById('addtask-description-input').value = '';
  closeNewCategoryInput();
  document.getElementById('select-task-category').innerHTML = 'Select task category';
  document.getElementById('addtask-dueDate-input').value = '';
  uncheckAllContacts();
  removeRedFramesFromUnfilledInputFields();
  deactivatePrioButtons('addtask');
  await resetArrays();
}

/**
* Unchecks all contacts in the add task form.
* Iterates through contacts and unchecks the associated checkboxes.
*/
function uncheckAllContacts() {
  for (let i = 0; i < activeUser.contacts.length; i++) {
      const contactCheckbox = document.getElementById(`addtask-assigned-contact-checkbox-${i}`);
      contactCheckbox.checked = false;
  }
}

/**
* Removes red border frames from unfilled input fields in the add task form.
* Removes 'border-red' class from various input fields.
*/
async function removeRedFramesFromUnfilledInputFields() {
  document.getElementById('addtask-title-input').classList.remove('border-red');
  document.getElementById('addtask-description-input').classList.remove('border-red');
  document.getElementById('addtask-category-dropdown').classList.remove('border-red');
  document.getElementById('addtask-dueDate-input').classList.remove('border-red');
  document.getElementById('addtask-prio').classList.remove('border-red');
}

/**
* Resets temporary arrays used in the add task form.
* Clears and initializes arrays for subtasks, contacts, and tasks.
*/
async function resetArrays() {
  subtasks = [];
  await setItem('subtasks', JSON.stringify(subtasks));
  renderSubtaskArray();

  contacts = [];
  tasks = [];
  selectCategory = undefined;
}
