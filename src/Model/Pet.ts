import EnumEspecies from "../Enum/Especies";

export default class Pet{
    public id: number;
    public nome: string;
    public especie: EnumEspecies;
    public dataNasc: Date;
    public adotado: boolean;

    constructor(id: number, nome: string, especie: EnumEspecies, dataNasc: Date, adotado: boolean){
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.dataNasc =dataNasc;
        this.adotado = adotado;
    }
}