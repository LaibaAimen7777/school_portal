import * as bcrypt from 'bcrypt';

async function hashPassword() {
  const password = 'Admin@123';
  const hashed = await bcrypt.hash(password, 10);
  console.log(hashed);
}

hashPassword();
