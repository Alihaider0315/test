const jsonfile = require('jsonfile');
const moment = require('moment');
const simpleGit = require('simple-git');
const _ = require('lodash');
const FILE_PATH = './data.json';

const makeCommit = n => {
  if (n === 0) return simpleGit().push();

  import('random').then(randomModule => {
    const random = randomModule.default;

    const x = random.int(0, 54);
    const y = random.int(0, 6);
    const DATE = moment().subtract(1, 'y').add(1, 'd')
      .add(x, 'w').add(y, 'd').format();
    const data = {
      date: DATE
    };

    console.log(DATE);
    jsonfile.writeFile(FILE_PATH, data, () => {
      simpleGit().add(FILE_PATH).commit(DATE, { '--date': DATE }, (err) => {
        if (err) {
          console.error('Error committing:', err);
          return;
        }
        makeCommit(n - 1);
      });
    });
  }).catch(error => {
    // Handle any potential errors with importing the 'random' module
    console.error('Error importing random module:', error);
  });
};

makeCommit(20);
