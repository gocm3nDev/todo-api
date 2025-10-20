const usernameInp = document.getElementById('username');
const emailInp = document.getElementById('email');
const username_alert = document.getElementById('username-alert');
const email_alert = document.getElementById('email-alert');
const form = document.getElementById('form');

const checkUsername = async () => {
    const username = usernameInp.value;

    if (username.length < 6) { username_alert.textContent = 'Username must be longer than 6 characters'; }
    else {
        username_alert.textContent = '';

        try {
            const response = await fetch('http://localhost:3000/user/check-username', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: username }),
            });
            const data = await response.json();

            if (data.isTaken) {
                username_alert.textContent = 'This username is already taken';
            } else {
                username_alert.textContent = 'Username is available!';
                username_alert.style.color = 'green';
            }
        } catch (err) {
            console.log(`Username check control. Please check inputController.js . Error: ${err}`);
        }
    }
};

const checkEmail = async () => {
    const email = emailInp.value;

    try {
        const response = await fetch('http://localhost:3000/user/check-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        });
        const data = await response.json();

        if (data.isTaken) { 
            email_alert.textContent = 'This email is already taken';
        } else {
            email_alert.textContent = 'Email is available!';
            email_alert.style.color = 'green';
        }
    } catch (err) {
        console.log(`Email check control. Please check inputController.js . Error: ${err}`);
    }
};

usernameInp.addEventListener('blur', checkUsername);
emailInp.addEventListener('blur', checkEmail);