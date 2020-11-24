import React, {useEffect,useState} from 'react';
import Board from './Board';
import InfoBoard from './InfoBoard';
import '../index.css';

const Game = () => {
    const row_line_num = 8;
    const [isNext, setIsNext] = useState(false);
    const [black_num,setBlackNum] = useState(2);
    const [white_num,setWhiteNum] = useState(2);
    


    //オセロ盤面の初期値
    const [board, setBoard] = useState([
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,2,1,0,0,0],
        [0,0,0,1,2,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0]]
    );
    //起動時実行
    useEffect(()=> {
        let first_tmp =board.slice();
        check(first_tmp);
        setBoard(first_tmp);
        jugement(first_tmp)
        setIsNext(!isNext);

    },[])


    
    //オセロの盤面を押した時の処理
    const handleClick = (y,x) => {
        let tmp =board.slice();
        if(board[y][x] !==3){
            alert("そこには置けません");
            return 0;
        }
        clearCheck(tmp);
        turnOver(tmp,y,x);
        check(tmp);
        setBoard(tmp);
        jugement(tmp);
        setIsNext(!isNext);
    }
    

    const turnOver = (tmp,y,x) => {
        let n, dx, dy, x2, y2;
        let canX = new Array(8)
        let canY = new Array(8);
        let own,enemy;
        if(isNext){
            own=1;
            enemy=2;
        }else{
            own=2;
            enemy=1;
        }

        //選択した場所に石を置く
        tmp[y][x] = own; 
        for(dy=-1; dy<=1; dy++){
            for(dx=-1;dx<=1; dx++){
                if(dy===0 && dx===0){
                    continue;
                }
                n=0;
                //隣のコマ
                x2 = x + dx;
                y2 = y + dy;

                //盤外
                if(x2<0|| row_line_num<=x2 || y2 < 0 || row_line_num <= y2){
                    continue;
                }
                //相手の石ではない
                if(tmp[y2][x2] !== enemy){
                    continue;
                }
                canX[n] = x2;
                canY[n] = y2;
                n++;
                //相手のコマが続く
                while(true){
                    x2 += dx;
                    y2 += dy;
                    //盤外
                    if(x2<0 || row_line_num<=x2 || y2<0 || row_line_num<=2){
                        break;
                    }else if(tmp[y2][x2] === enemy){//相手の石
                        canX[n] = x2;
                        canY[n] = y2;
                        n++
                    }else if(tmp[y2][x2] ===own){//挟んだ自分の石
                        for(n--; n>=0; n--){
                            tmp[canY[n]][canX[n]]=own;
                        }
                        break;
                    }else{
                        break;
                    }
                }
            }
        }
    }
    
    const clearCheck = (tmp) => {
        let y,x;
        for(y=0;y<row_line_num;y++){
            for(x=0;x<row_line_num;x++){
                if(tmp[y][x]===3){
                    tmp[y][x]=0;
                    
                }
            }
        }
    }

    const check = (tmp) => {
        let canSetX=new Array,canSetY=new Array;
        let canSet;
        for(let y=0;y<row_line_num;y++){
            for(let x=0;x<row_line_num;x++){
                canSet=checkPoint(tmp,y,x);
                if(canSet){
                    canSetY.push(y);
                    canSetX.push(x);
                }
            }
            
        }
        for(let count=0;count<canSetX.length;count++){
                tmp[canSetY[count]][canSetX[count]]=3;
        }
    }
    const checkPoint = (tmp,y,x) => {
        let n, dx, dy, x2, y2;
        let canX = new Array()
        let canY = new Array();
        let own,enemy;
        if(!isNext){
            own=1;
            enemy=2;
        }else{
            own=2;
            enemy=1;
        }

        if(tmp[y][x]===1 || tmp[y][x] === 2){//すでに石が置かれている場所は調べない
            return false;
        }
        for(dy=-1; dy<=1; dy++){
            for(dx=-1;dx<=1; dx++){
                if(dy===0 && dx===0){
                    continue;
                }
                n=0;
                //隣のコマ
                x2 = x + dx;
                y2 = y + dy;

                //盤外
                if(x2 <0 || row_line_num<=x2 || y2 < 0 || row_line_num <= y2){
                    continue;
                }
                //相手の石ではない
                if(tmp[y2][x2] !== enemy){
                    continue;
                }
                canX[n] = x2;
                canY[n] = y2;
                n++;
                //相手のコマが続く
                while(true){
                    x2 += dx;
                    y2 += dy;
                    //盤外
                    if(x2<0 || row_line_num<=x2 || y2<0 || row_line_num<=2){
                        break;
                    }else if(tmp[y2][x2] === enemy){//相手の石
                        
                    }else if(tmp[y2][x2] === own){//挟んだ自分の石
                        return true;
                    }else{
                        break;
                    }
                }
            }
        }   
    }
    const jugement = (tmp) => {
        let num =[0,0,0];
        //黒の石の数の取得
        

        for(let y=0; y<row_line_num;y++){
            for(let x=0;x<row_line_num;x++){
                if(tmp[y][x]===1){//黒の石の数
                    num[0]++;
                }else if(tmp[y][x]===2){//白の石の数
                    num[1]++;
                }else if(tmp[y][x]===3){
                    num[2]++;
                }else{

                }
            }
        }
        console.log(num[0],num[1],num[2]);
        setBlackNum(num[0]);
        setWhiteNum(num[1]);

        if(num[2]===0){
            if(num[0]>num[1]){
                alert("黒の勝利");
            }else if(num[0]<num[1]){
                alert("白の勝利");
            }else{
                alert("引き分け");
            }
        }
    }
    

    
    

    return (
        <div className="game">
            <div>
                <Board board={board} handleClick={handleClick} />
            </div>
                <InfoBoard black_ston_num={black_num} white_stone_num={white_num} next_player={isNext} />
            <div>
                
            </div>
        </div>
    )
}

export default Game;