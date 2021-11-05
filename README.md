# Game Multiplayer

## Conceitos praticos

- ✅ Aplicamos o command pattern para separar os movimentos do player da classe de jogo
- ✅ Aplicamos o princípio OpenClosed para adicionar novas formas de mover o player sem mexer alterar o código que move o player

## Roadmap

**PlayerMovement**

- ✅ Permitir utilizar teclas a,s,d,w para mover o player
- ✅ Utilizar botões na tela para mover o player

- ✅ Configurar TypeScript
- ✅ Utilizar workspaces para arquitetura de módulos separados (wep-app, server)
- ✅ Refactorar wep-app/src/index.ts (mover código para arquivos)
- Ver talk sobre clean architecture.
- Separar arquivos web-app em infrastructure, ui e game-logic
  - O módulo ui é resposável pela renderização do game
  - O módulo infrastructure é responsável pela implementação concreta das regras de negócio definidos no game-logic
  - O módulo game-logic é responsável pelas regras de negócio do game e todas as outras camadas devem depender dela.
    O game-logic jamais deve depender da ui ou da infra.
- [ ] Quando um player cair num buraco ele deve aparecer um popup que trava o jogo.
