/*--------------------------------------------------
Overlays
---------------------------------------------------*/
/** 
 * Opens the add task overlay and sets the board-column where a new task will be rendered.
 * @param {string} columnID - The ID of the board-column.
 * @param {Object} presetContactIndex - An optional contact for a pre-checked contact entry.
 */
async function openAddTaskOverlay(columnID = 'board-column-todo', presetContactIndex = -1) {
  freezeBackground('addtask-overlay-fullscreen');
  //renderAddTaskCard();
  showElement('addtask-card');
  showElement('addtask-create-btn-mobile');
  slideInOverlay('addtask-card');
  slideInOverlay('addtask-create-btn-mobile');
  await renderContactsForAddTaskDropDown(presetContactIndex);
  renderCategoriesForAddTaskDropDown();
  setMinDate('addtask-dueDate-input');
  renderAddTaskLightButton();
  renderAddTaskMobileCreateButton();

  boardColumnToAddTask = columnID;
  localStorage.setItem('boardColumnToAddTask', boardColumnToAddTask);
}


/** Closes Add Task Overlay. */
function closeAddTaskOverlay() {
  if (addTaskOverlayIsClosed()) return;

  hideOverlay('addtask-card');
  hideOverlay('addtask-create-btn-mobile');
  setTimeout(() => {
    removeElement('addtask-create-btn-mobile');
    removeElement('addtask-card');
    unfreezeBackground('addtask-overlay-fullscreen');
  }, 220);
  resetInputFields();
  if (checkUrl('board.html')) {
    renderBoardColumns();
  }
}


/** 
 * Checks if add task overlay is already closed.
 * @returns {boolean} - true if add task overlay is closed, false otherwise.
 */
function addTaskOverlayIsClosed() {
  return document.getElementById('addtask-card').classList.contains('d-none');
}


/*--------------------------------------------------
Show / Hide
---------------------------------------------------*/
/** Function to show an element with a given ID by removing the 'd-none' and 'hidden' classes.
 * @param {string} id - The ID of the element to show.
 */
function showElement(id) {
  document.getElementById(id).classList.remove("d-none");
  document.getElementById(id).classList.remove("hidden");
}

/** Function to hide an element with a given ID by adding the 'hidden' class.
 * @param {string} id - The ID of the element to hide.
 */
function hideElement(id) {
  document.getElementById(id).classList.add("hidden");
}

/** Function to hide an element with a given ID by adding the 'd-none' class.
 * @param {string} id - The ID of the element to hide.
 */
function hideElementDisplay(id) {
  document.getElementById(id).classList.add("d-none");
}

/** Function to remove an element with a given ID by adding the 'd-none' class.
 * @param {string} id - The ID of the element to remove.
 */
function removeElement(id) {
  document.getElementById(id).classList.add("d-none");
}

/** Function to show an overlay with a given ID by adding the 'show-overlay' class.
 *  @param {string} id - The ID of the overlay to show.
 */
function showOverlay(id) {
  document.getElementById(id).classList.add("show-overlay");
}

/** Function to hide an overlay with a given ID by removing the 'show-overlay' class.
 * @param {string} id - The ID of the overlay to hide.
 */
function hideOverlay(id) {
  document.getElementById(id).classList.remove("show-overlay");
}

/** Function to show an overlay with a given ID for a short time and then hide it.
 * @param {string} id - The ID of the overlay to show and hide.
 */
function showThenHideOverlay(id) {
  setTimeout(() => {
    showOverlay(id);
  }, 500);
  setTimeout(() => {
    hideOverlay(id);
  }, 2500);
}

/** Slides in an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to slide in.
 */
function slideInOverlay(id) {
  setTimeout(() => {
    showOverlay(id);
  }, 100);
}

/** Freezes the background scrolling and shows an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to show.
 */
function freezeBackground(id) {
  showElement(id);
  document.getElementById("body").classList.add("no-scrolling");
}

/** Unfreezes the background scrolling and hides an overlay element with the specified ID.
 * @param {string} id - The ID of the overlay element to hide.
 */
function unfreezeBackground(id) {
  removeElement(id);
  document.getElementById("body").classList.remove("no-scrolling");
}

/** Stops the propagation of an event to its parent elements.
 * @param {Event} event The event object.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/** Closes a Dropdown menu.
 * @param {string} id - The ID of the menu element to close.
 */
function closeDropDown(id) {
  document.getElementById(id).classList.remove("collapsed");
}

/**
* Opens a Dropdown menu.
* @param {string} id - The ID of the menu element to open.
*/
function openDropDown(id) {
  document.getElementById(id).classList.add('collapsed');
}