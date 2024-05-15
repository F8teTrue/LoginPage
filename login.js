const firebaseConfig = {
    apiKey: "AIzaSyBATT-7pmmb-O7E5e1D-KczrBOSvc75at0",
    authDomain: "loginpage-93a16.firebaseapp.com",
    projectId: "loginpage-93a16",
    storageBucket: "loginpage-93a16.appspot.com",
    messagingSenderId: "917081627931",
    appId: "1:917081627931:web:91cf68e2aa70cbb41807be"
  };

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function login(username, password) {
    try {
        const checkUsername = await db.collection("users").where("username", "==", username).get();
        if (checkUsername.empty) {
            alert("Username does not exist")
            return
        }
        
        const userDoc = checkUsername.docs[0]
        if (userDoc.data().password !== password) {
            alert("Invalid username or password")
            return
        }

        console.log("User has been logged in")
        window.location.href = "homePage.html"
    } catch (error) {
        console.log("Error logging in user", error)
    }
}

document.getElementById("loginForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    await login(username, password);
});

document.getElementById("togglePassword").addEventListener("change", function() {
    const passwordInput = document.getElementById("password")
    if (passwordInput.type === "password") {
        passwordInput.type = "text"
    } else {
        passwordInput.type = "password"
    }
});