export async function createCommentService(
    body: string,
    userId: number,
    postId: number,
    parentId?: number
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true }
      });
  
      if (!user) return { code: 0, message: "کاربر یافت نشد" };
  
      const post = await prisma.content.findUnique({
        where: { id: postId },
        select: { id: true }
      });
  
      if (!post) return { code: 0, message: "پست یافت نشد" };
  
      if (parentId || parentId == 0) {
        const parentComment = await prisma.comment.findUnique({
          where: { id: parentId },
          select: { id: true }
        });  
  
        if (!parentComment) return { code: 0, message: "آیدی کامنت مادر نامعتبر است" };
      }
  
      const setting = await prisma.website.findFirst({ where: { id: 1 } });
      const status = setting?.commentStatus === false ? "PENDING" : "PUBLISH";
  
      await prisma.comment.create({
        data: {
          body,
          user: { connect: { id: userId } },
          content: { connect: { id: postId } },
          status,
          ...(parentId && { parent: { connect: { id: parentId } } }) 
        },
      });
  
      return { code: 1, message: "دیدگاه با موفقیت ایجاد شد" };
    } catch (error: any) {
      console.error("Comment Service Error:", error.message);
      return { code: 0, message: "اطلاعات ارسالی نامعتبر است"};
    }
  }