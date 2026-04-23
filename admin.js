const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

function adminLogin(){
  let email = document.getElementById("email").value;
  let pass = document.getElementById("pass").value;

  auth.signInWithEmailAndPassword(email, pass)
  .then(() => {
    if(email === "admin@gmail.com"){
      document.getElementById("panel").style.display = "block";
      loadData();
    }
  });
}

function loadData(){
  db.collection("deposits").onSnapshot(snap => {
    let html="";
    snap.forEach(doc=>{
      let d=doc.data();
      html += `<p>${d.amount}</p>`;
    });
    document.getElementById("depositList").innerHTML = html;
  });
}