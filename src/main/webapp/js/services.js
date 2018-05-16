const librosService = ($http) => {
    return {
        listar: () => {
            return $http({
                method: "GET",
                url: "libros"
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
