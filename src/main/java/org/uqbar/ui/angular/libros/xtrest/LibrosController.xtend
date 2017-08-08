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
import org.uqbar.xtrest.http.ContentType
import org.uqbar.xtrest.json.JSONUtils

/**
 * Ejemplo de controller REST/JSON en xtrest
 * 
 * @author jfernandes
 */
@Controller
class LibrosController {
	extension JSONUtils = new JSONUtils

	//	@Filter("/*")
	//	def defineJsonContentType(HandlerChain chain) {
	//		response.contentType = "application/json"
	//		chain.proceed
	//	}
	
	@Get("/libros")
	def Result libros() {
		val libros = Biblioteca.instance.todos
		response.contentType = ContentType.APPLICATION_JSON
		ok(libros.toJson)
	}

	@Get('/libros/:id')
	def Result libro() {
		try {
			response.contentType = ContentType.APPLICATION_JSON
			ok(Biblioteca.instance.getLibro(Integer.valueOf(id)).toJson)
		} catch (NumberFormatException ex) {
        	badRequest(getErrorJson("El id debe ser un numero entero"))
        } catch (UserException e) {
			notFound("No existe libro con id '" + id + "'");
		}
	}

	@Delete('/libros/:id')
	def Result eliminarLibro() {
		try {
			response.contentType = ContentType.APPLICATION_JSON
			val biblioteca = Biblioteca.instance
			biblioteca.eliminarLibro(biblioteca.getLibro(Integer.valueOf(id)))
			ok('''{ "status" : "ok" }''')
		} catch (NumberFormatException ex) {
        	badRequest(getErrorJson("El id debe ser un numero entero"))
        } catch (UserException e) {
			return notFound("No existe libro con id '" + id + "'");
		}
	}

	@Get('/libros/search')
	def Result buscar(String titulo) {
		response.contentType = ContentType.APPLICATION_JSON
		ok(Biblioteca.instance.buscar(titulo).toJson)
	}

	@Post('/libros')
	def Result agregarLibro(@Body String body) {
		try {
			response.contentType = ContentType.APPLICATION_JSON
			if (body == null || body.trim.equals("")) {
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
		response.contentType = ContentType.APPLICATION_JSON
		val actualizado = body.fromJson(Libro)
		if (Integer.parseInt(id) != actualizado.id) {
			return badRequest('{ "error" : "Id en URL distinto del cuerpo" }')
		}
		Biblioteca.instance.actualizarLibro(actualizado)
		ok('{ "status" : "OK" }');
	}

	def static void main(String[] args) {
		XTRest.start(9200, LibrosController)
	}

    private def getErrorJson(String message) {
        '{ "error": "' + message + '" }'
    }

}
