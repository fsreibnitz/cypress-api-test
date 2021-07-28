/// <reference types="cypress" />

import assertions from '../support/api/assertions';
import requests from '../support/api/requests';

context('Ping', () => {
	it('GET Healthcheck @healthCheck', () => {
		requests.getPing().then(getPingResponse => {
			assertions.shouldHaveStatus(getPingResponse, 201)
		})
	});
});