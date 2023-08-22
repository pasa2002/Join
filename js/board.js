/**
 * Initializes the board by loading user data, initializing header navigation and rendering the board columns.
 */
async function initBoard() {
    await initHeaderNav();
    await loadUserData();
    setActiveUser();
    setCategories();
    // media();
    activateNavSection('nav-board');
    renderBoardColumns();
    enableMobileDragAndDrop();
    renderCategoriesForBoardDropDown();
}

/**
 * This function renders the four board-columns. 
 * It calls the function {@link renderColumn} for each column.
 */
function renderBoardColumns() {
    renderColumn('board-column-todo');
    renderColumn('board-column-progress');
    renderColumn('board-column-feedback');
    renderColumn('board-column-done');
    enableMobileDragAndDrop();
}


/**
 * This function renders a board-column given as a parameter.
 * @param {string} boardColumn - The ID of the board-column to be rendered.
 */
function renderColumn(boardColumn) {
    let tasksOfColumn = activeUser.tasks.filter(t => t.boardColumn === boardColumn);
    let container = document.getElementById(boardColumn);

    if (tasksOfColumn.length) {
        container.innerHTML = renderCards(tasksOfColumn);
    }
    else {
        container.innerHTML = renderEmptyColumn();
    }
}


/**
 * This function renders the cards for all task objects in the given array.
 * @param {array} arrayOfTasks - The array of task JSONs to render.
 */
function renderCards(arrayOfTasks) {
    let html = '';
    for (let i = 0; i < arrayOfTasks.length; i++) {
        const task = arrayOfTasks[i];
        html += renderCard(task);
    }
    return html;
}


/**
 * This function renders an empty board-column.
 */
function renderEmptyColumn() {
    return `<div class="empty-column cursor-d fs-16 fw-400 ta-c">No tasks here</div>`;
}


/**
 * This function renders the card for a task object.
 * @param {json} task - The task to render.
 */
function renderCard(task) {
    let index = activeUser.tasks.indexOf(task);
    return /*html*/`
        <div id="task-${index}" class="task" draggable="true" ondragstart="startDragging(${index})" onclick="openBoardCardOverlay(${index})">
            <div class="top-card">
                <div class="task-card-category fs-16 fw-400 bg-${task.category.color} mb-20">${task.category.name}</div>
                ${renderMobileColumnSelect(index, task.boardColumn)}
            </div>
            <h3 class="fs-16 fw-700 m-0 mb-10">${task.title}</h3>
            <span class="fs-16 fw-400 mb-20">${task.description}</span>
            ${renderProgressBar(task)}
            <div class="assignedTo-and-prio">
                <div class="assigned-contacts">
                    ${renderAssignedContacts(task)}
                </div>
                <img src="./assets/img/prio-${task.prio}.svg">
            </div>
        </div>
    `;
}

function renderMobileColumnSelect(taskIndex, currentColumn) {
    return `
        <select class="mobile-column-select" onchange="moveTaskToColumn(this.value, ${taskIndex})" onclick="stopPropagation(event)">
            <option value="board-column-todo" ${currentColumn === 'board-column-todo' ? 'selected' : ''}>Todo</option>
            <option value="board-column-progress" ${currentColumn === 'board-column-progress' ? 'selected' : ''}>In Progress</option>
            <option value="board-column-feedback" ${currentColumn === 'board-column-feedback' ? 'selected' : ''}>Awaiting Feedback</option>
            <option value="board-column-done" ${currentColumn === 'board-column-done' ? 'selected' : ''}>Done</option>
        </select>
    `;
}


function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * This function moves a task to a different column based on the selected value.
 * @param {string} columnId - The ID of the target column.
 * @param {number} taskIndex - The index of the task in the activeUser.tasks array.
 */
function moveTaskToColumn(columnId, taskIndex) {
    const task = activeUser.tasks[taskIndex];
    const targetColumn = document.getElementById(columnId);
    const container = document.getElementById(`task-${taskIndex}`);

    if (targetColumn && container) {
        // Remove task from previous column
        const previousColumn = container.parentElement;
        previousColumn.removeChild(container);

        // Append task to the new column
        targetColumn.appendChild(container);

        // Update the task's boardColumn property
        task.boardColumn = columnId;

        // Update both source and target columns
        renderColumn(previousColumn.id);
        renderColumn(columnId);
    }
}


/**
 * This function renders the progress bar regarding the subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 */
function renderProgressBar(task) {
    if (task.subtasks.length) {
        return /*html*/`
            <div class="progressbar-container mb-20">
                <div class="progressbar">
                    <div class="progress" style="width:${getProgressOfSubtasks(task)}%"></div>
                </div>
                <span class="fs-12 fw-400">${getNumberOfDoneSubtasks(task)}/${task.subtasks.length} Done</span>
            </div>
        `;
    }
    else {
        return '';
    }
}


/**
 * This function calculates the progress regarding the subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 * @returns {number} The progress in percentage.
 */
function getProgressOfSubtasks(task) {
    let percentage = (getNumberOfDoneSubtasks(task) / task.subtasks.length) * 100;
    let roundedPercentage = Math.round(percentage);
    return roundedPercentage;
}


/**
 * This function gives the number of done subtasks of a task object.
 * @param {json} task - The task object with the corresponding subtasks.
 * @returns {number} The number of done subtasks.
 */
function getNumberOfDoneSubtasks(task) {
    let doneSubtasks = task.subtasks.filter(t => t.done);
    return doneSubtasks.length;
}


/**
 * This function renders the assigned contacts of a task object within the cards of the board-columns.
 * @param {json} task - The corresponding task object.
 */
function renderAssignedContacts(task) {
    let html = '';
    if (task.assignedTo.length <= 3) {
        for (let i = 0; i < task.assignedTo.length; i++) {
            const contact = task.assignedTo[i];
            html += `
                <div class="contact-icon contact-icon-board fs-12 fw-400 ${contact.color}">
                    ${getInitials(contact)}
                </div>
            `;
        }
    }
    else {
        html += `
            <div class="contact-icon contact-icon-board fs-12 fw-400 ${task.assignedTo[0].color}">
                ${getInitials(task.assignedTo[0])}
            </div>
            <div class="contact-icon contact-icon-board fs-12 fw-400 ${task.assignedTo[1].color}">
                ${getInitials(task.assignedTo[1])}
            </div>
            <div class="contact-icon contact-icon-board fs-12 fw-400 bg-theme">
                +${task.assignedTo.length - 2}
            </div>
        `;
    }
    return html;
}