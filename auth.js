// SKILL LINKR - AUTH LOGIC 2026

// 1. Password Toggle Function
function togglePassword(fieldId) {
    const passwordInput = document.getElementById(fieldId);
    const icon = event.target;
    
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        passwordInput.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}

// 2. Handle Student Registration
function handleStudentSignup(event) {
    event.preventDefault();
    
    // Basic Validation
    const name = document.querySelector('input[placeholder*="Adarsh"]').value;
    const email = document.querySelector('input[type="email"]').value;
    
    if(name && email) {
        alert("Registration Successful, " + name + "!\nRedirecting to Login...");
        // Redirect to Login Page
        window.location.href = "login.html";
    } else {
        alert("Please fill all required fields!");
    }
}

// 3. Handle Client Registration
function handleClientSignup(event) {
    event.preventDefault();
    
    const clientName = document.querySelector('input[placeholder*="Who is hiring"]').value;
    
    if(clientName) {
        alert("Welcome to Skill Linkr, " + clientName + "!\nRedirecting to Login...");
        window.location.href = "login.html";
    } else {
        alert("Please enter your name!");
    }
}

// 4. Handle Login Logic
function handleLogin(event) {
    event.preventDefault();
    
    const email = document.querySelector('input[type="email"]').value;
    const password = document.getElementById('password').value;

    // Dummy Logic: Agar email aur password bhara hai toh dashboard bhejo
    if (email !== "" && password !== "") {
        alert("Login Successful! Welcome to your Dashboard.");
        
        // Yahan aap tay kar sakte hain ki kahan bhejna hai
        // Example: window.location.href = "dashboard.html";
    } else {
        alert("Invalid Email or Password!");
    }
}
