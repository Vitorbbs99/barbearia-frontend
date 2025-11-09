import { useEffect, useState } from "react";
import LayoutPainel from "../components/LayoutPainel";
import stylesTitles from '../css/painelUser.module.css'; 
import styles from '../css/planos.module.css'; 
import { apiFetch } from "../api/api";
import ModalPlanos from './modalPlanos';

const Planos = () => {
  const [planos, setPlanos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(false);

   const handleAbrirModal = () => {
    setModoEdicao(false);
    setClienteSelecionado(false);
    setIsModalOpen(true);
  };

  const handleAbrirModalEdicao = (plano) => {
    setModoEdicao(true);
    setClienteSelecionado(plano);
    setIsModalOpen(true);
  };

  useEffect(() => {
    async function fetchPlanos() {
      const data = await apiFetch("planos");
      if (data) setPlanos(data);
        setLoading(false);
    }
    fetchPlanos();
  }, []);

  async function handleDelete(id) {
    await apiFetch("planos", {
      method: "DELETE",
      body: JSON.stringify({id}),
    });
    alert("Cliente deletado com sucesso!!");
    window.location.reload();
  }
  
  if (loading) return <p>Carregando...</p>;

  return (
    <LayoutPainel>
      <div className={stylesTitles.flexTitlePainel}>
        <h2 className={stylesTitles.titlePainel}>Planos</h2>
        <a onClick={handleAbrirModal} className="btn"><i class="las la-plus"></i> Cadastrar</a>
      </div>

      <div className={styles.planoscontainer}>

        {planos.map((plano) => (
          <div className={styles.planocard} key={plano.id}>
            <div className={styles.planocardvalor}> { plano.valor.toLocaleString("pt-BR", {style:"currency", currency:"BRL"})}</div>
            <h2 className={styles.planocardtitulo}>{plano.titulo}</h2>
            <p className={styles.planocarddescricao}>{plano.texto}</p>
            <div className={styles.btnFlexCard}>
                <button onClick={() => handleAbrirModalEdicao(plano)} className='btn'><i class="las la-edit"></i> Editar</button>
                <button onClick={(e) => handleDelete(plano.id)} className='btn btn-red'><i class="las la-trash"></i> Remover</button>
            </div>
          </div>
        ))}
      
     </div>
     <ModalPlanos 
        isOpen={isModalOpen} // Passa o estado atual
        onClose={() => setIsModalOpen(false)} // Passa a função para fechar
        modoEdicao={modoEdicao}
        plano={clienteSelecionado}
      />

    </LayoutPainel>
  )
}

export default Planos