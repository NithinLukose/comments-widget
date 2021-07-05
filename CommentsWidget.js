class CommentsWidget{
    constructor(){
        this.comments = []
    }
    addRootComment(commentText){
        let comment = new Comment(commentText,`${this.comments.length+1}`,null)
        this.comments.push(comment)
    }

    findComment(id,index,comments){
        if(index >= comments.length){
            return null
        }

        if(comments[index].id === id){
            return comments[index]
        }
        let comment;
        if(comments[index].childrens.length>0){
            comment = this.findComment(id,0,comments[index].childrens)
        }
        if(!comment){
            comment = this.findComment(id,index+1,comments)
        }
        return comment
    }
    replyToComment(id,commentText){
        let comment = this.findComment(id,0,this.comments)

        comment.replyToComment(commentText)

    }
    likeAComment(id){
        let comment = this.findComment(id,0,this.comments)
        comment.addLike()
    }
}