const { exec } = require('child_process');

const U = {
  isValidLink(url) {
    return /(http(s?)):\/\//i.test(url);
  },
};

module.exports = U;
