const sectionComments = document.getElementById("section")
const avatars = document.querySelectorAll(".avatars")
const names = document.querySelectorAll(".names");
const dates = document.querySelectorAll(".dates");
const comments = document.querySelectorAll(".comments");
const votesContainer = document.querySelector(".vote")
const votes = document.querySelectorAll(".votes");
const currentUserImage = document.querySelector(".current-user-img")
const send = document.getElementById("send");
const modal = document.querySelector(".modal")
const cancel = document.querySelector(".modal__buttons--cancel")
const writeCommentContainer = document.querySelector(".write-comment-container")
const textAreaValue = document.getElementById("text-area")
const plusVote = document.querySelector(".plus")
const minusVote = document.querySelector(".minus")
const buttonReply = document.querySelectorAll(".button")
const imgPlus = document.getElementById("img-plus")
const imgMinus = document.getElementById("img-minus")
const pruDeleteContainer = document.querySelector(".delete-edit-container")
const deleteModal = document.querySelector(".modal__buttons--delete")
const postingReplyButtons = document.querySelectorAll(".posting-reply")

let newCommentsArray = []
let newCommentsReplyArrays = []
let lastelementCommentId
let lastReplyCommentId

const newPostFragment = document.createDocumentFragment()

fetch("data.json")
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
    avatars[0].src= res.comments[0].user.image.png
    names[0].textContent = res.comments[0].user.username
    dates[0].textContent = res.comments[0].createdAt
    comments[0].textContent = res.comments[0].content
    votes[0].textContent = res.comments[0].score

    avatars[1].src= res.comments[1].user.image.png
    names[1].textContent = res.comments[1].user.username
    dates[1].textContent = res.comments[1].createdAt
    comments[1].textContent = res.comments[1].content
    votes[1].textContent = res.comments[1].score

    avatars[2].src= res.comments[1].replies[0].user.image.png
    names[2].textContent = res.comments[1].replies[0].user.username
    dates[2].textContent = res.comments[1].replies[0].createdAt
    comments[2].textContent = res.comments[1].replies[0].content
    votes[2].textContent = res.comments[1].replies[0].score

    avatars[3].src= res.comments[1].replies[1].user.image.png
    names[3].textContent = res.comments[1].replies[1].user.username
    dates[3].textContent = res.comments[1].replies[1].createdAt
    comments[3].textContent = res.comments[1].replies[1].content
    votes[3].textContent = res.comments[1].replies[1].score

    currentUserImage.src = res.currentUser.image.png
})

// Obtengo el Id del último comentario o post para asignar el Id consecutivo al siguiente comentario o post
let commentId = localStorage.getItem("last comment Id")

send.addEventListener("click", ()=> {

    const publicationDate = Date.now()

    const newComment = {
        commentId: ++commentId,
        content: textAreaValue.value,
        createdAt: publicationDate,
        score: 0,
        userimage: writeCommentContainer.childNodes[3].childNodes[1].childNodes[1].src
       //username: res.currentUser.username
    }
    const commentReplyContainer  = document.createElement("DIV")
    commentReplyContainer.classList.add("comment-reply-container")
    const newPostContainer = document.createElement("DIV")
    newPostContainer.classList.add("user-comments")
    newPostContainer.setAttribute("data-comment-id", newComment.commentId)
    newPostContainer.innerHTML = `<div class="user-comments__header">
    <div class="avatars-containers">
        <img src="${newComment.userimage}" class="avatars" alt="user photo">
    </div>
    <p id="user-name" class="names"></p>
    <p class="you">you</p>
    <p id="date" class="dates text-color">today</p>
    </div>
    <p class="comments text-color">${newComment.content}</p>
    <div class="vote-reply">
    <div class="vote">
        <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
        <p class="votes">${newComment.score}</p>
        <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
    </div>
    <div class="delete-edit-container">
        <button class="delete-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
            <p>Delete</p>
        </button>
        <button class="edit-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
            <p>Edit</p>
        </button>
    </div>
    </div>
    <button class="update-button" hidden>update</button>`
    commentReplyContainer.prepend(newPostContainer)
    newPostFragment.appendChild(commentReplyContainer)
    writeCommentContainer.before(newPostFragment)

    //Introduzco el nuevo comentario al array
    newCommentsArray.push(newComment)

    //Guardo el array en el localStorage
    localStorage.setItem("comment", JSON.stringify(newCommentsArray))

    //Para obtener el número de Id del último comentario y lo guardo en el localStorage
    let obtenerId = (JSON.parse(localStorage.getItem("comment")))
    lastelementCommentId = obtenerId[obtenerId.length - 1].commentId
    localStorage.setItem("last comment Id", `${lastelementCommentId}`)

    newPostContainer.addEventListener("click", (e)=> {
        let obtenerId = (JSON.parse(localStorage.getItem("comment")))
        if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
            let deleteIndex = e.path[4].dataset.commentId
            //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
            numberOfId = obtenerId.findIndex(element => element.commentId == deleteIndex)
            modal.classList.add("show")
        }
        deleteModal.addEventListener("click", () => {
            if(obtenerId.length === 1){
                localStorage.removeItem("comment")
                localStorage.removeItem("last comment Id")
                newPostContainer.remove()
                modal.classList.remove("show")
            }else{
            //Borra del localStorage el comentario que coincida con el commentId pasado
            obtenerId.splice(numberOfId,1)
            newCommentsArray.splice(numberOfId,1)
            //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
            lastelementCommentId = obtenerId[obtenerId.length - 1].commentId
            localStorage.setItem("last comment Id", `${lastelementCommentId}`)
            localStorage.setItem("comment", JSON.stringify(obtenerId))
            newPostContainer.remove()
            modal.classList.remove("show")
            }  
        })
    })
    textAreaValue.value = ""
})

let arrayButtons = Array.from(buttonReply)

const fragmentForReply = document.createDocumentFragment()

for(const button of arrayButtons) {
    button.addEventListener("click", ()=> {
        let nameUser = button.parentElement.previousElementSibling.previousElementSibling.childNodes[3].lastChild.nodeValue
        const newPostReply = document.createElement("DIV")
        newPostReply.classList.add("write-comment-container", "margin-b")
        newPostReply.innerHTML = `<textarea name="" id="text-area" cols="30" rows="5" class="text-area"></textarea>
        <div class="current-button-container">
            <div class="avatars-containers">
                <img src="./assets/images/avatars/image-juliusomo.png" class="current-user-img avatars" alt="user photo">
            </div>
            <button class="send posting-reply">REPLY</button>
        </div>`
        newPostReply.firstChild.value = `@${nameUser}, `
        fragmentForReply.appendChild(newPostReply)
        button.parentElement.parentElement.after(fragmentForReply)
        newPostReply.firstElementChild.focus()

        newPostReply.addEventListener("click", (e)=> {
            if(e.target.innerHTML === "REPLY"){
                // Obtengo el Id del último comentario o post para asignar el Id consecutivo al siguiente comentario o post
                let replyCommentId = localStorage.getItem("last reply comment Id")

                const replyDate = Date.now()

                const newCommentReply = {
                    replyCommentId: ++replyCommentId,
                    replyingTo: nameUser,
                    content: newPostReply.firstChild.value,
                    createdAt: replyDate,
                    score: 0,
                    userimage: writeCommentContainer.childNodes[3].childNodes[1].childNodes[1].src,
                    //username: res.currentUser.username
                }
                const commentReplyContainer  = document.createElement("DIV")
                commentReplyContainer.classList.add("comment-reply-container")
                const newPostContainer = document.createElement("DIV")
                newPostContainer.classList.add("user-comments", "reply-containers")
                commentReplyContainer.setAttribute("data-replying-to", newCommentReply.replyingTo)
                commentReplyContainer.setAttribute("data-reply-comment-id", newCommentReply.replyCommentId)
                const link = document.createElement("A")
                link.setAttribute("href", "#")
                link.textContent = nameUser
                console.log(link)
                newPostContainer.innerHTML = `<div class="user-comments__header">
                <div class="avatars-containers">
                    <img src="./assets/images/avatars/image-juliusomo.png" class="avatars" alt="user photo">
                </div>
                <p id="user-name" class="names"></p>
                <p class="you">you</p>
                <p id="date" class="dates text-color">today</p>
                </div>
                <p class="comments text-color">${newCommentReply.content}</p>
                <div class="vote-reply">
                <div class="vote">
                    <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                    <p class="votes">${newCommentReply.score}</p>
                    <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
                </div>
                <div class="delete-edit-container">
                    <button class="delete-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                        <p>Delete</p>
                    </button>
                    <button class="edit-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                        <p>Edit</p>
                    </button>
                </div>
                </div>
                <button class="update-button" hidden>update</button>`
                commentReplyContainer.appendChild(newPostContainer)
                newPostFragment.appendChild(commentReplyContainer)
                button.parentElement.parentElement.parentElement.append(newPostFragment)
                newPostReply.remove()

                newCommentsReplyArrays.push(newCommentReply)

                localStorage.setItem("newCommentReply", JSON.stringify(newCommentsReplyArrays))

                //Para obtener el número de Id del último comentario y lo guardo en el localStorage
                let repliesCommentsIds = (JSON.parse(localStorage.getItem("newCommentReply")))
                lastReplyCommentId = repliesCommentsIds[repliesCommentsIds.length - 1].replyCommentId
                localStorage.setItem("last reply comment Id", `${lastReplyCommentId}`)
                

                commentReplyContainer.addEventListener("click", (e)=> {
                    let getArrayCommentsReplies = (JSON.parse(localStorage.getItem("newCommentReply")))
                    if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
                        let commentReply = e.path[5].dataset.replyCommentId
                        //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
                        numberOfCommentReplyId = getArrayCommentsReplies.findIndex(element => element.replyCommentId == commentReply)
                        modal.classList.add("show")
                    }
                    deleteModal.addEventListener("click", () => {
                        if(getArrayCommentsReplies.length === 1){
                            localStorage.removeItem("newCommentReply")
                            localStorage.removeItem("last reply comment Id")
                            commentReplyContainer.remove()
                            modal.classList.remove("show")
                        }else{
                        //Borra del localStorage el comentario que coincida con el commentId pasado
                        getArrayCommentsReplies.splice(numberOfCommentReplyId,1)
                        newCommentsReplyArrays.splice(numberOfCommentReplyId,1)
                        //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
                        lastReplyCommentId = getArrayCommentsReplies[getArrayCommentsReplies.length - 1].replyCommentId
                        localStorage.setItem("last reply comment Id", `${lastReplyCommentId}`)
                        localStorage.setItem("newCommentReply", JSON.stringify(getArrayCommentsReplies))
                        
                        commentReplyContainer.remove()
                        modal.classList.remove("show")
                        }  
                    })
                })
            }
        })
    })
}
const fragment = document.createDocumentFragment()
//Función para cargar todos los comentarios guardados en el localStorage al cargar la página
const showStoredComments = ()=> {
    newCommentsArray = JSON.parse(localStorage.getItem("comment"));
    if(newCommentsArray === null){
        newCommentsArray = []
    }else{
        let currentDate = Date.now()
        newCommentsArray.forEach(element => {
            const commentReplyContainerGlobal  = document.createElement("DIV")
            commentReplyContainerGlobal.classList.add("comment-reply-container")
            const newPostContainerGlobal = document.createElement("DIV")
            newPostContainerGlobal.classList.add("user-comments")
            newPostContainerGlobal.setAttribute("data-comment-id", element.commentId)
            let elapsedTIme = currentDate - element.createdAt 
            elapsedTIme = `${Math.trunc(elapsedTIme / 1000 / 60 /60)}`
            let elapsedTImeDisplayed
            if(elapsedTIme == 0 || elapsedTIme < 23){
                elapsedTImeDisplayed = "today"
            }else if(elapsedTIme == 24 || elapsedTIme < 48){
                elapsedTImeDisplayed = `${Math.trunc(elapsedTIme / 24)} days ago`
            }
            newPostContainerGlobal.innerHTML = `<div class="user-comments__header">
            <div class="avatars-containers">
                <img src="${element.userimage}" class="avatars" alt="user photo">
            </div>
            <p id="user-name" class="names"></p>
            <p class="you">you</p>
            <p id="date" class="dates text-color">${elapsedTImeDisplayed}</p>
            </div>
            <p class="comments text-color">${element.content}</p>
            <div class="vote-reply">
            <div class="vote">
                <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                <p class="votes">${element.score}</p>
                <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
            </div>
            <div class="delete-edit-container">
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                    <p>Delete</p>
                </button>
                <button class="edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                    <p>Edit</p>
                </button>
            </div>
            </div>
            <button class="update-button" hidden>update</button>`
            commentReplyContainerGlobal.prepend(newPostContainerGlobal)
            fragment.appendChild(commentReplyContainerGlobal)
            sectionComments.append(fragment)
        })
    }
}

//Función para mostar las respuestas guardadas en el localStorage al cargar la página
const showStoredReply = ()=> {
    newCommentsReplyArrays = JSON.parse(localStorage.getItem("newCommentReply"));
    if(newCommentsReplyArrays === null){
        newCommentsReplyArrays = []
    }else{
        for(const paintElement of newCommentsReplyArrays){
            const commentReplyContainerGlobal  = document.createElement("DIV")
            commentReplyContainerGlobal.classList.add("comment-reply-container")
            commentReplyContainerGlobal.setAttribute("data-replying-to", paintElement.replyingTo)
            commentReplyContainerGlobal.setAttribute("data-reply-comment-id", paintElement.replyCommentId)
            const reply = document.createElement("DIV")
            reply.classList.add("user-comments", "reply-containers")
            reply.innerHTML = `<div class="user-comments__header">
            <div class="avatars-containers">
                <img src="${paintElement.userimage}" class="avatars" alt="user photo">
            </div>
            <p id="user-name" class="names"></p>
            <p class="you">you</p>
            <p id="date" class="dates text-color">ago</p>
            </div>
            <p class="comments text-color">${paintElement.content}</p>
            <div class="vote-reply">
            <div class="vote">
                <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                <p class="votes">${paintElement.score}</p>
                <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
            </div>
            <div class="delete-edit-container">
                <button class="delete-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14"><path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/></svg>
                    <p>Delete</p>
                </button>
                <button class="edit-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg>
                    <p>Edit</p>
                </button>
            </div>
            </div>
            <button class="update-button" hidden>update</button>`
            commentReplyContainerGlobal.prepend(reply)
            const userComentsAndRepliesContainers = document.querySelectorAll(".comment-reply-container")
            let userComentsAndRepliesContainersArray = Array.from(userComentsAndRepliesContainers)
            for(const orderAndPaint of userComentsAndRepliesContainersArray){
                if(paintElement.replyingTo == orderAndPaint.id){
                    orderAndPaint.append(commentReplyContainerGlobal)
                }
            }
        }
    }
}

//newComments = JSON.parse(localStorage.getItem("comment"))
document.addEventListener("DOMContentLoaded", showStoredComments(), showStoredReply());

const deleteButtons = document.querySelectorAll(".delete-button")
for(const deleteButton of deleteButtons){
    deleteButton.addEventListener("click", (e)=> {
        //Esto comprueba si el comentario es una respuesta a un comentario
        if(e.target.closest(".comment-reply-container").firstElementChild.classList.contains("reply-containers")){
            let obtenerReplyCommentId = (JSON.parse(localStorage.getItem("newCommentReply")))
            let deleteIndexOfReplyComment = e.path[5].dataset.replyCommentId
            let numberReplyCommentOfId
            let elementToRemove = e.path[5]
            //Guardo en una variable el numero de replyId y lo busco en el array por su numero de commentId
            numberReplyCommentOfId = obtenerReplyCommentId.findIndex(element => element.replyCommentId == deleteIndexOfReplyComment)
            modal.classList.add("show")
            deleteModal.addEventListener("click", () => {
                if(obtenerReplyCommentId === null){
                    console.log("la respuesta es nula")
                //Para comprobar que solo queda un comentario, si es así se borra todo el localStorage
                }else if(obtenerReplyCommentId.length === 1){
                    localStorage.removeItem("newCommentReply")
                    localStorage.removeItem("last reply comment Id")
                    elementToRemove.remove()
                    modal.classList.remove("show")
                }else{
                    //Borra del localStorage el comentario que coincida con el commentId pasado y guardo el array en el localStorage
                    obtenerReplyCommentId.splice(numberReplyCommentOfId,1)
                    //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario 
                    lastReplyCommentId = obtenerReplyCommentId[obtenerReplyCommentId.length - 1].commentId
                    localStorage.setItem("last reply comment Id", `${lastReplyCommentId}`)
                    localStorage.setItem("newCommentReply", JSON.stringify(obtenerReplyCommentId))
                    elementToRemove.remove()
                    modal.classList.remove("show")
                }   
            })
        }else{
            let obtenerId = (JSON.parse(localStorage.getItem("comment")))
            let deleteIndex = e.path[4].dataset.commentId
            let numberOfId
            let elementToRemove = e.path[4]
            //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
            numberOfId = obtenerId.findIndex(element => element.commentId == deleteIndex)
            modal.classList.add("show")
            deleteModal.addEventListener("click", () => {
                if(obtenerId === null){
                    console.log("es nulo")
                //Para comprobar que solo queda un comentario, si es así se borra todo el localStorage
                }else if(obtenerId.length === 1){
                    localStorage.removeItem("comment")
                    localStorage.removeItem("last comment Id")
                    elementToRemove.remove()
                    modal.classList.remove("show")
                }else{
                    //Borra del localStorage el comentario que coincida con el commentId pasado y guardo el array en el localStorage
                    obtenerId.splice(numberOfId,1)
                    //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario 
                    lastelementCommentId = obtenerId[obtenerId.length - 1].commentId
                    localStorage.setItem("last comment Id", `${lastelementCommentId}`)
                    localStorage.setItem("comment", JSON.stringify(obtenerId))
                    elementToRemove.remove()
                    modal.classList.remove("show")
                }   
            })
        }
    })
}

cancel.addEventListener("click", ()=> {
    modal.classList.remove("show")
})

const editButtons = document.querySelectorAll(".edit-button")
const buttonUpdate = document.createElement("BUTTON")
buttonUpdate.classList.add("update-button")

const textareaForEdition = document.createElement("TEXTAREA")
textareaForEdition.classList.add("text-area-edition")

const updatedComment = document.createElement("P")

for(const editButton of editButtons){
    editButton.addEventListener("click", (e)=> {
    buttonUpdate.textContent = "update"
    editButton.parentElement.parentElement.after(buttonUpdate)
    let commentContent = e.target.closest(".comment-reply-container").firstElementChild.firstElementChild.nextElementSibling.textContent
    textareaForEdition.setAttribute("rows", "5")
    textareaForEdition.setAttribute("spellcheck", "false")
    textareaForEdition.value = commentContent
    e.target.closest(".comment-reply-container").firstElementChild.firstElementChild.nextElementSibling.replaceWith(textareaForEdition)
    textareaForEdition.focus()
    textareaForEdition.addEventListener("input", ()=> {
        textoDeComentarioActualizado = textareaForEdition.value
    })
    buttonUpdate.addEventListener("click", (e)=> {
        if(e.target.closest(".comment-reply-container").firstElementChild.classList.contains("reply-containers")){
            let elementReplyCommentId = e.target.closest(".comment-reply-container").dataset.replyCommentId
            let commentReplyToUpdate = newCommentsReplyArrays.findIndex(element => element.replyCommentId == elementReplyCommentId)
            newCommentsReplyArrays[commentReplyToUpdate].content = textoDeComentarioActualizado
            localStorage.setItem("newCommentReply", JSON.stringify(newCommentsReplyArrays))
            updatedComment.innerHTML = `<p class="comments text-color">${textoDeComentarioActualizado}</p>`
            textareaForEdition.replaceWith(updatedComment)
            buttonUpdate.remove()
        }else{
            let elementCommentId = e.target.closest(".comment-reply-container").firstElementChild.dataset.commentId
            let commentToUpdate = newCommentsArray.findIndex(element => element.commentId == elementCommentId)
            newCommentsArray[commentToUpdate].content = textoDeComentarioActualizado
            localStorage.setItem("comment", JSON.stringify(newCommentsArray))
            console.log(newCommentsArray)
            updatedComment.innerHTML = `<p class="comments text-color">${textoDeComentarioActualizado}</p>`
            textareaForEdition.replaceWith(updatedComment)
            buttonUpdate.remove()
        }
    })
    })
}