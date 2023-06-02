//References
let userlink = document.getElementById('userlink');
let header = document.getElementById('hh');
let signoutlink = document.getElementById('signoutlink');
var currentUser = null;

// Get Username
function getUsername() {
    let keepLoggedIn = localStorage.getItem('keepLoggedIn');
    console.log(keepLoggedIn);
    if (keepLoggedIn == "yes") {
        currentUser = JSON.parse(localStorage.getItem('user'));
    }
    else {
        currentUser = JSON.parse(sessionStorage.getItem('user'));
    }
}
// Sign Out
function signOut() {
    sessionStorage.removeItem('user');
    localStorage.removeItem('user');
    localStorage.removeItem('keepLoggedIn');
    window.location = "./index.html";
}

// Window Loads
window.onload = function () {
    getUsername();
    console.log(currentUser.username);
    if (currentUser == null) {
        userlink.innerText = "Get Started";
        userlink.href = "signin.html";
        signoutlink.innerText = "Login";
        signoutlink.href = "login.html"
    }
    else {
        userlink.innerText = currentUser.username;
        header.innerText = "Welcome " + currentUser.fullname;
        userlink.href = "#";
        signoutlink.innerText = "Sign out";
        signoutlink.href = "javascript:signOut()";
    }
}