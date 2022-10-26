const form = {
  titleThread: () => document.getElementById('title-thread'),
  textThread: () => document.getElementById('text-thread'),
  submitThreadButton: () => document.getElementById('submit-thread'),

}

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

function goToAccount() {
  window.location.href = "/account"
}

function openPopUp() {
  appendUsername().then(username=>{
    document.body.innerHTML += `<div id="popup-container">
        <div class="thread-PopUp">
            
                <span class="close-popUp" onclick="closePopUp()">
                <i class="uil uil-multiply"></i>
            </span>

            <p class="title-popUp">Criar Publicação</p>    

            <section>
                <div class="img-user-popUp">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png">
                </div>
                <p class="username-popup">${username}</p>
            </section>

            <form class="thread-form">
                <input onchange="onChangeThreadSubmit()" type="text" id="title-thread" class="thread-title" placeholder="Titulo" >
                <label>Digite seu texto:</label>
                <textarea onchange="onChangeThreadSubmit()" id="text-thread" class="thread-text"></textarea> 
            </form>
            <button onclick="submitThread()" disabled="true" id="submit-thread" class="submit-thread" type="submit">Enviar</button>
        </div>
      </div>`
  }).catch(err=>{
    console.log(err)
  })
  
}

function closePopUp() {
  document.getElementById("popup-container").remove()
}
appendUsername()
function appendUsername() {
  // verificando se o user está on
  return new Promise((res, rej)=>{
    auth.onAuthStateChanged(userOn => {
      if(userOn){
        let userInDB = db.collection("users").doc(userOn.uid)
        userInDB.get().then((doc) => { 
          let userName = doc.data().user.username
            res(userName)
        })
      }else{
        rej("Deu tudo errado")
      }
    })
  })
  

}
function onChangeThreadSubmit() {
  toggleSubmitThreadButtonDisable()
}

function toggleSubmitThreadButtonDisable() {
  form.submitThreadButton().disabled = !validateSubmit()
}

function validateSubmit() {
  const title = form.titleThread().value

 if (!title || title.length < 6) {
  return false
 }

 const text = form.textThread().value

 if (!text || text.length < 10) {
  return false
 }
 return true
}

function submitThread() {
  
}
