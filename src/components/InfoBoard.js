import React from 'react';

const InfoBoard = (props) => {
    console.log(props);
    return (
        <div>
            <b>次のプレイヤーは　{props.next_player ? "黒" : "白"}</b>
            <ul>黒の石の数{props.black_ston_num}</ul>
            <ul>白の石の数{props.white_stone_num}</ul>
        </div>
    )
}

export default InfoBoard;