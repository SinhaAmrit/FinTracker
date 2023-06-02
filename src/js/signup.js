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
const name = document.getElementById('nameInp');
const username = document.getElementById('usernameInp');
const email = document.getElementById('emailInp');
const pass = document.getElementById('passInp');
const submit = document.getElementById('sub_btn');

//Validation
function isEmptyOrSpaces(str) {
    return str === null || str.match(/^ *$/) != null;
}
function validation() {
    let nameRegex = /^[a-zA-Z\s]+$/;
    let usernameRegex = /^[a-zA-Z0-9]{5,}$/;
    let emailRegex = /^[a-zA-Z0-9]+@(gmail|yahoo|outlook)\.com$/;

    if (isEmptyOrSpaces(name.value) || isEmptyOrSpaces(username.value) || isEmptyOrSpaces(email.value) || isEmptyOrSpaces(pass.value)) {
        alert("Fields cannot be empty!");
        return false;
    }
    if (!nameRegex.test(name.value)) {
        alert("The name should only contain alphabets!");
        return false;
    }
    if (!usernameRegex.test(username.value)) {
        alert("- Username can only be alphanumeric\n- Username must be alteast 5 characters long\n- Username cannot contain any special symbol");
        return false;
    }
    if (!emailRegex.test(email.value)) {
        alert("Enter a valid email address!");
        return false;
    }
    return true;
}

//Encryption
function encryptPass() {
    var encPass = CryptoJS.AES.encrypt(pass.value, pass.value);
    return encPass.toString();
}

//Register User
function registerUser() {
    if (!validation()) {
        return;
    }
    const dbRef = ref(db);
    get(child(dbRef, "UsersList/" + username.value)).then((snapshot) => {
        if (snapshot.exists()) {
            alert("Account already exists");
        }
        else {
            set(ref(db, "UsersList/" + username.value),
                {
                    fullname: name.value,
                    username: username.value,
                    email: email.value,
                    password: encryptPass()
                })
                .then(() => {
                    alert("User Added Successfully");
                })
                .catch((error) => {
                    alert("Error: " + error);
                })
        }
    });
}

//Assign event
submit.addEventListener('click', registerUser);