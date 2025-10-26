const usernameInp = document.getElementById('username');
const emailInp = document.getElementById('email');
const username_alert = document.getElementById('username-alert');
const email_alert = document.getElementById('email-alert');
const form = document.getElementById('form');
const passwordInp = document.getElementById('passwd');
const confirmPassowrdInp = document.getElementById('confirm_passwd');
const password_alert = document.getElementById('password-alert');
const button = document.getElementById('submitButton');

let isUsernameValid;
let isEmailValid;
let isPasswordValid;

const specialCharacters = [
    '!', '@', '#', '$', '%', '^', '&', '*', '(', ')',
    '-', '_', '=', '+', '[', ']', '{', '}', '|',
    ';', ':', "'", '"', ',', '<', '.', '>', '/', '?',
    '`', '~'
];

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const checkButtonState = () => {
    if (isUsernameValid && isEmailValid && isPasswordValid) {
        button.classList.remove('disabled');
        button.disabled = false;
    } else {
        button.classList.add('disabled');
        button.disabled = true;
    }
}

const checkUsername = async () => {
    const username = usernameInp.value;

    if (username.length < 6) {
        username_alert.textContent = 'Username must be longer than 6 characters';
        isUsernameValid = false;
    } else {
        username_alert.textContent = '';
        try {
            const response = await fetch('http://localhost:3000/user/check-username', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: username }),
            });
            const data = await response.json();

            if (data.isTaken) {
                username_alert.textContent = 'This username is already taken';
                isUsernameValid = false;
            } else {
                username_alert.textContent = 'Username is available!';
                username_alert.style.color = 'green';
                isUsernameValid = true;
            }
        } catch (err) {
            console.log(`Error: ${err}`);
            isUsernameValid = false;
        }
    }
    checkButtonState();
};

const checkEmail = async () => {
    const email = emailInp.value;

    if (email.length >= 5) {
        try {
            const response = await fetch('http://localhost:3000/user/check-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email }),
            });
            const data = await response.json();

            if (data.isTaken) {
                email_alert.textContent = 'This email is already taken';
                isEmailValid = false;
            } else {
                email_alert.textContent = 'Email is available!';
                email_alert.style.color = 'green';
                isEmailValid = true;
            }
        } catch (err) {
            console.log(`Error: ${err}`);
            isEmailValid = false;
        }
    }
    else {
        email_alert.textContent = 'Email must be longer than 5 characters';
        isEmailValid = false;
    }
    checkButtonState();
};

const comparePasswords = () => {
    const passwd = passwordInp.value;
    const confPasswd = confirmPassowrdInp.value;

    if (passwd.length >= 8) {
        if (passwd === confPasswd) {
            let special_count = 0;
            let number_count = 0;

            for (const c of passwd) {
                if (specialCharacters.includes(c)) special_count++;
                if (numbers.includes(c)) number_count++;
            }

            if (special_count >= 2 && number_count >= 2) {
                password_alert.style.color = 'green';
                password_alert.textContent = 'Password is available';
                isPasswordValid = true;
            } else {
                password_alert.style.color = 'red';
                password_alert.textContent = 'Password must contain minimum 2 specials and 2 numbers';
                isPasswordValid = false;
            }
        } else {
            password_alert.style.color = 'red';
            password_alert.textContent = 'Passwords are not match';
            isPasswordValid = false;
        }
    } else {
        password_alert.style.color = 'red';
        password_alert.textContent = 'Password must be longer than 8 characters';
        isPasswordValid = false;
    }
    checkButtonState();
}

const postUser = async (e) => {
    e.preventDefault();

    const username = usernameInp.value;
    const email = emailInp.value;
    const password = passwordInp.value;

    try {
        const response = await fetch('http://localhost:3000/user/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, email: email, password: password })
        });

        if (response.ok) {
            const data = await response.json();

            console.log(`Registeration successfully completed. ${data}`)

            window.location.href = '/';
        }
        else console.log('err');
    } catch (err) {
        console.log(`Internal server error. Error: ${err}`);
    }
}

usernameInp.addEventListener('blur', checkUsername);
emailInp.addEventListener('blur', checkEmail);
confirmPassowrdInp.addEventListener('blur', comparePasswords);
passwordInp.addEventListener('input', comparePasswords);
form.addEventListener('submit', postUser);