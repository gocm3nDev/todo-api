const usernameInp = document.getElementById('username');
const passwordInp = document.getElementById('passwd');
const SignInAlert = document.getElementById('signin-alert');
const form = document.getElementById('form');

const signIn = async (e) => {
    try {
        e.preventDefault();

        const username = usernameInp.value.trim();
        const password = passwordInp.value.trim();

        const response = await fetch('http://localhost:3000/user/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: username, password: password }),
        })

        if (response.ok) {
            SignInAlert.textContent = 'Login successful';
            SignInAlert.style.color = 'green';
        } else {
            SignInAlert.textContent = 'Invalid username or password';
            SignInAlert.style.color = 'red';
        }
    } catch (err) {
        console.log(`Error: ${err}`);
    }
}

form.addEventListener('submit', signIn);