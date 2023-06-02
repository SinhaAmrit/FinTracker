//References
let userlink = document.getElementById('userlink');
var currentUser = null;

// Get Username
function getUsername() {
    let keepLoggedIn = localStorage.getItem('keepLoggedIn');
    if (keepLoggedIn == "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}

// Window Loads
window.onload = function () {
    getUsername();
    if (currentUser == null) {
        userlink.innerText = "Get Started";
        userlink.href = "signin.html";
    }
    else {
        userlink.innerText = currentUser.username;
        userlink.href = "./dashboard.html";
    }
}