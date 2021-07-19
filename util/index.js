const sortCharacters = (data) => {
  return JSON.stringify(data).split('').sort().join('');
};

module.exports = { sortCharacters };
