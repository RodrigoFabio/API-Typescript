import PetEntity from "../../Entity/PetEntity";
import Pet from "../../Model/Pet";

export default interface InterfacePetRepository{


    AdicionaPet(pet: Pet): boolean;

    DeletaPet(pet: Pet): Promise<boolean>;

    ObterTodos(skip: number, take:number): Promise<Array<PetEntity>> | null;

    ObterPet(id: number):Promise<PetEntity> | null;

    AtualizaPet(pet: Pet):boolean;
}