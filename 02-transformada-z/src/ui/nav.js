/**
 * Controlador de navegación con IntersectionObserver y scrollspy.
 */

export function navegarAModulo(id, event) {
  if (event && event.preventDefault) {
    event.preventDefault();
  }
  const cleanId = id.replace(/^#/, '');
  const targetEl = document.getElementById(cleanId);
  if (targetEl) {
    const headerOffset = 135;
    const elementPosition = targetEl.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
    try {
      history.pushState(null, '', `#${cleanId}`);
    } catch (_) {}
    resaltarEnlace(cleanId);
  }
}

function resaltarEnlace(id) {
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-link, a[href^="#"]');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === `#${id}`) {
      link.classList.add('active', 'is-active');
    } else if (href && href.startsWith('#') && href.length > 1) {
      link.classList.remove('active', 'is-active');
    }
  });
}

export function initNav() {
  const sections = document.querySelectorAll('section[id].module-section');
  const navLinks = document.querySelectorAll('.nav-link, .sidebar-link, a[href^="#"]');

  // Delegación de clic con desplazamiento suave y offset de cabecera
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId && targetId.startsWith('#') && targetId.length > 1) {
        navegarAModulo(targetId.substring(1), e);
      }
    });
  });

  // IntersectionObserver para scrollspy automático mientras se desplaza el estudiante
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          resaltarEnlace(id);
        }
      });
    },
    { rootMargin: '-20% 0px -65% 0px' }
  );

  sections.forEach(sec => observer.observe(sec));

  // Navegar al módulo inicial si hay hash en la URL
  if (window.location.hash && window.location.hash.length > 1) {
    setTimeout(() => {
      navegarAModulo(window.location.hash.substring(1));
    }, 150);
  }
}
