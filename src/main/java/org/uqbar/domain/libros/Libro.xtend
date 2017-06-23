package org.uqbar.domain.libros

import org.eclipse.xtend.lib.annotations.Accessors
import org.uqbar.domain.libros.exceptions.UserException

@Accessors
class Libro {
	Integer id
	String titulo
	String autor
	
	def validar() {
		if (titulo == null || titulo.trim.equals("")) {
			throw new UserException("Debe ingresar titulo")
		}
		if (autor == null || autor.trim.equals("")) {
			throw new UserException("Debe ingresar autor")
		}
	}
	
	def coincideCon(String valor) {
		titulo.contains(valor) || autor.contains(valor)
	}
	
	override equals(Object obj) {
		try {
			val otro = obj as Libro
			otro.id == this.id
		} catch (ClassCastException e) {
			return false
		}
	}
	
	override hashCode() {
		this.id.hashCode
	}
	
}