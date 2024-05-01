import { Request,Response } from "express"; 
import Pet from "../Model/Pet";

let listaPets: Array<Pet>= [];
export default class PetController{

    criaPet(req: Request, res: Response){
        //convert o body da requisição em um Pet
        const {id, nome, especie, idade, adotado} = <Pet>req.body;
        let novoPet = new Pet(id, nome, especie, idade, adotado);
        listaPets.push(novoPet)
        res.status(201).json(novoPet)
    }

    obterTodosPets(req: Request, res: Response){
        let listaJson = JSON.stringify(listaPets)
        res.send(listaJson)
    }

    obterPet(req: Request, res: Response){
        listaPets.forEach(pet => {
            if(pet.id == req.body){
                res.send(pet)
                return;
            }
        })
    }

    

}