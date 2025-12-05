import { useState } from "react";
import { login, getCustomers } from "./api";

function App() {
  const [username, setUsername] = useState("shiven");
  const [password, setPassword] = useState("shivenshiven");
  const [token, setToken] = useState("");
  const [customers, setCustomers] = useState([]);

  async function handleLogin() {
    try {
      const data = await login(username, password);
      setToken(data.access_token);
      alert("Login successful!");
    } catch (e) {
      alert("Login failed");
    }
  }

  async function loadCustomers() {
    if (!token) return alert("Login first!");
    const data = await getCustomers(token);
    setCustomers(data);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Login</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />
      <br />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
        type="password"
      />
      <br />
      <button onClick={handleLogin}>Login</button>

      {token && (
        <>
          <h2>Customers</h2>
          <button onClick={loadCustomers}>Load Customers</button>
          <ul>
            {customers.map((c) => (
              <li key={c.id}>{c.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
