# Pernambuco Saneamento Map

buscARPE — MVP Visual e Funcional

Crie um protótipo web funcional chamado buscARPE.

1. Contexto

O buscARPE será futuramente uma aplicação para consulta e visualização geográfica de informações sobre sistemas de saneamento do Estado de Pernambuco.

A ideia é centralizar informações e permitir que o usuário explore os sistemas por meio de um mapa interativo.

Neste momento, estamos construindo apenas um MVP visual e navegável para demonstração.

Os dados devem ser fictícios/mockados.

Não implemente backend, autenticação ou banco de dados nesta etapa.

2. Referência visual

As imagens anexadas mostram a aplicação GeoPE.

Use a GeoPE como referência de UX e organização da interface, especialmente:

mapa ocupando a maior parte da tela;

barra superior;

botão de filtros;

campo de busca;

painel lateral de filtros;

marcadores no mapa;

painel de informações sobre o item selecionado;

organização das informações em abas.

Não copie a identidade visual ou o layout exatamente.

O buscARPE deve ter identidade própria, com aparência:

moderna;

minimalista;

profissional;

institucional;

limpa;

orientada a dados;

com o mapa como elemento principal.

3. Objetivo do MVP

O usuário deve conseguir realizar este fluxo:

Abrir o buscARPE → visualizar o mapa de Pernambuco → visualizar sistemas fictícios → pesquisar/filtrar → clicar em um sistema → visualizar seus dados.

Esse fluxo é a prioridade máxima.

Não adicione funcionalidades complexas que não sejam necessárias para esse fluxo.

4. Tela principal

A aplicação deve ter uma única tela principal.

O mapa deve ocupar praticamente toda a área disponível.

Barra superior

Criar uma barra superior discreta contendo:

À esquerda:

nome/logo textual "buscARPE"

Centro:

botão "Filtros"

campo de busca com placeholder "Buscar município ou sistema..."

À direita:

botão "Limpar"

A barra deve ser compacta e não ocupar espaço excessivo do mapa.

5. Mapa

Utilize Leaflet para o mapa.

Centralize inicialmente o mapa em Pernambuco.

Utilize OpenStreetMap como mapa base.

Exiba aproximadamente 10–15 sistemas fictícios distribuídos pelo território de Pernambuco.

Cada sistema deve possuir:

latitude;

longitude;

nome;

município;

tipo;

situação.

Utilize marcadores visualmente simples.

Os marcadores devem ser clicáveis.

Ao clicar em um marcador, abra o painel de detalhes do sistema.

Não é necessário implementar clustering complexo neste MVP.

6. Indicador de quantidade

No canto superior direito do mapa, exiba um pequeno card:

15

Sistemas cadastrados

O número pode corresponder à quantidade de sistemas mockados.

O componente deve ter aparência discreta e moderna.

7. Controles do mapa

Adicionar controles básicos do Leaflet:

zoom;

localização/recentralização, se simples de implementar.

Não é necessário implementar funcionalidades avançadas de mapas.

8. Busca

O campo de busca deve permitir pesquisar os sistemas fictícios.

A busca deve funcionar pelo menos por:

nome do sistema;

município.

Exemplo:

Buscar:

Petrolina

deve mostrar apenas os sistemas relacionados a Petrolina.

Caso não existam resultados, mostrar uma mensagem simples:

"Nenhum sistema encontrado."

O botão Limpar deve restaurar todos os sistemas e limpar a busca/filtros.

9. Painel de filtros

Ao clicar em Filtros, abrir um painel lateral.

O painel deve conter somente filtros necessários para o MVP:

Município

Dropdown com os municípios disponíveis nos dados mockados.

Tipo de sistema

Opções:

Todos

SAA

SES

Situação

Opções:

Todas

Ativo

Inativo

Na parte inferior:

Aplicar filtros

Os filtros devem alterar os sistemas exibidos no mapa.

Também deve ser possível fechar o painel sem aplicar alterações.

Não criar dezenas de filtros neste MVP.

10. Painel de detalhes do sistema

Ao clicar em um marcador, abrir um painel/modal sobre o mapa.

O mapa deve continuar parcialmente visível ao fundo.

O painel deve ser elegante, compacto e fácil de ler.

No cabeçalho:

Nome do sistema

Abaixo:

Código: SAA-001

Criar três abas:

Aba 1 — Visão geral

Mostrar:

Identificação

Nome do sistema

Município

Código/ID

Classificação

Tipo: SAA / SES

Situação

Localização

Latitude

Longitude

Endereço/localidade

Aba 2 — Informações

Mostrar:

Informações complementares

Capacidade

Observações

Utilize informações fictícias coerentes.

Aba 3 — Documentos

Mostrar uma lista simples de documentos fictícios relacionados ao sistema.

Exemplo:

Relatório de inspeção

Projeto do sistema

Documento operacional

Cada documento pode possuir um pequeno ícone.

Não é necessário implementar download real.

11. Dados mockados

Crie aproximadamente 15 sistemas fictícios.

Distribua-os por diferentes municípios de Pernambuco.

Use municípios conhecidos, por exemplo:

Recife

Olinda

Jaboatão dos Guararapes

Caruaru

Petrolina

Garanhuns

Serra Talhada

Arcoverde

Salgueiro

Goiana

Os dados não precisam representar informações reais.

Deixe explícito no código que são dados de demonstração/mockados.

Cada sistema deve possuir uma estrutura consistente, por exemplo:

id
nome
municipio
tipo
situacao
latitude
longitude
endereco
capacidade
observacoes
documentos


12. Design

Criar uma interface visualmente semelhante em conceito à GeoPE, mas com identidade própria.

Diretrizes:

visual minimalista;

fundo limpo;

poucos elementos sobrepostos;

mapa como protagonista;

cards com bordas arredondadas moderadas;

sombras suaves;

boa hierarquia tipográfica;

espaçamento consistente;

ícones simples;

aparência profissional/institucional.

Utilize uma paleta baseada em azul como cor principal, mas evite simplesmente reproduzir o azul da GeoPE.

Use cores de destaque com moderação.

Evite:

gradientes exagerados;

excesso de cards;

dashboards complexos;

animações desnecessárias;

excesso de texto;

elementos decorativos que não tenham função.

13. Responsividade

A aplicação deve funcionar razoavelmente em:

desktop;

tablet;

celular.

No celular:

a barra superior deve se adaptar;

o painel de filtros deve ocupar uma área adequada;

o painel de detalhes deve ser responsivo;

o mapa deve continuar sendo o elemento principal.

Não é necessário criar uma experiência mobile complexa neste MVP.

14. Estrutura do frontend

Mesmo sendo apenas um protótipo, organize o código de maneira razoavelmente modular.

Separe pelo menos:

componente do mapa;

componente da barra superior;

componente de filtros;

componente do painel de detalhes;

dados mockados;

tipos/interfaces dos sistemas.

Evite colocar toda a aplicação em um único componente.

Os dados mockados devem ficar separados da lógica visual.

15. Preparação para evolução

Este protótipo futuramente será transformado em uma aplicação real.

A arquitetura futura será aproximadamente:

Frontend
→ API REST Node.js
→ camada de serviços
→ camada de acesso a dados
→ PostgreSQL

Portanto:

não implemente backend agora;

não implemente PostgreSQL agora;

não implemente autenticação agora;

não implemente APIs externas agora.

Entretanto, organize os dados e componentes de forma que seja possível substituir posteriormente os dados mockados por dados vindos de uma API REST.

16. O que NÃO implementar

Para manter o MVP simples e rápido, NÃO implementar:

login;

autenticação;

autorização;

backend;

PostgreSQL;

APIs externas;

upload de arquivos;

download real de documentos;

administração;

relatórios;

gráficos complexos;

edição de sistemas;

cadastro de usuários;

integrações externas;

funcionalidades avançadas de GIS.

17. Critério de sucesso

Considere o MVP concluído quando for possível demonstrar:

Abrir o buscARPE.

Visualizar Pernambuco no mapa.

Visualizar sistemas fictícios no mapa.

Pesquisar por município ou sistema.

Abrir o painel de filtros.

Filtrar por município, tipo e situação.

Clicar em um sistema.

Visualizar suas informações.

Navegar entre Visão geral, Informações e Documentos.

Limpar os filtros e voltar à visualização inicial.

Priorize funcionalidade e simplicidade em vez de adicionar funcionalidades extras.

Se houver conflito entre adicionar uma funcionalidade e manter o MVP simples, prefira manter o MVP simples.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://buscarpe.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/12da2aa3-6663-4f3d-abe1-203fd1e0be02).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
