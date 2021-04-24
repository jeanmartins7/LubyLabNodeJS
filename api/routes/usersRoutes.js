const { Router } = require('express')
const UserController = require('../controllers/UserController')

const router = Router();
//lista todos usuários
router.get('/users', UserController.buscarTodosUsuarios);

//Busca usuário no bd, caso esteja cadastrado ele autentica, se não, buscar informações no github e autentica 
router.post('/users', UserController.autenticar);

//Atualizar um usuário
router.put('/users/:username', UserController.atualizarUser);

//Deletar um usuário
router.delete('/users/:username', UserController.deletarUser);

//lista todos os followers de um usuários
router.get('/users/:usernameId/follower', UserController.listaFollowers);

//abrir seguidor
router.get('/users/:usernameId/follower/:followerId', UserController.buscarFollowers);

//Seguindo novo user
router.post('/users/:usernameId/follower', UserController.newFollowerUsers);

//perdeu seguidor
router.delete('/users/:usernameId/follower/:followerId', UserController.unFollowers);


//lista todos os following de um usuários
router.get('/users/:usernameId/following', UserController.listaFollowing);

//abrir seguido 
router.get('/users/:usernameId/following/:followingId', UserController.buscarFollowing);

//seguindo novo User
router.post('/users/:usernameId/following', UserController.newFollowingUser);

//Deixando de seguir User
router.delete('/users/:usernameId/following/:followingId', UserController.unFollowing);

//listar repositórios
router.get('/users/:usernameId/repositorios', UserController.listarRepositorios);
//listar seguidores repositórios
router.get('/users/:usernameId/repositorios/stars', UserController.listarStars);

//novo repositório
router.post('/users/:usernameId/repositorios', UserController.newRepositorio);

//deletando repositorio
router.delete('/users/:usernameId/repositorio/:ID', UserController.deletarRepositorio);

//novo repositório
router.post('/users/:usernameId/repositorios/stars', UserController.novoSeguidorRepositorio);

//deletando repositorio
router.delete('/users/:usernameId/repositorio/stars/:userID', UserController.unFollowingRepositorio);











module.exports = router