import { Request,Response } from "express"; 
import Pet from "../Model/Pet";
import EnumEspecies from "../Enum/Especies";
import InterfacePetRepository from "../Repository/Interface/InterfacePetRepository";
import PetRepository from "../Repository/PetRepository";
import PetEntity from "../Entity/PetEntity";

let id = 0;
function geraId(){
    id = id + 1
    return id
}
       
export default class PetController{

    constructor(private repository: PetRepository){this.repository = repository}
    async criaPet(req: Request, res: Response){
        const {nome, especie, dataNasc, adotado} = <PetEntity>req.body;
        if(!Object.values(EnumEspecies).includes(especie)){
            return res.status(404).json({message:"Espécie inválida"});
        }
        let id = geraId()
        const novoPet = new PetEntity(id, nome, especie, dataNasc, adotado);
        let adicionado = await this.repository.AdicionaPet(novoPet)
        if(adicionado){
           return res.status(201).json(novoPet)
        }

        return res.status(500)
    }

    async obterTodosPets(req: Request, res: Response, skip:number, take:number){
        let resultado = await this.repository.ObterTodos(skip, take)
        if(resultado != null){
            return res.status(200).json(resultado) 
        }
        return res.status(404).json({message: "lista de pets vazia"})
    }

   async obterPet(req: Request, res: Response){
       const id = req.body.id
       let pet = await this.repository.ObterPet(parseInt(id))
       if(pet != null){
        return res.status(200).json(pet)
       }
       return res.status(404).json({message: "pet não existe"})
    }

    async atualizaPet(req: Request, res: Response){
        const {id, nome, especie, dataNasc, adotado} = <Pet>req.body;
        const pet = await this.repository.ObterPet(id)  

        if(!pet){
            return res.status(404)
        }

        pet.nome = nome;
        pet.dataNasc = dataNasc;
        pet.especie = especie;
        pet.adotado = adotado;

        await this.repository.AtualizaPet(pet)
        res.status(201)
    }

    async deletaPet(req:Request, res: Response){
        const id = parseInt(req.body.id);
        let pet = await this.repository.ObterPet(id);
        if(pet != null){
            let resultado = await this.repository.DeletaPet(pet)
            if(resultado){
                return res.status(200).json({message:"pet deletado"})
            }
        }else{
            return res.status(404).json({message:"pet não encontrado"})
        }
        
    }

}