import classNames from 'classnames';
import React, {FunctionComponent, useCallback} from 'react';

import './styles/tile.less';

export enum Color {
  YELLOW = '#EEB902',
  RED = 'tomato',
  NONE = 'none',
}

interface TileProps {
  color: Color;
  rowIndex?: number;
  colIndex?: number;
  onClick?: (rowIndex: number, colIndex: number) => void;
}

const Tile: FunctionComponent<TileProps> = ({rowIndex, colIndex, onClick, color}) => {
  const handleOnClick = useCallback(() => {
    if (onClick && rowIndex !== undefined && colIndex !== undefined) {
      onClick(rowIndex, colIndex);
    }
  }, [onClick]);

  return (
    <div
      aria-label="button"
      role="button"
      tabIndex={0}
      className={classNames('tile')}
      style={{backgroundColor: color}}
      onKeyDown={handleOnClick}
      onClick={handleOnClick}
    />
  );
};

Tile.defaultProps = {
  rowIndex: 0,
  colIndex: 0,
  onClick: () => {},
};

export default Tile;
