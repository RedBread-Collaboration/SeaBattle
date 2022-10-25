import './Game.css';
import Logo from "./media/Logo.svg";

function Game() {
    return (
        <div className='wrap'>
            <div className='battlefield'>
                <div id='text_top' className='flex text-top'>
                    Расстановка кораблей
                </div>
                <div className='flex outer'>
                    <figure className='field field-human figure'>
                        <div id='field_human' className='ships'></div>
                        <figcaption className='label'>Ваше поле</figcaption>
                    </figure>

                    <figure className='field field-human figure'>
                        <div id='field_human' className='ships'></div>
                        <figcaption className='label'>
                            Поле противника
                        </figcaption>
                    </figure>
                </div>
            </div>
        </div>
    );
}

export default Game;