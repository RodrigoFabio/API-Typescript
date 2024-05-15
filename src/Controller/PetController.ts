import { Request,Response } from "express"; 
import Pet from "../Model/Pet";
import EnumEspecies from "../Enum/Especies";
import InterfacePetRepository from "../Repository/Interface/InterfacePetRepository";
import PetRepository from "../Repository/PetRepository";

let listaPets: Array<Pet>= [];
let interfacePet : InterfacePetRepository;
function geraId(lista: Array<Pet>){
    let tamanhoArray = lista.length;
    return tamanhoArray;
}

export default class PetController{
    constructor(private repository: PetRepository){

    }
    criaPet(req: Request, res: Response){
        //convert o body da requisição em um Pet
        const {nome, especie, dataNasc, adotado} = <Pet>req.body;
        if(!Object.values(EnumEspecies).includes(especie)){
            return res.status(404).json({message:"Espécie inválida"});
        }
        let id = geraId(listaPets)
        const novoPet = new Pet(id, nome, especie, dataNasc, adotado);
        let adicionado = this.repository.AdicionaPet(novoPet)
        if(adicionado){
           return res.status(201).json(novoPet)
        }

        return res.status(500)
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

    atualizaPet(req: Request, res: Response){
        //convert o body da requisição em um Pet
        const {id, nome, especie, dataNasc, adotado} = <Pet>req.body;
        const pet = listaPets.find((pet)=> pet.id === Number(id))  

        if(!pet){
            return res.status(404)
        }
            
        pet.nome = nome;
        pet.dataNasc = dataNasc;
        pet.especie = especie;
        pet.adotado = adotado;

        res.status(201)
    }

    deletaPet(req:Request, res: Response){
        const id = Number(req.body);
        const pet = listaPets.find((pet)=>{pet.id === id})
        if(!pet){
            res.statusMessage = "Pet não encontrado";
            return res.status(401)
        }
        const index = listaPets.indexOf(pet)

        listaPets.splice(index, 1);
        return res.status(201)
        
    }

}