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

function showRoom() {
  welcome.hidden = true;
  room.hidden = false;
  const h3 = room.querySelector("h3");
  h3.innerText = `Welcome to ${roomName}!`;
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
