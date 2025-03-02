export async function createCommentController(request : FastifyRequest<{
    Headers : Schema.Web_Header,
    Body :Schema.CreateCommentControllerBody
}> , reply:FastifyReply) {

    if(!request.userData){
        sendRequestError(reply , 401 , "توکن دسترسی کاربری نامعتبر است"  , "Unauthorized access");
        return;
    }

    const result = await Service.createCommentService(request.body.body,request.userData.userId , request.body.postId , request.body.parentId);

    if(result.code == 1){
        sendRequestData(reply , 200 , {message : result.message});
        return;
    }

    sendRequestError(reply , 400 , result.message , "Bad request");
}