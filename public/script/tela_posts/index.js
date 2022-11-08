//fazer funcção para adicionar o html no comments-container

const form = {
  titleThread: () => document.querySelector('#title-thread'),
  textThread: () => document.querySelector('#text-thread'),
  submitThreadButton: () => document.querySelector('#submit-thread'),
  ThreadContainer: () => document.querySelector('.thread-container'),
  textComment: ()=> document.querySelector("#text-comment")

}

document.addEventListener("DOMContentLoaded", ()=>{
      db.collection("posts").get().then(snp=>{
        snp.forEach(post=>{
          createPost(post.data())
          // document.querySelector(".loading-container").style.display = "none"
        })
      })
})
function createPost(post){
    document.querySelector(".threads-container").innerHTML += ` 

                                  
                                                                      <li class="thread" id="${post.id}">
                                                                        <h2 class="title-post">${post.title}</h2>
                                                                        <p class="text-post ${listenClassRead(post.description)}">${post.description}</p>
                                                                       ${listenLengthText(post.description)}
                                                                        <div class="stamp-thread">
                                                                            <b class="author">${post.author}</b>
                                                                            <b class="timestamp">${post.time}</b> 
                                                                            <hr>
                                                                        </div>
                                                                        <div class="buttons_comments">
                                                                            <button onclick="openPopUpComment('${post.id}')" >Criar comentário</button>
                                                                            <button>Ver comentários</button>
                                                                        </div>
                                                                        
                                                                        
                                                                      </li>
                                                            
                                                                
                                                              `

}



function readMoreThread(button){
    let textThread = button.parentNode.parentNode.querySelector(".text-post")
    textThread.classList.toggle("putText_Post")
    button.innerHTML === "Ler mais" ? button.innerHTML = "Ler menos" : button.innerHTML = "Ler mais"
}
function listenClassRead(description){
  let lengthDescription = description.length
  if(lengthDescription > 100) return "putText_Post"
  else return ""
  
}
function listenLengthText(description){
    let lengthDescription = description.length
    if(lengthDescription > 100) return "<span><button onclick='readMoreThread(this)'>Ler mais</button></span>"
    else return ""
    

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

function openPopUp(postId) {
  appendUsername().then(username=>{
    document.body.innerHTML += `
      <div id="popup-container">
        <div class="thread-PopUp">
            
          <span class="close-popUp" onclick="closePopUp()">
          <i class="uil uil-multiply"></i>
          </span>'

          <p class="title-popUp">Criar Publicação</p>    

          <section>
              <div class="img-user-popUp">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png">
              </div>
              <p class="username-popup">${username}</p>
          </section>

          <form class="thread-form">
            <input oninput="onChangeThreadSubmit()" type="text" maxLength="100" id="title-thread" class="thread-title" placeholder="Titulo">
            <label>Digite seu texto:</label>
            <textarea oninput="onChangeThreadSubmit()" id="text-thread" class="thread-text"></textarea> 
          </form>
          <button onclick="submitThread('${postId}, ${username}')" disabled="true" id="submit-thread" class="submit-thread" type="submit">Enviar</button>
        </div>
      </div>`
  }).catch(error => {
    console.log(error)
  })

}

function closePopUp() {
  document.getElementById("popup-container").remove()
}

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
      }else{""
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

function submitThread(idPost, username){
  auth.onAuthStateChanged(user => createThreadDb(username, user.uid))
  const createThreadDb = (username, uid)=>{
    let id = createIdPost()
    db.collection("posts").doc(id)
    .set({
        id,
        title: form.titleThread().value,
        description: form.textThread().value,
        author: username,
        comments: [],
        uid,
        time: new Date().toLocaleDateString()
      }).then(() => {
        document.location.reload(true)
      }).catch(error => {
        console.log("error")
    })
  }
}


function createIdPost(){
  return Math.random().toString(16).substring(3, 16)
}

function openPopUpComment(idPost){
  appendUsername().then(username=>{
    document.body.innerHTML = document.body.innerHTML += `
    <div id="popup-container">
      <div class="thread-PopUp">
          
        <span class="close-popUp" onclick="closePopUp()">
        <i class="uil uil-multiply"></i>
        </span>

        <p class="title-popUp">Criar Comentário</p>    

        <section>
            <div class="img-user-popUp">
                <img src="https://upload.wikimedia.org/wikipedia/commons/7/72/Default-welcomer.png">
            </div>
            <p class="username-popup">${username}</p>
        </section>

        <form class="thread-form">
          <label>Digite seu comentário:</label>
          <textarea id="text-comment" class="thread-text"></textarea> 
        </form>
        <button onclick="submitComment('${idPost}', '${username}')" id="submit-thread" class="submit-thread" type="submit">Enviar</button>
      </div>
    </div>`
      
       
  }).catch(error => {
    console.log(error);
  })
}

function submitComment(idPost, username){
  let comment = {
    description: form.textComment().value,
    author: username,
    time: new Date().toLocaleDateString()

  }

    db.collection("posts").doc(idPost).update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment)

      },{merge: true}).then(()=>{
          console.log("funfou")
      }).catch(err =>{
          console.log(err)
      })
    
}