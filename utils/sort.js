export default function sortInOrder(array, param, sortOrder = "ASC") {
  if (sortOrder === "ASC") {
    return new Array(...array).sort((a, b) => {
      if (a[param] < b[param]) return -1;
      if (a[param] > b[param]) return 1;
      return 0;
    });
  }
  return new Array(...array).sort((a, b) => {
    if (a[param] < b[param]) return 1;
    if (a[param] > b[param]) return -1;
    return 0;
  });
}
