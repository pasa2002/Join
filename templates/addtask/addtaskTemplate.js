/**
 * Toggles a Dropdown menu.
 * @param {string} id - The ID of the dropdown element.
 */
function toggleActiveForDropDown(id) {
  document.getElementById(id).classList.toggle("collapsed");
}


/*--------------------------------------------------
Assigned contacts
---------------------------------------------------*/
/** 
* Renders the contact list for the add task dropdown menu. 
* @param {Object} presetContactIndex - An optional contact for a pre-checked contact entry.
*/
async function renderContactsForAddTaskDropDown(presetContactIndex = -1) {
  const contactScrollContainer = document.getElementById(`addtask-assigned-contacts-container`);
  const contactList = document.getElementById(`addtask-assigned-contact-list`);
  clearElement(`addtask-assigned-contact-list`);

  for (let i = 0; i < activeUser.contacts.length; i++) {
      const checkedIfPresetContact = (i === presetContactIndex);
      contactList.innerHTML += getHTMLForDropDownContact(i, checkedIfPresetContact);
  }

  contactScrollContainer.scrollTop = 0;
}


/** 
* Renders a single contact with checkbox input for the add task dropdown menu.
* @param {number} contactIndex - The contact index in the 'activeUser.contacts' array.
* @param {boolean} checked - Determines if the contact is already checked.
*/
function getHTMLForDropDownContact(contactIndex, checked) {
  const contact = activeUser.contacts[contactIndex];
  const checkedOrEmpty = checked ? 'checked' : '';
  return /*html*/`
      <label for="addtask-assigned-contact-checkbox-${contactIndex}" class="addtask-assigned-contact">
          <span>${contact.name}</span>
          <input id="addtask-assigned-contact-checkbox-${contactIndex}" type="checkbox" ${checkedOrEmpty}>
      </label>
  `;
}


/*--------------------------------------------------
Categories
---------------------------------------------------*/
/** Renders the category list for the add task dropdown menu. */
async function renderCategoriesForAddTaskDropDown() {
  const categoryScrollContainer = document.getElementById(`addtask-category-container`);
  const categoryList = document.getElementById(`addtask-category-list`);
  clearElement(`addtask-category-list`);

  for (let i = 0; i < activeUser.categories.length; i++) {
      categoryList.innerHTML += getHTMLForDropDownCategory(i);
  }

  categoryScrollContainer.scrollTop = 0;
}


/** 
* Renders a single category with onclick selection for the add task dropdown menu.
* @param {number} categoryIndex - The category index in the 'activeUser.categories' array.
*/
function getHTMLForDropDownCategory(categoryIndex) {
  const category = activeUser.categories[categoryIndex];
  return /*html*/`
      <div id="addtask-category-${category.name}" onclick="selectTaskCategory(${categoryIndex})" class="addtask-category">
          <div class="addtask-category-color color-cicle img-20 bg-${category.color}"></div>
          <span>${category.name}</span>
      </div>
  `;
}


/** 
* Selects a category from the add task dropdown menu and closes the menu.
* @param {number} categoryIndex - The category index in the 'activeUser.categories' array.
*/
function selectTaskCategory(categoryIndex) {
  // const category = activeUser.categories[categoryIndex];
  document.getElementById('select-task-category').innerHTML = `
      <div class="addtask-category-color color-cicle img-20 bg-${category[categoryIndex].color}"></div>
      <span>${category[categoryIndex].name}</span>
  `;
  closeDropDown('addtask-category-dropdown');
  selectCategory = categoryIndex;
}


/** Opens an input field and a color picker for defining a new category. */
function openNewCategoryInput() {
  removeElement('select-task-category');
  showElement('define-task-category');
  showElement('color-pick');
  closeDropDown('addtask-category-dropdown');
}


/** Closes the new category input field and the corresponding color picker. */
function closeNewCategoryInput() {
  let input = document.getElementById('new-category-input');
  let selectedColor = document.getElementById('color-selected');
  input.value = '';
  selectedColor.classList.remove(`bg-${categoryColorPick}`);
  categoryColorPick = undefined;
  hideElement('color-selected');
  removeElement('define-task-category');
  removeElement('color-pick');
  showElement('select-task-category');
}


/** Sets the color for a new category, called by click on the color picker. */
function addColorCategory(colorId) {
  const colorElement = document.getElementById('color-selected');
  colorElement.classList = `color-cicle addtask-category-color img-20 bg-${colorId}`;
  categoryColorPick = colorId;
}


/** Saves the new category, closes the input field, opens the dropdown menu and scrolls to bottom. */
async function saveNewCategory() {
  let inputValue = document.getElementById('new-category-input').value;
  if (categoryColorPick !== undefined && inputValue !== '') {
      const cat = { name: inputValue, color: categoryColorPick };
      // activeUser.categories.push(cat);
      category.push(cat);

      closeNewCategoryInput();
      renderCategoriesForAddTaskDropDown();
      openDropDown('addtask-category-dropdown');
      scrollToNewCategory();
  }
}


/** Scrolls to bottom of the add task dropdown menu. */
function scrollToNewCategory() {
  const categoryScrollContainer = document.getElementById(`addtask-category-container`);
  const numberOfRows = category.length + 1;
  const numberOfVisibleRows = 3;
  const rowHeight = 51;
  const numberOfRowsToScrollDown = numberOfRows - numberOfVisibleRows;

  categoryScrollContainer.scrollTop = numberOfRowsToScrollDown * rowHeight;
}


/*--------------------------------------------------
Priority
---------------------------------------------------*/
/**
* Activates the button of the specified priority level.
* @param {number} prioAsNumber - The priority level as a number.
* @param {string} [idPrefix='edit'] - The id prefix determining which priority buttons to activate.
*/
function activatePrioButton(prioAsNumber, idPrefix = 'edit') {
  deactivatePrioButtons(idPrefix);
  document.getElementById(`${idPrefix}-prio-btn-${getPriorityAsString(prioAsNumber).toLowerCase()}`).classList.add('active');
}


/**
* Deactivates the buttons of the specified priority levels. 
* @param {string} [idPrefix='edit'] - The id prefix determining which priority buttons to deactivate.
*/
function deactivatePrioButtons(idPrefix = 'edit') {
  document.getElementById(`${idPrefix}-prio-btn-urgent`).classList.remove('active');
  document.getElementById(`${idPrefix}-prio-btn-medium`).classList.remove('active');
  document.getElementById(`${idPrefix}-prio-btn-low`).classList.remove('active');
}


/**
* Returns the priority level by checking which priority button is active.
* @param {string} [idPrefix='edit'] - The id prefix determining which priority buttons to check.
* @returns {number} prioAsNumber - The priority level as a number.
*/
function getPrioViaActiveButton(idPrefix = 'edit') {
  if (document.getElementById(`${idPrefix}-prio-btn-urgent`).classList.contains('active')) return 2;
  else if (document.getElementById(`${idPrefix}-prio-btn-medium`).classList.contains('active')) return 1;
  else if (document.getElementById(`${idPrefix}-prio-btn-low`).classList.contains('active')) return 0;
  else return undefined;
}


/**
* Returns the name of the specified priority level.
* @param {number} prioAsNumber - The priority level as a number.
* @returns {string} - The priority level as a string.
*/
function getPriorityAsString(prioAsNumber) {
  switch (prioAsNumber) {
      case 0:
          return 'Low';
      case 1:
          return 'Medium';
      case 2:
          return 'Urgent';
      default:
          return 'No priority defined';
  }
}


/*--------------------------------------------------
Subtasks
---------------------------------------------------*/
/** Activates subtask input field. */
function activateSubtaskInput() {
  removeElement('subtask-img-add');
  showElement('subtask-img-active');
}


/** Deactivates and clears subtask input field. */
function deactivateSubtaskInput() {
  removeElement('subtask-img-active');
  showElement('subtask-img-add');
  document.getElementById('new-subtask-input').value = '';
}


/** Saves and renders a new subtask, clears the input field. */
function saveNewSubtask() {
  let input = document.getElementById('new-subtask-input');
  subtasks.push({
      name: input.value,
      done: false
  });
  input.value = '';
  renderSubtaskArray();
}


/** Renders temporary subtasks. */
function renderSubtaskArray() {
  const subtaskList = document.getElementById('subtask-list');
  subtaskList.innerHTML = '';

  for (let i = 0; i < subtasks.length; i++) {
      const subtask = subtasks[i];
      subtaskList.innerHTML += /*html*/`
          <div>
              <input type="checkbox" name="" id="subtask-checkbox-${i}">
              <label for="subtask-checkbox-${i}">${subtask.name}</label>
          </div>
      `;
  }
}


/*--------------------------------------------------
Buttons
---------------------------------------------------*/
/** Renders the "Clear"-/"Cancel"-button for the add task form. */
function renderAddTaskLightButton() {
  document.getElementById('addtask-light-btn-text').innerHTML = addTaskIsOpenAsOverlay() ? 'Cancel' : 'Clear';
}


/**
* Checks if the add task form is opened as overlay (and not via site).
* @returns {boolean} - true if the add task form is opened as overlay, false otherwise.
*/
function addTaskIsOpenAsOverlay() {
  return !window.location.pathname.endsWith('addtask.html');
}


/** Renders the mobile version of the "Create"-button for the add task form. */
function renderAddTaskMobileCreateButton() {
  const element = document.getElementById('addtask-create-btn-mobile');

  if (addTaskIsOpenAsOverlay()) {
      element.style.transform = 'translateX(100vw)';
      element.style.transition = 'all 220ms ease-in-out';
  }
  else {
      element.style.transform = 'unset';
      element.style.transition = 'unset';
  }
}