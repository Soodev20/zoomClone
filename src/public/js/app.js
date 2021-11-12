const socket = io();

const welcome = document. getElementById("welcome");
const room = document.getElementById("room");
const form = welcome.querySelector("form");

let roomName;

room.hidden = true;

function backendDone(msg) {
  console.log(`The backend says: ${msg}`)
}

function addMessage(msg) {
  const ul = room.querySelector("ul");
  const li = document.createElement("li");

  li.innerText = msg;
  ul.appendChild(li);
}

function handleMassageSubmit(event) {
  event.preventDefault();
  const input = room.querySelector("input");
  const value = input.value;
  socket.emit("new_message", value, roomName, () => {
    addMessage(`You: ${value}`);
  });
  input.value = "";
}

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Welcome to ${roomName}!`;
  const form = room.querySelector("form");
  form.addEventListener("submit", handleMassageSubmit);
}

function handleRoomSubmit(event) {
  event.preventDefault();
  const input = form.querySelector("input");
  socket.emit("enter_room", input.value, showRoom);
  roomName = input.value;
  input.value = "";
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
  addMessage("Someone Came in!");
});

socket.on("bye", () => {
  addMessage("Someone left...");
});

socket.on("new_message", addMessage)