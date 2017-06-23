class LibrosController {
    constructor($timeout, librosService) {
        this.libros = []
        this.librosService = librosService
        this.libroSeleccionado = null
        this.msgs = []
        this.errors = []
        this.$timeout = $timeout
        this.errorHandler = (error) => {
            this.notificarError(error.data)
        }
        this.actualizarLista()
    }

    actualizarLista() {
        this.librosService.query((data) => {
            this.libros = data
        }, this.errorHandler)
    }
    

    // AGREGAR
    agregarLibro() {
        this.librosService.save(this.nuevoLibro, (data) => {
            this.notificarMensaje('Libro agregado con id:' + data.id)
            this.actualizarLista()
            this.nuevoLibro = null
        }, this.errorHandler)
    }

    // ELIMINAR
    eliminar(libro) {
        const mensaje = "¿Está seguro de eliminar: '" + libro.titulo + "'?"
        bootbox.confirm(mensaje, (confirma) => {
            if (confirma) {
                this.librosService.remove(libro, () => {
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

    // EDITAR LIBRO
    editarLibro(libro) {
    	this.libroSeleccionado = libro
        $("#editarLibroModal").modal({})
    }

    guardarLibro() {
        this.librosService.update(this.libroSeleccionado, () => {
            this.notificarMensaje('Libro actualizado!')
            this.actualizarLista()
        }, this.errorHandler)

        this.libroSeleccionado = null
        $("#editarLibroModal").modal('toggle')
    }

    // FEEDBACK & ERRORES
    notificarMensaje(mensaje) {
        this.msgs.push(mensaje)
        this.notificar(this.msgs)
    }

    notificarError(mensaje) {
        this.errors.push(mensaje)
        this.notificar(this.errors)
    }

    notificar(mensajes) {
        this.$timeout(() => {
            while (mensajes.length > 0) mensajes.pop()
        }, 3000)
    }

}
