/**
 * Do NOT allow using `yarn` as package manager.
 */
if (process.env.npm_execpath.indexOf('npm') === -1) {
  console.error('You must use NPM to install dependencies:');
  process.exit(1);
}
