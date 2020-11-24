import React from 'react';
import '../index.css';

const Square = (props) => {
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.board_num ===　0 ? " " : 
                (props.board_num === 1) ? "⚫️" :
                    (props.board_num === 2) ? "○": 3}
        </button>
    )
}
export default Square;
