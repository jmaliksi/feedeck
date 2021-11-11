const emoji = (e) => {
  try {
    return String.fromCodePoint(e);
  }
  catch (err) {
    return e;
  }
};

export default emoji;
