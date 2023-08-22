/**
 * Opens the board card overlay for the specified task index.
 * @param {number} taskIndex - The index of the task to display.
 */
function openBoardCardOverlay(taskIndex) {
    let task = activeUser.tasks[taskIndex];
    freezeBackground('addtask-overlay-fullscreen');
    renderBoardCardOverlay(task);
    showElement('board-card');
}

/**
 * Closes the board card overlay and shows the board columns.
 */
function closeBoardCardOverlay() {
    removeElement('board-card');
    removeElement('board-card-edit');
    unfreezeBackground('addtask-overlay-fullscreen');
    renderBoardColumns();
}

/**
 * Renders the board card overlay using the specified task.
 * @param {Object} task - The task object to display in the overlay.
 */
function renderBoardCardOverlay(task) {
    console.log(task)
    document.getElementById('category').innerHTML = task.category.name;
    console.log(task.category.name)
    document.getElementById('category').classList = `board-card-category mobile-category fs-27 fw-400 mb-25 mobile-mb-32 bg-${task.category.color}`;
    document.getElementById('title').innerHTML = task.title;
    document.getElementById('description').innerHTML = task.description;
    document.getElementById('dueDate').innerHTML = task.dueDate;
    document.getElementById('prio-container-board').classList = `prio-container-board bg-${getPriorityAsString(task.prio).toLowerCase()} ml-25`;
    document.getElementById('priority').innerHTML = getPriorityAsString(task.prio);
    document.getElementById('priority-icon').src = `../../assets/img/prio-${task.prio}_white.svg`;
    document.getElementById('assignedTo').innerHTML = renderAssignedContactsForOverlay(task);
    if (task.subtasks.length) {
        renderSubtaskCheckboxes(task);
    }
    setBoardCardButtons(task);
}

/**
 * Renders the assigned contacts for the board card overlay.
 * @param {Object} task - The task object to render the contacts for.
 * @returns {string} - The HTML string for the assigned contacts section of the overlay.
 */
function renderAssignedContactsForOverlay(task) {
    let html = '<span class="fs-21 fw-400 mobile-fs-16">No assigned contacts yet</span>';

    if (task.assignedTo.length) {
        html = '';
        for (let i = 0; i < task.assignedTo.length; i++) {
            const contact = task.assignedTo[i];
            html += `
                <div class="assigned-contact">
                    <div class="contact-icon contact-overlay-icon-board fs-16 fw-400 mobile-fs-16 ${contact.color}">
                        ${getInitials(contact)}
                    </div>
                    <span class="fs-21 fw-400 mobile-fs-16">${contact.name}</span>
                </div>
            `;
        }
    }

    return html;
}


/**
 * Sets up the event handlers for the buttons in the board card overlay.
 * @param {Object} task - The task object to set up the buttons for.
 */
function setBoardCardButtons(task) {
    let index = activeUser.tasks.indexOf(task);
    document.getElementById('board-card-btn-edit').onclick = () => {
        openBoardCardEditing(index);
    };
    document.getElementById('board-card-btn-delete').onclick = () => {
        deleteTask(index);
        closeBoardCardOverlay();
        renderBoardColumns();
        saveUserData();
    };
}


/**
 * Opens the board card edit overlay for the specified task index.
 * @param {number} taskIndex - The index of the task to edit.
 */
function openBoardCardEditing(taskIndex) {
    removeElement('board-card');
    showElement('board-card-edit');
    renderBoardCardEditing(taskIndex);
}


/**
 * Renders the board card edit overlay for the specified task index.
 * @param {number} taskIndex - The index of the task to edit.
 */
function renderBoardCardEditing(taskIndex) {
    let task = activeUser.tasks[taskIndex];
    document.getElementById('title-edit-input').value = task.title;
    document.getElementById('description-edit-input').value = task.description;
    document.getElementById('dueDate-edit-input').value = task.dueDate;
    setMinDate('dueDate-edit-input');
    activatePrioButton(task.prio);
    renderContactsForEditDropDown(taskIndex);
    renderAssignedContactsForEditing(task);
    setEditTaskSubmitButton(taskIndex);
}


/**
 * Renders the assigned contacts for the board card edit overlay.
 * @param {Object} task - The task object to render the contacts for.
 */
function renderAssignedContactsForEditing(task) {
    let container = document.getElementById('assignedTo-icons');
    container.innerHTML = '';
    for (let i = 0; i < task.assignedTo.length; i++) {
        const contact = task.assignedTo[i];
        container.innerHTML += `
            <div class="contact-icon contact-icon-board fs-12 fw-400 ${contact.color}">
                ${getInitials(contact)}
            </div>
        `;
    }
}


/**
 * Renders the subtasks checkboxes for the board card edit overlay.
 * @param {Object} task - The task object to render the subtasks for.
 */
function renderSubtaskCheckboxes(task) {
    let subtaskContainer = document.getElementById('board-card-subtasks');

    subtaskContainer.innerHTML = 'Subtasks';
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i];
        const subtaskChecked = subtask.done ? 'checked' : '';

        subtaskContainer.innerHTML += /*html*/`
            <label for="board-card-subtask-checkbox-${i}" class="board-card-subtask-checkbox fw-400" onclick="setStatusOfSubtasks(${activeUser.tasks.indexOf(task)})">
                <input type="checkbox" name="" id="board-card-subtask-checkbox-${i}" ${subtaskChecked}>
                <span>${subtask.name}</span>
            </label>
        `;
    }
}


/**
 * Sets checked Subtasks as "done" 
 * @param {number} taskIndex - The index of the task containing the subtasks.
 * */
async function setStatusOfSubtasks(taskIndex) {
    let task = activeUser.tasks[taskIndex];
    for (let i = 0; i < task.subtasks.length; i++) {
        const subtask = task.subtasks[i];
        subtask.done = document.getElementById(`board-card-subtask-checkbox-${i}`).checked;
    }
}

/*--------------------------------------------------
Shared Category Functions
---------------------------------------------------*/
/** Renders the category list for the add task dropdown menu. */
function renderCategoriesForBoardDropDown(){
    const categoryScrollContainer = document.getElementById(`addtask-category-container-edit-board`)
    const categoryList = document.getElementById(`addtask-category-list-edit-board`);
    clearElement(`addtask-category-list-edit-board`);

    for (let i = 0; i < activeUser.categories.length; i++) {
        categoryList.innerHTML += getHTMLForDropDownCategoryBoard(i);
    }
    categoryScrollContainer.scrollTop = 0;
}

function getHTMLForDropDownCategoryBoard(categoryIndex){
    const category = activeUser.categories[categoryIndex];
    return `
    <div data-category-name="${category.name}" data-category-color="${category.color}" onclick="selectTaskCategoryBoard(${categoryIndex})" class="addtask-category">
        <div class="addtask-category-color color-cicle img-20 bg-${category.color}"></div>
        <span>${category.name}</span>
    </div>
    `;
}



function selectTaskCategoryBoard(categoryIndex){
    document.getElementById('select-task-category-board').innerHTML = `
    <div class="addtask-category-color color-cicle img-20 bg-${category[categoryIndex].color}"></div>
    <span>${category[categoryIndex].name}</span>
`;
closeDropDown('category-edit-dropdown-board');
selectCategory = categoryIndex;
console.log(selectCategory)
}

/** Opens an input field and a color picker for defining a new category. */
function openNewCategoryInputBoard() {
    removeElement('select-task-category-board');
    showElement('define-task-category-board');
    showElement('color-pick-board');
    closeDropDown('category-edit-dropdown-board');
}

/** Closes the new category input field and the corresponding color picker. */
function closeNewCategoryInputBoard() {
    let input = document.getElementById('new-category-input-board');
    let selectedColor = document.getElementById('color-selected-board');
    input.value = '';
    selectedColor.classList.remove(`bg-${categoryColorPick}`);
    categoryColorPick = undefined;
    hideElement('color-selected-board');
    removeElement('define-task-category-board');
    removeElement('color-pick-board');
    showElement('select-task-category-board');
}

/** Sets the color for a new category, called by click on the color picker. */
function addColorCategory(colorId) {
    const colorElement = document.getElementById('color-selected-board');
    colorElement.classList = `color-cicle addtask-category-color img-20 bg-${colorId}`;
    categoryColorPick = colorId;
}

/** Saves the new category, closes the input field, opens the dropdown menu and scrolls to bottom. */
async function saveNewCategory() {
    let inputValue = document.getElementById('new-category-input-board').value;
    if (categoryColorPick !== undefined && inputValue !== '') {
        const cat = { name: inputValue, color: categoryColorPick };
        category.push(cat);
        closeNewCategoryInput();
        renderCategoriesForAddTaskDropDown();
        openDropDown('addtask-category-dropdown-board');
        scrollToNewCategory();
    }
  }
  


/**
 * Sets up the event handler for the submit button in the board card edit overlay.
 * @param {Object} task - The task object to set up the button for.
 */
function setEditTaskSubmitButton(taskIndex) {
    document.getElementById('board-card-edit').onsubmit = () => {
        let task = activeUser.tasks[taskIndex];
        saveEditedTask(task);
        removeElement('board-card-edit');
        renderBoardCardOverlay(task);
        showElement('board-card');
        saveUserData();
        return false;
    };
}


/**
 * Saves the edited task.
 * @param {Object} task - The task object to be saved.
 */
function saveEditedTask(task) {
    task.title = document.getElementById('title-edit-input').value;
    task.description = document.getElementById('description-edit-input').value;
    task.dueDate = document.getElementById('dueDate-edit-input').value;
    task.prio = getPrioViaActiveButton();
    const selectedCategory = activeUser.categories[selectCategory];
    task.category = {
        name: selectedCategory.name,
        color: selectedCategory.color
    };
    
    saveAssignedContacts(task);
}



/**
 * Deletes the given task.
 * @param {number} taskIndex - The index of the task object to be deleted.
 */
function deleteTask(taskIndex) {
    activeUser.tasks.splice(taskIndex, 1);
}

async function renderContactsForEditDropDown(taskIndex) {
    const task = activeUser.tasks[taskIndex];
    const contactScrollContainer = document.getElementById(`assigned-edit-contacts-container`);
    const contactList = document.getElementById(`assigned-edit-contact-list`);
    clearElement(`assigned-edit-contact-list`);

    for (let i = 0; i < activeUser.contacts.length; i++) {
        const contact = activeUser.contacts[i];
        const contactChecked = arrayIncludesObject(task.assignedTo, contact) ? 'checked' : '';
        contactList.innerHTML += /*html*/`
            <label for="assigned-edit-contact-checkbox-${i}" class="assigned-edit-contact">
                <span>${contact.name}</span>
                <input id="assigned-edit-contact-checkbox-${i}" type="checkbox" ${contactChecked}>
            </label>
        `;
    }

    contactScrollContainer.scrollTop = 0;
}


/**
 * Saves the assigned contacts for the edited task.
 * @param {Object} task - The task object to be saved.
 */
function saveAssignedContacts(task) {
    task.assignedTo = [];

    for (let i = 0; i < activeUser.contacts.length; i++) {
        const contact = activeUser.contacts[i];
        if (document.getElementById(`assigned-edit-contact-checkbox-${i}`).checked) {
            task.assignedTo.push(contact);
        }
    }
}

/**
 * Checks whether a given array contains a given object.
 * @param {Array} array - The array to be checked.
 * @param {Object} object - The object to be contained.
 * @returns {Boolean} True if array contains object.
 */
function arrayIncludesObject(array, object) {
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if (JSON.stringify(element) === JSON.stringify(object)) {
            return true;
        }
    }
    return false;
}