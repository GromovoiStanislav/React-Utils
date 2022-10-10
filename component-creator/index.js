const minimist = require('minimist');
const fs = require('fs');
const path = require('path');

const args = minimist(process.argv.slice(2), {
  alias: {
    stateless: 's',
    name: 'n',
  },
});
const componentName = args.name;

fs.mkdirSync(
  path.resolve(__dirname, '..', '..', 'src', 'components', componentName)
);

fs.writeFileSync(
  path.resolve(
    __dirname,
    '..',
    '..',
    'src',
    'components',
    componentName,
    'style.css'
  ),
  `${componentName.toLowerCase()} {}`
);

fs.writeFileSync(
  path.resolve(
    __dirname,
    '..',
    '..',
    'src',
    'components',
    componentName,
    'index.js'
  ),
  `import component from ${componentName}.jsx
    export default component`
);

if (args.stateless) {
  require('./stateless.js')(componentName);
} else {
  require('./statefull.js')(componentName);
}

//npm run cr-comp TestComponent
//npm run cr-cont TestComponent
