import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from '../css/painelMenuLateral.module.css'; 
import logo from "../img/logo_white.png"
import { Link } from 'react-router-dom';

const MenuLateral = () => {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      <aside className={styles.sidebar}>
        <div className={styles.containerLogo}>
          <img src={logo } className={styles.logoSide}/>
        </div>

        <nav className={styles.nav}>
          <Link to="/"className={styles.link}><i class="las la-chart-pie"></i> Dashboards</Link>
          <Link to="/clientes" className={styles.link}><i class="las la-user-friends"></i> Clientes</Link>
          <Link to="/planos"className={styles.link}><i class="las la-border-all"></i> Planos</Link>
          <Link to="/"className={styles.link}><i class="las la-wallet"></i> Financeiro</Link>
          <Link to="/configuracoes"className={styles.link}><i class="las la-cog"></i> Configurações</Link>
          <Link onClick={logout} className={styles.link}><i class="las la-sign-out-alt"></i> Sair</Link>
        </nav>

      </aside>
    </div>
  )
}

export default MenuLateral