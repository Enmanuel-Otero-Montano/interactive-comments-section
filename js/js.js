const sectionComments = document.getElementById("section")
const currentUserImage = document.querySelector(".current-user-img")
const send = document.getElementById("send");
const modal = document.querySelector(".modal")
const cancel = document.querySelector(".modal__buttons--cancel")
const textAreaValue = document.getElementById("text-area")
const deleteModal = document.querySelector(".modal__buttons--delete")

let newCommentsArray = []//Array para guardar los comentarios
let newCommentsReplyArrays = []//Array para guardar las respuestas a comentarios

let commentOrReply//Para eliminar. Se le asigna el valor "true" si es una respuesta a un comentario y "false" si es un comentario

let lastelementCommentId
let lastElementReplyCommentId

const newPostFragment = document.createDocumentFragment()

fetch("data.json")
    .then(res => res.ok == true ? Promise.resolve(res) : Promise.reject(res))
    .then(res => res.json())
    .then(res => {
        localStorage.setItem("current user image", res.currentUser.image.webp)
        localStorage.setItem("current user name", res.currentUser.username)

        for(const re of res.comments){
            const commentContainer = document.createElement("DIV")
            commentContainer.classList.add("comment-reply-container")
            const comment = document.createElement("DIV")
            comment.classList.add("user-comments")
            comment.setAttribute("data-comment-id", re.user.username)
            comment.innerHTML = `<div class="user-comments__header">
            <div class="avatars-containers">
                <img src="${re.user.image.png}" class="avatars" alt="user photo">
            </div>
            <p id="user-name" class="names">${re.user.username}</p>
            <p id="date" class="dates text-color">${re.createdAt}</p>
            </div>
            <p class="comments text-color">${re.content}</p>
            <div class="vote-reply">
                <div class="vote">
                    <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                    <p class="votes">${re.score}</p>
                    <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
                </div>
                <button class="reply-button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                    <p>Reply</p>
                </button>
            </div>`
            commentContainer.append(comment)
            sectionComments.append(commentContainer)
            if(re.replies.length > 0){
                for(const reply of re.replies){
                    const replyCommentContainer = document.createElement("DIV")
                    replyCommentContainer.classList.add("comment-reply-container")
                    if(reply.user.username === localStorage.getItem("current user name")){
                        replyCommentContainer.setAttribute("data-replying-to", reply.replyingTo)
                        replyCommentContainer.setAttribute("data-reply-comment-id", 0)//Esto es solo con fines prácticos para el desafío
                        const replyCurrentUser = document.createElement("DIV")
                        replyCurrentUser.classList.add("user-comments", "reply-containers")
                        replyCurrentUser.innerHTML = `<div class="user-comments__header">
                        <div class="avatars-containers">
                            <img src="${reply.user.image.png}" class="avatars" alt="user photo">
                        </div>
                        <p id="user-name" class="names">${reply.user.username}</p>
                        <p class="you">you</p>
                        <p id="date" class="dates text-color">${reply.createdAt}</p>
                        </div>
                        <p class="comments text-color"><a href="#">@${reply.replyingTo}</a> ${reply.content}</p>
                        <div class="vote-reply">
                        <div class="vote">
                            <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                            <p class="votes">${reply.score}</p>
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
                        replyCommentContainer.append(replyCurrentUser)
                        commentContainer.append(replyCommentContainer)
                    }else{
                        replyCommentContainer.setAttribute("data-replying-to", reply.replyingTo)
                        const newReply = document.createElement("DIV")
                        newReply.classList.add("user-comments", "reply-containers")
                        newReply.setAttribute("data-comment-id", reply.user.username)
                        newReply.innerHTML = `<div class="user-comments__header">
                        <div class="avatars-containers">
                            <img src="${reply.user.image.png}" class="avatars" alt="user photo">
                        </div>
                        <p id="user-name" class="names">${reply.user.username}</p>
                        <p id="date" class="dates text-color">${reply.createdAt}</p>
                        </div>
                        <p class="comments text-color"><a href="#">@${reply.replyingTo}</a> ${reply.content}</p>
                        <div class="vote-reply">
                            <div class="vote">
                                <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
                                <p class="votes">${reply.score}</p>
                                <button class="buttons minus"><img src="assets/icon-minus.svg" alt="minus sign icon"></button>
                            </div>
                            <button class="reply-button">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                <p>Reply</p>
                            </button>
                        </div>`
                        replyCommentContainer.append(newReply)
                        commentContainer.append(replyCommentContainer)
                    }
                }
            }
    }

    const fragmentForReply = document.createDocumentFragment()
    
    const replyButtons = document.querySelectorAll(".reply-button")
    replyButtonsArray = Array.from(replyButtons)

    for(const replyButton of replyButtonsArray){
        replyButton.addEventListener("click", ()=> {
            if(replyButtonsArray.some(element => element.disabled == true)){
                let replyButtonDisabled = replyButtonsArray.find(element => element.disabled == true)
                replyButtonDisabled.parentElement.parentElement.nextElementSibling.remove()
                replyButtonDisabled.disabled = false
            }
            let nameLink = replyButton.closest(".user-comments").dataset.commentId
            const newPostReply = document.createElement("DIV")
            if(replyButton.closest(".user-comments").classList.contains("reply-containers")){//Este "if" es para saber si se le va a responder a un comentario o a una respuesta y en consecuencia poner el "text-area" adecuado
                newPostReply.classList.add("write-comment-container-for-reply", "text-area-for-reply")
            }
            newPostReply.classList.add("write-comment-container", "margin-b", "text-area-for-reply")
            newPostReply.innerHTML = `<textarea name="" id="text-area" cols="30" rows="5" class="text-area"></textarea>
            <div class="current-button-container">
                <div class="avatars-containers">
                    <img src="./assets/images/avatars/image-juliusomo.png" class="current-user-img avatars" alt="user photo">
                </div>
                <button class="send posting-reply">REPLY</button>
            </div>`
            newPostReply.firstChild.value = `@${nameLink}, `
            fragmentForReply.appendChild(newPostReply)
            replyButton.parentElement.parentElement.after(fragmentForReply)
            newPostReply.firstElementChild.focus()

            replyButton.disabled = true

            const textAreaForReply = document.querySelector(".text-area")
            let textAreaForReplyValue
            textAreaForReply.addEventListener("input", ()=> {//"if" para detectar si se escribió algo en el "text-area" 
                textAreaForReplyValue = textAreaForReply.value
            })

            textAreaForReply.addEventListener("click", ()=> { 
                textAreaForReply.classList.remove("undefined")
            })


            newPostReply.addEventListener("click", (e)=> {
                if(e.target.innerHTML === "REPLY"){
                    if(textAreaForReplyValue == undefined){
                        textAreaForReply.classList.add("undefined")
                    }else{
                        for(const replyButton of replyButtons){
                            replyButton.disabled = false
                        }
                        // Obtengo el Id del último comentario o post para asignar el Id consecutivo al siguiente comentario o post
                        let replyCommentId = localStorage.getItem("last reply comment Id")

                        const replyDate = Date.now()

                        const newCommentReply = {
                            replyCommentId: ++replyCommentId,
                            replyingTo: nameLink,
                            content: newPostReply.firstChild.value,
                            createdAt: replyDate,
                            score: 0,
                            userImage: userImage,
                            userName: currentUserName
                        }
                        const replyCommentContainer  = document.createElement("DIV")
                        replyCommentContainer.classList.add("comment-reply-container")
                        const newPostContainer = document.createElement("DIV")
                        newPostContainer.classList.add("user-comments", "reply-containers")
                        replyCommentContainer.setAttribute("data-replying-to", newCommentReply.replyingTo)
                        replyCommentContainer.setAttribute("data-reply-comment-id", newCommentReply.replyCommentId)
                        newPostContainer.innerHTML = `<div class="user-comments__header">
                        <div class="avatars-containers">
                            <img src="./assets/images/avatars/image-juliusomo.png" class="avatars" alt="user photo">
                        </div>
                        <p id="user-name" class="names">${newCommentReply.userName}</p>
                        <p class="you">you</p>
                        <p id="date" class="dates text-color">today</p>
                        </div>
                        <p class="comments text-color"><a href="#">@${nameLink}</a>, ${newCommentReply.content.replace("@"+nameLink+",", "")}</p>
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
                        replyCommentContainer.appendChild(newPostContainer)
                        newPostFragment.appendChild(replyCommentContainer)
                        replyButton.parentElement.parentElement.parentElement.append(newPostFragment)
                        newPostReply.remove()

                        newCommentsReplyArrays.push(newCommentReply)

                        localStorage.setItem("newCommentReply", JSON.stringify(newCommentsReplyArrays))

                        //Para obtener el número de Id del último comentario y lo guardo en el localStorage
                        let repliesCommentsIds = (JSON.parse(localStorage.getItem("newCommentReply")))
                        lastReplyCommentId = repliesCommentsIds[repliesCommentsIds.length - 1].replyCommentId
                        localStorage.setItem("last reply comment Id", `${lastReplyCommentId}`)

                        newPostContainer.addEventListener("click", (e)=> {
                            if(e.target.innerHTML === "Edit" || e.target.className === "edit-button" || e.path[0].outerHTML === `<path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"></path>`){
                                e.target.closest(".edit-button").disabled = true
                                
                                editRepliesToComments(newPostContainer, e, replyCommentContainer)

                            }else if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
                                let getReplyId = (JSON.parse(localStorage.getItem("newCommentReply")))
                                commentOrReply = e.target.closest(".user-comments").classList.contains("reply-containers")
                                let deleteReplyIndex = replyCommentContainer.dataset.replyCommentId
                                //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
                                let numberOfReplyId = getReplyId.findIndex(element => element.replyCommentId == deleteReplyIndex)
                                modal.classList.add("show")
                
                                deleteModal.addEventListener("click", () => {
                                    if(commentOrReply == true){
                                        getReplyId.splice(numberOfReplyId,1)//Borra del localStorage el comentario que coincida con el commentId pasado
                                        newCommentsReplyArrays = getReplyId
                                        replyCommentContainer.remove()
                                        if(getReplyId.length > 0){
                                            //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
                                            lastElementReplyCommentId = getReplyId[getReplyId.length - 1].replyCommentId
                                            localStorage.setItem("newCommentReply", JSON.stringify(getReplyId))
                                            localStorage.setItem("last reply comment Id", `${lastElementReplyCommentId}`)
                                            replyCommentId = lastElementReplyCommentId
                                            modal.classList.remove("show")
                                        }else{
                                            localStorage.removeItem("newCommentReply")
                                            localStorage.removeItem("last reply comment Id")
                                            replyCommentId = 0
                                            modal.classList.remove("show")
                                        }
                                    }
                                }) 
                            }
                        })
                    }    
                }
            })
        })
    }
    document.addEventListener("DOMContentLoaded",showStoredComments(), showStoredReply());
})

const currentUserName = localStorage.getItem("current user name")
const userImage = localStorage.getItem("current user image")

currentUserImage.src = userImage

// Obtengo el Id del último comentario o post para asignar el Id consecutivo al siguiente comentario o post
let commentId = localStorage.getItem("last comment Id")

send.addEventListener("click", ()=> {
    if(textAreaValue.value == ""){
        textAreaValue.placeholder = `Hola ${currentUserName} debes escribir algo` 
    }else{
        const publicationDate = Date.now()

        const newComment = {
            commentId: ++commentId,
            content: textAreaValue.value,
            createdAt: publicationDate,
            score: 0,
            userImage: userImage,
            userName: currentUserName
        }
        const commentReplyContainer  = document.createElement("DIV")
        commentReplyContainer.classList.add("comment-reply-container")
        const newPostContainer = document.createElement("DIV")
        newPostContainer.classList.add("user-comments")
        newPostContainer.setAttribute("data-comment-id", newComment.commentId)
        newPostContainer.innerHTML = `<div class="user-comments__header">
        <div class="avatars-containers">
            <img src="${newComment.userImage}" class="avatars" alt="user photo">
        </div>
        <p id="user-name" class="names">${newComment.userName}</p>
        <p class="you">you</p>
        <p id="date" class="dates text-color">now</p>
        </div>
        <p class="comments text-color">${newComment.content}</p>
        <div class="vote-reply">
        <div class="vote">
            <button class="buttons plus"><img src="assets/icon-plus.svg" alt="plus sign icon"></button>
            <input type="number" class="votes-input" value="${newComment.score}" readonly>
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
        sectionComments.append(newPostFragment)

        //Introduzco el nuevo comentario al array
        newCommentsArray.push(newComment)

        //Guardo el array en el localStorage
        localStorage.setItem("comment", JSON.stringify(newCommentsArray))

        //Para obtener el número de Id del último comentario y lo guardo en el localStorage
        let obtenerId = (JSON.parse(localStorage.getItem("comment")))
        lastelementCommentId = obtenerId[obtenerId.length - 1].commentId
        localStorage.setItem("last comment Id", `${lastelementCommentId}`)

        newPostContainer.addEventListener("click", (e)=> {
            if(e.target.innerHTML === "Edit" || e.target.className === "edit-button" || e.path[0].outerHTML === `<path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"></path>`){
                e.target.closest(".edit-button").disabled = true 
                
                editCommment(newPostContainer, e)
    
            }else if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
                const getId = (JSON.parse(localStorage.getItem("comment")))
                //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
                const getIdOfContainer = newPostContainer.dataset.commentId
                const numberOfId = getId.findIndex(element => element.commentId == getIdOfContainer)
                commentOrReply = e.target.closest(".user-comments").classList.contains("reply-containers")
                modal.classList.add("show")

                deleteModal.addEventListener("click", () => {
                    if(commentOrReply == false){
                        getId.splice(numberOfId,1)//Borra del localStorage el comentario que coincida con el commentId pasado
                        newCommentsArray = getId
                        commentReplyContainer.remove()
                        if(getId.length > 0){
                            //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
                            lastelementCommentId = getId[getId.length - 1].commentId
                            localStorage.setItem("comment", JSON.stringify(getId))
                            localStorage.setItem("last comment Id", `${lastelementCommentId}`)
                            commentId = lastelementCommentId
                            modal.classList.remove("show")
                        }else{
                            localStorage.removeItem("comment")
                            localStorage.removeItem("last comment Id")
                            commentId = 0
                            modal.classList.remove("show")
                        }
                    }
                })
            }else if(e.target.outerHTML === `<img src="assets/icon-plus.svg" alt="plus sign icon">`){
                newPostContainer.lastElementChild.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value
                console.log(newPostContainer.lastElementChild.previousElementSibling.firstElementChild.firstElementChild.nextElementSibling.value)
                console.log("MAS")
            }
        })
    }
    textAreaValue.value = ""
})

//Función para saber el tiempo transcurrido desde que se posteó el comentario o la respuesta
const timeElapsed = (publicationCreationDate)=> {
    let currentDate = Date.now()
    let time
    let srtingForConcat
    time = currentDate - publicationCreationDate 
    time = time / 1000 / 60 / 60
    if(time <= 1){
        srtingForConcat = "hour"
    }else if(time > 1 && time < 24){
        srtingForConcat = "hours"
    }else if(time >= 24 && time < 169){
        time = time / 24
        if(Math.trunc(time) == 1){
            srtingForConcat = "day"
        }else{
            srtingForConcat = "days"
        }
    }else if(Math.trunc(time) >= 7 && Math.trunc(time) < 31){
        time = time / 7
        if(time == 1){
            srtingForConcat = "week"
        }else{
            srtingForConcat = "weeks"
        }
    }
    return `${Math.trunc(time)} ${srtingForConcat}`
}

//Función para cargar todos los comentarios guardados en el localStorage al cargar la página
const showStoredComments = ()=> {
    newCommentsArray = JSON.parse(localStorage.getItem("comment"));
    if(newCommentsArray === null){
        newCommentsArray = []
    }else{
        newCommentsArray.forEach(element => {
            const commentContainerGlobal  = document.createElement("DIV")
            commentContainerGlobal.classList.add("comment-reply-container")
            const newPostContainerGlobal = document.createElement("DIV")
            newPostContainerGlobal.classList.add("user-comments")
            newPostContainerGlobal.setAttribute("data-comment-id", element.commentId)
            newPostContainerGlobal.innerHTML = `<div class="user-comments__header">
            <div class="avatars-containers">
                <img src="${element.userImage}" class="avatars" alt="user photo">
            </div>
            <p id="user-name" class="names">${element.userName}</p>
            <p class="you">you</p>
            <p id="date" class="dates text-color">${timeElapsed(element.createdAt)} ago</p>
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
            commentContainerGlobal.prepend(newPostContainerGlobal)
            sectionComments.append(commentContainerGlobal)

            newPostContainerGlobal.addEventListener("click", (e)=>{
                if(e.target.innerHTML === "Edit" || e.target.className === "edit-button" || e.path[0].outerHTML === `<path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"></path>`){
                    e.target.closest(".edit-button").disabled = true  
                    
                    editCommment(newPostContainerGlobal, e)
                    
                }else if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
                    const getId = (JSON.parse(localStorage.getItem("comment")))
                    //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
                    const getIdOfContainer = newPostContainerGlobal.dataset.commentId
                    const numberOfId = getId.findIndex(element => element.commentId == getIdOfContainer)
                    commentOrReply = e.target.closest(".user-comments").classList.contains("reply-containers")
                    modal.classList.add("show")
    
                    deleteModal.addEventListener("click", () => {
                        if(commentOrReply == false){
                            getId.splice(numberOfId,1)//Borra del localStorage el comentario que coincida con el commentId pasado
                            newCommentsArray = getId
                            commentContainerGlobal.remove()
                            if(getId.length > 0){
                                //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
                                lastelementCommentId = getId[getId.length - 1].commentId
                                localStorage.setItem("comment", JSON.stringify(getId))
                                localStorage.setItem("last comment Id", `${lastelementCommentId}`)
                                commentId = lastelementCommentId
                                modal.classList.remove("show")
                            }else{
                                localStorage.removeItem("comment")
                                localStorage.removeItem("last comment Id")
                                commentId = 0
                                modal.classList.remove("show")
                            }
                        }
                    })
                }
            })
        })
    }
}

//Función para mostar las respuestas a comentarios guardadas en el localStorage al cargar la página
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
                <img src="${paintElement.userImage}" class="avatars" alt="user photo">
            </div>
            <p id="user-name" class="names">${paintElement.userName}</p>
            <p class="you">you</p>
            <p id="date" class="dates text-color">${timeElapsed(paintElement.createdAt)} ago</p>
            </div>
            <p class="comments text-color"><a href="#">@${paintElement.replyingTo}</a>, ${paintElement.content.replace("@"+paintElement.replyingTo+",", "")}</p>
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
            commentReplyContainerGlobal.append(reply)
            const usersCommentContainers = document.querySelectorAll("[data-comment-id]")

            for(const userComment of usersCommentContainers){
                if(userComment.dataset.commentId == commentReplyContainerGlobal.dataset.replyingTo){
                    userComment.parentElement.append(commentReplyContainerGlobal)
                }
            }

            reply.addEventListener("click", (e)=> {
                if(e.target.innerHTML === "Edit" || e.target.className === "edit-button" || e.path[0].outerHTML === `<path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"></path>`){
                    e.target.closest(".edit-button").disabled = true 
                    
                    editRepliesToComments(reply, e, commentReplyContainerGlobal)
                    
                }else if(e.target.innerHTML === "Delete" || e.target.className === "delete-button" || e.target.outerHTML === '<path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"></path>'){
                    let getReplyId = (JSON.parse(localStorage.getItem("newCommentReply")))
                    commentOrReply = e.target.closest(".user-comments").classList.contains("reply-containers")
                    let deleteReplyIndex = commentReplyContainerGlobal.dataset.replyCommentId
                    //Guardo en una variable el numero de Id y lo busco en el array por su numero de commentId
                    let numberOfReplyId = getReplyId.findIndex(element => element.replyCommentId == deleteReplyIndex)
                    modal.classList.add("show")
    
                    deleteModal.addEventListener("click", () => {
                        if(commentOrReply == true){
                            getReplyId.splice(numberOfReplyId,1)//Borra del localStorage el comentario que coincida con el commentId pasado
                            newCommentsReplyArrays = getReplyId
                            commentReplyContainerGlobal.remove()
                            if(getReplyId.length > 0){
                                //Para obtener el número de Id del último comentario y lo guardo en el localStorage después de borrar algún comentario
                                lastElementReplyCommentId = getReplyId[getReplyId.length - 1].replyCommentId
                                localStorage.setItem("newCommentReply", JSON.stringify(getReplyId))
                                localStorage.setItem("last reply comment Id", `${lastElementReplyCommentId}`)
                                replyCommentId = lastElementReplyCommentId
                                modal.classList.remove("show")
                            }else{
                                localStorage.removeItem("newCommentReply")
                                localStorage.removeItem("last reply comment Id")
                                replyCommentId = 0
                                modal.classList.remove("show")
                            }
                        }
                    }) 
                }
            })
        }
    }
}

//Función para editar comentarios
const editCommment = (container, e)=> {
    const textareaForEdition = document.createElement("TEXTAREA")
    textareaForEdition.classList.add("text-area-edition")
    let updatedComment = document.createElement("P")
    updatedComment.classList.add("comments", "text-color")

    textareaForEdition.setAttribute("rows", "5")
    textareaForEdition.setAttribute("spellcheck", "false")
    textareaForEdition.value = container.firstElementChild.nextElementSibling.textContent
    container.firstElementChild.nextElementSibling.replaceWith(textareaForEdition)
    textareaForEdition.focus()
    let textoDeComentarioActualizado

    textareaForEdition.addEventListener("input", ()=> {
        textoDeComentarioActualizado = textareaForEdition.value
    })

    let updateButton = e.target.closest(".user-comments").lastElementChild
    updateButton.hidden = false

    updateButton.addEventListener("click", ()=> {
        updateButton.previousElementSibling.lastElementChild.lastElementChild.disabled = false
        if(textoDeComentarioActualizado == undefined){//Este "if" es por si no sufre ningún cambio el comentario a editar y se presiona el "updateButton"
            updatedComment.textContent = textareaForEdition.value
            textareaForEdition.replaceWith(updatedComment)
            updateButton.hidden = true
        }else{//Este "else" es para cuando el comentario se editó
            let elementCommentId = container.dataset.commentId
            let commentToUpdate = newCommentsArray.findIndex(element => element.commentId == elementCommentId)
            newCommentsArray[commentToUpdate].content = textoDeComentarioActualizado
            localStorage.setItem("comment", JSON.stringify(newCommentsArray))
            updatedComment.textContent = textoDeComentarioActualizado
            textareaForEdition.replaceWith(updatedComment)
            updateButton.hidden = true
        }
    })
}

//Función para editar respuestas a comentarios
const editRepliesToComments = (container, e, parentContainer)=> {
    const textareaForEdition = document.createElement("TEXTAREA")
    textareaForEdition.classList.add("text-area-edition")
    let updatedComment = document.createElement("P")
    updatedComment.classList.add("comments", "text-color")

    textareaForEdition.setAttribute("rows", "5")
    textareaForEdition.setAttribute("spellcheck", "false")
    textareaForEdition.value = container.firstElementChild.nextElementSibling.textContent
    container.firstElementChild.nextElementSibling.replaceWith(textareaForEdition)
    textareaForEdition.focus()
    let textoDeComentarioActualizado

    textareaForEdition.addEventListener("input", ()=> {
        textoDeComentarioActualizado = textareaForEdition.value
    })

    let updateButton = e.target.closest(".user-comments").lastElementChild
    updateButton.hidden = false

    updateButton.addEventListener("click", ()=> {
        updateButton.previousElementSibling.lastElementChild.lastElementChild.disabled = false
        if(textoDeComentarioActualizado == undefined){//Este "if" es por si no sufre ningún cambio el comentario a editar y se presiona el "updateButton"
            updatedComment.textContent = textareaForEdition.value
            textareaForEdition.replaceWith(updatedComment)
            updateButton.hidden = true
        }else{//Este "else" es para cuando el comentario se editó
            let elementReplyCommentId = parentContainer.dataset.replyCommentId
            let commentToUpdate = newCommentsReplyArrays.findIndex(element => element.replyCommentId == elementReplyCommentId)
            newCommentsReplyArrays[commentToUpdate].content = textoDeComentarioActualizado
            localStorage.setItem("newCommentReply", JSON.stringify(newCommentsReplyArrays))
            updatedComment.textContent = textoDeComentarioActualizado
            textareaForEdition.replaceWith(updatedComment)
            updateButton.hidden = true
        }
    })
}

cancel.addEventListener("click", ()=> {
    modal.classList.remove("show")
})