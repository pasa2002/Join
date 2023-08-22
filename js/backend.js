// Constants for remote storage and token
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
const STORAGE_TOKEN = "Q0PV46GL6FMMI9AYQ838I4531P8DMA2I6YX0JTJP";

// Global arrays for data storage
let users = [];
let contacts = [];
let tasks = [];
let category = [];
let categoryColorPick;
let selectCategory;
let subtasks = [];

/**
 * Overwrites the backend server with an empty array for users.
 */
async function pushEmptyArray() {
    users = [];
    await setItem("users", JSON.stringify(users));
}

/**
 * Saves the currentUser data to local storage.
 * @param {Object} currentUser - The current user object to be saved.
 */
function saveCurrentUserToLocalStorage(currentUser) {
    let currentUserAsText = JSON.stringify(currentUser);
    localStorage.setItem("currentUser", currentUserAsText);
}

/**
 * Loads the currentUser data from local storage.
 */
function loadCurrentUserFromLocalStorage() {
    let currentUserAsText = localStorage.getItem("currentUser");
    currentUser = JSON.parse(currentUserAsText);
}

/**
 * Loads user data from the backend and sets the currentUser.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem("users"));
        loadCurrentUserFromLocalStorage();
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Loads support arrays (category, assignedTo, subtasks) for the addTask functionality.
 */
async function loadSupportArraysAddTask() {
    try {
        category = JSON.parse(await getItem("category"));
        assignedTo = JSON.parse(await getItem("assignedTo"));
        subtasks = JSON.parse(await getItem("subtasks"));
    } catch (e) {
        console.error("Loading error:", e);
    }
}

/**
 * Saves a key-value pair into the backend storage.
 * @param {string} key - The key for the data.
 * @param {*} value - The value to be stored.
 * @returns {Promise} - A promise representing the completion of the storage operation.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, {
        method: "POST",
        body: JSON.stringify(payload),
    }).then((res) => res.json());
}

/**
 * Loads a value from the backend storage based on the key.
 * @param {string} key - The key to retrieve the value.
 * @returns {Promise} - A promise that resolves with the retrieved value.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url)
        .then((res) => res.json())
        .then((res) => {
            if (res.data) {
                return res.data.value;
            }
            throw `Could not find data with key "${key}".`;
        });
}
