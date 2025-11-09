import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from '../css/estiloLogin.module.css'; 
import logo from "../img/logo.png"
import ModalResgateSenha from './ModalResgateSenha';
import Loading from "../helper/Loading";

function Login() {
  const { login } = useContext(AuthContext);
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
      const sucesso = login(usuario, senha);
      sucesso.then((value) => {
        if (value) {
          return sucesso;
        } else {
          setLoading(false);
        }
      });
    }, 1000);
  }
  
  const handleAbrirModal = (e) => {
    e.preventDefault(); 
    setIsModalOpen(true);
  };

  const handleFecharModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.telaLogin}>
      <div className={styles.formLogin}>
        <img src={logo } className={styles.logoForm}/>
        <h2>Acesso restrito</h2>
        <p className={styles.fraseForm}>Entre com as suas credenciais para logar.</p>
        <form onSubmit={handleSubmit}>
          <div className="campo-container campo-icon">
            <input
              type="text"
              placeholder="Usuário"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
            />
            <span><i className="las la-user"></i></span>
          </div>
          <div className="campo-container campo-icon">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <span><i className="las la-lock"></i></span>
          </div>
          <br />
          <a href="#" onClick={handleAbrirModal} className="link">Esqueci minha senha</a>
          <br />
          <br />
          <button className="btn" type="submit">Entrar</button>
        </form>
         {loading && 
            <Loading show={loading} /> 
         } 
        <ModalResgateSenha 
          isOpen={isModalOpen} // Passa o estado atual
          onClose={handleFecharModal} // Passa a função para fechar
        />
      </div>
    </div>
  );
}

export default Login;
