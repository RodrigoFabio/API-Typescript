

export default class Pet{
    public id: Number;
    public nome: String;
    public especie: String;
    public idade: Number;
    public adotado: Boolean;

    constructor(id: Number, nome: String, especie: String, idade: Number, adotado: Boolean){
        this.id = id;
        this.nome = nome;
        this.especie = especie;
        this.idade =idade;
        this.adotado = adotado;
    }
}