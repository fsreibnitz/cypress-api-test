class Requests {
	getPing(){
		return cy.request({
			method: 'GET',
			url: 'ping'
		})
	}

	getBooking(){
		return 	cy.request({
			method: 'GET',
			url: 'booking/2'
		})
	}

	postBooking(){
		return 	cy.request({
			method: 'POST',
			url: 'booking',
			body: {
					"firstname" : "Jim",
					"lastname" : "Brown",
					"totalprice" : 111,
					"depositpaid" : true,
					"bookingdates" : {
							"checkin" : "2020-01-01",
							"checkout" : "2020-01-02"
					},
					"additionalneeds" : "Breakfast"
			
			}
		})
	}
	updateBookingWithoutToken(response){
		const id = response.body.bookingid
		return 	cy.request({
			method: 'PUT',
			url: `booking/${id}`,
			body: {
				"firstname": "Pedro",
				"lastname": "James",
				"totalprice": 111,
				"depositpaid": false,
				"bookingdates": {
					"checkin": "2020-01-01",
					"checkout": "2020-01-02"
				},
				"additionalneeds": "Lunch"
			},
			failOnStatusCode: false
		})
	}

	updateBookingWithToken(bookingid, newToken){
		const token = newToken ? newToken : Cypress.env('token')
		return 	cy.request({
			method: 'PUT',
			url: `booking/${bookingid}`,
			headers: {
				Cookie: `token=${token}`
			},
			body: {
				"firstname": "Pedro",
				"lastname": "James",
				"totalprice": 111,
				"depositpaid": false,
				"bookingdates": {
					"checkin": "2020-01-01",
					"checkout": "2020-01-02"
				},
				"additionalneeds": "Lunch"
			},
			failOnStatusCode: false
		})
	}
	postAuth(){
		return cy.request({
			method: 'POST',
			url: 'auth',
			body: {
				"username" : "admin",
				"password" : "password123"
			}
		})
	}

	doAuth(){
		this.postAuth().then(authResponse => {
			const token = authResponse.body.token
			Cypress.env('token', token)
		})
	}

	deleteBooking(bookingId,  token){
		const validToken = `${Cypress.env('token')}`
		const newToken = token == '' || token != 'validToken' ? token : validToken
		return	cy.request({
			method: 'DELETE',
			url: `booking/${bookingId}`,
			headers: {
					Cookie: `token=${newToken}` 
			},
			failOnStatusCode: false
		})
	}

}

export default new Requests()