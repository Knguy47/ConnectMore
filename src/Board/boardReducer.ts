import {Reducer} from 'react';

export interface BoardState {
  board: Array<Array<number>>;
  rowCheck: number[];
  currentPlayer: number;
  isGameOver: boolean;
  winner: undefined | number;
  remainingTiles: number;
  isTie: boolean;
}

export enum BoardActionKind {
  UPDATE_BOARD = 'UPDATE_BOARD',
  UPDATE_PLAYER = 'UPDATE_PLAYER',
  UPDATE_ROW = 'UPDATE_ROW',
  DECREASE_COUNT = 'DECREASE_COUNT',
  RESET = 'RESET',
}

export type BoardAction = {type: BoardActionKind; payload?: any};

export const init = (resetState: BoardState) => {
  return {...resetState};
};

const reducer: Reducer<BoardState, BoardAction> = (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case BoardActionKind.UPDATE_BOARD: {
      const isTie = state.remainingTiles === 0 && !payload.winner;

      return {
        ...state,
        board: payload.board,
        winner: payload.winner,
        isTie,
        isGameOver: isTie || Boolean(payload.winner),
      };
    }
    case BoardActionKind.UPDATE_PLAYER: {
      return {...state, currentPlayer: -state.currentPlayer};
    }
    case BoardActionKind.UPDATE_ROW:
      return {...state, rowCheck: payload};
    case BoardActionKind.DECREASE_COUNT: {
      return {...state, remainingTiles: state.remainingTiles - 1};
    }
    case BoardActionKind.RESET:
      return init({
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
        winner: undefined,
        remainingTiles: 42,
        isTie: false,
      });
    default:
      return state;
  }
};

export {reducer};
