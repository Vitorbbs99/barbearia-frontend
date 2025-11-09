const BASE_URL = "http://localhost:5000";

// Função genérica para requisições
export async function apiFetch(endpoint, options = {}) {
  try {
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`);
    }

    return await response.json();
  } catch (erro) {
    console.error("Erro na API:", erro);
    return null;
  }
}