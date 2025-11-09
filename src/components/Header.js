import React, { useContext } from "react";
import styles from '../css/painelHeader.module.css'; 
import imgCeo from "../img/user.png"
import { AuthContext } from "../context/AuthContext";

const Header = () => {
  const { usuario } = useContext(AuthContext);
  const [telaCheia, setTelaCheia] = React.useState(false);

  function alternarTelaCheia() {
    if (!document.fullscreenElement) {
      // Entrar em modo tela cheia
      document.documentElement.requestFullscreen();
      setTelaCheia(true);
    } else {
      // Sair do modo tela cheia
      document.exitFullscreen();
      setTelaCheia(false);
    }
  }

  return (
    <div>
        <header className={styles.headerPainel}>
        {/* Left side */}
        <div>
            <form> 
            <div className={`${styles.campoHeader} campo-container campo-icon`}>
                <input
                    type="text"
                    placeholder="Pesquisar..."
                />
                <span><i class="las la-search"></i></span>
                </div>
            </form>
        </div>
        {/* Left side */}
        {/* Right side */}
        <div className={styles.HeaderRight}>
            <span onClick={alternarTelaCheia}>
            <i class="las la-expand"></i>
            </span>
            <span>
            <div className={styles.alertNotification}>2</div>
            <i class="las la-bell"></i>
            </span>
            <div className={styles.blocoUser}>
            <img src={imgCeo} className={styles.imgUser}/>
            <div className={styles.blocoUserContent}>
                <div className={styles.blocoUserName}>{usuario?.nome}</div>
                <div className={styles.blocoUserSub}>Fundador</div>
            </div>
            </div>
        </div>
        {/* Right side */}
        </header>
    </div>
  )
}

export default Header