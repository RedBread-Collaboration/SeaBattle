import './chat.css';
import Message from './Message'

function Chat() {
    return (
        <div className="Chat_block">
            <div className="header_chat">
                <span>Чат: </span>
                <input className="input_msg" type="text" placeholder="Введите сообщение"></input>
                <button className="send-btn">Отправить</button>
            </div>
            <div>
                <Message></Message>
            </div>

        </div>
    );
}
export default Chat;    