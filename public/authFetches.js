document.addEventListener("DOMContentLoaded", () => {
    document
    .getElementById('register-button')
    .addEventListener('click', doRegister);

    document
    .getElementById('login-button')
    .addEventListener('click', doLogin);
});

function doRegister() {
    console.log('Register');
}

function doLogin() {
    console.log('Login');
}

function doFetch() {
    
}