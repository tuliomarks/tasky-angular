# TaskyAngular

## TechStack
- Angular 15
- Tailwind CSS (para os estilos)
- Angular Material (biblioteca de componentes)
- Marked (com sanitizer nativo angular)

## Rodando a aplicacao FRONTEND

Iniciar a aplicacao backend:
```console
> cd BACK
> npm install
> npm run server
```

Abra um segundo terminal e inicie a aplicacao frontend:
```console
> cd FRONT
> npm install
> npm start (ou ng serve diretamente do CLI)
```

## Melhorias futuras
- Usar Angular drag and drop para movimentacao dos cards entre as pipes;
- Trocar o componente de markdown para um com menos dependencias e com editor incluso.
- Fazer mais testes com todos as definicoes para markdown
- Serviços e interceptors para autenticacao. Gerenciar os erros em caso de falha de comunicacao com a API.
- Estilizar os componentes para responsividade; Deve-se pensar como fica a usabilidade.

## Markdown test
Para testes com markdown pode ser utilizado o exemplo presente no arquivo markdown-sample.md;

## Conclusões 
Foi um projeto interessante de se fazer, ja tinha feito algumas vezes, o que facilitou na estruturacao e codificacao. 
Se possivel avaliem também a versao em React que fiz ano passado, pode ser encontrado nesse link: [https://github.com/tuliomarks/tasky-react](https://github.com/tuliomarks/tasky-react).
O tempo medio para desenvolvimento dessa aplicacao foi de 4-6 horas.
Em caso de duvida, sugestão ou bugs encontrados entre em contato.
