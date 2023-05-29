# Desafio front-end ReactJS

O intuito deste desafio é avaliar seus conhecimentos técnicos em **ReactJS**.

O desafio consiste em utilizar a API [pokeapi v2](https://pokeapi.co/docsv2/#) para construção de uma Pokédex.

O desenvolvimento deverá ser feito por você. O tempo máximo para entrega é de **3 dias**.

## Instruções de entrega do desafio

1. Primeiro, faça um fork deste projeto para a sua conta no Github (crie uma se você não possuir).
2. Em seguida, implemente o projeto em seu clone local, como descrito abaixo.
3. Ao finalizar o desafio, submeta um pull request e nos informe no e-mail que foi finalizado.

## Requisitos

- O código precisa ser executado em container Docker e não é necessário configurar em docker-compose, mas se estiver será um diverencial.
- Para executar o seu código, deve ser preciso apenas seguir os comandos:
```bash
	$ git clone \$seu-fork
	$ cd \$seu-fork
	$ comando para executar o docker
```
- Crie uma documentação explicando como executar sua aplicação, teste e outras informações que você acha relevante.

## Descrição do projeto

Com a API [pokeapi v2](https://pokeapi.co/docsv2/#), precisamos que você crie uma interface WEB para exibir as informações dos pokémons capturados.

**Sua aplicação DEVE:**

1. Ter um filtro para buscar os pokémons por nome ou número
2. Adicionar ou capturar, como preferir, novos pokémons na Pokédex, que a princípio estará vazia
3. Listar os pokémons que foram adicionados na Pokédex
4. Mostrar detalhes do personagem adicionados na Pokédex, como:
    - Nome
    - Imagem do Pokémon
	- Opção do usuário fazer upload de sua própria imagem, substituindo a que é entregue via API
    - Peso
    - Tamanho
    - Lista de tipos
    - Lista de habilidades
    - Estatísticas de velocidade
    - Defesa
    - Ataque
    - Hp
    - Cada passo de sua evolução
    - Ao clicar em um item da lista de tipos, mostrar todos os pokémons daquele mesmo tipo, inclusive os que ainda não estão adicionados na Pokédex
    - Ao clicar em um item da lista de habilidades mostrar o `short_effect` da mesma
5. Excluir os pokémons que foram adicionados na Pokédex

> **Dicas:**
> 1. Você encontrará as imagens dos pokémons nos blocos sprites e versions da API;
> 2. Você pode utilizar o localStorage para armazenamento.

**Sua aplicação web NÃO PRECISA:**

1. Lidar com autenticação ou autorização (pontos extras se ela fizer);
2. Não precisa estar hospedada em nenhum servidor;
3. Lidar com APIs que não seja a recomendada pelo desafio;
4. Ser escrita usando algum framework específico (mas não há nada de errado em usá-los também, use o que achar melhor).

## Tecnologias que devem estar presentes no desafio

- React
- Redux
- React Testing Library

**Não necessário, mas se tiver será um diferencial**

- Redux-saga

## Avaliação

Seu projeto será avaliado de acordo com os seguintes critérios:

1. Sua aplicação preenche os requerimentos básicos?
2. Você documentou a maneira de configurar o ambiente e executar sua aplicação?
3. Você seguiu as instruções de envio do desafio?
4. Qualidade e cobertura dos testes unitários.
5. Ter uma aparência bonita

---

### Boa sorte!
