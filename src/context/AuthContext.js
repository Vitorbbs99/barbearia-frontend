import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(false);

  // Se já existir token, mantém logado
  useEffect(() => {
  const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      setUsuario(JSON.parse(usuarioSalvo));
    }
  }, []);

  const login = async (usuario, senha) => {
    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usuario, senha }),
      });

      const data = await response.json();

      if (data.sucesso) {
        setLoading(true);
        const usuarioObj = { usuario: data.usuario, nome: data.nome, id: data.id };
        setUsuario(usuarioObj);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        localStorage.setItem("usuario", JSON.stringify(usuarioObj)); // salva o nome também
        return true;
      } else {
        setLoading(false);
        alert("Usuário ou senha inválidos");
        return false;
      }
    } catch (erro) {
        setLoading(false);
      console.error("Erro ao fazer login:", erro);
      return false;
    }
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
