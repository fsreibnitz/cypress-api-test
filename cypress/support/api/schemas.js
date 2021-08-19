import spok from 'cy-spok'

class Schemas {
	getBookingSchema(){
		return spok(
			{					
				firstname: spok.test(/Mark/) || spok.test(/PAULO/) ,
				lastname:  spok.string,
				totalprice: spok.number,
				depositpaid: spok.type('boolean'),
				bookingdates: {
					checkin:  spok.string,
					checkout: spok.string
				},
			//	additionalneeds: spok.string
			}
		)
	}

	getListaBookingSchema(){
		//TODO verificar como conferir Array
		return spok(
			{
			bookingid: spok.number 
			}
		)
	}
}

export default new Schemas()