// ====== INITIAL SETUP ======

// Sections for reveal animation
const sections = document.querySelectorAll('section');

// Set initial styles for reveal animation
sections.forEach(sec => {
  sec.style.opacity = 0;
  sec.style.transform = 'translateY(30px)';
  sec.style.transition = '0.6s ease';
});

// ====== SMOOTH SCROLL ======
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ====== SCROLL REVEAL ======
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      sec.style.opacity = 1;
      sec.style.transform = 'translateY(0)';
    }
  });
});

// ====== TAB FILTERING ======
const tabs = document.querySelectorAll('.tab');
const projects = document.querySelectorAll('.project');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Remove active from all tabs
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    const filter = tab.dataset.filter;

    projects.forEach(project => {
      project.style.display =
        filter === 'all' || project.dataset.category === filter
          ? 'flex'
          : 'none';
    });
  });
});


const viewAllBtn = document.getElementById("viewAllProjects");

viewAllBtn.addEventListener("click", () => {
  document.querySelectorAll(".extra-project").forEach(project => {
    project.style.display = "flex"; // show the hidden projects
  });

  viewAllBtn.style.display = "none"; // hide the button after clicking
});


// ====== MODAL LOGIC ======
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalTech = document.getElementById("modalTech");
const modalImg = document.getElementById("modalImg");
const modalLive = document.getElementById("modalLive");
const modalGit = document.getElementById("modalGit");
const modalClose = document.querySelector(".close");

// Open modal when clicking "Read more"
document.querySelectorAll(".read-more").forEach(btn => {
  btn.addEventListener("click", e => {
    const project = e.target.closest(".project");
    if (!project) return;

    modalTitle.textContent = project.dataset.title || "Project";
    modalDesc.textContent = project.dataset.desc || "";
    modalImg.src = project.dataset.img || "";
    modalLive.href = project.dataset.live || "#";
    modalGit.href = project.dataset.github || "#";

    modalTech.innerHTML = project.dataset.tech
      ? project.dataset.tech.split(',').map(t => `<span>${t.trim()}</span>`).join('')
      : '';

    modal.style.display = "flex";
  });
});

// Close modal
modalClose.onclick = () => {
  modal.style.display = "none";
};

// Close modal when clicking outside modal content
modal.onclick = e => {
  if (e.target === modal) modal.style.display = "none";
};
