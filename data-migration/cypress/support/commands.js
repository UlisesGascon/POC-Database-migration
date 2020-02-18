const { urls } = require('../../config')

Cypress.Commands.add('visitLegacyPage', (path = '/', config = {}) => {
    cy.visit(`${urls.oldBaseUrl}${path}`, config)
})

Cypress.Commands.add('visitActualPage', (path = '/', config = {}) => {
    cy.visit(`${urls.newBaseUrl}${path}`, config)
})

Cypress.Commands.add('visitActualApi', (path = '/', config = {}) => {
    cy.request(`${urls.newBaseUrl}/api/v1${path}`, config)
})
