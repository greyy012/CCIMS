export function getUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function homePath(user) {
  if (!user) return "/login";
  if (user.role === "student") return "/student";
  if (user.role === "admin") return "/admin";
  return "/staff";
}

export function isLoggedIn() {
  return !!getUser();
}
