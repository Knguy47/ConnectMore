import React, {FunctionComponent, useCallback, useReducer} from 'react';
import Tile, {Color} from '../Tile/Tile';
import {reducer, BoardActionKind, init} from './boardReducer';
import type {BoardState} from './boardReducer';

import checkForWinner from './boardUtils';

import './styles/board.less';

const initialState: BoardState = {
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
  isTie: false,
  winner: undefined,
  remainingTiles: 42,
};

const getColorByPlayer = (player: number) => {
  let color;

  if (player === -1) {
    color = Color.YELLOW;
  } else if (player === 1) {
    color = Color.RED;
  } else {
    color = Color.NONE;
  }

  return color;
};

const Board: FunctionComponent = () => {
  const [gameState, dispatch] = useReducer(reducer, initialState, init);
  const {board, currentPlayer, rowCheck, isGameOver, winner} = gameState;

  const handleResetGame = useCallback(() => {
    dispatch({
      type: BoardActionKind.RESET,
      payload: initialState,
    });
  }, []);

  const handleOnClick = useCallback(
    (rowIndex: number, colIndex: number) => {
      // Can only add if the tile is not taken
      if (rowCheck[colIndex] >= 0 && board[rowCheck[colIndex]][colIndex] === 0) {
        dispatch({type: BoardActionKind.DECREASE_COUNT});

        // set the tile as taken
        const rowToAdd = rowCheck[colIndex];
        const newBoard = [...board];
        newBoard[rowToAdd][colIndex] = currentPlayer;
        const hasWinner = checkForWinner(newBoard, rowToAdd, colIndex, currentPlayer);

        // update which rows can be added to
        const newRowCheck = [...rowCheck];
        newRowCheck[colIndex] -= 1;

        dispatch({type: BoardActionKind.UPDATE_ROW, payload: newRowCheck});
        dispatch({
          type: BoardActionKind.UPDATE_BOARD,
          payload: {board: newBoard, winner: hasWinner ? currentPlayer : 0},
        });
        dispatch({type: BoardActionKind.UPDATE_PLAYER});
      }
    },
    [currentPlayer],
  );

  return (
    <>
      <div className="board">
        {board.map((row, rowIndex) => {
          return row.map((player, colIndex) => {
            return (
              <Tile
                colIndex={colIndex}
                color={getColorByPlayer(player)}
                // eslint-disable-next-line react/no-array-index-key
                key={`${player}-${rowIndex}-${colIndex}`}
                onClick={isGameOver ? undefined : handleOnClick}
                rowIndex={rowIndex}
              />
            );
          });
        })}
      </div>
      {isGameOver && (
        <>
          <button type="button" onClick={handleResetGame}>
            Play Again
          </button>
          <div>{isGameOver ? `Winner ${winner}` : ''}</div>
        </>
      )}
    </>
  );
};

export default Board;
