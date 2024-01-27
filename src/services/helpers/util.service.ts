export const utilService = {
  makeId,
  getRandomHexColor,
  getRandomInt,
  getTimeDifference,
  debounce,
  throttle,
  saveToLocalStorage,
  loadFromLocalStorage
}

/**
 * Generates a random string with a defined length to be used as id.
 *
 * @param {number} length - The length of the return string.
 * @returns {string} - The randomly generated Id.
 */
function makeId(length: number = 5): string {
  let id = ''
  let possibleChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    id += possibleChars.charAt(getRandomInt(0, possibleChars.length))
  }
  return id
}

/**
 * Generates a random hexadecimal color.
 *
 * @returns {string} - The random hexadecimal color.
 */
function getRandomHexColor(): string {
  const letters = '0123456789ABCDEF'
  let color = '#'

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }

  return color
}

/**
 * Generates a random integer within a specified range (inclusive).
 *
 * @param {number} min - The minimum value of the range.
 * @param {number} max - The maximum value of the range.
 * @param {boolean} inclusive - Whether the range is inclusive or exclusive. Default is non-inclusive.
 * @returns {number} - The random integer within the specified range.
 */
function getRandomInt(min: number, max: number, inclusive: boolean = false): number {
  if (inclusive) {
    return Math.floor(Math.random() * (max - min + 1)) + min
  } else {
    return Math.floor(Math.random() * (max - min)) + min
  }
}

/**
 * Calculates the time difference between a timestamp and the current time in a human-readable format.
 *
 * @param {number} timestamp - The timestamp to compare.
 * @returns {string} - The human-readable time difference.
 */
function getTimeDifference(timestamp: Date): string {
  const now = new Date();
  const previousDate = new Date(timestamp);
  const timeDifference = now.getTime() - previousDate.getTime();

  const seconds = Math.floor(timeDifference / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)
  const months = Math.floor(days / 30)
  const years = Math.floor(days / 365)

  if (seconds < 60) {
    return seconds + (seconds === 1 ? ' second ago' : ' seconds ago')
  } else if (minutes < 60) {
    return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago')
  } else if (hours < 24) {
    return hours + (hours === 1 ? ' hour ago' : ' hours ago')
  } else if (days < 30) {
    return days + (days === 1 ? ' day ago' : ' days ago')
  } else if (months < 12) {
    return months + (months === 1 ? ' month ago' : ' months ago')
  } else {
    return years + (years === 1 ? ' year ago' : ' years ago')
  }
}

/**
 * Debounces a function to prevent it from being called too frequently.
 *
 * @param {function} func - The function to be debounced.
 * @param {number} delay - The delay in milliseconds.
 * @returns {function} - The debounced function.
 */
function debounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  let timeoutId: ReturnType<typeof setTimeout>;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

/**
 * Throttles a function to be called at most once in a specified time interval.
 *
 * @param {function} func - The function to be throttled.
 * @param {number} interval - The time interval in milliseconds.
 * @returns {function} - The throttled function.
 */
function throttle<T extends (...args: any[]) => any>(func: T, interval: number): (...args: Parameters<T>) => void {
  let lastCallTime = 0;

  return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
    const currentTime = Date.now();

    if (currentTime - lastCallTime >= interval) {
      func.apply(this, args);
      lastCallTime = currentTime;
    }
  };
}

/**
 * Save data to local storage.
 *
 * @param {string} key - The key under which to store the data.
 * @param {any} data - The data to be stored.
 */
function saveToLocalStorage(key: string, data: any) {
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * Load data from local storage.
 *
 * @param {string} key - The key under which the data is stored.
 * @returns {any} - The loaded data.
 */
function loadFromLocalStorage(key: string) {
  const storedData = localStorage.getItem(key)

  if (storedData) {
    return JSON.parse(storedData)
  } else {
    return null
  }
}
