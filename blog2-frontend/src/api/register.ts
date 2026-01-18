import api from ".";

export async function register(username: string, email: string, password: string) {
  return api.post("/auth/register/", { username, email, password });
}