function getTimeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);

  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(seconds / 3600);
  const days = Math.floor(seconds / 86400);
  const weeks = Math.floor(seconds / 604800);

  if (seconds < 60) return seconds + "s";
  if (minutes < 60) return minutes + "m";
  if (hours < 24) return hours + "h";
  if (days < 7) return days + "d";
  return weeks + "w";
}

const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".blog-card");
// Search code
if (searchInput) {
searchInput.addEventListener("keyup", function () {
  const searchValue = searchInput.value.toLowerCase();

  cards.forEach(card => {
    const title = card.getAttribute("data-title").toLowerCase();

    if (title.includes(searchValue)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
    });
  });
}
// Load More Button
const button = document.querySelector(".load-more button");

if (button) {
  button.addEventListener("click", function () {
    alert("More articles coming soon!");
  });
}
// Language code
const language = document.getElementById("language");

if (language) {
  language.addEventListener("change", function () {
    const heroTitle = document.getElementById("hero-title");
    const heroText = document.getElementById("hero-text");

    if (!heroTitle || !heroText) return;

    if (language.value === "te") {
      heroTitle.innerText = "నా బ్లాగ్‌కి స్వాగతం";
      heroText.innerText =
        "టెక్నాలజీ, AI మరియు ప్రోగ్రామింగ్ పై తాజా ఆర్టికల్స్ చూడండి.";
    } else if (language.value === "hi") {
      heroTitle.innerText = "मेरे ब्लॉग में आपका स्वागत है";
      heroText.innerText =
        "तकनीक, AI और प्रोग्रामिंग पर नवीनतम लेख पढ़ें।";
    } else {
      heroTitle.innerText = "Welcome to My Blog";
      heroText.innerText =
        "Explore the latest articles on Technology, AI, and Programming.";
    }
  });
}
// Dark mode code
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
}

const darkBtn = document.getElementById("darkBtn");

if (darkBtn) {
  // Button text 
  if (document.body.classList.contains("dark-mode")) {
    darkBtn.innerText = "☀️ Light Mode";
  }

  darkBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
      localStorage.setItem("theme", "dark");
      darkBtn.innerText = "☀️ Light Mode";
    } else {
      localStorage.setItem("theme", "light");
      darkBtn.innerText = "🌙 Dark Mode";
    }
  });
}
const topBtn = document.getElementById("topBtn");

window.addEventListener("scroll", function () {
  if (topBtn && window.scrollY > 300) {
    topBtn.style.display = "block";
  } else if (topBtn) {
    topBtn.style.display = "none";
  }
});

if (topBtn) {
  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const likeBtn = document.getElementById("likeBtn");
const likeCount = document.getElementById("likeCount");

let count = localStorage.getItem("likes") || 0;

if (likeCount) {
  likeCount.innerText = count;
}

if (likeBtn) {
  likeBtn.addEventListener("click", function () {
    count++;
    likeCount.innerText = count;
    localStorage.setItem("likes", count);
  });
}


const commentBtn = document.getElementById("commentBtn");
const commentsDiv = document.getElementById("comments");


let comments = JSON.parse(localStorage.getItem("comments")) || [];

function displayComments() {
  if (!commentsDiv) return;

  commentsDiv.innerHTML = "";

  comments.forEach(item => {
    const newComment = document.createElement("div");
    newComment.classList.add("comment");

    newComment.innerHTML = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
     <div>
       <strong>${item.name}</strong>
       <small>${getTimeAgo(item.time)} ago</small>
     </div>
     <div>
       <button class="editBtn">✏️</button>
       <button class="deleteBtn">🗑️</button>
     </div>
    </div>

    <p class="commentText">${item.text}</p>
    `;
    const deleteBtn = newComment.querySelector(".deleteBtn");

  deleteBtn.addEventListener("click", function () {
    const index = comments.indexOf(item);

    if (index > -1) {
       comments.splice(index, 1);
       localStorage.setItem("comments", JSON.stringify(comments));
    }

    displayComments();
});

const editBtn = newComment.querySelector(".editBtn");

editBtn.addEventListener("click", function () {

  const newText = prompt("Edit your comment:", item.text);

  if (newText !== null && newText.trim() !== "") {

    item.text = newText;

    localStorage.setItem("comments", JSON.stringify(comments));

    displayComments();

  }

});

commentsDiv.appendChild(newComment);
  });
}

displayComments();

if (commentBtn) {
  commentBtn.addEventListener("click", function () {
    const name = document.getElementById("userName").value;
    const comment = document.getElementById("userComment").value;

    if (name === "" || comment === "") {
      alert("Please enter your name and comment!");
      return;
    }

    comments.push({
      name: name,
      text: comment,
      time: new Date()
    });

    localStorage.setItem("comments", JSON.stringify(comments));

    displayComments();

    document.getElementById("userName").value = "";
    document.getElementById("userComment").value = "";
  });
}

const dateTime = document.getElementById("dateTime");

if (dateTime) {
  setInterval(() => {
    const now = new Date();
    dateTime.innerText = now.toLocaleString();
  }, 1000);
}
// Contact Form Validation

const contactForm = document.getElementById("contactForm");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "") {
      alert("Please enter your name.");
      return;
    }

    if (email === "") {
      alert("Please enter your email.");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (message === "") {
      alert("Please enter your message.");
      return;
    }

    alert("✅ Message Sent Successfully!");

    contactForm.reset();

  });

}
// Active Navbar

const currentPage = window.location.pathname.split("/").pop();

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  const href = link.getAttribute("href");

  if (href === currentPage || (currentPage === "" && href === "index.html")) {
    link.classList.add("active");
  }
});
