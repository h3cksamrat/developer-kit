const isObjectEmpty = (object) => {
  return Object.keys(object) === 0;
};

const removeNullOrEmpty = (array) => {
  return array.filter((item) => !!item);
};

const spaceInBetween = (string) => {
  return string.split(' ').length !== 1;
};

const APIResponse = (message, error = false, extraResp = {}) => {
  return { message, error, ...extraResp };
};

module.exports = {
  isObjectEmpty,
  removeNullOrEmpty,
  spaceInBetween,
  APIResponse,
};
