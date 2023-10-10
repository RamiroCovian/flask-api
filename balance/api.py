from flask import jsonify

from . import app
from .models import DBManager


############## VISTAS API
@app.route("/api/v1/movimientos")
def listar_movimientos():
    try:
        # db = DBManager(app.config.get("RUTA"))
        """
        Hace excepcion para la configuracion tomar el dato en vez de con GET,
        se haga de esta manera porque si la ruta no esta configurada, de error,
        de la otra manera(con GET), sigue funcionando el programa
        """
        db = DBManager(app.config["RUTA"])

        sql = "SELECT fecha, concepto, tipo, cantidad FROM movimientos"
        movs = db.consultaSQL(sql)
        resultado = {"status": "success", "results": movs}
    except Exception as ex:
        resultado = {"message": str(ex), "status": "error"}
    return jsonify(resultado)


@app.route("/api/v1/movimientos/<int:id>")
def leer_movimiento(id):
    """
    1. Instanciar DBManager
    2. Preparar la consulta
    3. Ejecutar la consulta
    4. Leer el resultado
    5. Si es OK:
    6.   status success y movimiento
    7. Si es KO:
    8.   status error y mensaje
    9. Devolver resultado (movimiento)
    """
    try:
        db = DBManager(app.config["RUTA"])
        mov = db.obtenerMovimiento(id)
        if mov:
            resultado = {"status": "success", "results": mov}
            status_code = 200
        else:
            resultado = {
                "status": "error",
                "message": f"No he encontrado el movimiento con ID = {id}",
            }
            status_code = 404

    except Exception as ex:
        resultado = {"status": "error", "message": str(ex)}
        status_code = 500
    return jsonify(resultado), status_code
