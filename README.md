<h1>Patient Manager WebService</h1>

<h2>Descrição</h2>
<p>O <strong>Patient Manager</strong> é um WebService que recebe e gerencia informações de pacientes, incluindo nome, data de nascimento, sexo e um array com as datas das últimas visitas ao médico. O sistema aceita inputs tanto em XML quanto em JSON e armazena essas informações em um banco de dados MongoDB.</p>

<h2>Funcionalidades</h2>
<ul>
  <li><strong>Recebimento de dados em XML/JSON:</strong> O sistema aceita informações de pacientes nos formatos XML e JSON.</li>
  <li><strong>Armazenamento no MongoDB:</strong> As informações são salvas em uma estrutura de banco de dados MongoDB para posterior consulta e gerenciamento.</li>
  <li><strong>Deploy via Docker:</strong> O sistema é montado e gerenciado via Docker, com imagens Dockerfile separadas para o front-end, back-end e banco de dados, facilitando a implantação e o gerenciamento de ambientes.</li>
</ul>

<h2>Tecnologias Utilizadas</h2>
<ul>
  <li><strong>Front-end:</strong> Desenvolvido com <a href="https://nextjs.org/">Next.js</a> (versão 14).</li>
  <li><strong>Back-end:</strong> Construído em JavaScript e NODEJS.</li>
  <li><strong>Banco de Dados:</strong> <a href="https://www.mongodb.com/">MongoDB</a>, gerenciado via Docker.</li>
  <li><strong>Docker:</strong> Utilizado para criar e gerenciar os ambientes de front-end, back-end e banco de dados.</li>
</ul>

<h2>Estrutura do Projeto</h2>
<ul>
  <li><strong>patient-info-client:</strong> Contém o código do front-end.</li>
  <li><strong>patient-info-server:</strong> Contém o código do back-end.</li>
  <li><strong>docker-compose.yml:</strong> Arquivo de configuração para orquestrar os containers Docker.</li>
</ul>

<h2>Como Executar o Projeto</h2>

<h3>Pré-requisitos:</h3>
<p>Ter o <a href="https://www.docker.com/">Docker</a> instalado em sua máquina.</p>

<h3>Passos para Execução</h3>
<ol>
  <li>Clone o repositório:
    <pre><code>git clone https://github.com/Diego-Souza-Albuquerque/patient-info.git</code></pre>
  </li>
  <li>Navegue até o diretório do projeto:
    <pre><code>cd patient-info</code></pre>
  </li>
  <li>Execute o Docker Compose para montar o ambiente:
    <pre><code>docker-compose up --build</code></pre>
  </li>
  <li>Acesse o front-end da aplicação em <a href="http://localhost:3000">http://localhost:3000</a>.</li>
</ol>

<h2>Contribuição</h2>
<p>Sinta-se à vontade para contribuir com o projeto. Sugestões de melhorias, correções de bugs e novas funcionalidades são bem-vindas.</p>
