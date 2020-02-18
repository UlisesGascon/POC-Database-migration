describe('The new platform: General', () => {
  it('Render the website', () => {
    cy.visitActualPage()
  })

  it('Render the API', () => {
    cy.visitActualApi('/quotes')
  })
})

describe('The new platform: Data', () => {
  it('Should have the same data in as the legacy platform', () => {
    cy.visitActualPage()
    cy.task('legacyQuotes').then(data => {
      cy.get('ul')
      .find('>li')
      .should('have.length', data.length)
      .each(($el, index) => {
        const storedQuote = data[index]
        const storedQuoteId = storedQuote._id.toString(); //Mongo transformation
        cy.get($el)
        .should('have.attr', 'legacy_id').and('eq', storedQuoteId)
        cy.get($el).invoke('text')
        .should('include', storedQuote.quote)
        .should('include', storedQuote.author)
      })
    })
  })
})