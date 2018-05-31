class LibrosController {
    constructor(librosService, growl) {
        this.librosService = librosService
        this.growl = growl
        this.libros = []
        this.busqueda = ""
        this.libroParaModificar = null
        this.libroParaAgregar = null
        this.errorHandler = (response) => {
            if (response.data) {
              // confiamos en que cuando hay un error, el servidor
              // devuelve en el body un json de la forma { "error": <mensaje de error> }
              this.notificarError(response.data.error)
            } else {
              // si no hay respuesta, debe ser porque hubo error de conexión
              this.notificarError("Error de conexión, intente nuevamente luego.")
            }
        }
        this.resetLibros()
    }

    // NOTIFICACIONES & ERRORES
    notificarMensaje(mensaje) {
        this.growl.info(mensaje)
    }

    notificarError(mensaje) {
        this.growl.error(mensaje)
    }

    // BUSCAR
    buscarLibros() {
        const promise = (this.busqueda == "") ?
            this.librosService.listarTodos() :
            this.librosService.buscar(this.busqueda)

        promise.then((response) => {
            this.libros = response.data
        }, this.errorHandler)
    }

    // LISTAR
    resetLibros() {
        this.busqueda = ""
        this.buscarLibros()
    }

    // AGREGAR
    agregarLibro() {
        this.librosService.agregar(this.libroParaAgregar).then((response) => {
            this.notificarMensaje("¡Libro agregado con # " + response.data.id + "!")
            this.resetLibros()
            this.libroParaAgregar = null
        }, this.errorHandler)
    }

    // ELIMINAR
    eliminar(libro) {
        const mensaje = "¿Está seguro de eliminar el libro titulado '" + libro.titulo + "' de '" + libro.autor + "'?"
        bootbox.confirm({
            message: mensaje, 
            buttons: {
                confirm: {
                    label: 'Sí, eliminar',
                    className: 'btn-success'
                },
                cancel: {
                    label: 'Cancelar',
                    className: 'btn-danger'
                }
            },
            callback: (confirma) => {
                if (confirma) {
                    this.librosService.eliminar(libro).then(() => {
                        this.notificarMensaje('¡Libro eliminado!')
                        this.resetLibros()
                    }, this.errorHandler)
                }
            }})
    }

    // MODIFICAR
    modificarLibro(libro) {
        // Copiamos al libro porque sino al cerrar el diálogo queda modificado en la lista
    	this.libroParaModificar = Object.assign({}, libro);
        $("#modificarLibroModal").modal({})
    }

    aplicarModificacion() {
        this.librosService.modificar(this.libroParaModificar).then(() => {
            this.notificarMensaje('¡Libro modificado!')
            this.resetLibros()
        }, this.errorHandler)

        this.libroParaModificar = null
        $("#modificarLibroModal").modal('toggle')
    }

}
