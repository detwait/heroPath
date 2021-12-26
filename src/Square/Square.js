import './Square.css';

export default function Square({params, onClick}) {
  function squareClick({ x, y }) {
    onClick({ x, y });
  }

  const squareColorClassName = (params.x + params.y) % 2 === 0 ? 'SquareWhite' : 'SquareGray';
  const classNames = `Square ${squareColorClassName}`;

  return (
    <div className={classNames} onClick={() => squareClick(params)}></div>
  );
}