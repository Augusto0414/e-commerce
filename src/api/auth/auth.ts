const API_URL = process.env.REACT_APP_API_URL;

export class Usuario {
  static registerUser = async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    if (!response.ok) {
      throw new Error("Error en el registro");
    }

    return response.json();
  };
}
