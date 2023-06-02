// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-analytics.js";
import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLclM2xy7R7a5eDVFNmLPt4nvY9NBDetM",
    authDomain: "fintracker-c4b2f.firebaseapp.com",
    databaseURL: "https://fintracker-c4b2f-default-rtdb.firebaseio.com",
    projectId: "fintracker-c4b2f",
    storageBucket: "fintracker-c4b2f.appspot.com",
    messagingSenderId: "174471604678",
    appId: "1:174471604678:web:cbe353174378258561aac7",
    measurementId: "G-T0L7M22TQ1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();
const analytics = getAnalytics(app);

//References
const username = document.getElementById('usernameInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('sub_btn');

//Authentication
function authenticateUser() {
    const dbRef = ref(db);
    get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            let dbpass = dencryptPass(snapshot.val().password);
            if (dbpass == pass.value) {
                login(snapshot.val());
            }
            else {
                alert("Invalid Username/Password!");
            }
        }
    });
}

//Decryption
function dencryptPass(dbpass) {
    var decPass = CryptoJS.AES.decrypt(dbpass, pass.value);
    return decPass.toString(CryptoJS.enc.Utf8);
}

//login
function login(user) {
    let keepLoggedIn = document.getElementById('loggedIn').checked;

    if (!keepLoggedIn) {
        sessionStorage.setItem('user', JSON.stringify(user));
        window.location = "./dashboard.html";
    }
    else {
        localStorage.setItem('keepLoggedIn', 'yes');
        localStorage.setItem('user', JSON.stringify(user));
        window.location = "./dashboard.html";
    }
}

//Assign event
submit.addEventListener('click', authenticateUser);