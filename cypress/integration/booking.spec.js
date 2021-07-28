/// <reference types="cypress" />
import assertions from '../support/api/assertions';
import request from '../support/api/requests';
import schemas from '../support/api/schemas';
context('Booking', () => {
	before(()=> {
		request.doAuth()
	})
	it('Validar contrato GET Booking @contract', () => {
		request.getBooking().then(getBookingResponse => {
			assertions.validateContractOf(getBookingResponse,schemas.getBookingSchema())
		})
	})

	it('Criar uma reserva com sucesso @functional', () => {
	request.postBooking().then(postBookingResponse => {
		assertions.shouldHaveStatus(postBookingResponse,200)
		assertions.bookingIdNotNull(postBookingResponse)
		assertions.shouldHaveDefaultHeaders(postBookingResponse)
		assertions.shouldHaveContentTypeAppJson(postBookingResponse)
		assertions.shouldDurationLt(postBookingResponse, 350)
		})
	});

	it('Tentar alterar uma reserva sem token @functional', () => {
			request.postBooking().then(postBookingResponse => {
			request.updateBookingWithoutToken(postBookingResponse).then(putBookingResponse => {
			  assertions.shouldHaveStatus(putBookingResponse, 403)
		})
	})

	});
	it('Alterar uma reserva com sucesso @functional', () => {
		request.postBooking().then(postBookingResponse => {
			request.updateBookingWithToken(postBookingResponse).then(putBookingResponse => {
			  assertions.shouldHaveStatus(putBookingResponse, 200)
			})
		})
	});

	it('Deletar com sucesso @functional', () => {
		request.postBooking().then(postBookingResponse => {
			request.deleteBooking(postBookingResponse).then(deleteBookingResponse => {
				assertions.shouldHaveStatus(deleteBookingResponse, 201)
			})
		})
	});

	it('Listar Booking', () => {
		cy.request({
			method: 'GET',
			url: '/booking'
		}).then(getBookingResponse => {
			console.log(getBookingResponse.body)

			
						 assertions.validateContractOf(getBookingResponse, schemas.getListaBookingSchema())
		})
	})

});