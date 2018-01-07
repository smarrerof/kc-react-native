## React Native with Marvel API
Práctica de React Native del V KeepCoding Startup Engineering Master Bootcamp (2017)

## Objetivos
Crear una aplicación con los siguientes requisitos:

* La app debe tener **NECESARIAMENTE**:	- Pantalla con un listado FlatList y datos cargados desde el web services sobre la temática elegida.	- Pantalla de vista detalle al pulsar una celda del listado.	- Hacer uso de la librería Redux.	- La app deberá usar uno de los componentes de navegación mostrados.en las diapositivas del curso (recomendado [react-native-router-flux](https://github.com/aksonov/react-native-router-flux)).

* **OPCIONALMENTE** la app puede disponer de:	- El uso de este spinner en los tiempos de carga, que tendremos queenlazar **MANUALMENTE** con nuestros proyectos nativos. Por ejemplo [https://github.com/maxs15/react-native-spinkit](https://github.com/maxs15/react-native-spinkit).	- Un formulario de añadir personaje (aunque no esté conectado contra un webservice).

* En caso de usar una API distinta o de añadir alguna funcionalidad extra, especificar en el readme del repositorio.

Para esta práctica opcionalmente se recomienda usar la [API de Marvel](https://developer.marvel.com/docs)

## Instalación
```
$ git clone http://github.com/smarrerof/kc-react-native
$ cd kc-react-native
$ npm install
$ react-native run-ios
``` 

## Detalles de la implementación

- Pantalla inicial, donde se muestran inicialmente los personales creados por nosotros y posteriormente los personajes de la API de marvel. Este segundo paginado usa un "scroll infinito" para ir mostrando de 10 en 10 los personajes ordenados alfabéticamente. Desde esta pantalla podemos acceder al detalle de cada personaje o a añadir un nuevo personaje.

- Detalle de personaje
	* Propio: Se muestra la imagen, el nombre y la descripción del personaje. Desde esta vista también podremos eliminar el personaje.
	* Marvel: Se muestra la imagen, el nombre y la descripción del personaje. Tambien se muestra los listados de comics, eventos, series e historias del personaje. De cada bloque se muestran 10 elementos y se podran cargar 10 más desde un botón. Se podrá ver de manera mas grande la imagen del comic, evento o serie haciendo 'click' en ella.

- Alta de personaje: Desde aquí podemos dar de alta personajes. Los datos que se permiten son imagen, nombre y descripción. Solo el nombre es obligatorio.

## Demo
![React Marvel Demo](https://raw.githubusercontent.com/smarrerof/kc-react-native/master/images/react_marvel.gif)