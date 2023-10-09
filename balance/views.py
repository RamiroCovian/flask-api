from . import app, RUTA


@app.route('/')
def inicio():
    return f'La base de datos está en {RUTA}'
