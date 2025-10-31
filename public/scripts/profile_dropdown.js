window.addEventListener('DOMContentLoaded', () => {

    const profileToggle = document.getElementById('profileToggle');
    const profileDropdown = document.getElementById('profileDropdown');

    if (profileToggle && profileDropdown) {
        profileToggle.addEventListener('click', () => {
            profileDropdown.classList.toggle('show');
        });

        window.addEventListener('click', function (e) {
            if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
                profileDropdown.classList.remove('show');
            }
        });
    }

    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');

    function toggleSidebar() {
        document.body.classList.toggle('sidebar-open');
    }

    if (toggleButton && sidebarOverlay) {
        toggleButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleSidebar();
        });

        sidebarOverlay.addEventListener('click', toggleSidebar);
    }

    if (sidebar) {
        sidebar.addEventListener('click', (e) => {
            if (window.innerWidth <= 992 && e.target.closest('a')) {
                toggleSidebar();
            }
        });
    }

});