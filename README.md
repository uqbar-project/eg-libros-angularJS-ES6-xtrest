# eg-libros-angular-xtrest

[![Build Status](https://travis-ci.org/uqbar-project/eg-libros-angular-xtrest-es6.svg?branch=master)](https://travis-ci.org/uqbar-project/eg-libros-angular-xtrest-es6)

![demo](demo/demo.png)

Ejemplo de api rest con frontend en angular mezclando herramientas

- del lado cliente: es una aplicación Angular 1.x con ES6
- del lado servidor: el servicio REST de libros está implementado en Xtrest

### Cómo ejecutar en Eclipse

1. Importar este proyecto en Eclipse como Maven project.
2. Ejecutar `org.uqbar.ui.angular.libros.xtrest.LibrosController`, que levanta servidor en el puerto 9200.

### Formas de probarlo

#### Servidor: 

   * En el navegador: <http://localhost:9200/libros>.
   * En [Postman](https://www.getpostman.com/): importar [este archivo](Libros.postman_collection.json), que provee varios ejemplos de request listos para usar.
   
#### Cliente: 

En el navegador: <http://localhost:9200/>.
