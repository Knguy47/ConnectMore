import React, {useCallback, useState} from 'react';
import Tile, {Color} from '../Tile/Tile';

import checkForWinner from './boardUtils';

import './styles/board.css';

interface BoardState {
  board: Array<Array<number>>;
  rowCheck: number[];
  currentPlayer: number;
  isGameOver: boolean;
}

const Board = () => {
  const [gameState, setGameState] = useState<BoardState>({
    board: [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
    ],
    currentPlayer: 1,
    rowCheck: [5, 5, 5, 5, 5, 5, 5],
    isGameOver: false,
  });

  const {board, currentPlayer, rowCheck, isGameOver} = gameState;

  const handleOnClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      // Can only add if the tile is not taken
      if (board[rowCheck[colIndex]][colIndex] === 0 && rowCheck[colIndex] >= 0) {
        setGameState(({board: prevBoard, currentPlayer: prevPlayer, rowCheck: prevRowCheck}) => {
          const rowToAdd = prevRowCheck[colIndex];
          const newBoard = [...prevBoard];

          // set the tile as taken
          newBoard[rowToAdd][colIndex] = currentPlayer;

          const hasWon = checkForWinner(newBoard, rowToAdd, colIndex, currentPlayer);

          // update which row can be added to
          const newRowCheck = [...prevRowCheck];
          newRowCheck[colIndex] -= 1;

          return {board: newBoard, currentPlayer: -prevPlayer, rowCheck: newRowCheck, isGameOver: hasWon};
        });
      }
    },
    [currentPlayer],
  );

  return (
    <>
      <div>
        {/* {rowCheck.map(() => {
          let color;

          if (currentPlayer === -1) {
            color = Color.YELLOW;
          } else if (currentPlayer === 1) {
            color = Color.RED;
          } else {
            color = Color.NONE;
          }

          return <Tile color={color} />;
        })} */}
      </div>
      <div className="board">
        {board.map((row, rowIndex) => {
          return row.map((player, colIndex) => {
            let color;

            if (player === -1) {
              color = Color.YELLOW;
            } else if (player === 1) {
              color = Color.RED;
            } else {
              color = Color.NONE;
            }

            return (
              <Tile
                colIndex={colIndex}
                color={color}
                key={`${rowIndex}-${colIndex}`}
                onClick={isGameOver ? undefined : handleOnClick}
                rowIndex={rowIndex}
              />
            );
          });
        })}
      </div>
      <div>{isGameOver ? `Winner ${-currentPlayer}` : ''}</div>
    </>
  );
};

export default Board;
