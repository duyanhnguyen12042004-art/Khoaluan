import bcrypt from "bcryptjs";

const password = "admin123456";

const hash = await bcrypt.hash(password, 10);

console.log("Hash Password:");
console.log(hash);