class LocalStorage {
  /**
   * Set a value in localStorage.
   * @param {string} key - Key to set.
   * @param {any} value - Value to set.
   */
  set(key, value) {
    localStorage.setItem(key, value);
  }

  setStringify(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  /**
   * Get a value from localStorage.
   * @param {string} key - Key to retrieve.
   * @returns {any} Retrieved value.
   */
  get(key) {
    return localStorage.getItem(key);
  }

  /**
   * Remove a value from localStorage.
   * @param {string} key - Key of the item to remove.
   */

  remove(key) {
    localStorage.removeItem(key);
  }

  /**
   * Remove all items from localStorage.
   */
  clear() {
    localStorage.clear();
  }
}

const localStorageInstance = new LocalStorage();

export default localStorageInstance;
// Usage example
