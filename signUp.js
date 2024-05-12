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

async function signUp(username, password) {
    try {
        if (username.length < 5) {
            alert("Username must be at least 5 characters long");
            return;
        }
        if (password.length < 8) {
            alert("Password must be at least 8 characters long");
            return;
        }
        
        const checkUsername = await db.collection("users").where("username", "==", username).get();
        if (!checkUsername.empty) {
            alert("Username already taken");
            return;
        }

        await db.collection("users").add({
            username: username,
            password: password
        });

        console.log("User has been created");
        window.location.href = "index.html"
    } catch (error) {
        console.log("Error creating user", error);
    }
}

document.getElementById("signUpForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value; 
    const password = document.getElementById("password").value;

    await signUp(username, password);
});