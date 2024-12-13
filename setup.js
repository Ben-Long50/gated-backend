import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const replacePlaceholder = (filePath, placeholder, replacement) => {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const newContent = fileContent.replace(
    new RegExp(placeholder, 'g'),
    replacement,
  );
  fs.writeFileSync(filePath, newContent, 'utf8');
};

const setupProject = (projectName) => {
  const filesToUpdate = ['package.json', 'bin/www', 'package-lock.json'];

  filesToUpdate.forEach((relativePath) => {
    const filePath = path.join(__dirname, relativePath);
    replacePlaceholder(filePath, 'PROJECT_NAME', projectName);
  });

  console.log(`Project setup complete. Project name set to: ${projectName}`);
};

// Get the new project name from command line arguments
const projectName = process.argv[2];

if (!projectName) {
  console.error('Please provide a project name.');
  process.exit(1);
}

setupProject(projectName);
