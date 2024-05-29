# App

GymPass Style app

## RFs (Requisitos funcionais)

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar
- [x] Deve ser possível obter o perfil de um usuário logado
- [x] Deve ser possível obter o número de checkins realizados pelo usuário logado
- [x] Deve ser possível o usuário obter seu histórico de checkin
- [x] Deve ser possível o usuário buscar academias próximas até 10 kms
- [x] Deve ser possível o usuário buscar academias pelo nome
- [x] Deve ser possível o usuário realizar chekin em uma academia
- [ ] Deve ser possível validar o checkin de um usuário
- [x] Deve ser possível cadastrar uma academia

## RNs (Regras de negócio)

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado
- [x] O usuário não pode fazer 2 checkins no mesmo dia
- [x] O usuário não pode fazer checkin se não estiver perto (100m) da academia
- [ ] O checkin só pode ser validado até 20 mins após criado
- [ ] O checkin só pode ser validado por administradores
- [ ] A academia só pode ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

- [x] A senha do usuário precisa estar criptografada
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL
- [x] Todas as listas de dados precisam estar paginadas com 20 itens por página
- [ ] O usuário deve ser identificado por um JWT (JSON WEb Token)