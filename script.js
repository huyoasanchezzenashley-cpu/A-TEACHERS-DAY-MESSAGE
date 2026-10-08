const state = {
  teacher: "MR. RANDY BELLO",
  student: "ZEN ASHLEY SANCHEZ",
  message: "Happy Teachers Day Sir! Thank you for your patience, guidance, and for always helping us learn and grow. We truly appreciate everything you do for us. God bless you always!"
};

const book = document.getElementById("book");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const openBtn = document.getElementById("openBtn");
const pageStatus = document.getElementById("pageStatus");

const customizeBtn = document.getElementById("customizeBtn");
const closeCustomize = document.getElementById("closeCustomize");
const customizePanel = document.getElementById("customizePanel");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

const teacherInput = document.getElementById("teacherInput");
const studentInput = document.getElementById("studentInput");
const messageInput = document.getElementById("messageInput");
const photoInput = document.getElementById("photoInput");
const audioInput = document.getElementById("audioInput");

const teacherPhoto = document.getElementById("teacherPhoto");
const photoFallback = document.getElementById("photoFallback");
const audioPlayer = document.getElementById("audioPlayer");
const audioLabel = document.getElementById("audioLabel");

let page = 0; // 0 = cover, 1 = message, 2 = back

function renderPage() {
  book.classList.toggle("open", page >= 1);
  book.classList.toggle("message-open", page >= 2);

  if (page === 0) {
    pageStatus.textContent = "Cover";
  } else if (page === 1) {
    pageStatus.textContent = "Message";
  } else {
    pageStatus.textContent = "Back";
  }

  prevBtn.disabled = page === 0;
  nextBtn.disabled = page === 2;
  prevBtn.style.opacity = page === 0 ? ".45" : "1";
  nextBtn.style.opacity = page === 2 ? ".45" : "1";
}

function nextPage() {
  if (page < 2) {
    page += 1;
    renderPage();
  }
}

function previousPage() {
  if (page > 0) {
    page -= 1;
    renderPage();
  }
}

openBtn.addEventListener("click", nextPage);
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", previousPage);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") nextPage();
  if (event.key === "ArrowLeft") previousPage();
  if (event.key === "Escape") customizePanel.hidden = true;
});

function updateText() {
  const teacher = state.teacher || "MR. RANDY BELLO";
  const student = state.student || "ZEN ASHLEY SANCHEZ";
  document.getElementById("heroTeacher").textContent = teacher;
  document.getElementById("coverTeacher").textContent = teacher;
  document.getElementById("messageText").textContent = state.message;
  document.getElementById("frontSignature").textContent = student;
  document.getElementById("backSignature").textContent = "— " + student;
  teacherInput.value = teacher;
  studentInput.value = student;
  messageInput.value = state.message;
}

customizeBtn.addEventListener("click", () => {
  customizePanel.hidden = false;
  customizePanel.scrollIntoView({ behavior: "smooth", block: "center" });
});

closeCustomize.addEventListener("click", () => {
  customizePanel.hidden = true;
});

applyBtn.addEventListener("click", () => {
  state.teacher = teacherInput.value.trim() || "MR. RANDY BELLO";
  state.student = studentInput.value.trim() || "ZEN ASHLEY SANCHEZ";
  state.message = messageInput.value.trim() || "Happy Teachers Day Sir! Thank you for your patience, guidance, and for always helping us learn and grow. We truly appreciate everything you do for us. God bless you always!";
  updateText();
  customizePanel.hidden = true;
});

resetBtn.addEventListener("click", () => {
  state.teacher = "MR. RANDY BELLO";
  state.student = "ZEN ASHLEY SANCHEZ";
  state.message = "Happy Teachers Day Sir! Thank you for your patience, guidance, and for always helping us learn and grow. We truly appreciate everything you do for us. God bless you always!";
  teacherPhoto.src = "teacher-photo.png";
  photoFallback.style.display = "none";
  audioPlayer.pause();
  audioPlayer.src = "teachers-day-audio.m4a";
  audioLabel.textContent = "teachers-day-audio.m4a";
  updateText();
});

photoInput.addEventListener("change", () => {
  const file = photoInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  teacherPhoto.src = url;
  photoFallback.style.display = "none";
});

teacherPhoto.addEventListener("error", () => {
  teacherPhoto.style.display = "none";
  photoFallback.style.display = "grid";
});

audioInput.addEventListener("change", () => {
  const file = audioInput.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  audioPlayer.src = url;
  audioLabel.textContent = file.name;
  audioPlayer.load();
});

function createParticles() {
  const container = document.getElementById("particles");
  for (let i = 0; i < 22; i++) {
    const dot = document.createElement("span");
    dot.className = "particle";
    dot.style.left = Math.random() * 100 + "%";
    dot.style.animationDuration = (8 + Math.random() * 12) + "s";
    dot.style.animationDelay = (-Math.random() * 14) + "s";
    dot.style.transform = `scale(${0.5 + Math.random()})`;
    container.appendChild(dot);
  }
}

createParticles();
updateText();
renderPage();
