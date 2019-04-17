import axios from 'axios'



class HomeService {

    async getEstablishments(){

        let returnObject = {
            success: null,
            data: null
        }

        const establishments = await axios.get('http://10.133.238.102:3030/establishments')
        console.log('establishment: ', establishments)

        returnObject.data = establishments.data
        returnObject.success = true

        return returnObject
    }

}

export default new HomeService()