// --- 1. SESSION & ROLE MANAGEMENT ---
// Ye part decide karega ki login ke baad user kaha jayega
function checkUserRole() {
    const role = localStorage.getItem('userRole'); // 'client' or 'student'
    if (!role) {
        // Agar koi logged in nahi hai toh login page par bhejo
        if (!window.location.pathname.includes('login.html') && !window.location.pathname.includes('index.html')) {
            window.location.href = 'login.html';
        }
    }
}

// --- 2. PROJECT POSTING (For post-project.html) ---
function handlePostProject(event) {
    event.preventDefault();

    const title = document.querySelector('input[placeholder*="Responsive"]').value;
    const category = document.querySelector('select').value;
    const budget = document.querySelector('input[placeholder="5000"]').value;
    const desc = document.querySelector('textarea').value;
    const skills = document.querySelector('input[placeholder*="React"]').value;

    const newProject = {
        id: Date.now(),
        title: title,
        category: category,
        budget: budget,
        desc: desc,
        skills: skills,
        date: new Date().toLocaleDateString(),
        applicants: 0
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));

    // Client ke project count ko update karna
    let clientStats = JSON.parse(localStorage.getItem('clientStats')) || { totalProjects: 4 };
    clientStats.totalProjects += 1;
    localStorage.setItem('clientStats', JSON.stringify(clientStats));

    alert("🚀 Project Live ho gaya hai!");
    window.location.href = 'client-dashboard.html';
}

// --- 3. PROJECT FEED & APPLICATIONS (For project-feed.html) ---
function loadProjectFeed() {
    const feedGrid = document.querySelector('.feed-grid');
    if (!feedGrid) return;

    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Naye projects ko list mein dikhana
    projects.reverse().forEach(proj => {
        const card = `
            <div class="project-card" data-aos="fade-up">
                <div class="project-details">
                    <h2 style="margin: 0;">${proj.title}</h2>
                    <p style="color: var(--grey); margin: 10px 0;">${proj.desc}</p>
                    <div class="tags"><span class="tag">${proj.category}</span></div>
                </div>
                <div style="text-align: right;">
                    <h3 style="color: var(--dark);">₹${proj.budget}</h3>
                    <button class="btn-apply" onclick="applyToProject('${proj.title}', ${proj.id})">Apply Now</button>
                </div>
            </div>`;
        feedGrid.insertAdjacentHTML('afterbegin', card);
    });
}

function applyToProject(title, id) {
    // Application count badhana
    let appCount = parseInt(localStorage.getItem('studentApps')) || 3;
    localStorage.setItem('studentApps', appCount + 1);

    alert("✅ Applied successfully for: " + title);
    window.location.href = 'student-dashboard.html';
}

// --- 4. DASHBOARD STATS UPDATER ---
function updateDashboards() {
    // Client Dashboard Stats
    if (window.location.pathname.includes('client-dashboard')) {
        const stats = JSON.parse(localStorage.getItem('clientStats')) || { totalProjects: 4 };
        const statElement = document.querySelector('.stat-card.blue h3');
        if (statElement) statElement.innerText = stats.totalProjects;
    }

    // Student Dashboard Stats
    if (window.location.pathname.includes('student-dashboard')) {
        const appCount = localStorage.getItem('studentApps') || 3;
        const statElement = document.querySelector('.stat-card.blue h3');
        if (statElement) statElement.innerText = appCount;
    }
}

// Page Load hote hi functions chalana
document.addEventListener('DOMContentLoaded', () => {
    loadProjectFeed();
    updateDashboards();
});
