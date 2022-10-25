import './UserBlock.css';
import { Link } from "react-router-dom";

function UserBlock() {
    return (
        <div className="User_block">
            <span>Имя: </span>
            <span>Статус:  </span>
            <Link to = "/pregame">
                <button className="choose-btn">Выбрать</button>
            </Link>
        </div>
    );
}


export default UserBlock
