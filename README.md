# CiudadGPS - React Native

# **1. Introducción**

Bienvenidos a la documentación oficial de CiudadGPS, la plataforma innovadora que transforma la manera en que los consumidores y las empresas locales se conectan. CiudadGPS ofrece un directorio comercial geolocalizado, facilitando a los usuarios encontrar productos y servicios cercanos a su ubicación. Con características como catálogos de productos vinculados a WhatsApp, un asistente de IA para consultas, y una bolsa de empleos, buscamos revolucionar el comercio local y proporcionar herramientas efectivas para empresas y consumidores.

En esta documentación, encontrarás información detallada sobre todas las funcionalidades de CiudadGPS, cómo utilizar nuestra plataforma, y guías para aprovechar al máximo todas las herramientas que ofrecemos. Esta guía está diseñada para ayudar tanto a usuarios como a empresas afiliadas a navegar por nuestra plataforma de manera eficiente y efectiva.

Nuestro objetivo es que CiudadGPS no solo sea una herramienta útil, sino también un recurso integral que simplifique y mejore la experiencia comercial local para todos nuestros usuarios.

# 2. Estructura de Carpetas

La estructura de carpetas del proyecto "CiudadGPS" en React Native es la siguiente:

1. **.expo**: Contiene configuraciones específicas del proyecto Expo.
2. **assets**: Almacena recursos estáticos como imágenes, fuentes, etc.
3. **components**: Incluye componentes reutilizables de la aplicación.
4. **constants**: Guarda constantes y configuraciones globales del proyecto.
5. **functions**: Contiene funciones de utilidad o lógica de negocios que se pueden reutilizar en la aplicación.
6. **node_modules**: Carpeta generada por NPM que incluye todas las dependencias del proyecto.
7. **screens**: Contiene las pantallas principales de la aplicación, cada archivo representa una pantalla o vista distinta.

Archivos en el directorio raíz:

- **.env**: Configuración de variables de entorno.
- **App.js** y **Main.js**: Puntos de entrada principales de la aplicación.
- **package.json** y **package-lock.json**: Archivos de configuración y bloqueo de dependencias de NPM.
- Otros archivos de configuración como **babel.config.js**, **eas.json**, **google-services.json**, etc., que gestionan diversas configuraciones y servicios del proyecto.

Esta estructura organiza claramente los componentes y configuraciones necesarios para el funcionamiento de la aplicación.

# 3. Carpeta Screens

## Subcarpetas de Screens

- **hours**: Manejo de horas y horarios.
- **jobs**: Gestión de trabajos y ofertas laborales.
- **pcategories**: Categorías personalizadas.
- **products**: Pantallas relacionadas con productos.

### Anuncios.js

### Importaciones

- **React y useContext**: Se importa React y el hook `useContext` para manejar el estado del contexto.
- **React Native Components**: `View`, `Text`, `Image`, `TouchableOpacity`, `FlatList`, y `Linking` son componentes de React Native para construir la interfaz de usuario y manejar enlaces.
- **react-native-paper**: `Appbar` se importa de esta biblioteca para usar componentes de barra de aplicaciones.
- **Constants**: `colores`, `icons`, y `images` se importan desde el archivo de constantes.
- **Environment Variables**: `EXPO_PUBLIC_API_URL` se importa desde las variables de entorno.
- **Contexto**: `Contexto` se importa desde el archivo de funciones.

### Funcionalidad del Componente

- **Props y Contexto**: Se accede a la navegación desde `props` y al estado global de `banners` desde el contexto.
- **Filtrado de Banners**: Se filtran los `banners` para obtener solo aquellos de la sección "Sección 4".
- **Renderizado del Componente**:
    - **Appbar**: Barra de aplicaciones con un botón de retroceso y un título "Novedades".
    - **FlatList**: Se muestra una lista de `banners` con imágenes y enlaces, o un mensaje si no hay novedades disponibles.

Este componente muestra las últimas novedades en formato de banner, permitiendo la navegación a enlaces externos o a vistas de comercios específicos.

### Cart.js

### Importaciones

- **React y Hooks**: `React`, `useContext`, `useState`, y `useEffect` para manejar el estado y los efectos secundarios.
- **React Native Components**: `View`, `Text`, `Image`, `TouchableOpacity`, `ScrollView`, `TextInput`, `StatusBar` para construir la interfaz.
- **Constants**: `colores`, `icons`, `images` se importan para usar constantes definidas.
- **Contexto**: `Contexto` se usa para manejar el estado global.
- **NumericFormat**: Para formatear números.
- **react-native-paper**: `Appbar` y `Button` para componentes de barra de aplicaciones y botones.
- **Environment Variables**: `EXPO_PUBLIC_API_URL` para URL base.

### Funcionalidad del Componente

- **Props y Contexto**: Se accede a la navegación desde `props` y al estado global del carrito de compras desde el contexto.
- **Estado Local**: `total` para manejar el total del carrito, actualizado con un efecto cuando cambia el carrito.
- **Renderizado del Componente**:
    - **Appbar**: Barra de aplicaciones con un botón de retroceso y un título "Carrito de Compras".
    - **Contenido del Carrito**:
        - Se muestran los artículos en el carrito con imágenes, nombres y precios, con opciones para modificar cantidades y eliminar artículos.
        - **Resumen del Carrito**: Muestra el subtotal y el total del carrito, con un botón para proceder a la orden.
    - **Carrito Vacío**: Muestra un mensaje y una imagen cuando el carrito está vacío.
    
    ### Catalogo.js
    
    ### Importaciones
    
    - **React y Hooks**: `React`, `useState`, `useContext`, `useCallback`, y `useEffect` para manejar el estado y los efectos secundarios.
    - **React Native Components**: `View`, `TouchableOpacity`, `Text`, `Image`, `FlatList`, `Share`, `Alert`, y `ScrollView` para construir la interfaz.
    - **Constants**: `colores`, `icons` se importan para usar constantes definidas.
    - **Fetch**: `cross-fetch` para realizar solicitudes de red.
    - **Contexto**: `Contexto` se usa para manejar el estado global.
    - **Componentes Adicionales**: `CartExcerpt` y `Spinner` para mostrar un resumen del carrito y un indicador de carga.
    - **react-navigation**: `useFocusEffect` para manejar efectos cuando la pantalla gana o pierde enfoque.
    - **react-number-format**: `NumericFormat` para formatear números.
    - **react-native-paper**: `Appbar`, `Button`, `Chip`, `Divider` para componentes de la interfaz de usuario.
    - **MaterialCommunityIcons**: Iconos adicionales de `@expo/vector-icons`.
    
    ### Funcionalidad del Componente
    
    - **Estado Local**: Se manejan varios estados locales como `products`, `filteredProducts`, `selectedCategory`, `loaded`, y `commerce`.
    - **Funciones**:
        - `fetchData`: Obtiene productos y detalles del comercio desde una API.
        - `onShare`: Comparte la URL del catálogo del comercio.
        - `showCart`: Navega al carrito si hay productos.
    - **Efectos**:
        - `useFocusEffect`: Refresca los datos cuando la pantalla gana enfoque.
        - `useEffect`: Filtra productos cuando se selecciona una categoría.
    - **Renderizado del Componente**:
        - **Appbar**: Barra de aplicaciones con opciones de retroceso y búsqueda.
        - **Información del Comercio**: Muestra el logotipo, nombre y productos del comercio.
        - **Categorías**: Filtra productos por categoría usando `Chip`.
        - **Productos**: Muestra productos filtrados con opciones para agregar al carrito.
        - **Carrito**: Muestra un resumen del carrito si contiene productos.
    
    Este componente se asegura de que los datos se muestren adecuadamente y proporciona interacción del usuario para navegar y compartir el catálogo de productos del comercio.
    
    ### Categories.js
    
    ### Importaciones
    
    - **React y Componentes**: `React`, `Text`, `View`, `TouchableOpacity`, `Image`, `FlatList`, `StatusBar`.
    - **RenderCategory**: Componente personalizado para renderizar categorías.
    - **Constants**: `icons` para íconos constantes.
    - **Spinner**: Componente para mostrar un indicador de carga.
    - **react-native-paper**: `Appbar` para la barra de aplicaciones.
    
    ### Funcionalidad del Componente
    
    - **Estado Local**: `categories` para almacenar las categorías y `loaded` para indicar si los datos se han cargado.
    - **Ciclo de Vida del Componente**:
        - `componentDidMount`: Obtiene las categorías desde una API y las guarda en el estado.
        - `componentWillUnmount`: Establece `_isMounted` en `false` para evitar actualizaciones de estado después de desmontar.
    - **Renderizado del Componente**:
        - **Appbar**: Barra de aplicaciones con un título y un botón de retroceso.
        - **Contenido**: Muestra las categorías en un `FlatList` si los datos se han cargado, de lo contrario, muestra un `Spinner`.
    
    Este componente carga y muestra una lista de categorías desde una API, proporcionando una navegación fluida y una interfaz de usuario amigable.
    
    ### Category.js
    
    Este es un componente de React Native que renderiza una pantalla de búsqueda de comercios, pertenecientes a una categoría específica. Utiliza varios componentes y bibliotecas de terceros, como `react-native-paper` para el Appbar, `react-native-animated-spinkit` para un spinner de carga, y `expo-vector-icons` para iconos.
    
    ### Funcionalidades:
    
    1. **Cargar Comercios por Categoría**:
        - Se hace una petición a una API utilizando la ubicación del usuario y el ID de la categoría seleccionada para obtener los comercios cercanos a esa ubicación.
        - La API responde con un conjunto de datos que incluye los comercios, la categoría seleccionada y un total de resultados.
        - Los comercios se muestran en función de la distancia del usuario (o en función de otra ordenación elegida por el usuario, como evaluaciones).
    2. **Manejo de Estado**:
        - La pantalla usa el estado para almacenar los comercios, la categoría, la página actual, si hay más resultados, el ordenamiento seleccionado, etc.
        - Las búsquedas iniciales se hacen en el `componentDidMount`, y se reactivan cuando el usuario cambia la categoría o cuando la ubicación del usuario cambia significativamente (más de 30 metros).
    3. **Ordenación de Resultados**:
        - El usuario puede elegir cómo ordenar los comercios (por distancia o evaluaciones) usando un modal deslizante (`SwipeDownModal`).
        - Al seleccionar una opción, los comercios se vuelven a cargar con el nuevo orden.
    4. **Cambio de Vista**:
        - Hay dos tipos de vistas: lista y mapa. El usuario puede cambiar entre estas vistas a través de otro modal deslizante.
        - La vista de mapa muestra los comercios distribuidos en un mapa con la ayuda de coordenadas geográficas calculadas en base a los datos recibidos de la API.
    5. **Indicador de Carga**:
        - Mientras los comercios se están buscando, se muestra un spinner de carga (`Flow`).
        - Si no hay más resultados para cargar, se muestra un mensaje que indica que se ha llegado al final de la búsqueda.
    6. **Búsqueda**:
        - Hay un campo de búsqueda simple que permite al usuario escribir una consulta. Este campo redirige a otra pantalla donde se lleva a cabo la búsqueda.
    
    ### Otros Detalles:
    
    - **Renderización eficiente**: El componente hereda de `React.PureComponent` para evitar renderizaciones innecesarias si las propiedades o el estado no han cambiado.
    - **Geolocalización**: Utiliza la ubicación del usuario (latitud y longitud) para mostrar comercios cercanos.
    - **Control de Errores**: Hay manejo básico de errores si la llamada a la API falla, aunque no se muestra al usuario un mensaje de error específico en la interfaz en este código.

### Checkout.js

Este componente es una pantalla de React Native diseñada para completar el proceso de compra en una aplicación. Recoge información del cliente y el carrito de compras, calcula el total y genera un enlace para enviar los datos de la orden a un número de WhatsApp.

### Importaciones:

1. **React y Hooks**: `useContext`, `useState`, `useEffect` para manejar el estado y el contexto.
2. **Componentes y utilidades de React Native**:
    - `View`, `Text`, `Image`, `ScrollView`, `Linking`, `KeyboardAvoidingView` para estructurar la interfaz.
    - `Platform` para manejar el comportamiento en plataformas iOS y Android.
3. **Constants y Contexto**: `images`, `colores` para recursos de la app, y `Contexto` para el acceso a variables globales como el carrito de compras.
4. **react-native-paper**: `Appbar`, `TextInput`, `Button` para la interfaz visual.
5. **react-native-shadow-2**: `Shadow` para efectos de sombra.
6. **react-number-format**: `NumericFormat` para formatear números (precios).

### Estado:

- Maneja varios estados usando `useState`, incluyendo los datos del cliente (nombre, cédula, celular, dirección, ciudad, correo), notas adicionales y los datos del carrito (total, cantidad total de productos, y los ítems formateados para la orden).

### `useEffect`:

- Al actualizar el carrito, el efecto calcula el total y la cantidad total de productos en el carrito.
- También genera un string con los detalles de los ítems del carrito, que luego es usado en el mensaje de WhatsApp.

### Función `checkout`:

- Construye un enlace de WhatsApp con los datos del cliente y la orden, incluyendo detalles como la cédula, nombre, dirección y los productos seleccionados.
- El enlace es abierto con `Linking.openURL`, enviando al usuario a WhatsApp para completar la compra.

### Renderización:

1. **Formulario de Datos del Cliente**: Utiliza varios campos `TextInput` para capturar la información del usuario, como nombre, cédula, celular, dirección, ciudad, correo y notas adicionales.
2. **Resumen del Pedido**: Muestra el subtotal y el total de la orden, formateado con separadores de miles y el símbolo de dólar.
3. **Botón "Finalizar Orden"**: Al pulsar el botón, se llama a la función `checkout` para enviar la información de la orden a WhatsApp.

### Diseño:

- Utiliza `KeyboardAvoidingView` para manejar correctamente el teclado en dispositivos móviles.
- `ScrollView` asegura que el contenido sea desplazable.
- Efectos de sombra se añaden con `Shadow` para mejorar la apariencia del botón.

Este componente está optimizado para dispositivos móviles y facilita el envío de órdenes mediante WhatsApp, proporcionando una experiencia de usuario simple y directa.

### Comentarios.js

El componente `Comentarios` es una clase en React que muestra una lista de comentarios asociados a un comercio. A continuación, se detalla su funcionamiento:

1. **Estado inicial (`initialState`)**:
    - **comments**: Arreglo donde se almacenan los comentarios.
    - **loaded**: Booleano que indica si los datos han sido cargados.
    - **page**: Número de página para la paginación.
    - **count**: Total de comentarios disponibles.
    - **masResultados**: Indica si hay más resultados por cargar.
    - **error**: Manejo de errores durante la carga de comentarios.
2. **Métodos**:
    - `getData`: Método asíncrono que hace una petición `fetch` a la API para obtener los comentarios de un comercio, paginados por página. Una vez recibida la respuesta, concatena los nuevos comentarios con los ya existentes y actualiza el estado. Además, maneja la lógica de paginación incrementando el número de página.
    - `onEndReached`: Se ejecuta cuando se llega al final de la lista de comentarios, verifica si aún quedan más comentarios por cargar y llama a `getData` si es necesario.
    - `componentDidMount`: Al montar el componente, agrega un listener al evento `focus` del navegador de React Native, que reinicia el estado y vuelve a cargar los comentarios cada vez que el usuario vuelve a la pantalla.
3. **Renderizado**:
    - El componente utiliza el diseño de **Appbar** de `react-native-paper` para mostrar un encabezado con un botón de regreso y un título.
    - El cuerpo del componente renderiza un `FlatList`, que itera sobre los comentarios y los muestra en una estructura que incluye:
        - **Avatar del usuario** (si no tiene, se muestra una imagen predeterminada).
        - **Nombre del usuario** y **fecha** de creación del comentario (formateada con Moment en español).
        - Una **calificación** con estrellas y el **texto del comentario**.
    - Si aún no se han cargado los datos, se muestra un **Spinner** (indicador de carga).
    - Si no hay comentarios disponibles, se muestra un mensaje indicándolo.
    - La lista incluye un `ListFooterComponent` que muestra un indicador de carga al final cuando hay más resultados por obtener.
4. **Paginación**:
    - La paginación está gestionada en el método `onEndReached`, que comprueba si el número actual de comentarios es menor que el total disponible (`count`). Si es así, se solicita la siguiente página; de lo contrario, se actualiza el estado para dejar de mostrar el indicador de carga adicional.

Este componente está diseñado para ser reutilizado en cualquier parte de la aplicación donde se necesite mostrar comentarios asociados a un comercio con un sistema de paginación, y está optimizado para cargar más comentarios solo cuando es necesario.

### ComerciosAsociados.js

El componente `ComerciosAsociados` es una clase de React que gestiona los comercios asociados a un usuario, permitiendo visualizar comercios, crear "historias" (imágenes asociadas a un comercio) y verificar códigos de acceso para gestionar los comercios. A continuación, se describe su funcionalidad:

### **Estado inicial (`initialState`)**:

1. **commerces**: Arreglo donde se almacenan los comercios asociados.
2. **stories**: Arreglo donde se almacenan las historias de los comercios.
3. **loaded**: Booleano que indica si los datos han sido cargados correctamente.
4. **emailModal**: Booleano que controla la visibilidad del modal para ingresar el correo.
5. **codeModal**: Booleano que controla la visibilidad del modal para ingresar el código de verificación.
6. **success**: Booleano que indica si la verificación del código fue exitosa.
7. **image**: Objeto que contiene información sobre la imagen seleccionada para subir como historia.
8. **processing**: Booleano que indica si una operación está en curso (cargando o procesando).
9. **error**: Booleano que indica si ocurrió un error.
10. **email**: Correo electrónico ingresado por el usuario.
11. **code**: Código de verificación ingresado.
12. **commerce_id**: ID del comercio seleccionado.
13. **comment**: Comentario que acompaña la historia a subir.
14. **managementOptions**: Booleano que controla la visibilidad de las opciones de gestión del comercio.
15. **commerceId**: ID del comercio en el que se están gestionando las opciones.
16. **commercePaid**: Indica si el comercio ha pagado por algún servicio.
17. **commerceName**: Nombre del comercio en uso.
18. **pricing**: Controla la visibilidad del modal de precios.

### **Métodos principales**:

1. **getData**:
    - Recupera los comercios asociados a un usuario mediante una petición `fetch`. Utiliza el ID del usuario obtenido del contexto (`Contexto`) para obtener los comercios y las historias.
    - Una vez obtenidos, actualiza el estado con los comercios y las historias.
2. **sendEmail**:
    - Envía un correo electrónico para solicitar un código de verificación para un comercio. Si no se ingresa un correo, muestra una alerta. Realiza la petición POST y maneja errores si ocurre un problema durante la solicitud.
    - En caso de éxito, actualiza los modales para ingresar el correo y el código de verificación.
3. **verify**:
    - Verifica el código ingresado por el usuario para asociar un comercio. Si el código está vacío, muestra una alerta. Realiza una petición POST con el código, el ID del comercio, y el ID del usuario, actualizando el estado según la respuesta.
    - En caso de éxito, vuelve a cargar los datos de los comercios.
4. **newStory**:
    - Permite al usuario seleccionar una imagen de su galería usando `ImagePicker`. Si se selecciona una imagen, se actualiza el estado con la imagen y el ID del comercio.
5. **uploadStory**:
    - Sube la imagen seleccionada como una historia para el comercio, utilizando una petición POST con `multipart/form-data`. Una vez subida con éxito, muestra un mensaje de confirmación y vuelve a cargar los comercios e historias.
6. **componentDidMount**:
    - Se ejecuta cuando el componente es montado. Añade un listener para recargar los datos de los comercios cuando el componente recibe el foco (por ejemplo, al navegar hacia la pantalla).
7. **visibleEmailModal**, **visibleCodeModal**, **visibleSuccess**, **visibleManagementOptions**:
    - Estos métodos cambian el estado para mostrar u ocultar los diferentes modales de la aplicación (para ingresar correo, código de verificación, éxito en la operación, o las opciones de gestión de comercio).
8. **afterDestroyStory**:
    - Se llama después de eliminar una historia para recargar los datos.
9. **setPricing**:
    - Controla la visibilidad del modal que muestra los precios para algún servicio o producto relacionado con el comercio.

### **Resumen de la funcionalidad**:

El componente permite al usuario:

- Ver la lista de comercios asociados.
- Subir historias para un comercio mediante la selección de imágenes desde la galería.
- Verificar comercios con un código de verificación enviado al correo electrónico.
- Manejar opciones de gestión para los comercios, como ver precios o realizar otras acciones dependiendo de si el comercio ha pagado por algún servicio.

El flujo principal involucra cargar datos de comercios, gestionar la creación de historias, y realizar verificaciones a través de modales, mientras que el estado se actualiza dinámicamente para reflejar los cambios en la interfaz.

### Commerce.js

El componente `Commerce` es responsable de mostrar información detallada sobre un comercio específico, permitiendo a los usuarios ver datos relevantes y realizar interacciones como visualizar productos y realizar compras. Este componente se integra en una aplicación React Native, utilizando diversas bibliotecas para la gestión de estado y la interfaz de usuario.

### **Importaciones**

El componente importa varias bibliotecas y módulos, incluyendo:

- **React y React Native**: Para la construcción del componente y la interfaz de usuario.
- **Bibliotecas de terceros**: Como `react-native-paper` para componentes de diseño y `@react-navigation` para la navegación.
- **Contexto**: Para manejar el estado global de la aplicación.

### **Estado inicial (`initialState`)**:

El componente tiene el siguiente estado inicial:

- **commerce**: Objeto que contiene la información del comercio.
- **products**: Array que contiene los productos asociados al comercio.
- **loading**: Booleano que indica si los datos se están cargando.
- **error**: Booleano que indica si ocurrió un error durante la carga de datos.
- **modalVisible**: Booleano que controla la visibilidad del modal de compra.
- **selectedProduct**: Objeto que representa el producto seleccionado para comprar.

### **Métodos principales**:

1. **componentDidMount**:
    - Este método se ejecuta después de que el componente se ha montado. Llama a `fetchCommerceData` para obtener la información del comercio y sus productos.
2. **fetchCommerceData**:
    - Realiza una solicitud a la API para obtener los detalles del comercio utilizando el ID pasado como parámetro.
    - Almacena la información del comercio y los productos en el estado. Maneja errores durante la carga.
3. **handleProductSelect**:
    - Este método se ejecuta al seleccionar un producto. Actualiza el estado `selectedProduct` con el producto seleccionado y muestra el modal de compra.
4. **handleModalClose**:
    - Este método cierra el modal de compra. Restablece el producto seleccionado.
5. **render**:
    - Renderiza la interfaz de usuario, mostrando los detalles del comercio y una lista de productos.
    - Incluye un modal para la compra de productos, que permite a los usuarios confirmar su compra.

### **Uso de Contexto**

El componente utiliza el contexto para acceder a la información del usuario, como el token de autenticación, y para manejar las interacciones con la API.

### **Renderizado del componente**

- **Detalles del comercio**: Se muestran el nombre, la dirección y la descripción del comercio.
- **Lista de productos**: Se renderiza una lista de productos relacionados con el comercio.
- **Interacción del usuario**: Incluye botones para seleccionar productos y abrir el modal de compra.

### **Conclusión**

El componente `Commerce` proporciona una interfaz interactiva para que los usuarios vean y compren productos de un comercio específico. Maneja la carga de datos desde una API, el estado del componente y la visualización de modales, integrándose con el contexto global de la aplicación para acceder a información de usuario y autenticación.

### Edit.js

El componente `Edit` es responsable de permitir a los usuarios editar la información de un comercio. Este componente se integra en una aplicación React Native y utiliza bibliotecas como `react-native-paper` para la interfaz y la navegación. Proporciona un formulario donde los usuarios pueden actualizar detalles como el nombre, la dirección y la descripción del comercio.

### **Importaciones**

El componente importa varias bibliotecas y módulos, incluyendo:

- **React y React Native**: Para la construcción del componente y la interfaz de usuario.
- **Bibliotecas de terceros**: Como `react-native-paper` para componentes de diseño y `@react-navigation` para la navegación.
- **Contexto**: Para manejar el estado global de la aplicación.

### **Estado inicial (`initialState`)**:

El componente tiene el siguiente estado inicial:

- **name**: Cadena que representa el nombre del comercio.
- **address**: Cadena que representa la dirección del comercio.
- **description**: Cadena que representa la descripción del comercio.
- **loading**: Booleano que indica si los datos se están cargando.
- **error**: Booleano que indica si ocurrió un error durante la carga o actualización de datos.

### **Métodos principales**:

1. **componentDidMount**:
    - Este método se ejecuta después de que el componente se ha montado. Llama a `fetchCommerceData` para obtener la información del comercio que se va a editar.
2. **fetchCommerceData**:
    - Realiza una solicitud a la API para obtener los detalles del comercio utilizando el ID pasado como parámetro.
    - Almacena la información del comercio en el estado. Maneja errores durante la carga.
3. **handleInputChange**:
    - Este método se ejecuta cuando el usuario cambia el valor de un campo de entrada. Actualiza el estado correspondiente (`name`, `address`, `description`) con el nuevo valor.
4. **handleSubmit**:
    - Este método se ejecuta al enviar el formulario. Realiza una solicitud a la API para actualizar la información del comercio.
    - Muestra mensajes de error o éxito basados en la respuesta de la API.
5. **render**:
    - Renderiza la interfaz de usuario, mostrando un formulario con campos para editar el nombre, la dirección y la descripción del comercio.
    - Incluye un botón para guardar los cambios y un indicador de carga si se está procesando la solicitud.

### **Uso de Contexto**

El componente utiliza el contexto para acceder a la información del usuario y manejar las interacciones con la API, como la autenticación.

### **Renderizado del componente**

- **Formulario de edición**: Se muestran campos de entrada para el nombre, la dirección y la descripción del comercio.
- **Interacción del usuario**: Incluye un botón para guardar los cambios y un indicador de carga mientras se procesan las solicitudes.

### **Conclusión**

El componente `Edit` proporciona una interfaz para que los usuarios editen la información de un comercio. Maneja la carga de datos desde una API, el estado del componente y la visualización de mensajes de error o éxito, integrándose con el contexto global de la aplicación para acceder a información de usuario y autenticación.

### Favoritos.js

El componente `Favoritos` es responsable de mostrar una lista de comercios favoritos guardados por el usuario en una aplicación React Native. Este componente permite al usuario ver y gestionar sus comercios favoritos, proporcionando una interfaz limpia y funcional.

### **Importaciones**

El componente importa varias bibliotecas y módulos, incluyendo:

- **React y React Native**: Para la construcción del componente y la interfaz de usuario.
- **Bibliotecas de terceros**: Como `react-native-paper` para componentes de diseño y `@react-navigation` para la navegación.
- **Contexto**: Para manejar el estado global de la aplicación.

### **Estado inicial (`initialState`)**:

El componente tiene el siguiente estado inicial:

- **favoritos**: Array que contiene la lista de comercios favoritos del usuario.
- **loading**: Booleano que indica si los datos se están cargando.
- **error**: Booleano que indica si ocurrió un error durante la carga de datos.

### **Métodos principales**:

1. **componentDidMount**:
    - Este método se ejecuta después de que el componente se ha montado. Llama a `getData` para obtener la lista de comercios favoritos del usuario.
2. `getData`:
    - Realiza una solicitud a la API para obtener los comercios favoritos del usuario.
    - Actualiza el estado `favoritos` con la respuesta y gestiona cualquier error que pueda ocurrir durante la carga.
3. **render**:
    - Renderiza la interfaz de usuario, mostrando una lista de comercios favoritos.
    - Incluye un botón para eliminar cada comercio de la lista y un indicador de carga si se está procesando la solicitud.

### **Uso de Contexto**

El componente utiliza el contexto para acceder a la información del usuario y manejar las interacciones con la API, como la autenticación y la gestión de favoritos.

### **Renderizado del componente**

- **Lista de favoritos**: Se muestran los comercios favoritos guardados, junto con la opción de eliminarlos.
- **Interacción del usuario**: Incluye un botón para eliminar un comercio de la lista de favoritos y un indicador de carga mientras se procesan las solicitudes.

### **Conclusión**

El componente `Favoritos` proporciona una interfaz para que los usuarios visualicen y gestionen sus comercios favoritos. Maneja la carga de datos desde una API, el estado del componente y la visualización de mensajes de error o éxito, integrándose con el contexto global de la aplicación para acceder a información de usuario y autenticación.

### Home.js

El componente `Home` es una pantalla principal de una aplicación móvil construida con React Native. Se encarga de mostrar diversas secciones, como historias, categorías, banners y comercios cercanos, además de incluir un encabezado y una barra de búsqueda.

### Componentes Principales

1. **Header**: Muestra el encabezado con la ubicación del usuario, un botón para abrir el menú lateral y un botón para navegar a la sección de anuncios. También incluye un campo de búsqueda.
2. **Histories**: Presenta historias de Instagram utilizando un componente `InstaStory`. Las historias se pueden navegar y muestran un texto superpuesto cuando se realiza un gesto de deslizamiento.
3. **CategoriesSection**: Muestra una lista de categorías en formato horizontal. Los usuarios pueden tocar una categoría para ver más detalles.
4. **RenderBanners**: Renderiza una lista de banners en formato horizontal. Al hacer clic en un banner, se navega a una URL o a la página de comercio correspondiente.
5. **Comercio**: Componente que representa un comercio específico con su imagen, logo, nombre y distancia. Permite a los usuarios navegar a la página del comercio al hacer clic.
6. **RenderCommerces**: Muestra una lista de comercios (cercanos a la ubicación del usuario o destacados) y permite la navegación a una pantalla que muestra más comercios.

### Funcionalidad

- **Refrescado**: Utiliza `RefreshControl` para permitir a los usuarios refrescar la pantalla, llamando a la función `onRefresh`.
- **Manejo de Estado**: Usa `useState` para manejar el estado de refresco y si el contenido ya ha sido cargado.
- **Contexto**: Utiliza `useContext` para obtener datos y funciones de un contexto (presumiblemente definido en otro lugar de la aplicación).

### Observaciones

1. **Optimización**: El uso de `React.memo` para algunos componentes ayuda a optimizar el rendimiento, evitando renders innecesarios.
2. **Gestión de Errores**: Considera agregar manejo de errores para las solicitudes de datos, ya que en la actualidad no se gestionan posibles fallas en la carga.
3. **Accesibilidad**: Asegúrate de que todos los elementos interactivos tengan etiquetas accesibles y consideraciones para usuarios con discapacidades.
4. **Responsividad**: Las dimensiones se adaptan a diferentes pantallas utilizando `Dimensions`, lo que es útil para una buena experiencia en diversos dispositivos.