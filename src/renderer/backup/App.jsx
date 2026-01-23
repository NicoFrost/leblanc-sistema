import React, { useEffect, useState } from "react";

export default function App() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "" });

  console.log(window.api);
  
  useEffect(() => {
    window.api?.getUsers().then(setUsers);
  }, []);  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = await window.api.addUser(form);
    setUsers([...users, newUser]);
    setForm({ name: "", email: "" });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Usuarios (Sequelize + SQLite + Electron)</h1>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Nombre"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <button type="submit">Agregar</button>
      </form>

      <ul>
        {users.map(({dataValues}) => (
          <li key={dataValues.id}>
            {dataValues.name} - {dataValues.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
