import express from 'express';
import PetController from '../Controller/PetController';
import PetRepository from '../Repository/PetRepository';
import { DataSource, Repository } from 'typeorm';
import { AppDataSource } from '../Config/DataSource';

const router = express.Router();



// Passe o repositório para o construtor do PetRepository
const petRepository = new PetRepository(AppDataSource.getRepository("PetEntity"));
const petController = new PetController(petRepository);

router.post('/', petController.criaPet);
router.get('/obtertodos', petController.obterTodosPets);
router.get('/obterpet', petController.obterPet);

export default router;