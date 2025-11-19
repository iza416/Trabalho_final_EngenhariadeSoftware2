# 📚 Trabalho Final: Padrão de Projeto Mediator (Mediador)

Este repositório faz parte do trabalho final da disciplina de Engenharia de Software 2 e tem como objetivo estudar e demonstrar a aplicação prática de um dos padrões de projeto comportamentais: o **Mediator (Mediador)**.

O objetivo do Mediator é **reduzir o acoplamento** e o emaranhado de comunicação entre vários objetos, centralizando a lógica de interação em um único objeto coordenador.

---

## 🧭 O Padrão Mediator

O Mediator atua como um **centro de controle** que gerencia como um grupo de objetos se comunica e reage às ações uns dos outros.

### Analogia do Mundo Real:

Pense em um aeroporto onde há diversos aviões (A, B, C...) prontos para pousar.

* **🚫 SEM o Padrão Mediator:** Cada piloto (Componente) teria que se comunicar diretamente com todos os outros pilotos (B, C, D...) para evitar colisões. Isso gera **Alto Acoplamento**, caos na comunicação e exige que cada piloto entenda as regras de todos os outros.
* **✅ COM o Padrão Mediator:** Todos os pilotos entram em contato **apenas com a Torre de Controle** (o Mediator). A Torre gerencia e informa o que cada avião deve fazer e onde pousar. O Avião A não precisa saber sobre o Avião B, o que garante **Baixo Acoplamento**.

---

## 💻 Estrutura e Demonstração do Código

O código demonstra a interação de um formulário com dois componentes: **Campo de Nome** e **Caixa de Seleção de Estado Civil**. A regra de negócio é: *O Estado Civil só é habilitado se o Nome estiver preenchido.*

### 1. 📂 `formulario.ts` (O Problema: Sem Mediator)

Este arquivo ilustra o problema do **Alto Acoplamento**:

| Classe | Detalhe | Acoplamento |
| :--- | :--- | :--- |
| `CampoTextoNomeSemMediator` | Contém a regra de negócio (`if (this.nome.length > 0)`) e chama diretamente o método (`habilitar()`) da outra classe. | **Depende** diretamente da classe `CaixaSelecaoEstadoCivilSemMediator`. |
| `CaixaSelecaoEstadoCivilSemMediator` | Está rígida e espera ser controlada **pelo Campo de Nome**. 

### 2. 📂 `formulario_com_padrao.ts` (A Solução: Com Mediator)

Este arquivo aplica o padrão, utilizando as seguintes classes principais:

| Classe | Papel no Padrão | Lógica |
| :--- | :--- | :--- |
| **`IFormMediator`** | Interface do Mediator | Define o canal de comunicação: `notificar()`. |
| **`FormMediator`** | Mediator Concreto | **Centraliza a Regra de Negócio** (`if (valorNome.length > 0)`). É a única classe que decide a interação entre Nome e Estado Civil. |
| **`NomeComMediator`** | Colega (Acionador) | Apenas chama `this.mediador.notificar()`. **Não sabe nada** sobre o Estado Civil. |
| **`EstadoCivilComMediator`** | Colega (Receptor) | Apenas possui os métodos `habilitar`/`desabilitar`, que são chamados **pelo Mediator**. |

---

## ⚖️ Análise: Prós e Contras

### 👍 Vantagens (Prós)


| **Organiza a Conversa:** Toda a comunicação é centralizada no Mediator. 
| **Deixa as Peças Independentes:** O código do Nome e do Estado Civil não se tocam. 
| **Permite Reuso Fácil:** Podemos usar o componente de Estado Civil em qualquer outro formulário. 
| **Fácil de Expandir:** Adicionar novas regras ou componentes só exige mexer no Mediator.

### 👎 Desvantagens (Contras)


| **Pode Virar algo "monstruoso":** Com muitas regras, o Mediator pode ficar gigante e confuso. 
