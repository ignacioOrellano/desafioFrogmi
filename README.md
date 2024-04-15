# App desarollada para Desafío Frogmi.

La misma cuenta con un desarrollo en backend con Ruby on Rails y desarrollo frontend con ReactJs.

## Backend
Es una API la cual cuenta con una task para obtener y persistir datos desde una API externa (https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson) y luego expone en endpoints los datos almacenados de acorde al formato especificado.

Antes de ejecutar el sistema se recomienda ejecutar `bundle i` en la carpeta ./backend/ para tener instaladas las gemas requeridas en el proyecto.

**Task**

Para acceder a la misma se debe ejecutar `rake tasks:get_data` en la carpeta ./backend/


**Server**

Para ejecutar el servidor se debe lanzar el comando `rails s` en la carpeta ./backend/

Esto expondrá 3 endpoints:
- GET http://127.0.0.1:3000/api/features
El mismo devuelve la lista de features almacenadas, se pueden agregar los parametros _page_, _per_page_ y _mag_type_ los cuales permiten paginar los datos y filtrarlos respectivamente.
- GET http://127.0.0.1:3000/api/features/:id/comments
Este devuelve la lista de comentarios asociado a cierto feature el cual su _id_ debe ser pasado por parametro
- POST http://127.0.0.1:3000/api/features/:id/comments
El cual permite añadir un nuevo comentario a un feature pasado por parametro como _id_. A su vez se debe pasar un payload el cual contiene el la información del comentario a traves de _body_


## Frontend
El mismo es un cliente el cual consulta e interactua con los 3 endpoints anteriores.

Previo a ejecutar el cliente se recomienda lanzar el comando `npm i` en la carpeta ./frontend/ para tener los paquetes necesarios para la ejecución del mismo.

Para ejecutar este se debe lanzar el comando `npm run dev` en la carpeta ./frontend/

**Breve descripción**

Los datos sismológicos se muestran en forma de tabla. Se puede acceder a la información completa de los mismos a través del icono en forma de ojo a la derecha de cada fila.

Una vez hecho click en el ojo, se observa la información detallada del feature seleccionado. En una sección de comentarios se pueden observar los comentarios del mismo y abajo de la sección se le permite agregar un comentario al feature.


Muchas gracias!