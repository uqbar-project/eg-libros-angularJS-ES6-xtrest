class LibrosController {
    constructor(librosService, growl) {
        this.libros = []
        this.librosService = librosService
        this.libroParaModificar = null
        this.libroParaAgregar = null
        this.growl = growl
        this.errorHandler = (response) => {
            this.notificarError(response.data.error)
        }
        this.actualizarLista()
    }

    // NOTIFICACIONES & ERRORES
    notificarMensaje(mensaje) {
        this.growl.info(mensaje)
    }

    notificarError(mensaje) {
        this.growl.error(mensaje)
    }

    // LISTAR
    actualizarLista() {
        this.librosService.listar().then((response) => {
            this.libros = response.data
        }, this.errorHandler)
    }

    // AGREGAR
    agregarLibro() {
        this.librosService.agregar(this.libroParaAgregar).then((response) => {
            this.notificarMensaje("¡Libro agregado con # " + response.data.id + "!")
            this.actualizarLista()
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
                        this.actualizarLista()
                    }, this.errorHandler)
                }
            }})
    }

    // MODIFICAR
    modificarLibro(libro) {
        // Copiamos al libro porque sino al cerrar el diálogo queda modificado en la lista
    	this.libroParaModificar = {...libro}
        $("#modificarLibroModal").modal({})
    }

    aplicarModificacion() {
        this.librosService.modificar(this.libroParaModificar).then(() => {
            this.notificarMensaje('¡Libro modificado!')
            this.actualizarLista()
        }, this.errorHandler)

        this.libroParaModificar = null
        $("#modificarLibroModal").modal('toggle')
    }

}
