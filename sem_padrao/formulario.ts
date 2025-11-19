class CampoTextoNomeSemMediator {
    private nome: string = "";
    // Referência direta com o Estado Civil
    private estadoCivil: CaixaSelecaoEstadoCivilSemMediator; 

    constructor(estadoCivil: CaixaSelecaoEstadoCivilSemMediator) {
        // o campo de estado civil depende do campo de nome
        this.estadoCivil = estadoCivil; 
    }
    public setNome(novoNome: string): void {
        this.nome = novoNome;
        console.log(`[Nome] Valor alterado para: ${novoNome}`);
        
        // O Campo de Nome decide o que o Estado Civil faz
        if (this.nome.length > 0) {
            this.estadoCivil.habilitar();
        } else {
            this.estadoCivil.desabilitar();
        }
    }
}class CaixaSelecaoEstadoCivilSemMediator {
    private habilitado: boolean = false;
    constructor() {
        console.log(`[EstadoCivil] Inicializado. Habilitado: ${this.habilitado}`);
    }
    public desabilitar(): void {
        this.habilitado = false;
        console.log(`[EstadoCivil] Desabilitado pelo Campo de Nome.`);
    }
    public habilitar(): void {
        this.habilitado = true;
        console.log(`[EstadoCivil] Habilitado pelo Campo de Nome.`);
    } // Se a classe CaixaSelecao for usada em outro formulário onde não depende do Nome,
    // a campotextonome teria que ser excluida ou modificada
}


const estadoCivilSem = new CaixaSelecaoEstadoCivilSemMediator();
const nomeSem = new CampoTextoNomeSemMediator(estadoCivilSem); // Injeção da dependência

nomeSem.setNome(""); 
nomeSem.setNome("João"); 