const Orion = require('fiware-orion-client');
const client = new Orion.Client({
    url: 'http://your-orion-context-broker-url:1026/v2',
  });

function createEntity(entityModel){
    //TODO: REMOVE THIS, this is an entity example, should create real station
    entityModel = {
        id: 1,
        name: "station name 1",
        description: "station description 1"
    }
    //should use parameter and do not hard code this ^

    const entity = new Orion.Entity(entityModel);
    client.createEntity(entity)
        .then((response) => {
            console.log('Entity created:', response);
        })
        .catch((error) => {
            console.error('Failed to create entity:', error);
        });
}

module.exports = {createEntity}
