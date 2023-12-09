function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRank(string) {
  let numberPattern = /\d+/;
  let extractedNumber = string.match(numberPattern);

  return extractedNumber[0];
}

module.exports = {
  sleep,
  getRank,
};
