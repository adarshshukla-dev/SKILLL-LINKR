// --- 1. PROJECT POSTING ---
function handlePostProject(event) {
    event.preventDefault();

    // Humne IDs use ki hain taaki exact data mile
    const title = document.getElementById('proj-title').value;
    const category = document.getElementById('proj-category').value;
    const budget = document.getElementById('proj-budget').value;
    const desc = document.getElementById('proj-desc').value;
    const skills = document.getElementById('proj-skills').value;

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

    // Main Projects Array
    let projects = JSON.parse(localStorage.getItem('allProjects')) || [];
    projects.push(newProject);
    localStorage.setItem('allProjects', JSON.stringify(projects));

    alert("🚀 Project Published Successfully!");
    window.location.href = 'client-dashboard.html';
}

// --- 2. LOAD DATA ON DIFFERENT PAGES ---
function loadPageData() {
    const projects = JSON.parse(localStorage.getItem('allProjects')) || [];

    // A. Client Dashboard Stats
    const clientCount = document.getElementById('client-project-count');
    if (clientCount) {
        clientCount.innerText = 4 + projects.length; // 4 static + new ones
    }

    // B. Student Dashboard Stats
    const studentCount = document.getElementById('student-app-count');
    if (studentCount) {
        const apps = localStorage.getItem('appliedCount') || 3;
        studentCount.innerText = apps;
    }

    // C. My Projects List (client side)
    const myProjectsList = document.getElementById('my-projects-list');
    if (myProjectsList && projects.length > 0) {
        // Purana content clear nahi karenge kyunki static rows bhi hain
        projects.forEach(proj => {
            const row = `
                <div class="item-row" data-aos="fade-up">
                    <div class="item-details">
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <h4>${proj.title}</h4>
                            <span class="status-badge status-accepted">Active</span>
                        </div>
                        <div class="project-stats-row">
                            <span class="mini-stat"><i class="fas fa-users"></i> 0 Applicants</span>
                            <span class="mini-stat"><i class="fas fa-wallet"></i> ₹${proj.budget}</span>
                            <span class="mini-stat"><i class="fas fa-calendar"></i> Posted Today</span>
                        </div>
                    </div>
                    <div class="action-btns">
                        <button class="btn-view-apps">View Proposals</button>
                        <button class="btn-icon"><i class="fas fa-trash"></i></button>
                    </div>
                </div>`;
            myProjectsList.insertAdjacentHTML('afterbegin', row);
        });
    }

    // D. Project Feed (student side)
    const feedContainer = document.getElementById('project-feed-container');
    if (feedContainer && projects.length > 0) {
        projects.forEach(proj => {
            const card = `
                <div class="project-card" data-aos="fade-up">
                    <div class="project-details">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                            <img src="https://ui-avatars.com/api/?name=Adarsh&background=eff6ff&color=2563eb" style="width: 40px; border-radius: 8px;">
                            <span style="font-weight: 600; color: var(--grey);">Client: Adarsh Shukla</span>
                        </div>
                        <h2 style="margin: 0;">${proj.title}</h2>
                        <p style="color: var(--grey); max-width: 600px; margin-top: 10px;">${proj.desc}</p>
                        <div class="tags"><span class="tag">${proj.category}</span><span class="tag">New</span></div>
                    </div>
                    <div style="text-align: right;">
                        <h3 style="margin: 0 0 10px 0; color: var(--dark);">₹${proj.budget}</h3>
                        <button class="btn-apply" onclick="applyToProject('${proj.title}')">Apply Now</button>
                    </div>
                </div>`;
            feedContainer.insertAdjacentHTML('afterbegin', card);
        });
    }
}

// --- 3. APPLY LOGIC ---
function applyToProject(title) {
    let currentApps = parseInt(localStorage.getItem('appliedCount')) || 3;
    localStorage.setItem('appliedCount', currentApps + 1);
    
    alert("✅ Applied successfully for: " + title);
    window.location.href = 'student-dashboard.html';
}

// Page Load hote hi sab execute karein
document.addEventListener('DOMContentLoaded', loadPageData);
