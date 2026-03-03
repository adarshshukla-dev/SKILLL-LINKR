// SKILL LINKR - COMPLETE INTERACTIVE SYSTEM 2026
document.addEventListener('DOMContentLoaded', function() {

  // Mobile Menu
  if (window.innerWidth <= 768) {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.createElement('div');
    hamburger.innerHTML = '☰';
    hamburger.className = 'hamburger';
    hamburger.style.cssText = 'font-size:1.5rem;cursor:pointer;display:none;';
    navbar.appendChild(hamburger);
    window.addEventListener('resize', () => {
      if (window.innerWidth <= 768) hamburger.style.display = 'block';
      else hamburger.style.display = 'none';
    });
  }

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Stats Animation
  function animateStats() {
    document.querySelectorAll('.stat h2, .stat-number').forEach(stat => {
      const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
      let count = 0;
      const increment = target / 100;
      const timer = setInterval(() => {
        count += increment;
        if (count >= target) {
          stat.textContent = stat.textContent;
          clearInterval(timer);
        } else {
          stat.textContent = '₹' + Math.floor(count) || Math.floor(count);
        }
      }, 20);
    });
  }

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateStats();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stats, .grid').forEach(el => statsObserver.observe(el));

  // Auth Functions
  window.handleLogin = function(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    const password = event.target.querySelector('#password').value;
    if (email && password) {
      localStorage.setItem('userLoggedIn', 'true');
      localStorage.setItem('userEmail', email);
      showToast('Login successful! 🎉', 'success');
      setTimeout(() => window.location.href = 'index.html', 1500);
    } else showToast('Fill all fields!', 'error');
  };

  window.redirectDashboard = function(event) {
    event.preventDefault();
    const role = document.getElementById('role')?.value;
    if (role) {
      localStorage.setItem('userRole', role);
      localStorage.setItem('userLoggedIn', 'true');
      showToast('Account created successfully! 🚀', 'success');
      setTimeout(() => {
        if (role === 'student') window.location.href = 'dashboards/student-dashboard.html';
        else if (role === 'client') window.location.href = 'dashboards/client-dashboard.html';
        else window.location.href = 'admin-dashboard.html';
      }, 1500);
    }
  };

  window.selectRole = function(role) {
    localStorage.setItem('userRole', role);
    localStorage.setItem('userLoggedIn', 'true');
    showToast(`${role.charAt(0).toUpperCase() + role.slice(1)} role selected!`, 'success');
    setTimeout(() => {
      if (role === 'student') window.location.href = 'dashboards/student-dashboard.html';
      else if (role === 'client') window.location.href = 'dashboards/client-dashboard.html';
      else window.location.href = 'admin-dashboard.html';
    }, 1000);
  };

  window.togglePassword = function(id) {
    const input = document.getElementById(id || 'password');
    input.type = input.type === 'password' ? 'text' : 'password';
  };

  // Form Handlers
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', (e) => {
      if (!form.hasAttribute('onsubmit')) {
        e.preventDefault();
        showToast('Form submitted successfully! ✅', 'success');
      }
    });
  });

  // Toast System
  function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position:fixed;top:20px;right:20px;z-index:10000;
      padding:1rem 2rem;border-radius:12px;color:white;font-weight:500;box-shadow:var(--shadow-lg);
      transform:translateX(400px);transition:all 0.3s;
      background:${type==='success'?'#10b981':type==='error'?'#ef4444':'#6366f1'};
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.style.transform = 'translateX(0)', 100);
    setTimeout(() => {
      toast.style.transform = 'translateX(400px)';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  // Auto-login check
  if (localStorage.getItem('userLoggedIn') === 'true') {
    const role = localStorage.getItem('userRole');
    if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
      if (role === 'student') window.location.href = 'dashboards/student-dashboard.html';
      else if (role === 'client') window.location.href = 'dashboards/client-dashboard.html';
    }
  }
});
