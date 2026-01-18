import api from ".";

export async function login_raw(username: string, password: string) {
  const res = await api.post("/auth/token/", { username, password });
  const { access, refresh, username: name } = res.data;
  localStorage.setItem("access", access);
  localStorage.setItem("refresh", refresh);
  localStorage.setItem("user", name);
  return res.data;
}