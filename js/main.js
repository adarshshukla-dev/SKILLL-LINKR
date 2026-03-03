// Global Functionality for Skill Linkr
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Theme Toggle Logic (Simple Placeholder)
    const themeBtn = document.getElementById('themeToggle');
    if(themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            themeBtn.innerText = document.body.classList.contains('dark-theme') ? '☀️' : '🌙';
        });
    }

    // 2. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 3. Form Handling (Mock)
    window.handleLogin = (e) => {
        e.preventDefault();
        alert("Login Successful! Redirecting...");
        window.location.href = "dashboards/student-dashboard.html";
    };

    window.redirectDashboard = (e) => {
        e.preventDefault();
        const role = document.getElementById('role').value;
        if(role === 'student') window.location.href = "dashboards/student-dashboard.html";
        else window.location.href = "dashboards/client-dashboard.html";
    };
});

// Password Toggle Function
function togglePassword(id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
    } else {
        input.type = "password";
    }
}

// Role Selection Logic
function selectRole(role) {
    localStorage.setItem('userRole', role);
    alert("Role Selected: " + role.toUpperCase());
    window.location.href = "login.html";
}
