import { useEffect, useState } from "react";
import LayoutPainel from "../components/LayoutPainel";
import styles from '../css/clientesPainel.module.css'; 
import stylesTitles from '../css/painelUser.module.css'; 
import { apiFetch } from "../api/api";
import ModalClientes from './modalClientes';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(false);

  useEffect(() => {
    async function fetchClientes() {
      const data = await apiFetch("clientes");
      if (data) setClientes(data);
        setLoading(false);
    }
    fetchClientes();
  }, []);

  const handleAbrirModal = () => {
    setModoEdicao(false);
    setClienteSelecionado(false);
    setIsModalOpen(true);
  };

  const handleAbrirModalEdicao = (cliente) => {
    setModoEdicao(true);
    setClienteSelecionado(cliente);
    setIsModalOpen(true);
  };
  
  async function handleDelete(id) {
    await apiFetch("clientes", {
      method: "DELETE",
      body: JSON.stringify({id}),
    });
    alert("Cliente deletado com sucesso!!");
    window.location.reload();
  }

  if (loading) return <p>Carregando...</p>;

  return (
    <LayoutPainel>
      <div className={styles.clientes_container}>
      <div className={stylesTitles.flexTitlePainel}>
        <h2 className={stylesTitles.titlePainel}>Lista de Clientes</h2>
        <a onClick={handleAbrirModal} className="btn"><i class="las la-plus"></i> Cadastrar</a>
      </div>

      <table className={styles.tabela_clientes}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Plano</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody> 
          {clientes.map((cliente) => (
            <tr key={cliente.id}>
              <td>{cliente.id}</td>
              <td>{cliente.nome}</td> 
              <td>{`${cliente.idPlano == 1 ? "Corte" : "Corte e barba"}`}</td>
              <td className={styles.status}> <span className={`${cliente.status == 1 ? styles.ativo : styles.inativo}`}></span> {cliente.status == 1 ? "Ativo" : "Inativo"}</td>
              <td>
                <div className={styles.tabela_edit}>
                  <div onClick={() => handleAbrirModalEdicao(cliente)} className={`${styles.tabela_edit_link} ${styles.tabela_edit_link_edit}`}><i class="las la-edit"></i> Ver/Editar</div>
                  <div onClick={(e) => handleDelete(cliente.id)} className={`${styles.tabela_edit_link} ${styles.tabela_edit_link_trash}`}><i class="las la-trash"></i> Remover</div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    
     <ModalClientes 
        isOpen={isModalOpen} // Passa o estado atual
        onClose={() => setIsModalOpen(false)} // Passa a função para fechar
        modoEdicao={modoEdicao}
        cliente={clienteSelecionado}
      />
    </LayoutPainel>
  );
}
