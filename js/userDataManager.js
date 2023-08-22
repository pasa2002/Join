/** Sets the active user to guest or current signed user. */
function setActiveUser() {
  activeUser = loggedInAsGuest() ? guestUser : users[currentUser];
}

/** Sets the predefined categories for active user. */
function setCategories() {
  category = activeUser.categories;
}

/** Saves the user data to local storage (guest) or backend (signed user). */
async function saveUserData() {
  if (loggedInAsGuest()) {
    saveGuestUserToLocalStorage();
  } else {
    await setItem("users", JSON.stringify(users));
  }
}

/** Loads the user data from local storage (guest) or backend (signed user). */
async function loadUserData() {
  await loadUsers();
  if (loggedInAsGuest()) {
    loadGuestUserFromLocalStorage();
  }
}

/** Checks if the user is logged in as a guest.
 * @returns {boolean} True if the user is logged in as a guest, false otherwise.
 */
function loggedInAsGuest() {
  return currentUser.length === 0;
}

/** Saves the guest user data to local storage. */
function saveGuestUserToLocalStorage() {
  let guestUserAsText = JSON.stringify(guestUser);
  localStorage.setItem("guestUser", guestUserAsText);
}

/** Loads the guest user data from local storage. */
function loadGuestUserFromLocalStorage() {
  let guestUserAsText = localStorage.getItem("guestUser");
  if (guestUserAsText) {
    guestUser = JSON.parse(guestUserAsText);
  }
}