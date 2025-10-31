const logOutButton = document.getElementById('logOutButton');

if (logOutButton) {
    logOutButton.addEventListener('click', async (e) => {
        e.preventDefault();
        logOutButton.classList.add('disabled');

        try {
            const response = await fetch('/user/log-out', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'same-origin'
            });

            if (response.ok) {
                setTimeout(() => {
                    window.location.href = '/';
                }, 1000);
            } else {
                console.error('Logout failed');
                logOutButton.classList.remove('disabled');
            }
        } catch (err) {
            console.error('Network error on logout', err);
            logOutButton.classList.remove('disabled');
        }
    });
}