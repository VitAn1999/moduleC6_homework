const btnMessage = document.querySelector('.message-btn');
const btnGeo = document.querySelector('.geo-btn');
const inputText = document.querySelector('.message-text');
const messageSpace = document.querySelector('.message-space');
const url = 'wss://echo.websocket.org/';
let sentMessage = ``;
let webSocket = new WebSocket(url);

/*Эхо-чат*/
btnMessage.addEventListener('click', () => {
    let message = inputText.value;
    if (message) {
        sentMessage += `<p class="sent-message">
        ${message}</p>`;
        messageSpace.innerHTML = sentMessage;
    }
    webSocket.send(message);
    webSocket.onmessage = function(event) {
        sentMessage += `<p class="response-message">${event.data}</p>`;
        messageSpace.innerHTML = sentMessage;
    };
    inputText.value = '';
});

/*Определение геолокации*/
function success(position) {
    sentMessage += `<p class="sent-message">
    <a href="https://www.openstreetmap.org/#map=18/
    ${position.coords.latitude}/${position.coords.longitude}"
    target="_blank">Гео-локация</a></p>`;
    messageSpace.innerHTML = sentMessage;
}

function unsuccess() {
    sentMessage += `<p class="sent-message">
    Пользователь запретил доступ к своей геолокации</p>`;
    messageSpace.innerHTML = sentMessage;
}

btnGeo.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, unsuccess);
    } else {
        sentMessage += `<p class="sent-message">Браузер неподдерживает API</p>`;
        messageSpace.innerHTML = sentMessage;
    }
});