from flask import jsonify

from . import app
from .models import DBManager


@app.route("/")
def inicio():
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
