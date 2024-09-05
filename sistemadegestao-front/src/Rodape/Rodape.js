import React from 'react';
import './../CSS/rodape.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <ul className="footer-names">
            <li>Gabriel Gramacho Cantano rm:98166</li>
            <li>Gabriel de Oliveira Araujo rm:550456</li>
            <li>Gustavo Teodoro Gabilan rm:550456</li>
            <li>Kauã Granata Monteiro rm:99472</li>
            <li>Nilton Mikael Palmeira da Silva rm:552442</li>
            
          </ul>
        </div>
        <div className="footer-center">
          <p>&copy; {new Date().getFullYear()} GTX. Todos os direitos reservados.</p>
          <p id='termos'>
            <a href="/termos-de-uso">Termos de Uso</a> | <a href="/politica-de-privacidade">Política de Privacidade</a>
          </p>
        </div>
        <div className="footer-right">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M12 2.5c-5.02 0-9.08 4.06-9.08 9.08 0 4.04 2.62 7.48 6.24 8.69.46.08.63-.2.63-.44 0-.22-.01-.94-.01-1.72-2.54.56-3.08-1.22-3.08-1.22-.42-1.08-1.02-1.37-1.02-1.37-.83-.57.06-.56.06-.56.92.06 1.41 1.03 1.41 1.03.82 1.4 2.15 1.01 2.67.77.08-.59.32-1.01.58-1.24-2.1-.24-4.3-1.05-4.3-4.67 0-1.03.37-1.88.98-2.55-.1-.24-.42-1.23.09-2.56 0 0 .8-.26 2.6 1 .76-.21 1.56-.31 2.36-.31.8 0 1.6.11 2.36.31 1.8-1.26 2.6-1 2.6-1 .51 1.33.19 2.32.1 2.56.62.67.98 1.52.98 2.55 0 3.62-2.21 4.43-4.31 4.67.33.29.63.87.63 1.76 0 1.28-.01 2.31-.01 2.62 0 .24.17.53.63.44 3.62-1.21 6.24-4.66 6.24-8.69 0-5.02-4.06-9.08-9.08-9.08z"/>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
