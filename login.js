// sharkbooAuth.js

// --- Dependencies ---
import crypto from "crypto";

// --- Helper: Hash passwords ---
function hashPassword(password) {
  return crypto.createHash("sha256").update(password).digest("hex");
}

// --- Mock database (replace with real DB later) ---
const users = [
  {
    id: 1,
    username: "admin",
    passwordHash: hashPassword("Sharkboo123"), // example password
    role: "administrator",
    createdAt: new Date(),
  },
  {
    id: 2,
    username: "user1",
    passwordHash: hashPassword("password123"),
    role: "user",
    createdAt: new Date(),
  }
];

// --- Register a new user ---
export function registerUser(username, password, role = "user") {
  const exists = users.find(u => u.username === username);
  if (exists) {
    return { success: false, message: "Username already exists" };
  }

  const newUser = {
    id: users.length + 1,
    username,
    passwordHash: hashPassword(password),
    role,
    createdAt: new Date(),
  };

  users.push(newUser);

  return { success: true, user: newUser };
}

// --- Validate login ---
export function loginUser(username, password) {
  const user = users.find(u => u.username === username);
  if (!user) {
    return { success: false, message: "User not found" };
  }

  const hashed = hashPassword(password);
  if (hashed !== user.passwordHash) {
    return { success: false, message: "Incorrect password" };
  }

  return {
    success: true,
    message: "Login successful",
    user: {
      id: user.id,
      username: user.username,
      role: user.role,
    }
  };
}

// --- Export users for debugging (optional) ---
export function getAllUsers() {
  return users;
}
