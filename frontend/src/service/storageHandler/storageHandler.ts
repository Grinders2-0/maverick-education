export const IS_LOGIN = "is_login";
export const IS_FIRST_TIME = "is_first_time";
export const RECENT_SEARCH = "recent_search";
export const USER_TOKEN = "user_token";
export const REFRESH_TOKEN = "refresh_token";
export const USER_INFO = "user_info";
export const USER_ID = "user_id";
export const FONT_MULTIPLIER_VALUE = "font_multiplier_value";

const getStorageData = (key: string): any => {
  try {
    const get_item = localStorage.getItem(key);
    if (get_item) {
      const data = JSON.parse(get_item);
      return data;
    } else {
      return null;
    }
  } catch {
    throw new Error("Key not found");
  }
};

const setStorageData = (key: string, value: any): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    throw new Error("Key not found");
  }
};

const removeStorageData = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    throw new Error("Error removing storage data: " + error);
  }
};

const getEncryptedStorageData = (key: string): any => {
  try {
    const get_item = sessionStorage.getItem(key); // Using sessionStorage as a basic placeholder for encryption
    if (get_item) {
      const data = JSON.parse(get_item);
      return data;
    } else {
      return null;
    }
  } catch {
    throw new Error("Key not found");
  }
};

const setEncryptedStorageData = (key: string, value: any): void => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value)); // Using sessionStorage as a basic placeholder for encryption
  } catch (error) {
    throw new Error("Key not found");
  }
};

const removeEncryptedStorageData = (key: string): void => {
  try {
    sessionStorage.removeItem(key); // Using sessionStorage as a basic placeholder for encryption
  } catch (error) {
    throw new Error("Error removing storage data: " + error);
  }
};

export {
  getStorageData,
  setStorageData,
  removeStorageData,
  removeEncryptedStorageData,
  setEncryptedStorageData,
  getEncryptedStorageData,
};
