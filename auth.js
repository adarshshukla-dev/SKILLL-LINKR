/**
 * SKILL LINKR - COMMON AUTH LOGIC v3.0
 * Handles: Student Signup, Client Signup, Login & Password Toggle
 */

// 1. PASSWORD VISIBILITY TOGGLE
// Isme hum 'id' pass karte hain taaki ye har page ke liye kaam kare
function togglePassword(id) {
    const passwordInput = document.getElementById(id);
    const icon = event.target; // Jo icon click hua hai
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// 2. STUDENT SIGNUP LOGIC
function handleStudentSignup(event) {
    event.preventDefault();
    
    // Form se data nikalna
    const name = document.getElementById('studentName').value;
    const email = document.getElementById('studentEmail').value;
    
    if (name && email) {
        alert("Registration Successful!\nWelcome to Skill Linkr, " + name + ".\nRedirecting to Login page...");
        // Redirect to Login
        window.location.href = "login.html";
    }
}

// 3. CLIENT SIGNUP LOGIC
function handleClientSignup(event) {
    event.preventDefault();
    
    const clientName = document.getElementById('clientName').value;
    const company = document.getElementById('companyName').value || "your startup";
    
    if (clientName) {
        alert("Welcome " + clientName + "!\nWe are ready to find talent for " + company + ".\nRedirecting to Login...");
        // Redirect to Login
        window.location.href = "login.html";
    }
}

// 4. LOGIN LOGIC
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    // Basic check (aap yahan API call ya Firebase connect kar sakte hain)
    if (email && pass) {
        alert("Login Successful!\nTaking you to your Dashboard...");
        
        /* FUTURE REDIRECTION:
           Agar aapne dashboard.html bana liya hai, toh niche wali line uncomment kar dena:
           window.location.href = "dashboard.html"; 
        */
    } else {
        alert("Please enter valid credentials!");
    }
}

// AOS Initializer (Agar CDN link hai toh ye automatic chalega)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true
    });
}
