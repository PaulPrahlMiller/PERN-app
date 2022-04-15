export default function sortInOrder(array, key, sortOrder = "ASC") {
  let sortedASC = new Array(...array).sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
  return sortOrder === "ASC" ? sortedASC : sortedASC.reverse(); // Return sorted array as ascending else descending
}
