export const backupStoreItem = (key, data) => {
  try {
    const dataStringified = JSON.stringify(data);
    localStorage.setItem(key, dataStringified);
  } catch (e) {
    console.warn(`Error in backupStorageItem: ${key} is invalid`);
  }
};
