


interface IMediador {
    notificar(remetente: any, evento: string): void;
}


abstract class Componente {
    protected mediador: IMediador;
    constructor(mediador: IMediador) {
        this.mediador = mediador;
    }
}


class NomeComMediator extends Componente {
    public setNome(valor: string): void {
        console.log(`[Nome] Altera valor para: ${valor}`);
        // Apenas diz ao Mediador o que aconteceu
        this.mediador.notificar(this, `NOME_PREENCHIDO:${valor}`); 
    }
}


class EstadoCivilComMediator extends Componente {
    public desabilitar(): void {
        console.log(`[EstadoCivil] Desabilitado pelo MEDIADOR.`);
    }
    public habilitar(): void {
        console.log(`[EstadoCivil] Habilitado pelo MEDIADOR.`);
    }
}



class FormMediator implements IMediador {

    public estadoCivil: EstadoCivilComMediator;
    public nomeCampo?: NomeComMediator;

    constructor(estadoCivil: EstadoCivilComMediator, nomeCampo?: NomeComMediator) {
        this.estadoCivil = estadoCivil;
        this.nomeCampo = nomeCampo;
    }

    public notificar(remetente: any, evento: string): void {
        console.log(`[MEDIADOR] Recebeu evento: ${evento}`);
        
        
        if (remetente instanceof NomeComMediator) {
            
            const [_, valorNome] = evento.split(':'); 
            
            
            if (valorNome.length > 0) {
                this.estadoCivil.habilitar();
            } else {
                this.estadoCivil.desabilitar(); 
            }
        }
    }
}