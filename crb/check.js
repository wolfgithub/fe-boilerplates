/**
 * Created by apple on 2017/2/21.
 */
var chalk = require('chalk');
var fs = require('fs-extra');


/**
 * @function 检测 APP 名称
 * @param appName
 */
function checkAppName(appName) {
  // TODO: there should be a single place that holds the dependencies
  var dependencies = ['react', 'react-dom'];
  var devDependencies = ['chalk'];
  var allDependencies = dependencies.concat(devDependencies).sort();

  if (allDependencies.indexOf(appName) >= 0) {
    console.error(
      chalk.red(
        'We cannot create a project called ' + chalk.green(appName) + ' because a dependency with the same name exists.\n' +
        'Due to the way npm works, the following names are not allowed:\n\n'
      ) +
      chalk.cyan(
        allDependencies.map(function (depName) {
          return '  ' + depName;
        }).join('\n')
      ) +
      chalk.red('\n\nPlease choose a different project name.')
    );
    process.exit(1);
  }
}

// If project only contains files generated by GH, it’s safe.
// We also special case IJ-based products .idea because it integrates with CRA:
// https://github.com/facebookincubator/create-react-app/pull/368#issuecomment-243446094
function isSafeToCreateProjectIn(root) {
  var validFiles = [
    '.DS_Store', 'Thumbs.db', '.git', '.gitignore', '.idea', 'README.md', 'LICENSE'
  ];
  return fs.readdirSync(root)
    .every(function (file) {
      return validFiles.indexOf(file) >= 0;
    });
}

/**
 * @function 判断是否可以使用 Yarn
 * @return {boolean}
 */
function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', {stdio: 'ignore'});
    return true;
  } catch (e) {
    return false;
  }
}


module.exports = {
  checkAppName,
  isSafeToCreateProjectIn,
  shouldUseYarn
};