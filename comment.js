class Comment{
    constructor(commentText,id,pId){
        this.commentText = commentText;
        this.id = id;
        this.pId = pId;
        this.childrens = []
        this.likes = 0;
    }

    replyToComment(commentText){
        let replyId = `${this.id}.${this.childrens.length+1}`;
        let reply = new Comment(commentText,replyId,this.id)
        this.childrens.push(reply)
    }

    addLike(){
        this.likes = this.likes + 1;
    }

}