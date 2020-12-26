console.log("JS file has loaded")

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = search.value;

    fetch(`http://localhost:3001/weather/?address=${location}`).then((response) => {
        response.json().then((data) => {
            console.log(data)
        });
    });
})