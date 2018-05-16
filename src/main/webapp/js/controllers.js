class LibrosController {
    constructor(librosService, growl) {
        this.libros = []
        this.librosService = librosService
        this.libroSeleccionado = null
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
        this.librosService.agregar(this.nuevoLibro).then((response) => {
            this.notificarMensaje('Libro agregado con id:' + response.data.id)
            this.actualizarLista()
            this.nuevoLibro = null
        }, this.errorHandler)
    }

    // ELIMINAR
    eliminar(libro) {
        const mensaje = "¿Está seguro de eliminar: '" + libro.titulo + "'?"
        bootbox.confirm(mensaje, (confirma) => {
            if (confirma) {
                this.librosService.eliminar(libro).then(() => {
                    this.notificarMensaje('Libro eliminado!')
                    this.actualizarLista()
                }, this.errorHandler)
            }
        })
    }

    verDetalle(libro) {
        this.libroSeleccionado = libro
        $("#verLibroModal").modal({})
    }

    // EDITAR
    editarLibro(libro) {
        // Copiamos al libro porque sino al cerrar el diálogo queda modificado en la lista
    	this.libroSeleccionado = {...libro}
        $("#editarLibroModal").modal({})
    }

    guardarLibro() {
        this.librosService.modificar(this.libroSeleccionado).then(() => {
            this.notificarMensaje('Libro modificado!')
            this.actualizarLista()
        }, this.errorHandler)

        this.libroSeleccionado = null
        $("#editarLibroModal").modal('toggle')
    }

}
