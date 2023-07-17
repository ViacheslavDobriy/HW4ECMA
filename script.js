// Task 1

const getData = async (url) => {
    const res = await fetch(url);
    const json = await res.json();
    return json;
};

const url = 'https://jsonplaceholder.typicode.com/users';

/**
 * Функция сохраняет полученные с API данные на локальном хранилище
 * @param {*} fromBackEnd данные которые приходят с API
 */
function saveInLocalStorage(fromBackEnd) {
    fromBackEnd.forEach(element => {
        localStorage.setItem(element.id, JSON.stringify(element));
    });
};
/**
 * Функция принимает пойманный массив элементов с классом user и заполняет карточки пользователей данными полученными из API
 * @param {*} userElems 
 */
function drawUsers(userElems) {
    let counter = 1;
    userElems.forEach(element => {
        const userFromLocalStorage = JSON.parse(localStorage.getItem(counter));

        const idField = element.querySelector('.user__id');
        idField.textContent = 'ID: ' + userFromLocalStorage.id;

        const nameField = element.querySelector('.user__name');
        nameField.textContent = 'Name: ' + userFromLocalStorage.name;

        const userNameField = element.querySelector('.user__username');
        userNameField.textContent = 'Username: ' + userFromLocalStorage.username;

        const emailField = element.querySelector('.user__email');
        emailField.textContent = 'Email: ' + userFromLocalStorage.email;

        const phoneField = element.querySelector('.user__phone');
        phoneField.textContent = 'Phone: ' + userFromLocalStorage.phone;

        const websiteField = element.querySelector('.user__website');
        websiteField.textContent = 'Website: ' + userFromLocalStorage.website;

        const cityField = element.querySelector('.user__city');
        cityField.textContent = 'City: ' + userFromLocalStorage.address.city;

        const streetField = element.querySelector('.user__street');
        streetField.textContent = 'Street: ' + userFromLocalStorage.address.street;

        const apartmentField = element.querySelector('.user__apartment');
        apartmentField.textContent = 'Apartment: ' + userFromLocalStorage.address.suite;

        const zipcodeField = element.querySelector('.user__zipcode');
        zipcodeField.textContent = 'Zipcode: ' + userFromLocalStorage.address.zipcode;

        const removeButton = element.querySelector('.user__delete');
        removeButton.addEventListener('click', () => {
            element.remove();
            localStorage.removeItem(counter);
        });
        counter++;
    });
}

try {
    const data = await getData(url);
    console.log(data);
    saveInLocalStorage(data);

    const usersElems = document.querySelectorAll('.user');
    drawUsers(usersElems);
} catch (error) {
    console.log(error.message);
}