import { useState, useEffect } from 'react';
import styles from '../css/modalGeral.module.css'; 
import { apiFetch } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { maskTelefone } from "../helper/Mask";

const ModalClientes = ({ isOpen, onClose, modoEdicao, cliente }) => {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [idPlano, setPlano] = useState("");
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    if (cliente) {
      setNome(cliente?.nome || "");
      setTelefone(cliente?.telefone || "");
      setPlano(cliente?.idPlano || "");
      setStatus(cliente?.status || "");
    } else {
      setNome("");
      setTelefone("");
      setPlano("");
      setStatus("");
    }
  }, [cliente]);
  
 async function handleSubmit(e) {

   const url = modoEdicao
      ? `clientes/${cliente.id}`
      : `clientes`;
    const method = modoEdicao ? "PUT" : "POST";
    const msg = modoEdicao ? "Cliente atualizado com sucesso!" : "Cliente cadastrado com sucesso!";

    e.preventDefault();
    await apiFetch(url, {
      method,
      body: JSON.stringify({nome, telefone, idPlano, status}),
    });
    alert(msg);
    onClose();
    window.location.reload();
  }
  
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
      <motion.div
          key="modal_overlay"
          className={styles.modal_overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            key="modal_content"
            className={styles.modal_content}
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()} 
          >
          <h2>{modoEdicao ? "Editar cliente" : "Cadastrar Cliente"}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="campo-container">
              <input
                type="text"
                placeholder="Digite o nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required
              />
            </div>
            <div className="campo-container">
              <input
                type="text"
                placeholder="Digite o telefone"
                value={telefone}
                onChange={(e) => setTelefone(maskTelefone(e.target.value))}
                required
              />
            </div>
            <div className="campo-container campo-select">
            <select onChange={(e) => setPlano(e.target.value)} value={idPlano}>
                <option value="">Selecione o plano</option>
                <option value="1">Corte</option>
                <option value="2">Corte e barba</option>
              </select>
              <i class="las la-angle-down"></i>
            </div>
            <div className="campo-container campo-select">
            <select onChange={(e) => setStatus(e.target.value)} value={status}>
                <option value="">Selecione o status</option>
                <option value="1">Ativo</option>
                <option value="2">Inativo</option>
              </select>
              <i class="las la-angle-down"></i>
            </div>
            <br />
            <br />
            <div className={styles.modal_actions}>
              <button type="submit" className='btn'>
                {modoEdicao ? "Editar" : "Cadastrar"}
              </button>
              {/* Botão para fechar o modal */}
              <button type="button" className='btn btn-secondary' onClick={onClose}>
                Cancelar
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalClientes;