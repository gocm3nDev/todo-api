const profileToggle = document.getElementById('profileToggle');
const profileDropdown = document.getElementById('profileDropdown');

profileToggle.addEventListener('click', () => {
    profileDropdown.classList.toggle('show');
});

window.addEventListener('click', function (e) {
    if (!profileToggle.contains(e.target) && !profileDropdown.contains(e.target)) {
        profileDropdown.classList.remove('show');
    }
});

const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {

        navLinks.forEach(l => l.classList.remove('active'));

        this.classList.add('active');
    });
});

const toggleButton = document.getElementById('toggle-sidebar');
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    document.body.classList.toggle('sidebar-open');
}

toggleButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
});

document.querySelector('.sidebar-overlay').addEventListener('click', toggleSidebar);

sidebar.addEventListener('click', (e) => {
    if (window.innerWidth <= 992 && e.target.closest('a')) {
        toggleSidebar();
    }
});