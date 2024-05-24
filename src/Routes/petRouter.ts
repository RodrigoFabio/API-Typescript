import express from 'express';
import PetController from '../Controller/PetController';
import PetRepository from '../Repository/PetRepository';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../Config/DataSource';

const router = express.Router();

// Passe o repositório para o construtor do PetRepository
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"));
const petController = new PetController(petRepository);

router.post('/', (req, res)=>petController.criaPet(req,res));
router.get('/obtertodos', async (req, res)=> {
    const skip = parseInt(req.query.skip as string, 10) || 0;
    const take = parseInt(req.query.take as string, 10) || 10;
    console.log("CHEGOU AQUI")
    await petController.obterTodosPets(req,res, skip, take);
});
router.get('/obterpet',async (req, res)=>await petController.obterPet(req,res));
router.post('/deletapet', async (req, res)=>{await petController.deletaPet(req, res)})
export default router;