// import "./chat.css";
// // import Message from "./Message"
// import Cookies from "universal-cookie";

// const cookies = new Cookies();
// const xhr = new XMLHttpRequest();

// function sendMessage() {
//   var input = document.getElementById("message");
//   var message = input.value;

//   var body = JSON.stringify({
//     username: cookies.get("username"),
//     message: message,
//   });
//   xhr.open("POST", "http://127.0.0.1:8000/chat/", true);
//   xhr.setRequestHeader("Content-Type", "application/json");
//   xhr.send(body);
// }

// var ws = new WebSocket(`ws://192.168.43.119:8000/ws/${client_id}`);
//             ws.onmessage = function(event) {
//                 var messages = document.getElementById('messages')
//                 var message = document.createElement('li')
//                 var content = document.createTextNode(event.data)
//                 message.appendChild(content)
//                 messages.appendChild(message)
//             };
//             function sendMessage(event) {
//                 var input = document.getElementById("messageText")
//                 ws.send(input.value)
//                 input.value = ''
//                 event.preventDefault()
//             }

// function Chat() {
//   return (
//     <div className="Chat_block">
//           <span>Чат: </span>
//           <form action="" onsubmit={sendMessage}>
//             <input type="text" id="messageText" autocomplete="off"/>
//             <button>Send</button>
//             </form>
//             <ul id='messages'>
//         </ul>
//     </div>
//   );
// }
// export default Chat;
