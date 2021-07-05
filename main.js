let commentBox = (function(){

    //cache dom
    let commentInput = document.querySelector('.comment-input')
    let commentBtn = document.querySelector('.comment-button')
    let commentsContainer = document.querySelector('.comments-container')
    let commentsReplyContainer = document.querySelector('.comments-reply-container')
    let replyInput = document.querySelector('.reply-input')
    let replyButton = document.querySelector('.reply-button')

    //init
    let commentsWidget = new CommentsWidget()
    let selectedComment;

    const renderRecursively = (index,comments,parent) => {
        if(index >= comments.length){
            return;
        }
        let comment = document.createElement('div')
        comment.classList.add('comment')
        comment.setAttribute("id",comments[index].id)
        
        let span = document.createElement('span')
        span.innerText = comments[index].commentText

        let replyBtn = document.createElement('button')
        replyBtn.setAttribute("id",comments[index].id)
        replyBtn.innerText = 'Reply'        

        let likeBtn = document.createElement('button')
        likeBtn.classList.add('like')
        likeBtn.setAttribute("id",comments[index].id)
        likeBtn.innerText = `Like ${comments[index].likes}`

        comment.appendChild(span)
        comment.appendChild(replyBtn)
        comment.appendChild(likeBtn)

        parent.appendChild(comment)

        if(comments[index].childrens.length>0){
            renderRecursively(0,comments[index].childrens,comment)
        }

        renderRecursively(index+1,comments,parent)
    }

    const render = () => {
        commentsContainer.innerText = ''
        renderRecursively(0,commentsWidget.comments,commentsContainer)
    }

    //event handlers
    const addRootComment = (e) =>{
        e.preventDefault();
        let value = commentInput.value;
        if(value === ''){
            return
        }
        commentsWidget.addRootComment(value)
        commentInput.value=''
        render()
    }

    const replyToComment = (e) => {
        selectedComment = e.target.id;
        if(e.target.classList[0] === 'like'){
            commentsWidget.likeAComment(selectedComment)
            render()
        }        
        else{
            commentsReplyContainer.classList.add('show-reply-container')
        }

    }

    const addReply = (e) => {
        let value = replyInput.value;
        if(value===''){
            return
        }
        commentsWidget.replyToComment(selectedComment,value)
        replyInput.value = ''
        commentsReplyContainer.classList.remove('show-reply-container')
        render()
    }

    //bind events
    commentBtn.addEventListener('click',addRootComment)
    commentsContainer.addEventListener('click',replyToComment)
    replyButton.addEventListener('click',addReply)

})()