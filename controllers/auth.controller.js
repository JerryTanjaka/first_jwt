import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { users } from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config(); 
const SECRET_KEY = process.env.JWT_SECRET ;
console.log("SECRET_KEY :", SECRET_KEY);

export const signup = async (req, res) => {
  const { email, password } = req.body;

  // Vérifier si user existe déjà
  const existingUser = users.find((u) => u.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Stocker dans notre "fake DB"
  const newUser = { id: users.length + 1, email, password: hashedPassword };
  users.push(newUser);

  // 🔹 Console log pour vérifier
  console.log(users);

  res.status(201).json({ message: "User registered", user: { email } });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = users.find((u) => u.email === email);
  console.log("Email envoyé :", email);
  console.log("Mot de passe envoyé :", password);

  if (!user) {
    console.log("Utilisateur non trouvé");
    return res.status(400).json({ message: "Invalid credentials" });
  }

  console.log("Hash stocké :", user.password);

  const validPassword = await bcrypt.compare(password, user.password);
  console.log("Mot de passe valide ?", validPassword);

  if (!validPassword) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: "1h",
  });

  res.json({ token });
};


export const me = (req, res) => {
  res.json({ user: req.user }); // req.user vient du middleware
};
console.log("SECRET_KEY :", SECRET_KEY);
