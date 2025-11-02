document.addEventListener('DOMContentLoaded', () => {
    const todoForm = document.getElementById('todoForm');

    todoForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const fd = new FormData(todoForm);

        try {
            const title = fd.get('title');
            const description = fd.get('description');
            const priority = fd.get('priority');
            const due_date = fd.get('due_date');
            const list = fd.get('list');

            const res = await fetch('/todo/add-todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, description, priority, due_date, list })
            });

            if (!res.ok) {
                throw new Error(`Server responded with status ${res.status}`);
            }

            const data = await res.json();

            console.log(data.success);

            if (data.success) {
                window.location.href = '/user/my-todos';
            } else {
                alert('Error: ' + (data.message || 'Unknown error'));
            }
        } catch (err) {
            console.error(`An error occured while fetching data. ${err}`);
        }
    });
});