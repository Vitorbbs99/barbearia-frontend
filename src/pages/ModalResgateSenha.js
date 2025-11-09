import React, { useState } from 'react';
// Importe seu CSS, que agora pode ser chamado de Modal.css (ou mantenha o nome anterior)
import styles from '../css/modalGeral.module.css'; 
import { motion, AnimatePresence } from "framer-motion";

const ModalResgateSenha = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Lógica simulada de envio
    alert(`Solicitação de recuperação de senha enviada para: ${email}`);
    
    // Limpa o campo e fecha o modal
    setEmail('');
    onClose(); 
  };

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
        <h2>Recuperação de Senha</h2>
        <p>Informe seu e-mail para receber as instruções de resgate.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <br />
          <div className={styles.modal_actions}>
            <button type="submit" className='btn'>
              Enviar
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

export default ModalResgateSenha;