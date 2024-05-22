import { Repository } from "typeorm";
import Pet from "../Model/Pet";
import InterfacePetRepository from "./Interface/InterfacePetRepository";
import PetEntity from "../Entity/PetEntity";

export default class PetRepository implements InterfacePetRepository{
   private repository: Repository<PetEntity>;

    constructor(repository: Repository<PetEntity>){
        this.repository = repository;
    }

    AdicionaPet(pet: PetEntity):boolean{
       try{    
        this.repository.save(pet)
        return true
       }
        catch{
            return false
        }
    }

    async DeletaPet(pet: PetEntity): Promise<boolean>{
        try{
            await this.repository.delete(pet)
            return true
           }
            catch{
                return false
            }
    }

     async ObterTodos(skip: number = 0, take:number = 10):Promise<Array<PetEntity>>{     
        try{
            return await this.repository.find({skip, take})           
           }        
        catch{
            return null
        }
    }

    async ObterPet(id: number):Promise<PetEntity> { 
        
        let pet = await this.repository.findOneBy({id:id})
        return pet  
    }

    AtualizaPet(pet: PetEntity):boolean{
        try{
            this.repository.save(pet)
            return true
           }
            catch{
                return false
            }
    }
}