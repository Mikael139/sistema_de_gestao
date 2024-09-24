<h1>GoDigital Code - ERP System</h1>

<p>Este projeto foi desenvolvido como parte do curso da FIAP e é focado na criação de um sistema ERP (Sistema de Gestão Empresarial) utilizando a empresa fictícia <strong>GTX Tecnologia</strong> como caso de estudo. O sistema busca facilitar a gestão de operações e recursos das empresas, oferecendo uma solução eficiente para monitoramento, gestão financeira, controle de estoques, entre outros.</p>

<h2>Descrição do Projeto</h2>

<p>O sistema de ERP foi desenvolvido utilizando um <strong>frontend</strong> em <strong>React.js</strong> e <strong>Node.js</strong>, enquanto o <strong>backend</strong> foi implementado com <strong>Spring Boot</strong>, com foco na segurança do sistema utilizando <strong>Spring Security</strong>. O banco de dados utilizado é o <strong>MySQL</strong>, e a interface de desenvolvimento foi baseada no <strong>Visual Studio Code</strong>, com algumas extensões específicas para Java e Spring Boot.</p>

<h2>Funcionalidades</h2>
<ul>
  <li>Gestão de clientes, fornecedores e funcionários</li>
  <li>Controle de fluxo de caixa e relatórios financeiros</li>
  <li>Monitoramento de inventário e gestão de pedidos</li>
  <li>Autenticação e segurança robusta com <strong>Spring Security</strong></li>
  <li>API para integração de dados e operações</li>
</ul>

<hr>

<h2>Pré-requisitos</h2>

<h3>Frontend</h3>

<ul>
  <li><strong>Node.js</strong> e <strong>npm</strong>: Certifique-se de ter o Node.js e o npm instalados em sua máquina. Para gerenciar diferentes versões do Node.js, recomendamos o uso do <strong>nvm</strong> (Node Version Manager).</li>
</ul>

<p>Instale o nvm:</p>
<pre><code>curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash</code></pre>

<p>Verifique a versão do Node.js:</p>
<pre><code>node -v</code></pre>

<p>Verifique a versão do npm:</p>
<pre><code>npm -v</code></pre>

<h3>Backend</h3>

<ul>
  <li><strong>Java 17</strong>: O backend foi desenvolvido utilizando Java 17, portanto, é importante ter essa versão instalada.</li>
  <li><strong>Visual Studio Code</strong>: As seguintes extensões são recomendadas para o desenvolvimento no VS Code:</li>
  <ul>
    <li><strong>Extension Pack for Java</strong>: Para desenvolvimento Java.</li>
    <li><strong>Spring Boot Extension Pack</strong>: Facilita o desenvolvimento com Spring Boot.</li>
    <li><strong>MySQL</strong>: Para integração com o banco de dados.</li>
    <li><strong>Lombok Annotations Support for VS Code</strong>: Para suporte às anotações Lombok.</li>
  </ul>
</ul>

<p><strong>Por que Lombok?</strong></p>
<p>Utilizamos o Lombok para simplificar o código, reduzindo o número de getters, setters, construtores e métodos equals e hashCode. Isso torna o código mais limpo e fácil de manter.</p>

<h3>Banco de Dados</h3>
<ul>
  <li><strong>MySQL</strong>: Utilizado para armazenar os dados do sistema. Certifique-se de ter o MySQL configurado e rodando.</li>
</ul>

<hr>

<h2>Configuração do Ambiente</h2>

<h3>Frontend</h3>

<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/seu-usuario/seu-repositorio.git</code></pre>
  </li>
  <li>Navegue até a pasta do frontend:
    <pre><code>cd frontend</code></pre>
  </li>
  <li>Instale as dependências do projeto:
    <pre><code>npm install</code></pre>
  </li>
  <li>Para rodar a aplicação em modo de desenvolvimento:
    <pre><code>npm start</code></pre>
  </li>
  <li>Para criar uma build de produção:
    <pre><code>npm run build</code></pre>
  </li>
</ol>

<h3>Backend</h3>

<ol>
  <li>Navegue até a pasta do backend:
    <pre><code>cd backend</code></pre>
  </li>
  <li>Configure o MySQL com as credenciais no arquivo <code>application.properties</code> ou <code>application.yml</code>:
    <pre><code>spring.datasource.url=jdbc:mysql://localhost:3306/seu_banco_de_dados
spring.datasource.username=seu_usuario
spring.datasource.password=sua_senha</code></pre>
  </li>
  <li>Para rodar a aplicação Spring Boot, utilize o comando:
    <pre><code>./mvnw spring-boot:run</code></pre>
  </li>
</ol>

<hr>

<h2>Testes e Requisições</h2>

<p>Para testar os endpoints da API e fazer requisições, recomendamos o uso do <strong>Postman</strong>, que permite simular chamadas HTTP e testar a API de maneira fácil e intuitiva. No entanto, isso fica a critério do desenvolvedor.</p>

<hr>

<h2>Segurança</h2>

<p>Um dos principais diferenciais do projeto é o sistema de segurança robusto utilizando <strong>Spring Security</strong>. Implementamos autenticação e autorização para proteger as rotas e recursos sensíveis do sistema.</p>

<hr>

<h2>Contribuição</h2>

<p>Contribuições são bem-vindas! Se você encontrar algum problema ou tiver sugestões de melhoria, por favor, abra uma issue ou envie um pull request.</p>

<hr>


