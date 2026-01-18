import api from ".";

// retrieve articles
export function getMyArticles() {
  return api.get("/articles/");
}

// retrieve one article
export function getArticle(id: number) {
  return api.get(`/articles/${id}/`);
}

// create
export function createArticle(title: string, content: string, status: string, tags: string[]) {
  return api.post("/articles/", {
    title,
    content,
    status,
    tags: tags.map(name => ({ name })),
  });
}

// update
export function updateArticle(id: number, title: string, content: string, status: string, tags: string[]) {
  return api.put(`/articles/${id}/`, {
    title,
    content,
    status,
    tags: tags.map(name => ({ name })),
  });
}

// delete
export function deleteArticle(id: number) {
  return api.delete(`/articles/${id}/`);
}