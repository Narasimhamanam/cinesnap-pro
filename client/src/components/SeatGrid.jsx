const SeatGrid = ({
  totalRows,
  seatsPerRow,
  bookedSeats,
  selectedSeats,
  onToggle,
}) => {
  const isBooked = (row, col) =>
    bookedSeats.some((s) => s.row === row && s.col === col);

  const isSelected = (row, col) =>
    selectedSeats.some((s) => s.row === row && s.col === col);

  const handleClick = (row, col) => {
    if (isBooked(row, col)) return;
    onToggle(row, col);
  };

  const rows = [];
  for (let r = 1; r <= totalRows; r++) {
    const cols = [];
    for (let c = 1; c <= seatsPerRow; c++) {
      const booked = isBooked(r, c);
      const selected = isSelected(r, c);

      let background = "#e5e7eb";
      if (booked) background = "#9ca3af";
      if (selected) background = "#22c55e";

      cols.push(
        <button
          key={c}
          onClick={() => handleClick(r, c)}
          disabled={booked}
          style={{
            width: 26,
            height: 26,
            margin: 3,
            fontSize: "0.65rem",
            borderRadius: 6,
            border: "none",
            background,
            cursor: booked ? "not-allowed" : "pointer",
          }}
        />
      );
    }
    rows.push(
      <div key={r} style={{ display: "flex", justifyContent: "center" }}>
        {cols}
      </div>
    );
  }

  return (
    <div>
      <p
        style={{
          textAlign: "center",
          fontSize: "0.8rem",
          color: "var(--text-muted)",
          marginBottom: "0.4rem",
        }}
      >
        SCREEN THIS SIDE
      </p>
      <div
        style={{
          height: 3,
          background: "rgba(148,163,184,0.8)",
          width: "60%",
          margin: "0 auto 0.9rem",
          borderRadius: 999,
        }}
      />
      {rows}
      <div className="legend">
        <div className="legend-pill">
          <span className="legend-dot free" /> <span>Available</span>
        </div>
        <div className="legend-pill">
          <span className="legend-dot selected" /> <span>Selected</span>
        </div>
        <div className="legend-pill">
          <span className="legend-dot booked" /> <span>Booked</span>
        </div>
      </div>
    </div>
  );
};

export default SeatGrid;
