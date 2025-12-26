export default function getUserId() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const decoded = JSON.parse(atob(token.split(".")[1]));
  return decoded.id;
}
