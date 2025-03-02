export function buildCommentTree(comments :any) {
    const commentMap = new Map();
  
    comments.forEach((comment:any) => commentMap.set(comment.id, { ...comment, replies: [] }));
  
    const rootComments:any = [];
  
    comments.forEach((comment:any) => {
      if (comment.parentId) {
        commentMap.get(comment.parentId)?.replies.push(commentMap.get(comment.id));
      } else {
        rootComments.push(commentMap.get(comment.id)); 
      }
    });
  
    return rootComments;
}
  