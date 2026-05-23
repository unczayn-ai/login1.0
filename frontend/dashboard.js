const loggedInUser = localStorage.getItem("loggedInUser");

if (!loggedInUser) {
    window.location.href = "index.html";
}

const userEmail = document.getElementById("userEmail");

userEmail.textContent = `Logged in as: ${loggedInUser}`;

const logoutBtn = document.getElementById("logoutBtn");

logoutBtn.addEventListener("click", function() {

    localStorage.removeItem("loggedInUser");
    window.location.href = "index.html";
});
