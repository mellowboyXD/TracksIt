const indexedDB = window.indexedDB;
if (!indexedDB) {
  alert("Your browser does not support IndexedDB!");
} else {
  console.log("IndexedDB is supported");
}

const request = indexedDB.open("expensesDatabase", 1);
const storeName = "expenses";
let db;

request.onerror = function (e) {
  console.error("An error occurred with IndexedDB:", e);
};

request.onupgradeneeded = function () {
  db = request.result;

  if (!db.objectStoreNames.contains(storeName)) {
    const store = db.createObjectStore(storeName, {
      keyPath: "id",
      autoIncrement: true,
    });
    store.createIndex("descriptionIdx", "description", { unique: false });
    store.createIndex("categoryIdx", "category", { unique: false });
    store.createIndex("dateIdx", "date", { unique: false });
    store.createIndex("amountIdx", "amount", { unique: false });
    console.log("Object store and indexes created");
  }
};

request.onsuccess = function () {
  db = request.result;
  console.log("Database initialized successfully.");
};

/**
 * Retrieves the IndexedDB database instance.
 *
 * @returns {Promise<IDBDatabase>} A promise that resolves to the database instance if available,
 * or rejects with an error message if the database cannot be opened.
 */
function getDB() {
  const request = indexedDB.open("expensesDatabase", 1);
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db);
    } else {
      request.onsuccess = function (e) {
        db = e.target.result;
        console.log("Database is ready.");
        resolve(db);
      };
      request.onerror = function (e) {
        reject("Failed to open database: " + e);
      };
    }
  });
}

/**
 * Inserts a new record into the "expenses" object store in IndexedDB.
 *
 * @param {Object} params - The expense details.
 * @param {string} params.description - The description of the expense.
 * @param {string} params.category - The category of the expense.
 * @param {string} params.date - The date of the expense (YYYY-MM-DD format).
 * @param {number} params.amount - The amount of the expense.
 * @returns {Promise<boolean>} A promise that resolves to `true` when the record is successfully added,
 * or rejects with an error message if the operation fails.
 */
function insertIntoDB({ description, category, date, amount }) {
  return new Promise(async (resolve, reject) => {
    if (!description || !category || !date || !amount)
      reject("All fields must be provided");

    try {
      const db = await getDB();
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const putRequest = store.put({
        id: crypto.randomUUID(),
        description,
        category,
        date,
        amount,
      });

      putRequest.onsuccess = function () {
        console.log("Record added successfully");
        resolve(true);
      };

      putRequest.onerror = function () {
        reject("Error adding record:" + putRequest.error);
      };

    } catch (error) {
      reject("Database is not available:" + error);
    }
  });
}


/**
 * Retrieves all records from the "expenses" object store in IndexedDB.
 *
 * @returns {Promise<Object[]>} A promise that resolves to an array of objects representing the stored records,
 * or rejects with an error message if the operation fails.
 */
function getAllFromDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(storeName, "readonly");
      const store = transaction.objectStore(storeName);

      const getAllRequest = store.getAll();
      getAllRequest.onsuccess = function () {
        resolve(getAllRequest.result);
      };

      getAllRequest.onerror = function () {
        reject("Error getting records: " + getAllRequest.error);
      };
    } catch (err) {
      console.error(err);
    }
  });
}

/**
 *
 * @param {Object} params
 * @param {string} params.id
 * @param {string} params.description
 * @param {string} params.category
 * @param {string} params.date
 * @param {number} params.amount
 *
 * @returns {Promise<boolean>}
 */
function updateFromDB({ id, description, category, date, amount }) {
  return new Promise(async (resolve, reject) => {
    if (!id || !description || !category || !date || !amount)
      reject("All fields must be provided");

    try {
      const db = await getDB();
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const getRecord = store.get(id);

      getRecord.onsuccess = function () {
        const record = getRecord.result;
        if (record) {
          record.description = description;
          record.category = category;
          record.date = date;
          record.amount = amount;

          const putRecord = store.put(record);

          putRecord.onsuccess = function () {
            resolve(true);
          };

          putRecord.onerror = function () {
            reject("Error updating record: ", putRecord.error);
          };
        } else {
          reject("Record not found");
        }
      };

      getRecord.onerror = function () {
        reject("Error getting record to update");
      };

    } catch (err) {
      reject("Could not connect to db: " + err);
    }
  });
}

/**
 * Clears all records from the "expenses" object store in IndexedDB.
 *
 * @returns {Promise<boolean>} A promise that resolves to `true` when the store is successfully cleared,
 * or rejects with an error message if the operation fails.
 */
function clearDB() {
  return new Promise(async (resolve, reject) => {
    try {
      const db = await getDB();
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const clearRequest = store.clear();

      clearRequest.onsuccess = function () {
        resolve(true);
      };

      clearRequest.onerror = function () {
        reject("Error clearing record", clearRequest.error);
      };

    } catch (err) {
      reject("Could not get database: " + err);
    }
  });
}

/**
 * Deletes a record from the "expenses" database by ID.
 * 
 * @param {number} id The ID of the record to delete.
 * 
 * @returns {Promise<void>} A promise that resolves when the record is successfully deleted.
 */
function deleteRecordFromDB(id) {
  return new Promise(async (resolve, reject) => {
    if (!id) reject("Id must be provided");

    try {
      const db = await getDB();
      const transaction = db.transaction(storeName, "readwrite");
      const store = transaction.objectStore(storeName);

      const deleteRequest = store.delete(id);

      deleteRequest.onsuccess = function () {
        resolve(true);
      };

      deleteRequest.onerror = function () {
        reject("Error deleting record: " + deleteRequest.error);
      };

    } catch (err) {
      reject("Error connecting to database: " + err);
    }
  });
}

export { insertIntoDB, getAllFromDB, updateFromDB, deleteRecordFromDB, clearDB };
