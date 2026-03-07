// --- 1. PROJECT POSTING LOGIC (For post-project.html) ---
function handlePostProject(event) {
    event.preventDefault();

    const titleInput = document.querySelector('input[placeholder*="Responsive"]');
    const categoryInput = document.querySelector('select');
    const budgetInput = document.querySelector('input[placeholder="5000"]');
    const descInput = document.querySelector('textarea');
    const skillsInput = document.querySelector('input[placeholder*="React"]');

    const newProject = {
        id: Date.now(),
        title: titleInput.value,
        category: categoryInput.value,
        budget: budgetInput.value,
        desc: descInput.value,
        skills: skillsInput.value,
        postedOn: new Date().toLocaleDateString(),
    };

    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    projects.push(newProject);
    localStorage.setItem('projects', JSON.stringify(projects));

    alert("🚀 Project Published Successfully!");
    window.location.href = 'client-dashboard.html';
}

// --- 2. PROJECT FEED DISPLAY (For project-feed.html) ---
if (window.location.pathname.includes('project-feed.html')) {
    document.addEventListener('DOMContentLoaded', () => {
        const feedGrid = document.querySelector('.feed-grid');
        const projects = JSON.parse(localStorage.getItem('projects')) || [];

        projects.reverse().forEach(proj => {
            const projectHTML = `
                <div class="project-card" data-aos="fade-up">
                    <div class="project-details">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <img src="https://ui-avatars.com/api/?name=New+Client&background=eff6ff&color=2563eb" style="width: 40px; border-radius: 8px;">
                            <span style="font-weight: 600; color: var(--grey);">Live Client</span>
                        </div>
                        <h2 style="margin: 0;">${proj.title}</h2>
                        <p style="color: var(--grey); max-width: 600px; margin-top: 10px;">${proj.desc}</p>
                        <div class="tags">
                            ${proj.skills.split(',').map(s => `<span class="tag">${s.trim()}</span>`).join('')}
                        </div>
                    </div>
                    <div style="text-align: right;">
                        <h3 style="margin: 0 0 10px 0; color: var(--dark);">₹${proj.budget}</h3>
                        <p style="color: var(--grey); font-size: 0.85rem; margin-bottom: 20px;">Just Now</p>
                        <a href="#" class="btn-apply" onclick="applyNow('${proj.title}')">Apply Now</a>
                    </div>
                </div>`;
            feedGrid.insertAdjacentHTML('afterbegin', projectHTML);
        });
    });
}

// --- 3. APPLY & STATS UPDATER ---
function applyNow(title) {
    let count = parseInt(localStorage.getItem('appCount')) || 3;
    localStorage.setItem('appCount', count + 1);
    alert("✅ Applied for: " + title);
    window.location.href = 'student-dashboard.html';
}

// Dashboard load par stats update karna
document.addEventListener('DOMContentLoaded', () => {
    // Client Dashboard Stats
    const clientProjStat = document.querySelector('.stat-card.blue .stat-info h3');
    if (clientProjStat && window.location.pathname.includes('client-dashboard')) {
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        clientProjStat.innerText = 4 + projects.length; // 4 default + new ones
    }

    // Student Dashboard Stats
    const studentAppStat = document.querySelector('.stat-card.blue .stat-info h3');
    if (studentAppStat && window.location.pathname.includes('student-dashboard')) {
        studentAppStat.innerText = localStorage.getItem('appCount') || 3;
    }
});
