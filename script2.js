let currentLight = 0;
let intervalId;


const lights = [
    { id: "redLight", duration: 3000 },
    { id: "yellowLight", duration: 1000 },
    { id: "greenLight", duration: 3000 },
];


function updateLights() {
    clearLights();
    document.getElementById(lights[currentLight].id).classList.add("active");
}


function clearLights() {
    lights.forEach(light => {
        document.getElementById(light.id).classList.remove("active");
    });
}


function manualMode() {
    clearInterval(intervalId);
    currentLight = (currentLight + 1) % lights.length;
    updateLights();
}


function automaticMode() {
    clearInterval(intervalId);
    currentLight = 0; 
    updateLights();

    intervalId = setInterval(() => {
        currentLight = (currentLight + 1) % lights.length;
        updateLights();
    }, lights[currentLight].duration);
}


function stopLights() {
    clearInterval(intervalId);
    clearLights();
}


updateLights();
