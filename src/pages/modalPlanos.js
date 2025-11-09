import { useState, useEffect } from 'react';
import styles from '../css/modalGeral.module.css'; 
import { apiFetch } from "../api/api";
import { motion, AnimatePresence } from "framer-motion";
import { maskReal, formatarReal } from "../helper/Mask";

const ModalPlanos = ({ isOpen, onClose, modoEdicao, plano }) => {
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");
  const [texto, setTexto] = useState("");
  
  useEffect(() => {
    if (plano) {
      setTitulo(plano?.titulo || "");
      setValor(formatarReal(plano?.valor || ''));
      setTexto(plano?.texto || "");
    } else {
      setTitulo("");
      setValor("");
      setTexto("");
    }
  }, [plano]);

  function formatToDouble(valor) {
    if (!valor) return 0;
    const onlyNumbers = valor.replace(/[^\d,.-]/g, "");
    const normalized = onlyNumbers.replace(",", ".");
    return parseFloat(normalized);
  }

 async function handleSubmit(e) {

   const url = modoEdicao
      ? `planos/${plano.id}`
      : `planos`;
    const method = modoEdicao ? "PUT" : "POST";
    const msg = modoEdicao ? "Plano atualizado com sucesso!" : "Plano cadastrado com sucesso!";
    const valorNumerico = formatToDouble(valor);

    e.preventDefault();
    await apiFetch(url, {
      method,
      body: JSON.stringify({titulo, valor:valorNumerico, texto}),
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
          <h2>{modoEdicao ? "Editar plano" : "Cadastrar plano"}</h2>
          
          <form onSubmit={handleSubmit}>
            <div className="campo-container">
              <input
                type="text"
                placeholder="Digite o titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
              />
            </div>
            <div className="campo-container">
              <input
                type="text"
                placeholder="Digite o valor"
                value={valor}
                onChange={(e) => setValor(maskReal(e.target.value))}
                required
              />
            </div>
            <div className="campo-container">
              <textarea 
                rows="5"
                placeholder="Digite o texto"
                value={texto}
                onChange={(e) => setTexto(e.target.value)}
                required
              />
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

export default ModalPlanos;