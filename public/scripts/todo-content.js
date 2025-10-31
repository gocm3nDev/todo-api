document.addEventListener('DOMContentLoaded', () => {
    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', () => {
            profileDropdown.classList.toggle('show');
        });

        document.addEventListener('click', (e) => {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    const sidebarToggle = document.getElementById('toggle-sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    if (sidebarToggle && sidebarOverlay) {
        sidebarToggle.addEventListener('click', () => {
            body.classList.toggle('sidebar-open');
        });

        sidebarOverlay.addEventListener('click', () => {
            body.classList.remove('sidebar-open');
        });
    }

    const todoGrid = document.querySelector('.todo-grid');

    if (todoGrid) {
        todoGrid.addEventListener('change', (e) => {
            if (e.target.classList.contains('todo-checkbox')) {
                const card = e.target.closest('.todo-card');
                if (card) {
                    card.classList.toggle('completed', e.target.checked);
                }
            }
        });
    }
});