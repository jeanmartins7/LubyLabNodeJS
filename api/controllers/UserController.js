const database = require('../models');
const puppeteer = require('puppeteer');
const request = require('request');
const cheerio = require('cheerio');




class UserController {
    
    static async buscarTodosUsuarios(req,resp){
        try {
            const  todasOsUsuarios = await database.Users.findAll()
            return resp.status(200).json(todasOsUsuarios)
        }catch (error) {
            return resp.status(500).json(error.message)
        }
    }

    static async buscarUmUsuario(req,resp){
        const { username } = req.params
        

        try {
            const  umUsername = await database.Users.findOne({
                where: {
                    username: username}})

                 return resp.status(200).json(umUsername)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async autenticar(req,resp){
        const { username } = req.body
        console.log(username)
        

        try {//return resp.status(200).json(umUsername)
            const  umUsername = await database.Users.findOne({
                where: {
                    username: username}})
            if (umUsername === null) {
                const browser = await puppeteer.launch({headless: true});
                const page = await browser.newPage();
                const usuarioGithub = username;
                const qualquerUrl = `https://github.com/${usuarioGithub}/`;
                await page.goto(qualquerUrl);
                //await page.screenshot({path: 'example.png'});
    
                const dadosGithub = await page.evaluate(() => {

                        nome= document.querySelector('.p-name.vcard-fullname.d-block.overflow-hidden').innerText
                        email = document.querySelector('.vcard-detail.pt-1.css-truncate.css-truncate-target  a');
                        localizacao =document.querySelector('.p-label')
                        bio = document.querySelector('.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4');
                        console.log(email);

                        if (nome == null) {nome = ''};  
                        if (email == null) {email = ''}else{email = document.querySelector('.vcard-detail.pt-1.css-truncate.css-truncate-target  a').textContent};   
                        if (localizacao == null) {localizacao = ''}else{localizacao = document.querySelector('.p-label').textContent};
                        if (bio == null) {bio = ''}else{bio = document.querySelector('.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4 ').textContent}; 
                          


                    return {
                        nome: nome,
                        email : email,
                        localizacao :localizacao,
                        avatar : document.querySelector('.avatar.avatar-user.width-full.border.bg-white').currentSrc,
                        bio : bio,
                        username: document.querySelector('.p-nickname.vcard-username.d-block').innerText
                    };
                });
                
                await browser.close();
                const novoUserCriado = await database.Users.create(dadosGithub)

                const dadosAutenticados = {
                    username_id: username,
                    data_acesso: new Date()
                }

                const tokenAutenticado = await database.Tokens.create(dadosAutenticados)


                return resp.status(200).json(novoUserCriado)
            } else {
            const dadosAutenticados = {
                username_id: umUsername.username,
                data_acesso: new Date()
            }
            const tokenAutenticado = await database.Tokens.create(dadosAutenticados)
            return resp.status(200).json(umUsername);// true

            }
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }


    static async atualizarUser(req,resp){
        const { username } = req.params
        const novasInfos = req.body
        

        try {
            await database.Users.update(novasInfos,{
                where: {
                    username: username}})
            const userAtualizado =  await database.Users.findOne({
                where: {
                    username: username}})

                 return resp.status(200).json(userAtualizado)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async deletarUser(req,resp){
        const { username } = req.params
            

        try {
            await database.Users.destroy({
                where: {
                    username: username}})
                 return resp.status(200).json({mensagem: `usuário ${username} deletado`})
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async listaFollowers(req,resp){
        const { usernameId } = req.params
        

        try {
            const  todosFollowers = await database.Followers.findAll({
                where: {
                    username_id: usernameId}})

                 return resp.status(200).json(todosFollowers)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }  
    }

    static async listaFollowing(req,resp){
        const { usernameId } = req.params
        

        try {
            const  todosFollowing = await database.Followings.findAll({
                where: {
                    username_id: usernameId}})

                 return resp.status(200).json(todosFollowing)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 
    }

    static async newFollowerUsers(req,resp){
        const { usernameId } = req.params
        const newFollow = {...req.body, username_id:usernameId}

        try {
            const  newFollower = await database.Followers.create(newFollow)

                 return resp.status(200).json(newFollower)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 

    }

    static async buscarFollowers(req,resp){
        const { usernameId, followerId } = req.params
        console.log(followerId)
        

        try {//return resp.status(200).json(umUsername)
            const  followerUser = await database.Users.findOne({
                where: {
                    username: followerId}})
            if (followerUser === null) {
                const browser = await puppeteer.launch({headless: true});
                const page = await browser.newPage();
                const usuarioGithub = followerId;
                const qualquerUrl = `https://github.com/${usuarioGithub}/`;
                await page.goto(qualquerUrl);
                //await page.screenshot({path: 'example.png'});
    
                const dadosGithub = await page.evaluate(() => {
                    return {
                        nome: document.querySelector('.p-name.vcard-fullname.d-block.overflow-hidden').innerText,
                        email : document.querySelector('.u-email.link-gray-dark '),
                        localizacao :document.querySelector('.p-label').textContent,
                        avatar : document.querySelector('.avatar.avatar-user.width-full.border.bg-white').currentSrc,
                        bio : document.querySelector('.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4').innerText,
                        username: document.querySelector('.p-nickname.vcard-username.d-block').innerText
                    };
                });
                
                await browser.close();
                const novoUserCriado = await database.Users.create(dadosGithub)

                return resp.status(200).json(novoUserCriado)
            } else {

            return resp.status(200).json(followerUser);// true

            }
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async newFollowingUser(req,resp){
        const { usernameId } = req.params
        const newFollowingUser = {...req.body, username_id:usernameId}

        try {
            const  newFollowing = await database.Followings.create(newFollowingUser)

                 return resp.status(200).json(newFollowing)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 

    }

    static async unFollowers(req,resp){
        const { usernameId, followerId } = req.params

        try {
            await database.Followers.destroy({
                where: {
                    follower: followerId}})
                 return resp.status(200).json({mensagem: `unfollow ${followerId}`})
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async unFollowing(req,resp){
        const { usernameId, followingId } = req.params

        try {
            await database.Followings.destroy({
                where: {
                    following: followingId}})
                 return resp.status(200).json({mensagem: `unfollow ${followingId}`})
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async buscarFollowing(req,resp){
        const { usernameId, followingId } = req.params
        console.log(followingId)
        

        try {//return resp.status(200).json(umUsername)
            const  followingUser = await database.Users.findOne({
                where: {
                    username: followingId}})
            if (followingUser === null) {
                const browser = await puppeteer.launch({headless: true});
                const page = await browser.newPage();
                const usuarioGithub = followingId;
                const qualquerUrl = `https://github.com/${usuarioGithub}/`;
                await page.goto(qualquerUrl);
                //await page.screenshot({path: 'example.png'});
    
                const dadosGithub = await page.evaluate(() => {
                    return {
                        nome: document.querySelector('.p-name.vcard-fullname.d-block.overflow-hidden').innerText,
                        email : document.querySelector('.u-email.link-gray-dark '),
                        localizacao :document.querySelector('.p-label').textContent,
                        avatar : document.querySelector('.avatar.avatar-user.width-full.border.bg-white').currentSrc,
                        bio : document.querySelector('.p-note.user-profile-bio.mb-3.js-user-profile-bio.f4').innerText,
                        username: document.querySelector('.p-nickname.vcard-username.d-block').innerText
                    };
                });
                
                await browser.close();
                const novoUserCriado = await database.Users.create(dadosGithub)

                return resp.status(200).json(novoUserCriado)
            } else {

            return resp.status(200).json(followingUser);// true

            }
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }


    static async listarRepositorios(req,resp){
        const { usernameId } = req.params
        

        try {
            const  todosFollowing = await database.Repositorios.findAll({
                where: {
                    username_id: usernameId}})

                 return resp.status(200).json(todosFollowing)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 
    }

    static async listarStars(req,resp){
        const { usernameId } = req.params
        

        try {
            const  todosFollowing = await database.Stars.findAll({
                where: {
                    username_id: usernameId}})

                 return resp.status(200).json(todosFollowing)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 
    }

    static async novoSeguidorRepositorio(req,resp){
        const { usernameId } = req.params
        const { nomeId } = req.params
        const seguidorRepositorio = {...req.body, username_id:usernameId,nome_id:nomeId }

        try {
            const  newFollowing = await database.Stars.create(seguidorRepositorio)

                 return resp.status(200).json(newFollowing)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 

    }


    static async newRepositorio(req,resp){
        const { usernameId } = req.params
        const novoRepositorio = {...req.body, username_id:usernameId}

        try {
            const  repositorioCriado = await database.Repositorios.create(novoRepositorio)

                 return resp.status(200).json(repositorioCriado)
        }catch (error) {
            
            return resp.status(500).json(error.message)
        } 

    }

    static async deletarRepositorio(req,resp){
        const { usernameId, ID } = req.params

        try {
            await database.Repositorios.destroy({
                where: {
                    ID: Number(ID)}})
                 return resp.status(200).json({mensagem: `repositório deletado`})
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }

    static async unFollowingRepositorio(req,resp){
        const { usernameId, followingId } = req.params

        try {
            await database.Followings.destroy({
                where: {
                    username_id: usernameId}})
                 return resp.status(200).json({mensagem: `Deixou de seguir o repositorio ${usernameId}`})
        }catch (error) {
            
            return resp.status(500).json(error.message)
        }

    }



}

module.exports = UserController

