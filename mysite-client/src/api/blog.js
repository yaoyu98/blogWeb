import request from "@/api/request";

/**
 *获取博客分类，分页数据
 */
export async function getBlogs(page = 1, limit = 10, categoryid = -1) {
  return await request.get("/api/blog", {
    params: {
      page,
      limit,
      categoryid,
    },
  });
}

export async function getBlogCategories() {
  return await request.get("/api/blogtype");
}

/**
 * 获取单个博客
 */
export async function getBlog(id) {
  return await request.get(`/api/blog/${id}`);
}

/**
 * 提交评论
 */
export async function postComment() {
  return await request.post("/api/comment", {
    nickname: "昵称",
    content: "评论内容，纯文本",
    blogId: "id",
  });
}
/**
 * 分页获取评论
 */
export async function getComments(blogid, page = 1, limit = 10) {
  return await request.get("/api/comment", {
    params: {
      blogid,
      page,
      limit,
    },
  });
}
