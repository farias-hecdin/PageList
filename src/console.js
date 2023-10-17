// Better console.log
export const logC = (data, message) => {
  let active = true;

  if (active === true) {
    console.warn(`Error in: ${message}, `, `Type: ${typeof data}`);
  }
};
