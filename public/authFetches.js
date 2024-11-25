document.addEventListener("DOMContentLoaded", () => {
    document
    .getElementById('register-button')
    .addEventListener('click', doRegister);

    document
    .getElementById('login-button')
    .addEventListener('click', doLogin);
});

/**
 * Rejestruje użytkownika
 * @param {MouseEvent} e - Klik
**/
async function doRegister(e) {
    e.preventDefault();
    console.log('Register');

    let email = document.querySelector('#main-register-screen .single-field .email-register').value;
    let password = document.querySelector('#main-register-screen .single-field .password-register').value;

    let user = {email, password};
    let endpoint = '/api/use/register';

    await sendData(user, endpoint, (data) => {
        console.log("Rejestracja przebiegła pomyślnie");
        console.log(data)
    });
}

/**
 * Loguje użytkownika
 * @param {MouseEvent} e - Klik
**/

async function doLogin(e) {
    e.preventDefault();
    console.log('Login');

    let email = document.querySelector('#main-login-screen .single-field .email-login').value;
    let password = document.querySelector('#main-login-screen .single-field .password-login').value;

    let user = {email, password};
    let endpoint = '/api/use/login';

    await sendData(user, endpoint, (data) => {
        console.log("Logowanie przebiegło pomyślnie");
        console.log(data);
    });
}

async function sendData(user, url, callback) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        const data = await response.json();

        if (response.ok) {
            callback(data);
            return;
        }
        else {
            throw new Error(data.error.message);
        }
    }
    catch(err) {
        console.log(err.message);
    }
}