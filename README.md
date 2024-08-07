# My Project

## Endpoints

### CollectionOne

- `GET /api/collection-one`: Obtener todos los elementos.
- `POST /api/collection-one`: Crear un nuevo elemento. Enviar `name` y `file` en el formulario.
- `GET /api/collection-one/:id`: Obtener un elemento por ID.
- `PUT /api/collection-one/:id`: Actualizar un elemento por ID. Enviar `name` y `file` en el formulario.
- `DELETE /api/collection-one/:id`: Eliminar un elemento por ID.

### CollectionTwo

- `GET /api/collection-two`: Obtener todos los elementos (incluye la relación).
- `POST /api/collection-two`: Crear un nuevo elemento. Enviar `title`, `file`, y `relatedItem` en el formulario.
- `GET /api/collection-two/:id`: Obtener un elemento por ID (incluye la relación).
- `PUT /api/collection-two/:id`: Actualizar un elemento por ID. Enviar `title`, `file`, y `relatedItem` en el formulario.
- `DELETE /api/collection-two/:id`: Eliminar un elemento por ID.

## Configuración

Crear un archivo `.env` con las siguientes variables:
