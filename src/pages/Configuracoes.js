import  { useState, useContext, useEffect } from 'react'
import LayoutPainel from "../components/LayoutPainel";
import stylesTitles from '../css/painelUser.module.css'; 
import styles from '../css/configuracoes.module.css'; 
import { AuthContext } from "../context/AuthContext";
import logo from "../img/logo.png"
import { apiFetch } from "../api/api";

const Configuracoes = () => {
  const { usuario } = useContext(AuthContext);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  useEffect(() => {
    const url = `usuarios/${usuario?.id}`;
    async function fetchUsuario() {
      const data = await apiFetch(url);
      if (data && data[0]) {
        setNome(data[0].nome);
        setEmail(data[0].email);
        setSenha(data[0].senha);
      }
    }
    fetchUsuario();
  }, []);

  async function handleSubmit(e) {
      e.preventDefault();
      
      const url = `usuarios/${usuario.id}`;
  
      await apiFetch(url, {
        method: "PUT",
        body: JSON.stringify({nome, email, senha}),
      });
      alert("Usuário atualizado com sucesso!");
      window.location.reload();
  }

  return (
    <LayoutPainel>
      <div className={stylesTitles.flexTitlePainel}>
        <h2 className={stylesTitles.titlePainel}>Meus dados</h2>
      </div>

     <div className={styles.formulariocontainer}>
        <form onSubmit={handleSubmit} className={styles.formulariomeusdados}>
            
            {/* Campo Nome */}
            <div className="campo-container">
            <label className={styles.formulariolabel}>Nome</label>
             <input
              type="text"
              placeholder="Digite o nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            </div>

            {/* Campo Email */}
            <div className="campo-container">
            <label htmlFor="email" className={styles.formulariolabel}>Email</label>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.formularioinput}
                required
            />
            </div>

            {/* Campo Senha */}
            <div className="campo-container">
            <label htmlFor="senha" className={styles.formulariolabel}>Nova senha</label>
            <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className={styles.formularioinput}
            />
            </div>

            <button type="submit" className='btn'>
            Salvar alterações
            </button>

        </form>

        <div className={styles.formImg}>
            <img src={logo } className={styles.logoForm}/>
        </div>
      </div>
    </LayoutPainel>
  )
}

export default Configuracoes