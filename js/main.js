// ===== ROLE SELECTION =====

function selectRole(role) {
  localStorage.setItem("userRole", role);

  if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  }
  else if (role === "client") {
    window.location.href = "client-dashboard.html";
  }
  else {
    window.location.href = "student-dashboard.html";
  }
}

// ===== LOGIN HANDLER =====

function handleLogin(event) {
  event.preventDefault();

  const role = localStorage.getItem("userRole");

  if (!role) {
    alert("Please select role first!");
    window.location.href = "role.html";
    return;
  }

  if (role === "admin") {
    window.location.href = "admin-dashboard.html";
  }
  else if (role === "client") {
    window.location.href = "client-dashboard.html";
  }
  else {
    window.location.href = "student-dashboard.html";
  }
}

// ===== PROTECT PAGES =====

function protectPage(requiredRole) {
  const role = localStorage.getItem("userRole");

  if (role !== requiredRole) {
    alert("Unauthorized Access!");
    window.location.href = "login.html";
  }
}

// ===== LOGOUT FUNCTION =====

function logout() {
  localStorage.removeItem("userRole");
  window.location.href = "index.html";
}
