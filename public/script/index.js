function showMenuAccount() {
    let buttons = document.getElementById("options_account")
    
    if (buttons.style.display === "block") {
      buttons.style.display = "none";
    } else {
      buttons.style.display = "block";
    }
}
 
function signOut() {
    firebase.auth().signOut().then(() => {
        window.location.href = "/login"
    }).catch(() => {
        alert('erro ao fazer logout')
    })
}

// auth.onAuthStateChanged(user => {
//     console.log(user.uid);
// })