let activeUserContacts;
let contactInfoContainerIsActive = false;
let activeContactIndex;


/**
 * Initializes contacts by loading user data, initializing header navigation and rendering the contact list.
 */
async function initContacts() {
    await initHeaderNav();
    await loadUserData();
    setActiveUser();
    setCategories();

    activateNavSection('nav-contacts');
    changeContentOnWindowSize();

    activeUserContacts = activeUser.contacts;
    renderContactList();
}


/*Responsiveness*/
/**
 * Changes content displayed based on the current window size.
 */
function changeContentOnWindowSize() {
    if (checkUrl('contacts.html')) {
        if (screenWidthIsAtMost('1200px')) {
            if (contactInfoContainerIsActive) {
                removeElement('contacts-list-container');
                showElement('contacts-info-container');
            } else {
                showElement('contacts-list-container');
                removeElement('contacts-info-container');
            }
        }
        else {
            showElement('contacts-list-container');
            showElement('contacts-info-container');
        }
    }
}

window.onresize = changeContentOnWindowSize;