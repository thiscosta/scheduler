import axios from 'axios'

import api from '../config/api'

class HomeService {

    async getEstablishments(){

        let returnObject = {
            success: null,
            data: null
        }

        const establishments = await axios.get(`${api}establishments`)
        console.log('establishment: ', establishments)

        returnObject.data = establishments.data
        returnObject.success = true

        return returnObject
    }

}

export default new HomeService()