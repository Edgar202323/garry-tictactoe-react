type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

export default function Square({ value, onSquareClick }: SquareProps) {
  const color = value === 'X' ? '#9acd32' : value === 'O' ? '#2196f3' : 'black';

  return (
    <button className="square" onClick={onSquareClick} style={{ color }}>
      {value}
    </button>
  );
}
