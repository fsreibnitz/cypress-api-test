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
			request.updateBookingWithToken(postBookingResponse.body.bookingid).then(putBookingResponse => {
			  assertions.shouldHaveStatus(putBookingResponse, 200)
			})
		})
	});

	it('Deletar com sucesso @functional', () => {
		request.postBooking().then(postBookingResponse => {
			request.deleteBooking(postBookingResponse.body.bookingid).then(deleteBookingResponse => {
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

	it('Erro ao alterar reserva inexistente', () => {
		const id =12121212121212
		request.updateBookingWithToken(id).then(response => {
			assertions.shouldHaveStatus(response,405)
		})
	})

	it('Não permitir alterar reserva com token inválido', () => {
		const invalidToken = 'aijaiaihsugyg1'
			request.updateBookingWithToken(1,invalidToken).then(response => {
					assertions.shouldHaveStatus(response,403)
			})
	})

	it('Erro ao excluir uma reserva inexistente',() => {
		const bookingid = 56261521251825812851
		request.deleteBooking(bookingid).then(response => {
			assertions.shouldHaveStatus(response,405)
		})
	})

	it('Não permitir excluir uma reserva sem token', () => {
		const noToken = ''
		request.deleteBooking(1,noToken).then(response => {
			assertions.shouldHaveStatus(response,403)
		})
	})

	it('Não permitir excluir uma reserva com token inválido', () => {
		const invalidToken = '12131313ewdihihih32'
		request.deleteBooking(1,invalidToken).then(response=> {
			assertions.shouldHaveStatus(response,403)
		})
	} )
});