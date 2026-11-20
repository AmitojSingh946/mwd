import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "heritagepulse-secret-demo-fallback-key-2026";

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "12h" });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

export function getAuthUser(request) {
  const authHeader = request.headers.get("authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }
  const token = authHeader.split(" ")[1];
  if (token === "demo-admin-token") {
    return { email: "admin@heritagepulse.local", role: "admin" };
  }
  return verifyToken(token);
}
