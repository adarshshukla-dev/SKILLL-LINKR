function redirectDashboard() {
  const role = document.getElementById("role");

  if (role && role.value === "student") {
    window.location.href = "dashboards/student-dashboard.html";
  } else if (role && role.value === "client") {
    window.location.href = "dashboards/client-dashboard.html";
  } else {
    window.location.href = "dashboards/student-dashboard.html";
  }
}
