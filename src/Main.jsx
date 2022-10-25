import './Main.css';
import Logo from './media/Logo.svg';
import UserBlock from './components/UserBlock';


function Main() {
    return (
        <div className="Main">
            <div className="logo">
                <img className="logo_img" src={Logo} width="20%" height="auto"></img>        
                <div>
                    <input className="search" type="search" placeholder='Поиск: '></input>
                </div>
            </div>
            <div className="User_list">
                <UserBlock></UserBlock>
            </div>
        </div>
    );
}

export default Main;
