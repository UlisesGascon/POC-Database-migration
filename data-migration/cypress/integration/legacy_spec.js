describe('The legacy platform: General', () => {
  it('Render the website', () => {
      cy.visitLegacyPage('/quotes')
  })
})

describe('The legacy platform: Data', () => {
  it('Should have the same data in the UI as in database', () => {

      cy.visitLegacyPage('/quotes')

      cy.task('legacyQuotes').then(data => {
          cy.get('ul')
          .find('>li')
          .should('have.length', data.length)
          .each(($el, index) => {
            const storedQuote = data[index]
            const storedQuoteId = storedQuote._id.toString(); //Mongo transformation
            cy.get($el).should('have.id', storedQuoteId)
            cy.get($el).invoke('text')
            .should('include', storedQuote.quote)
            .should('include', storedQuote.author)
          })
      })
  })
})
