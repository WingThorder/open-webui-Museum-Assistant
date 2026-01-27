import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Generating SSL certificates...');

try {
  // Create certs directory if it doesn't exist
  const certsDir = path.join(__dirname, 'certs');
  if (!fs.existsSync(certsDir)) {
    fs.mkdirSync(certsDir);
  }

  // Generate certificates using mkcert
  execSync('npx mkcert create-ca', { stdio: 'inherit' });
  execSync(`npx mkcert create-cert --ca-key ca.key --ca-cert ca.crt --key ${path.join(certsDir, 'key.pem')} --cert ${path.join(certsDir, 'cert.pem')} --domains localhost,127.0.0.1,::1`, { stdio: 'inherit' });

  console.log('SSL certificates generated successfully!');
  console.log('Certificates location:');
  console.log('- Private key:', path.join(certsDir, 'key.pem'));
  console.log('- Certificate:', path.join(certsDir, 'cert.pem'));
} catch (error) {
  console.error('Error generating certificates:', error.message);
  process.exit(1);
}