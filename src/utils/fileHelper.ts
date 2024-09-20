import fs from "fs";
import path from "path";

const usersFilePath = path.join(__dirname, "../utils/items.ts");

export const readItemsFromFile = (): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    fs.readFile(usersFilePath, "utf8", (err, data) => {
      if (err) {
        if (err.code === 'ENOENT') {
          // If the file doesn't exist, create it with an empty array
          fs.writeFile(usersFilePath, JSON.stringify([], null, 2), (writeErr) => {
            if (writeErr) {
              reject(writeErr);
            } else {
              resolve([]); // Return an empty array
            }
          });
        } else {
          reject(err);
        }
      } else {
        resolve(JSON.parse(data)); // Return the parsed data
      }
    });
  });
};

export const writeItemsToFile = (items: any[]): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.writeFile(usersFilePath, JSON.stringify(items, null, 2), (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};
