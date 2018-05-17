const librosService = ($http) => {
    return {
        listarTodos: () => {
            return $http({
                method: "GET",
                url: "libros"
            })
        },
        buscar: (busqueda) => {
            return $http({
                method: "GET",
                url: "libros/search?titulo=" + busqueda
            })
        },
        modificar: (libro) => {
            return $http({
                method: "PUT",
                url: "libros/" + libro.id,
                data: libro
            })
        },
        agregar: (libro) => {
            return $http({
                method: "POST",
                url: "libros",
                data: libro
            })
        },
        eliminar: (libro) => {
            return $http({
                method: "DELETE",
                url: "libros/" + libro.id
            })
        }
    }
}
