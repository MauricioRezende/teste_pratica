## Para rodar o projeto

**Iniciando a API**

- Ter Node.js instalado
- Ter MS SQL Server Express instalado
- Definir senha para o usuário "sa" no banco de dados
- Em minha máquina precisei habilidar o protocolo "TCP/IP" para conseguir acessar a base de dados por meio da API. Para habilitar: 
   - No menu iniciar, digite "computador" 
   - Clique com o botão direito sobre "Meu computador" em seguida clique em "Gerenciar" 
   - Na tela que ira abrir, navegue em "Serviços e aplicativo", em "SQL Server Configuration Manager", em "Configuração de Rede do SQL Server" e clique em "Protocolos para SQLEXPRESS" 
   - Nas opções que serão listadas no bloco ao lado, dê dois cliques em "TCP/IP" 
   - Na aba "Protocolo", se a opção "Habilitado" tiver marcado como "Não", altere para "Sim" 
   - Vá para a aba "Endereços IP" 
   - Procure a opção "IPAII", dentro dessa opção há um parametro chamado "Portas TCP Dinâmincas" e à frente está setado a porta, anote essa porta, pois ela será configurada na API 
   - Após salvar o número da porta, clique em "Aplicar" 
   - Será apresentado uma informação dizendo que é necessário reiniciar o serviço do SQLEXPRESS, e essa alteração é necessária 
   - Para alterar reiniciar o serviço, na mesma ferramenta de gerenciamento do computador, navegue em "Serviços e aplicativos" e clique em "Serviços" 
   - Após clicar, no bloco ao lado serão listados os serviços. Digite sql para filtrar os serviços 
   - Localize o serviço "SQL Server (SQLEXPRESS)", clique com o botão direito sobre ele e clique na opção "Reiniciar". Se aparecer uma mensagem de confirmação, clique em "Sim" para confirmar. 
- Crie um banco de dados chamado "API_PRATICA" (esse é o nome que está configurado na API). Com outro nome, apenas será necessário configura-lo na api 
- Na pasta "api", abra a pasta "sql" e abra o arquivo "create.js" 
- Copie o código SQL, e execute-o no banco de dados criado 
- Dentro da pasta "api", abra o arquivo "config.js". Nesse arquivo, defina as configurações de conexão com o SQL SERVER (lembrando que a porta a ser configurada será a localizada nos passos anteriores) 
- Abra o CMD dentro da pasta "api", digite "npm install" e pressione "ENTER" 
- Ainda no CMD, digite "node .\api.js" e pressione "ENTER" \
Feito isso, a API já estará rodando na porta 8090

**Iniciando a aplicação**

- Abra a pasta "web" e dentro da mesma abra o CMD, digite "npm install" e pressione "ENTER" 
- Ainda no CMD, digite "npm start" e pressione "ENTER" \
Feito isso, a aplicação estará rodando na porta 3000
