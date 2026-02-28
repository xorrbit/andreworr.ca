// andreworr.ca - Navigation
// Sidebar toggle + active link highlighting

(function () {
  'use strict';

  // Active nav highlighting
  var path = window.location.pathname;
  var links = document.querySelectorAll('.sidebar__link');

  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (path === href || path.endsWith(href)) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  // Mobile sidebar toggle
  var toggle = document.getElementById('sidebar-toggle');
  var sidebar = document.getElementById('sidebar');
  var overlay = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('open');
    toggle.classList.add('open');
    overlay.classList.add('visible');
  }

  function closeSidebar() {
    sidebar.classList.remove('open');
    toggle.classList.remove('open');
    overlay.classList.remove('visible');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      if (sidebar.classList.contains('open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('open')) {
      closeSidebar();
    }
  });

  // Close sidebar on nav link click (mobile)
  links.forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 768) {
        closeSidebar();
      }
    });
  });

  // Reset sidebar state when crossing the mobile breakpoint
  var mql = window.matchMedia('(max-width: 768px)');
  mql.addEventListener('change', function (e) {
    if (!e.matches) {
      closeSidebar();
    }
  });
})();
