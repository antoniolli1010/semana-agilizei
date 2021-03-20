/// <reference types ="cypress" />

// cy.viewport
// arquivos de config
//congis por linha de comando

context('Dev Finances Agilizei', () => {

    // hooks
    // trechos que executam antes e depois do teste
    // before -> antes de todos os testes
    // beforeEach -> antes de cada teste
    // after -> depois de todos os testes
    // afterEach -> depois de cada teste

    beforeEach(() => {
        cy.visit('https://devfinance-agilizei.netlify.app/')
        cy.get('#data-table tbody tr').should('have.length', 0)
    });

    it('Cadastrar entradas', () => {
        // - entender o fluxo manualmente
        // - mapear os elementos que vamos interagir
        // - descrever as interações com o cypress
        // - adicionar as asserções que precisamos

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type('Mesada')  // id
        cy.get('[name=amount]').type(12) // atributos
        cy.get('[type=date]').type('2021-03-17') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor
        
        cy.get('#data-table tbody tr').should('have.length', 1)      

    });

    it('Cadastrar saídas', () => {
        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type('Mesada')  // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2021-03-17') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor
        
        cy.get('#data-table tbody tr').should('have.length', 1)
    });

    it('Remover entradas e saídas', () => {
        const entrada = 'Mesada'
        const saida = 'KinderOvo'

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type(entrada)  // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2021-03-17') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor

        cy.get('#transaction .button').click() // id + classe
        cy.get('#description').type(saida)  // id
        cy.get('[name=amount]').type(-12) // atributos
        cy.get('[type=date]').type('2021-03-17') // atributos
        cy.get('button').contains('Salvar').click() // tipo e valor
        
        // estratégia 1: voltar para o elemento pai, e avançar para um td img attr
        cy.get('td.description')
        cy.contains(entrada)
            .parent()
            .find('img[onclick*=remove]')
            .click()

        // estratégia 2: buscar todos os irmãos, e buscar o que tem img + attr
        cy.get('td.description')
            .contains(saida)
            .siblings()
            .children('img[onclick*=remove]')
            .click()

        cy.get('#data-table tbody tr').should('have.length', 0)
    });

});