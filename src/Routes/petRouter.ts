import express from 'express';
import PetController from '../Controller/PetController';

const router = express.Router();

const petController = new PetController();

router.post('/', petController.criaPet);
router.get('/obtertodos', petController.obterTodosPets);
router.get('/obterpet', petController.obterPet);

export default router;