/**
 * Initializes the addTask site by performing several setup tasks.
 * Loads user data, sets up navigation, renders dropdowns, and more.
 */
async function initAddTask() {
    // Load user-specific data
    await loadUserData();

    // Set the active user for the session
    setActiveUser();

    // Set up categories for the task
    setCategories();

    // Initialize the header navigation
    await initHeaderNav();

    // Activate the 'Add Task' section in the navigation
    activateNavSection('nav-addtask');

    // Render contacts in the dropdown for task assignment
    await renderContactsForAddTaskDropDown();

    // Render categories in the dropdown for task categorization
    renderCategoriesForAddTaskDropDown();

    // Set minimum date for the task due date input
    setMinDate('addtask-dueDate-input');

    // Render the 'Add Task' light button
    renderAddTaskLightButton();

    // Render the 'Create' button for mobile view
    renderAddTaskMobileCreateButton();

    // Set the default board column for the new task
    boardColumnToAddTask = 'board-column-todo';

    // Store the chosen board column in local storage for later use
    localStorage.setItem('boardColumnToAddTask', boardColumnToAddTask);
}
