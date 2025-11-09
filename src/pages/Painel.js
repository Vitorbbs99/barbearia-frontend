import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import styles from '../css/painelUser.module.css'; 
import stylesBlocos from '../css/painelBlocos.module.css'; 
import LayoutPainel from "../components/LayoutPainel";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
  datasets: [
    {
      label: "Clientes Ativos",
      data: [12, 19, 7, 15],
      backgroundColor: "#007bff",
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" },
    title: { display: true, text: "Crescimento Mensal" },
  },
};

function Painel() {
  const { usuario } = useContext(AuthContext);

  return (
     <LayoutPainel>

        <h4 className={styles.titlePainel}>Bem-vindo, {usuario?.nome}!</h4>
        <p className={styles.textPainel}>Selecione uma opção no menu ao lado para gerenciar seu negócio.</p>

        {/* Lista blocos superior */}
        <div className={stylesBlocos.listaBlocos}>
          <div className={stylesBlocos.cardDash}>
            <div className={stylesBlocos.cardContent}>
                <h3>Lucro total</h3>
                <p>R$ 5000</p>
            </div>
            <div className={`${stylesBlocos.card_icon_div} ${stylesBlocos.green}`}>
              <i class="las la-dollar-sign"></i>
            </div>
          </div>

          <div className={stylesBlocos.cardDash}>
            <div className={stylesBlocos.cardContent}>
                <h3>Clientes</h3>
                <p>500</p>
            </div>
            <div className={`${stylesBlocos.card_icon_div} ${stylesBlocos.blue}`}>
              <i class="las la-user-friends"></i>
            </div>
          </div>

          <div className={stylesBlocos.cardDash}>
            <div className={stylesBlocos.cardContent}>
                <h3>Planos ativos</h3>
                <p>82</p>
            </div>
            <div className={`${stylesBlocos.card_icon_div} ${stylesBlocos.orange}`}>
              <i class="las la-tasks"></i>
            </div>
          </div>

          <div className={stylesBlocos.cardDash}>
            <div className={stylesBlocos.cardContent}>
                <h3>Planos inativos</h3>
                <p>8</p>
            </div>
            <div className={`${stylesBlocos.card_icon_div} ${stylesBlocos.grey}`}>
              <i class="las la-wallet"></i>
            </div>
          </div>
        </div>
        {/* Lista blocos superior */}

        {/* Dashboards inferiores */}
        <div className={stylesBlocos.listaDashs}>
          <div className={`${stylesBlocos.cardDash} ${stylesBlocos.widthHalf}`}>
            <Bar data={data} options={options} />
          </div>
          <div className={`${stylesBlocos.cardDash} ${stylesBlocos.widthHalfRight}`}>
            <div className={stylesBlocos.titleDash}><i class="las la-user"></i> Últimos clientes</div>
            <ul className={stylesBlocos.lista_clientes}>
              <li>Eduardo Souza <span>Pago</span></li>
              <li>Mariana Alves <span>Pago</span></li>
              <li>Lucas Pereira <span>Pago</span></li>
              <li>Carla Monteiro <span>Pago</span></li>
              <li>João Henrique <span>Pago</span></li>
              <li>Patrícia Gomes <span>Pago</span></li>
            </ul>
          </div>
        </div>
        {/* Dashboards inferiores */}

      {/* Conteúdo principal */}
    </LayoutPainel>
  );
}

export default Painel;
