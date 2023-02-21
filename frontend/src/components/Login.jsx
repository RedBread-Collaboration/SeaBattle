import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import { SubmitNickname } from "../ws/wsFuncs";
import Error from "./Error";

function Login() {
    const navigate = useNavigate();

    function EnterGame(event) {
        event.preventDefault();
        
        SubmitNickname(event);
        return navigate("/game");
    }

    return (
        <div className="login">
            <form className="login-form" onSubmit={EnterGame}>
                <label>
                    <span>Ваш никнейм</span>
                </label>
                <input name="nickname" type="text" placeholder="Введите Ваш никнейм" />
                <button className="submit-btn" type="submit">
                    <span>GO</span>
                </button>
            </form>
        </div>
    );
}

export default Login;
