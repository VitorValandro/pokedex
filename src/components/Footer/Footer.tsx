import React from 'react';

import './Footer.css';

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-content">
        <img src="https://github.com/VitorValandro.png" alt='' />
        <div>
          <h3>Desenvolvido por</h3>
          <h2>Vitor Valandro</h2>
          <span>
            Me diverti bastante com o teste, apesar de ser uma página relativamente simples
            me esforcei pra manter o projeto o mais estruturado e escalável possível.
            Não fiz as coisas do jeito mais simples, mas do jeito que eu programaria
            uma tela em um projeto real. Boa parte do meu conhecimento técnico
            está aplicado aqui, então acho que é uma avaliação justa.
            Visite o <a href="#">repositório no Github</a> para saber mais.
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;