# API Ingeniería web with Node + MongoDB
La siguiente es una API desarrollada para el curso de Ingeniería web de la UdeA

## Métodos disponibles:

- **GET /students** Devuelve un arreglo con todos los estudantes disponibles

```
[
 [
    {
        "_id": "5e9a899dffe96ba9c340298c",
        "name": "Estefany",
        "lastname": "Muriel",
        "document": 1026134321,
        "note": 5,
        "__v": 0
    },
    {
        "_id": "5e9a8a1b6d25ebacc1c24fbc",
        "name": "Pedro",
        "lastname": "Garcia",
        "document": 1026134301,
        "note": 4.3,
        "__v": 0
    }
]
]
```

- **GET /students/:id** Devuelve un estudiante el cuál es especificado con su id

```
{
    "_id": "5e9a899dffe96ba9c340298c",
    "name": "Estefany",
    "lastname": "Muriel",
    "document": 1026134321,
    "note": 5,
    "__v": 0
}
```

- **POST /students** Crear un estudiante

```
  # Request:
    {
      "name": "Estefany",
      "lastname": "Muriel",
      "document": 1026134321,
      "note": 5
    }

  # Response:
   {
     "_id": "5e9a899dffe96ba9c340298c",
     "name": "Estefany",
     "lastname": "Muriel",
     "document": 1026134321,
     "note": 5,
     "__v": 0
   }
```

- **PUT /students/:id** Actualizar los atributos de un estudiante con su id como parámetro.

```
En el body de la request se colocan los campos que se desean actualizar:

  {
    "name": "Estefany",
    "lastname": "Cano"
    "note": 4.5
  }
```

- **DELETE /students/:id** Eliminar un estudiante con su id como parámetro.

```
  Al eliminar exitosamente nos retorna lo siguiente:

  {
    "message": "Student with id: 5e9bb86071e0f12bd39f8a8f was deleted"
  }
```

- **POST /students/average** Obtener el promedio de la nota de todos los estudiantes

```
  {
    "average": 4.3
  }
```

- **POST /students/updateNote** Actualizar a todos los estudiantes que cumplen con el criterio especificado

```
Parámetros
  **rule: string (required) podemos escoger el criterio entre  **[ MAX_NOTE | MIN_NOTE | EQUAL_TO ]**
  **currentNote: number (required)
  **newNote: number (required)

    #  Request:
      {
        "rule": "EQUAL_TO",
        "currentNote": 5,
        "newNote": 4.3
      }

    # Response: 
      {
        "message": "students updated correctly",
        "rule": "EQUAL_TO",
        "students": 
        [
           {
            "_id": "5e9a899dffe96ba9c340298c",
            "name": "Estefany",
            "lastname": "Muriel",
            "document": 1026134321,
            "note": 4.3,
            "__v": 0
           }
        ]
      }
```
