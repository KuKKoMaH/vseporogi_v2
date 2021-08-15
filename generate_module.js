const fs = require('fs');
const path = require('path');

const moduleName = process.argv[2];
if (!moduleName) throw new Error('module name required');

const srcDir = path.resolve(__dirname, 'src');
const moduleDir = path.resolve(srcDir, 'modules', moduleName);

fs.mkdirSync(moduleDir);
fs.mkdirSync(path.resolve(moduleDir, 'img'));
fs.writeFileSync(path.resolve(moduleDir, `${moduleName}.pug`), `.${moduleName}\n  `);
fs.writeFileSync(path.resolve(moduleDir, `${moduleName}.scss`), `.${moduleName}{\n    $this: &;\n}`);
fs.writeFileSync(path.resolve(moduleDir, `${moduleName}.js`), ``);

fs.writeFileSync(path.resolve(srcDir, 'style.js'), `import './modules/${moduleName}/${moduleName}.scss';\n`, { flag: 'a' });
fs.writeFileSync(path.resolve(srcDir, 'index.js'), `import './modules/${moduleName}/${moduleName}.js';\n`, { flag: 'a' });
