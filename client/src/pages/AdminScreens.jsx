import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

const AdminScreens = () => {
  const [screens, setScreens] = useState([]);
  const [form, setForm] = useState({
    name: "",
    totalRows: "",
    seatsPerRow: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchScreens = async () => {
      const res = await api.get("/screens");
      setScreens(res.data);
    };
    fetchScreens();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleCreate = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await api.post("/screens", form);
      setForm({ name: "", totalRows: "", seatsPerRow: "" });
      const res = await api.get("/screens");
      setScreens(res.data);
      setMessage("Screen created successfully ✔");
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create screen");
    }
  };

  return (
    <div className="page-container">
      <h2 className="page-title">Manage Screens</h2>

      <form className="form" onSubmit={handleCreate} style={{ marginBottom: "2rem" }}>
        <input
          className="input"
          placeholder="Screen Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Total Rows"
          name="totalRows"
          type="number"
          value={form.totalRows}
          onChange={handleChange}
        />
        <input
          className="input"
          placeholder="Seats per Row"
          name="seatsPerRow"
          type="number"
          value={form.seatsPerRow}
          onChange={handleChange}
        />

        <button className="btn" type="submit">
          Create Screen
        </button>
      </form>

      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* table */}
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Rows</th>
            <th>Seats / Row</th>
          </tr>
        </thead>
        <tbody>
          {screens.map((s) => (
            <tr key={s._id}>
              <td>{s.name}</td>
              <td>{s.totalRows}</td>
              <td>{s.seatsPerRow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminScreens;
