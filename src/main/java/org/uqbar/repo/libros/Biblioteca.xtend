package org.uqbar.repo.libros

import java.util.List
import org.uqbar.domain.libros.Libro

class Biblioteca {

	private List<Libro> libros = newArrayList

	static var Biblioteca instance = null

	new() {
		this.addLibro("Las venas abiertas de América Latina", "Eduardo Galeano");
		this.addLibro("Guerra y Paz", "León Tolstoi");
		this.addLibro("Patas Arriba", "Eduardo Galeano");
		this.addLibro("El fútbol a sol y a sombra", "Eduardo Galeano");
		this.addLibro("Historia del siglo XX", "Eric Hobsbawm");
		this.addLibro("Ficciones", "Jorge Luis Borges");
		this.addLibro("El Aleph", "Jorge Luis Borges");
		this.addLibro("La invención de Morel", "Adolfo Bioy Casares");
		this.addLibro("Rayuela", "Julio Cortázar");
		this.addLibro("El barón rampante", "Italo Calvino");
		this.addLibro("El vizconde demediado", "Italo Calvino");
		this.addLibro("100 años de soledad", "Gabriel García Márquez");
		this.addLibro("Un día en la vida de Ivan Denisovich", "Alexander Solyenitsin");
		this.addLibro("El día del arquero", "Juan Sasturain");
	}

	def addLibro(String _titulo, String _autor) {
		val nuevoLibro = new Libro => [
					autor = _autor
					titulo = _titulo
					id = ultimoId + 1
				]
		libros.add(nuevoLibro)
		nuevoLibro
	}
	
	def getUltimoId() {
		val ultimoLibro = libros.sortBy[ -id ].head
		if (ultimoLibro === null) return 0
		ultimoLibro.id
	}

	def getTodos() {
		libros
	}

	def getLibro(Integer idLibro) {
		libros.findFirst [ libro | libro.id == idLibro ]
	}
	
	def actualizarLibro(Libro libro) {
		libros.remove(libro)
		libros.add(libro.id - 1, libro)
	}

	def eliminarLibro(Libro libro) {
		libros.remove(libro)
	}	
	
	def buscar(String valor) {
		libros.filter [ libro | libro.coincideCon(valor) ]	
	}
	
	static def getInstance() {
		if (instance == null) {
			instance = new Biblioteca
		}
		instance
	}
	
}
