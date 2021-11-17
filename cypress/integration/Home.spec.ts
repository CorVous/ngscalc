describe('Sim Homepage', () => {
  it('Visits homepage', () => {
    cy.visit('http://localhost:3000')
  })
  
  it('Shows the weapon options AFTER class is selected', () => {
    cy.visit('http://localhost:3000')

    cy.contains(/weapon/i).should('not.exist')
    cy.contains(/class/i).click()
    cy.contains(/bouncer/i).click()
    cy.contains(/weapon/i).should('exist')
  })
})
