import { sortNumber, sortString } from "./sorting.js";

const data = [
  { name: "a", lastName: "o", age: 12 },
  { name: "b", lastName: "n", age: 1 },
  { name: "c", lastName: "m", age: 13 },
  { name: "d", lastName: "l", age: 21 },
  { name: "e", lastName: "k", age: 2 },
  { name: "f", lastName: "j", age: 4 }
];

export function getAll(text) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve(data);
    }, 500);
  });
}

export function getData(page, pageSize, text, sorting) {
  let originalData;

  if (sorting) {
    if (sorting.key === "age") {
      originalData = sortNumber(data, sorting.dir, sorting.key);
    } else {
      originalData = sortString(data, sorting.dir, sorting.key);
    }
  } else {
    originalData = data;
  }

  return new Promise((resolve, reject) => {
    setTimeout(function() {
      const originalRows = originalData.slice(page * pageSize);
      let rows = [];
      let rowsCount = data.length - 1;

      if (text && text.length > 0) {
        for (let i in originalRows) {
          for (let j in originalRows[i]) {
            if (
              originalRows[i][j]
                .toString()
                .toLowerCase()
                .indexOf(text) > -1
            ) {
              rows.push(originalRows[i]);
              break;
            }
          }
        }

        rowsCount = rows.length - 1;
      } else {
        rows = originalRows;
      }

      resolve({ rows: rows.slice(0, pageSize), rowsCount: rowsCount });
    }, 500);
  });
}
