# RespirAR API

Esta API se utiliza para crear, modificar y eliminar estaciones LoraWan, asi como crear, modificar y eliminar estaciones Wifi

## Endpoints

POST /station

Json:{
"station": {
"name": "LoraWan1"
"description": "Estacion propia LoraWan1"
}
}

Response
"Status 200"

GET /station

Json:{
Toda la lista de estaciones
}

Response

agregar respuesta en json
{
"meetup": {
"users": [],
"\_id": "5f20a5bc986b4d8ed9fec585",
"date": "2020-07-30",
"description": "Meetup test",
"\_\_v": 0
}
}

```

GET /station/:id

json

Response example:

json

DELETE /station/:id

json

Response example:

json

PATCH /station

json

Response example:

json
```
