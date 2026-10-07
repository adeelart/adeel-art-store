import { cp, mkdir, rm } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.cwd();
const output = resolve(root, 'dist');
const publicFiles = ['index.html', 'script.js', 'styles.css', 'admin.html', 'admin.js', 'admin.css', 'adeel-art-logo.svg'];

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
for (const file of publicFiles) await cp(resolve(root, file), resolve(output, file));
await mkdir(resolve(output, 'content'), { recursive: true });
await cp(resolve(root, 'content/site-content.json'), resolve(output, 'content/site-content.json'));
