class Assertions {
	shouldHaveStatus(response,status){
		expect(response.status, 'status').to.eq(status)
	
	}

	validateContractOf(response, schema){
		console.log('passou')
		if (Array.isArray(response.body)){
			response.body = response.body[0]
			console.log('passou dentro')

		}
		return 	cy.wrap(response.body).should(
			schema
		)
	}

	bookingIdNotNull(response){
		return	expect(response.body.bookingid, 'bookingid exist').to.not.be.null

	}

	shouldHaveDefaultHeaders(response){
		return expect(response.headers, 'default headers').to.include({
			server: 'Cowboy',
			connection: 'keep-alive',
			'x-powered-by': 'Express',
			})
		}

	shouldHaveContentTypeAppJson(response){
			return expect(response.headers, 'content-type').to.include({
				'content-type': 'application/json; charset=utf-8'
			})
		}
	shouldDurationLt(response, duration){
			expect(response.duration, 'duration').lt(duration)
	}
	
	
}

export default new Assertions()