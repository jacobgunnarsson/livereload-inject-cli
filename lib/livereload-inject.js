'use strict';

const fs = require('fs');
const colors = require('colors');
const livereloadScriptStr = require('./livereload-script-template');

// Convenience
const log = console.log.bind(console);

const injectLivereloadScript = (targetPath, destinationPath, injectionPoint) => {
  const injectionPointStr = '</' + injectionPoint + '>';

  let fileStr,
      fileInjected,
      injectionPointIndex;

  // Test existance/permissions of target/destination
  try {
    fs.accessSync(targetPath, fs.R_OK | fs.W_OK);

    if (targetPath !== destinationPath) {
      fs.accessSync(targetPath, fs.W_OK);
    }
  } catch (error) {
    log('livereload-inject: Could not read from target or write to destination'.red);
    log('Permission problems maybe?'.grey);
    throw error;
  }

  // Got permission, lets go
  fileStr = fs.readFileSync(targetPath).toString();
  injectionPointIndex = fileStr.indexOf(injectionPointStr);

  // Check that the injectionpoint is present in the target file
  if (injectionPointIndex > -1) {
    fileInjected = [
      fileStr.substring(0, injectionPointIndex),
      livereloadScriptStr,
      fileStr.substring(injectionPointIndex)
    ].join('');

    fs.writeFileSync(destinationPath, fileInjected);

    log(colors.green(
      'livereload-inject: Successfully wrote to ' + destinationPath));
  } else {
    log(colors.red(
      'livereload-inject: Target file does not seem to' +
      'contain a ' + injectionPointStr + '-tag'));
  }
};

module.exports = injectLivereloadScript;
