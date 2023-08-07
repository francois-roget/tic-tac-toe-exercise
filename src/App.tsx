import React, {useState} from 'react';

import './App.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

const Square = (props) => {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
};

const initialState = {
    squares: Array(9).fill(''),
    isXNext: true,
    winner: null,
};

const Board = () => {
    const [state, setState] = useState(initialState);

	const {winner, isXNext} = state;

	const resetGame = ()=>{
		setState(initialState);
	};

    const handleUserPlay = (i) => {
        const {winner, isXNext, squares} = state;
        if (winner) {
            return;
        }
        const newSquares = [...squares];
        newSquares[i] = isXNext ? 'X' : 'O';
        setState({
            isXNext: !isXNext,
            squares: newSquares,
            winner: calculateWinner(newSquares)
        });
    };

    const renderSquare = (i) => {
        return <Square value={state.squares[i]} onClick={() => handleUserPlay(i)}/>;
    };

    const status = winner ? `We have a winner: ${winner}`: 'Next player: ' + (isXNext ? 'X' : 'O');

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
			{winner && <button onClick={resetGame}>Reset</button>}
        </div>
    );
};

const Game = () => {
    return (
        <div className="game">
            <div className="game-board">
                <Board/>
            </div>
        </div>
    );
};

export default Game;
