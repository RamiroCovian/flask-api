# flask-api

De nuevo la aplicación balance, pero con API REST

## Verbos y formato de los endpoint en una API REST

- GET /movimientos -----------> LISTAR movimientos
- POST /movimientos ----------> CREAR un movimiento nuevo

- GET /movimientos/1 ---------> LEER el movimiento con ID = 1
- POST /movimientos/1 --------> ACTUALIZAR el movimiento con ID = 1 (sobreescribe TODO el objeto)
- PUT /movimientos/1 ---------> ACTUALIZAR el movimiento con ID = 1 (sobreescribe PARCIALMENTE)
- DELETE /movimientos/1 ------> ELIMINAR el movimiento con ID = 1

**¡¡IMPORTANTE!!**

Es muy importante versionar los endpoints (una API es un contrato)
`/api/v1/...`
