export const backupStoreItem = (key, data) => {
  try {
    const dataStringified = JSON.stringify(data);
    localStorage.setItem(key, dataStringified);
  } catch (e) {
    console.warn(`Error in backupStorageItem: ${key} is invalid`);
  }
};

export const removeAllBackups = () => {
  localStorage.removeItem("weather");
  localStorage.removeItem("notes");
};

export const convertCoordsToId = ({ lat = 0, lon = 0 }) => `${lat},${lon}`;

export const sortLocationList = (list) =>
  Object.values(list).sort((a, b) =>
    a.location.name.localeCompare(b.location.name)
  );
