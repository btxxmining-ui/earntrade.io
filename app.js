const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function register(){
  let email = document.getElementById("r_email").value;
  let pass = document.getElementById("r_pass").value;
  let ref = document.getElementById("ref").value;

  auth.createUserWithEmailAndPassword(email, pass)
  .then(user => {
    let uid = user.user.uid;

    db.collection("users").doc(uid).set({
      balance: 0,
      referralCode: uid.substring(0,6),
      referredBy: ref
    });

    alert("Registered");
  });
}

function login(){
  let email = document.getElementById("email").value;
  let pass = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, pass)
  .then(() => {
    window.location = "dashboard.html";
  });
}

auth.onAuthStateChanged(user => {
  if(user){
    db.collection("users").doc(user.uid).get()
    .then(doc => {
      document.getElementById("balance").innerText =
        "Balance: " + doc.data().balance + " USDT";

      document.getElementById("referral").innerText =
        "Referral Code: " + doc.data().referralCode;
    });
  }
});

function deposit(){
  let user = auth.currentUser;

  db.collection("deposits").add({
    userId: user.uid,
    amount: 100,
    status: "pending"
  });

  alert("Deposit Request Sent");
}

function withdraw(){
  let user = auth.currentUser;

  db.collection("withdraws").add({
    userId: user.uid,
    amount: 50,
    status: "pending"
  });

  alert("Withdraw Request Sent");
}