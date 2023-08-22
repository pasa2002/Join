const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});
// Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
let msg = params.msg;


/**initiated login*/
function initLogin() { /**@alias module:initLogin */
  loadUsers();
  animationLogin();
  remember();
  displayMessage();
}

/**Start, stop animation */
function animationLogin() {
  let animationLogin = document.getElementById('animation-join');
  let joinLogo = document.getElementById('join-logo');

  setTimeout(function () {
    animationLogin.classList.add('d-none');
    document.getElementById('screen-animation').classList.add('d-none');
    document.getElementById('logo-animation').classList.add('d-none');
    joinLogo.classList.remove('d-none');
  }, 300);
}

/**Check user input for login*/
async function userLogin() {
  let userEmail = document.getElementById('loginEmail');
  let userPassword = document.getElementById('loginPassword');
  let i = 0;

  let user = users.find(users => users.email.toLowerCase() == userEmail.value.toLowerCase() && users.password == userPassword.value); //tolowerCase = checks case-insensitive

  checkUserInput(user, userEmail, userPassword, i);
}

/**Check user input and call back
 * 
 * @param {string} user activ usser
 * @param {string} userEmail user login email
 * @param {string} userPassword user login password
 * @param {number} i array position
 */
async function checkUserInput(user, userEmail, userPassword, i) {
  let msgBox = document.getElementById('msg-box');

  msgBox.innerHTML = '';

  if (user) {
    checkRemember(userEmail, userPassword);
    while (user != users[i]) {
      i++;
    }
    saveCurrentUserToLocalStorage(i);
    linkToUrl('summary.html');
  } else {
    await errorBox()
    await errorBox()
  }
}

/**Guest log in*/
async function userGuest() {
  saveCurrentUserToLocalStorage('');
  linkToUrl('summary.html');
}

/**this function check the remember checkbox and save in the local storage
 * 
 * @param {string} userEmail - login email value
 * @param {string} userPassword - login password value
 */
function checkRemember(userEmail, userPassword) {
  let remember = document.getElementById('remember-me');
  if (remember.checked == true) {
    localStorage.setItem('user', userEmail.value);
    localStorage.setItem('pw', userPassword.value);
    localStorage.setItem('remember', true);
  } else {
    localStorage.setItem('user', '');
    localStorage.setItem('pw', '');
    localStorage.setItem('remember', false);
  }
}

/**this function check onload if remember checkbox in the local storage set*/
function remember() {
  let remember = localStorage.getItem('remember')
  if (remember == 'true') {
    document.getElementById('loginEmail').value = localStorage.getItem('user');
    document.getElementById('loginPassword').value = localStorage.getItem('pw');
    document.getElementById('remember-me').checked = localStorage.getItem('remember');
  } else {
    localStorage.setItem('user', '');
    localStorage.setItem('pw', '');
    localStorage.setItem('remember', false);
  }
}

/**this function clear array "currentUser" and navigate to index.html*/
async function logout() {
  saveCurrentUserToLocalStorage('');
  linkToUrl('index.html');
}

/**Show hide message */
function displayMessage() {
  let msgBox = document.getElementById('msg-box');
  if (msg) {
    msgBox.classList.add('show-overlay');
    msgBox.innerHTML = msg;
  }
  setTimeout(() => {
    msgBox.classList.remove('show-overlay');
  }, 2000);
}

/**Set error box */
async function errorBox(){
  let errorBoxInputEmail = document.getElementById('loginEmail');
  let errorBoxInputPassword = document.getElementById('loginPassword');
  let errorBoxLabel = document.getElementById('login-label');
  errorBoxInputEmail.classList.add('error-box');
  errorBoxInputPassword.classList.add('error-box');
  errorBoxInputEmail.value = '';
  errorBoxInputPassword.value = '';
  errorBoxLabel.classList.remove('d-none');
}

/**Reset error box */
async function resetErrorBox(inputID, labelID){
  let resetBoxInputEmail = document.getElementById('loginEmail');
  let resetBoxInputPassword = document.getElementById('loginPassword');
  let resetErrorBoxLabel = document.getElementById('login-label');
  resetBoxInputEmail.classList.remove('error-box');
  resetBoxInputPassword.classList.remove('error-box');
  resetErrorBoxLabel.classList.add('d-none');
}