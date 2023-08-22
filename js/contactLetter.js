/** Gets the initial letters of all the active user's contacts and returns them
 * in alphabetical order.
 * @returns {string[]} An array of initial letters.
 */
function getInitialLetters() {
  const initialLetters = [];
  activeUserContacts.forEach((contact) => {
    const initialLetter = getInitialLetter(contact).toUpperCase();
    if (!initialLetters.includes(initialLetter))
      initialLetters.push(initialLetter);
  });
  return initialLetters.sort();
}

/** Gets the initial letter of a contact's name.
 * @param {object} contact - The contact whose initial letter to get.
 * @returns {string} The initial letter of the contact's name.
 */
function getInitialLetter(contact) {
  return contact.name.charAt(0);
}

/** Gets the initials of a contact's name.
 * @param {object} contact - The contact whose initials to get.
 * @returns {string} The initials of the contact's name.
 */
function getInitials(contact) {
  let fullName = contact.name;

  if (fullName.includes(" ")) {
    let firstName = fullName.substring(0, fullName.indexOf(" "));
    let lastName = fullName.substring(fullName.indexOf(" ") + 1);
    return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
  } else {
    return fullName.charAt(0).toUpperCase();
  }
}