function addRow () {

}

function addCar () {
    const carCard = document.createElement('div');
    carCard.setAttribute('id', 'carCard');
    
    const name = document.createElement('input');
    const monTime = document.createElement('select');
    const tueTime = document.createElement('select');
    const wedTime = document.createElement('select');
    const thuTime = document.createElement('select');
    const friTime = document.createElement('select');
    const satTime = document.createElement('select');
    const sunTime = document.createElement('select');

    name.setAttribute('id', 'carName');
    monTime.setAttribute('id', 'monTime');
    tueTime.setAttribute('id', 'tueTime');
    wedTime.setAttribute('id', 'wedTime');
    thuTime.setAttribute('id', 'thuTime');
    friTime.setAttribute('id', 'friTime');
    satTime.setAttribute('id', 'satTime');
    sunTime.setAttribute('id', 'sunTime');

    carCard.appendChild(name);
    carCard.appendChild(monTime);
    carCard.appendChild(tueTime);
    carCard.appendChild(wedTime);
    carCard.appendChild(thuTime);
    carCard.appendChild(friTime);
    carCard.appendChild(satTime);
    carCard.appendChild(sunTime);

    const carsContainer = document.getElementById("cars");
    const addButton = document.querySelector(".add-car");
    carsContainer.insertBefore(carCard, addButton);
}
