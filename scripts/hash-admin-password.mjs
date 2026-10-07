import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { randomBytes, scrypt as scryptCallback } from 'node:crypto';
import { promisify } from 'node:util';

const scrypt = promisify(scryptCallback);
const terminal = createInterface({ input: stdin, output: stdout });
const password = await terminal.question('Enter the initial admin password: ');
terminal.close();
if (password.length < 8) throw new Error('Admin password must be at least 8 characters.');
const salt = randomBytes(16).toString('hex');
const hash = Buffer.from(await scrypt(password, salt, 64)).toString('hex');
console.log(`ADMIN_PASSWORD_HASH=${salt}:${hash}`);
