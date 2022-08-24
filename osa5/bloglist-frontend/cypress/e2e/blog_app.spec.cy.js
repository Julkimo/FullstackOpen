/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukala',
      username: 'mluukal',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  describe('Login',function() {
    it('Login form is shown', function() {
      cy.contains('Login')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukal')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukal')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() { //log in
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
      const user = {
        name: 'Matti Luukala',
        username: 'mluukal',
        password: 'salainen'
      }
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      cy.visit('http://localhost:3000')
      cy.get('#username').type('mluukal')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Suuri vale! satakielellä onkin vain yksi kieli.')
      cy.get('#author').type('Äly K. Ääpiö')
      cy.get('#url').type('www.vauva.fi')
      cy.get('#create-button').click()
      cy.contains('Suuri vale! satakielellä onkin vain yksi kieli. by Äly K. Ääpiö')
    })

    it('A blog can given a like', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('Suuri vale! satakielellä onkin vain yksi kieli.')
      cy.get('#author').type('Äly K. Ääpiö')
      cy.get('#url').type('www.vauva.fi')
      cy.get('#create-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()
      cy.contains('Likes: 2')
    })
  })
})