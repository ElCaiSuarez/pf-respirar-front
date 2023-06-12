const axios = require('axios');

async function createStation(entityModel){
    var entity = {
        "id": "station-id:" + entityModel.serial,
        "type": "station",
        "description": {
            "type": "Text",
            "value": entityModel.description
        },
        "name": {
            "type": "Text",
            "value": entityModel.name
        },
        "origin": {
            "type": "Text",
            "value": entityModel.type
        },
        "serial": {
            "type": "Text",
            "value": entityModel.serial
        },
        "userId": {
            "type": "Number",
            "value": entityModel.userId
        }
    }

    const headers = {
        'Content-Type': 'application/json',
        'fiware-service': 'respirar'
      };

    axios.post('http://localhost:1026/v2/entities', entity, {headers})
    .catch(error => {
        console.error('Error:', error);
    });
}

module.exports = {createStation}
