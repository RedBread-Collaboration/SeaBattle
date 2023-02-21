import "../css/Field.css";
import { OnLeftClick, OnRightClick } from "../ws/wsFuncs";

function Field({ id, size = 10, px = 30, br = 0 }) {
    var CELLS = [];
    const TABLE = [];
    CELLS.push(<th></th>);
    for (var i = 0; i < size; i++) {
        CELLS.push(
            <th>
                <span>{i + 1}</span>
            </th>
        );
    }
    TABLE.push(<tr>{CELLS}</tr>);
    for (var i = 0; i < size; i++) {
        CELLS = [];
        CELLS.push(
            <th>
                <span>{String.fromCharCode(i + 65)}</span>
            </th>
        );
        for (var j = 0; j < size; j++) {
            CELLS.push(
                <td
                    id={String.fromCharCode(i + 65) + (j + 1)}
                    height={px}
                    width={px}
                    onClick={OnLeftClick}
                    onContextMenu={OnRightClick}
                ></td>
            );
        }
        TABLE.push(<tr>{CELLS}</tr>);
    }

    var border = `${br}px solid #000`;
    var fieldStyle = { border: border };

    return (
        <div id={id} className="field">
            <table style={fieldStyle}>
                <tbody>{TABLE}</tbody>
            </table>
        </div>
    );
}

export default Field;
