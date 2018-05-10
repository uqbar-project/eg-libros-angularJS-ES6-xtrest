package org.uqbar.ui.angular.libros.xtrest

import org.uqbar.domain.libros.Libro
import org.uqbar.domain.libros.exceptions.UserException
import org.uqbar.repo.libros.Biblioteca
import org.uqbar.xtrest.api.Result
import org.uqbar.xtrest.api.XTRest
import org.uqbar.xtrest.api.annotation.Body
import org.uqbar.xtrest.api.annotation.Controller
import org.uqbar.xtrest.api.annotation.Delete
import org.uqbar.xtrest.api.annotation.Get
import org.uqbar.xtrest.api.annotation.Post
import org.uqbar.xtrest.api.annotation.Put
import org.uqbar.xtrest.json.JSONUtils

/**
 * Ejemplo de controller REST/JSON en xtrest
 * 
 * @author jfernandes
 */
@Controller
class LibrosController {
	extension JSONUtils = new JSONUtils

	@Get("/libros")
	def Result libros() {
		ok(Biblioteca.instance.todos.toJson)
	}

	@Get('/libros/:id')
	def Result libro() {
		try {
			ok(Biblioteca.instance.getLibro(Integer.valueOf(id)).toJson)
		} catch (NumberFormatException ex) {
        	badRequest(getErrorJson("El id debe ser un numero entero"))
        } catch (UserException e) {
			notFound(getErrorJson(e.message));
		}
	}

	@Delete('/libros/:id')
	def Result eliminarLibro() {
		try {
			val biblioteca = Biblioteca.instance
			biblioteca.eliminarLibro(biblioteca.getLibro(Integer.valueOf(id)))
			ok('''{ "status" : "ok" }''')
		} catch (NumberFormatException ex) {
        	badRequest(getErrorJson("El id debe ser un numero entero"))
        } catch (UserException e) {
			notFound(getErrorJson(e.message));
		}
	} 

	@Get('/libros/search')
	def Result buscar(String titulo) {
		ok(Biblioteca.instance.buscar(titulo).toJson)
	}

	@Post('/libros')
	def Result agregarLibro(@Body String body) {
		try {
			if (body === null || body.trim.equals("")) {
				return badRequest("Faltan datos del libro a agregar")
			}
			val nuevo = body.fromJson(Libro)
			nuevo.validar
			val nuevoLibro = Biblioteca.instance.addLibro(nuevo.titulo, nuevo.autor)

			ok('''{ "id" : "«nuevoLibro.id»" }''')
		} catch (UserException e) {
			badRequest(getErrorJson(e.message))
		}
	}

	@Put('/libros/:id')
	def Result actualizar(@Body String body) {
		val actualizado = body.fromJson(Libro)
		if (Integer.parseInt(id) != actualizado.id) {
			return badRequest('{ "error" : "Id en URL distinto del cuerpo" }')
		}
		Biblioteca.instance.actualizarLibro(actualizado)
		ok('{ "status" : "OK" }');
	}

    private def String getErrorJson(String message) {
        '''{ "error" : "«message»" }'''
    }

	def static void main(String[] args) {
		XTRest.start(9200, LibrosController)
	}

}
