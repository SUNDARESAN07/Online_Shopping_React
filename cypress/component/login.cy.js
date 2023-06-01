import Login from '../../src/pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';


describe('login.cy.js', () => {
  it('login', () => {

    cy.mount(
      <Router>
        <Login />
      </Router>
    );
    cy.get('input[test=id]').type( 101)
      .should('have.value', 101)
    cy.get('input[test=email]').type('sam@gmail.com')
      .should('have.value', 'sam@gmail.com')
    cy.get('input[test=password]').type('sam12')
      .should('have.value', 'sam12')
    cy.get('button[data-cy=signin]').click();


  })
})