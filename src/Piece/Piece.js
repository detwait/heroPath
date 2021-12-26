import './Piece.css';

export default function Piece({params}) {
  const styles = {
    top:  (params.y - 1) * 25 + 'px',
    left: (params.x - 1) * 25 + 'px',
  };

  return (
    <div className="Piece" style={styles}></div>
  );
}