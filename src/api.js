const BASE_URL = import.meta.env.VITE_API_BASE_URL;
console.log("BASE_URL =", BASE_URL);
export async function login(username, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    throw new Error("Login failed");
  }

  return res.json(); // will return { access_token: "..." }
}

export async function getCustomers(token) {
  const res = await fetch(`${BASE_URL}/customers`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}
