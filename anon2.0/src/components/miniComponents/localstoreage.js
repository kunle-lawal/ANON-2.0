export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    console.log(data);
};

export const getData = (key) => {
    console.log(JSON.parse(localStorage.getItem(key)));
    return JSON.parse(localStorage.getItem(key));
};

export const deleteData = (key) => {
    localStorage.removeItem(key)
}