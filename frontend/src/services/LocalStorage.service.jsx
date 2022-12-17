export const LocalStorageService = {
  getItem: (key ) => {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : undefined
  },
  setItem: (key, value)=>{
    const stringyfy = JSON.stringify(value)
    localStorage.setItem(key, stringyfy)
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
  }
}