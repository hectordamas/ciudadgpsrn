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

# 3. Carpeta `screens`

## Subcarpetas de `screens`

- **hours**: Manejo de horas y horarios.
- **jobs**: Gestión de trabajos y ofertas laborales.
- **pcategories**: Categorías personalizadas.
- **products**: Pantallas relacionadas con productos.

### index.js

Este archivo es un punto central de entrada para los componentes de la aplicación, donde se importan y exportan módulos que representan diferentes pantallas o funcionalidades. A continuación, se detalla la lista de componentes importados y su propósito:

### Componentes Importados

1. **Home**
    - Pantalla principal de la aplicación donde se puede acceder a varias funciones.
2. **Commerce**
    - Muestra detalles de un comercio específico, incluyendo su información y productos ofrecidos.
3. **Favoritos**
    - Permite al usuario ver una lista de los productos o comercios que ha marcado como favoritos.
4. **MiCuenta**
    - Pantalla de gestión de la cuenta del usuario donde puede ver y editar su información personal.
5. **TuNegocio**
    - Espacio donde los usuarios pueden gestionar su propio negocio y productos.
6. **Login**
    - Pantalla de inicio de sesión para que los usuarios accedan a su cuenta.
7. **Register**
    - Pantalla para que nuevos usuarios se registren en la aplicación.
8. **Search**
    - Funcionalidad de búsqueda que permite a los usuarios encontrar productos o comercios.
9. **Category**
    - Muestra productos categorizados bajo una categoría específica.
10. **ShowCommerces**
    - Pantalla que muestra una lista de todos los comercios disponibles.
11. **Anuncios**
    - Espacio para visualizar anuncios relevantes o promociones.
12. **Comentarios**
    - Permite a los usuarios ver y dejar comentarios sobre productos o servicios.
13. **PaymentScreen**
    - Pantalla dedicada a gestionar el proceso de pago.
14. **OnboardingScreen**
    - Proceso de bienvenida que guía a los nuevos usuarios a través de la aplicación.
15. **Categories**
    - Muestra una lista de categorías de productos.
16. **Edit**
    - Pantalla para editar detalles de la cuenta o productos.
17. **ComerciosAsociados**
    - Muestra comercios asociados que pueden ser relevantes para el usuario.
18. **Soporte**
    - Espacio donde los usuarios pueden obtener asistencia o ayuda.
19. **Stories**
    - Muestra historias o contenido visual que los usuarios pueden explorar.
20. **Jobs**
    - Pantalla que muestra la lista de empleos disponibles.
21. **Job**
    - Muestra detalles sobre un trabajo específico.
22. **Cart**
    - Pantalla del carrito de compras donde se visualizan los productos seleccionados.
23. **Checkout**
    - Proceso de finalización de compra.
24. **ProductsIndex**
    - Muestra una lista de productos disponibles.
25. **ProductsCreate**
    - Pantalla para crear un nuevo producto.
26. **ProductsEdit**
    - Permite editar detalles de un producto existente.
27. **ProductShow**
    - Muestra información detallada sobre un producto específico.
28. **JobsIndex**
    - Lista de trabajos disponibles para los usuarios.
29. **JobsCreate**
    - Pantalla para crear un nuevo trabajo.
30. **JobsEdit**
    - Permite editar detalles de un trabajo existente.
31. **JobsCommerce**
    - Muestra trabajos relacionados con comercios específicos.
32. **SearchJobs**
    - Funcionalidad para buscar empleos.
33. **ViewReport**
    - Muestra reportes de visitas y datos analíticos relevantes.
34. **Catalogo**
    - Pantalla que presenta un catálogo de productos o servicios.
35. **HoursIndex**
    - Muestra un listado de horarios relacionados con comercios o servicios.
36. **BirthAndGender**
    - Pantalla para recopilar información sobre la fecha de nacimiento y género de los usuarios.
37. **Thread**
    - Espacio para conversaciones o hilos de discusión.
38. **Questions**
    - Pantalla que permite a los usuarios realizar preguntas y obtener respuestas.
39. **PcategoryList**
    - Muestra una lista de categorías de productos.
40. **PcategoryCreate**
    - Pantalla para crear una nueva categoría de productos.
41. **PcategoryEdit**
    - Permite editar detalles de una categoría existente.

### Exportación de Componentes

Al final del archivo, todos los componentes importados se exportan como un objeto. Esto permite que otros archivos de la aplicación puedan importar cualquiera de estos componentes fácilmente. Por ejemplo:

```jsx
import { Home, Login, Cart } from './path/to/index';

```

### Conclusión

El archivo `index.js` es crucial para la organización de la aplicación, ya que centraliza la importación y exportación de los componentes, facilitando la gestión y el acceso a estos a lo largo del proyecto.

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

### Job.js

### Importaciones

El componente importa varias dependencias necesarias:

- **React y React Native**: Para crear el componente y manejar el estado.
- **Components personalizados**: Como `Spinner`, que probablemente se utiliza para mostrar un indicador de carga.
- **Componentes de `react-native-paper`**: Para proporcionar componentes de interfaz de usuario como `Appbar`, `Button`, `IconButton` y `Text`.
- **MapView de `react-native-maps`**: Para mostrar un mapa con la ubicación de la oferta laboral.
- **Moment**: Para manejar y mostrar fechas.
- **Variables de entorno**: Para acceder a la URL de la API pública.

### Estado del Componente

El componente utiliza el hook `useState` para manejar el estado local:

- `job`: Almacena la información de la oferta laboral.
- `loaded`: Indica si la información se ha cargado.

### Parámetros

- `navigation`: Objeto de navegación proporcionado por React Navigation.
- `route`: Contiene los parámetros enviados a la ruta, incluyendo `job_id`.

### Funciones Principales

1. **mapLink**: Abre Google Maps en la ubicación de la oferta laboral.
    
    ```jsx
    const mapLink = () => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${job?.commerce.lat},${job?.commerce.lon}`);
    ```
    
2. **shareJob**: Comparte la oferta laboral a través de un enlace.
    
    ```jsx
    const shareJob = async () => {
        // Lógica para compartir el trabajo
    };
    ```
    
3. **fetchData**: Recupera los detalles de la oferta laboral de la API y actualiza el estado.
    
    ```jsx
    const fetchData = async () => {
        // Lógica para obtener datos
    };
    ```
    

### Ciclo de Vida

El componente utiliza `useFocusEffect` para ejecutar `fetchData` cada vez que la pantalla obtiene foco, asegurando que la información esté siempre actualizada.

### Renderizado

El componente renderiza la siguiente estructura:

- **Encabezado**: Incluye un botón de regreso, título y un ícono de búsqueda.
- **Mapa**: Muestra la ubicación de la oferta laboral en un mapa utilizando `MapView`.
- **Detalles de la Oferta**:
    - Nombre de la empresa y tiempo desde que se publicó la oferta.
    - Título, descripción y dirección de la oferta.
- **Opciones de Contacto**: Botones para contactar a la empresa a través de WhatsApp o correo electrónico.
- **Botón para Ver Todas las Vacantes**: Navega a otra pantalla que muestra todas las ofertas de la empresa.
- **Botón para Compartir**: Permite compartir la oferta laboral.

### Carga de Datos

Mientras se cargan los datos, se muestra un componente `Spinner` para indicar que la información se está obteniendo.

### Estilos

El componente utiliza estilos en línea y probablemente estilos importados para crear un diseño atractivo y responsivo.

### Ejemplo de Uso

El componente se puede utilizar dentro de una aplicación de React Native para mostrar detalles de ofertas laborales y permitir la interacción de los usuarios. Asegúrate de que se le pase un `job_id` a través de `route.params` para que funcione correctamente.

```jsx
<Job navigation={navigation} route={{ params: { job_id: '123' } }} />
```

Esta documentación debería ayudarte a entender mejor el funcionamiento y la estructura del componente `Job`. Si necesitas más información o ejemplos específicos, no dudes en preguntar.

---

## Jobs.js

### Descripción

El componente `Jobs` se encarga de mostrar una lista de empleos disponibles. Permite a los usuarios buscar empleos mediante un término de búsqueda y cargar más empleos a medida que se desplazan hacia abajo en la lista.

### Props

- **navigation**: Proporciona métodos para navegar entre pantallas en la aplicación.
- **route**: Contiene los parámetros de la ruta, incluyendo el término de búsqueda.

### Estado Local

- **jobs**: Array que almacena la lista de empleos obtenidos desde la API.
- **pageRef**: Referencia que mantiene el número de página actual para la paginación de los empleos.
- **loaded**: Booleano que indica si los datos han sido cargados.
- **count**: Número total de empleos disponibles en la respuesta de la API.

### Funciones

- **fetchData**: Función asíncrona que obtiene los empleos desde la API. Construye la URL según si hay un término de búsqueda y maneja la respuesta para actualizar el estado de `jobs` y `count`. También se encarga de incrementar `pageRef` para la paginación.
- **useFocusEffect**: Hook que se ejecuta cuando el componente gana enfoque. Reinicia el estado de `jobs`, restablece la página a 1 y llama a `fetchData` para cargar los empleos cada vez que se vuelve a esta pantalla.

### Renderizado

- Muestra un encabezado con un botón de retroceso y un título "Bolsa de Empleos".
- Incluye un campo de búsqueda donde los usuarios pueden tocar para navegar a la pantalla de búsqueda.
- Si hay empleos disponibles, se muestra un `FlatList` que renderiza cada empleo en la lista, incluyendo el logo de la empresa, el título del empleo, el nombre del comercio y el tiempo desde que se publicó el empleo.
- En la parte inferior de la lista, si hay más empleos por cargar, se muestra un `ActivityIndicator`. Si se han cargado todos los empleos, se muestra un mensaje indicando que se ha llegado al final.
- Si no hay empleos, se muestra un mensaje y una imagen indicando que aún no hay empleos publicados.

### Login.js

El componente `Login` se utiliza para manejar la autenticación de usuarios en una aplicación React Native. Permite a los usuarios iniciar sesión utilizando su correo electrónico y contraseña, así como mediante autenticación social a través de Facebook, Google y Apple. También proporciona una opción para restablecer la contraseña en caso de olvido.

## Estructura del Componente

### Imports

```jsx
import React from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Alert, ScrollView, Platform } from 'react-native';
import { colores, images } from '../constants';
import { Spinner, ErrorHandling, FacebookLogin, GoogleLogin, AppleLogin, Reestablecer } from '../components';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import { Button, Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Contexto } from '../functions/Context';
import { KeyboardAvoidingView } from 'react-native';

```

### Estado del Componente

El estado del componente se inicializa en el constructor y contiene las siguientes propiedades:

- `email`: Almacena el correo electrónico ingresado por el usuario.
- `error`: Indica si hubo un error en el inicio de sesión.
- `password`: Almacena la contraseña ingresada por el usuario.
- `starting`: Indica si el proceso de inicio de sesión está en curso.
- `secureTextEntry`: Controla la visibilidad de la contraseña (oculta o muestra).
- `access_token`: Almacena el token de acceso recibido al iniciar sesión.
- `reestablecer`: Controla la visibilidad del componente de restablecimiento de contraseña.

### Métodos Principales

- **endsWith**: Verifica si el token termina con `#_=_` y lo reemplaza si es necesario.
    
    ```jsx
    endsWith = (token) => token.endsWith('#_=_') ? token.replace('#_=_', '') : token
    ```
    
- **parseUrlParams**: Analiza la URL y extrae los parámetros de consulta.
    
    ```jsx
    parseUrlParams = (url) => {
        const { queryParams } = Linking.parse(url);
        return queryParams;
    }
    ```
    
- **verifyTokenAndAuth**: Verifica el token y autentica al usuario si el token es válido.
    
    ```jsx
    verifyTokenAndAuth = (token) => {
        // ...
    }
    
    ```
    
- **openAuthSession**: Abre una sesión de autenticación y maneja el flujo de inicio de sesión social.
    
    ```jsx
    openAuthSession = async (type) => {
        // ...
    }
    
    ```
    
- **getUserInfo**: Realiza una solicitud para obtener información del usuario utilizando el token de acceso.
    
    ```jsx
    getUserInfo = async (token) => {
        // ...
    }
    
    ```
    
- **handleLogin**: Maneja el inicio de sesión enviando el correo electrónico y la contraseña al servidor y gestionando la respuesta.
    
    ```jsx
    handleLogin = async () => {
        // ...
    }
    
    ```
    

### Renderizado

El método `render` del componente devuelve una estructura JSX que incluye:

- Un `Spinner` que se muestra mientras se está iniciando sesión.
- Un `KeyboardAvoidingView` para mejorar la experiencia de usuario en dispositivos móviles al evitar que el teclado cubra los campos de entrada.
- Un encabezado (`Appbar`) que contiene un botón de retroceso y el título "Inicia Sesión".
- Un formulario con campos de entrada para el correo electrónico y la contraseña, junto con botones para iniciar sesión, registrarse, y opciones de inicio de sesión social (Facebook y Google).
- Un enlace para restablecer la contraseña.

```jsx
render () {
    // ...
}

```

### Estilos

Los estilos se definen utilizando `StyleSheet.create`, proporcionando un estilo coherente para los diferentes elementos del componente:

```jsx
const styles = StyleSheet.create({
    // ...
});

```

## Notas Adicionales

- Asegúrate de que las variables de entorno (como `EXPO_PUBLIC_API_URL`) estén configuradas correctamente en tu entorno de desarrollo.
- El componente es flexible para manejar diferentes métodos de autenticación y se puede extender fácilmente para agregar más opciones de inicio de sesión social en el futuro.

### Mi Cuenta

Este código es un componente de React Native llamado `MiCuenta`. Está diseñado para permitir a los usuarios administrar su cuenta, incluyendo la capacidad de actualizar su información de perfil, subir una foto de perfil y eliminar su cuenta. Utiliza varias bibliotecas, como `expo-image-picker` para seleccionar imágenes, `react-native-paper` para los componentes de UI y `react-native-shadow-2` para aplicar sombras a los elementos.

### Componentes Clave

1. **Estado Inicial**:
    - Se define un estado inicial que incluye propiedades como `user`, `loaded`, `avatar`, `name`, `email`, `password`, `facebook_id`, `google_id`, `apple_id`, `error`, `processing`, y `visible`.
2. **Métodos Principales**:
    - `uploadProfileImage`: Este método se encarga de subir la imagen del perfil del usuario. Crea un objeto `FormData` para enviar la imagen al servidor. Si la subida es exitosa, actualiza el estado con la nueva información del usuario.
    - `pickImage`: Utiliza `expo-image-picker` para permitir que el usuario seleccione una imagen de su galería. La imagen seleccionada se prepara y se envía a `uploadProfileImage`.
    - `onSubmit`: Este método envía los cambios de información del usuario (nombre, email, contraseña) al servidor. Muestra una alerta al usuario si la actualización es exitosa o si hay errores.
    - `getData`: Realiza una solicitud GET al servidor para obtener los datos del usuario y los carga en el estado del componente.
    - `deleteAccount`: Envía una solicitud para eliminar la cuenta del usuario.
    - `deleteAccountAlert`: Muestra una alerta para confirmar la eliminación de la cuenta del usuario.
3. **Ciclo de Vida del Componente**:
    - En `componentDidMount`, se agrega un listener que resetea el estado y obtiene los datos del usuario cada vez que el componente se enfoca.
4. **Renderización**:
    - El componente renderiza una vista que incluye un encabezado, un modal de carga y un formulario con campos para editar el nombre, email y contraseña del usuario. También incluye un botón para subir una foto de perfil y otro para eliminar la cuenta.
5. **Uso de `KeyboardAvoidingView`**:
    - Se utiliza `KeyboardAvoidingView` para ajustar la vista cuando el teclado está activo, mejorando la experiencia del usuario.
6. **Condiciones de Renderizado**:
    - Se muestra un indicador de carga mientras se obtienen los datos del usuario. Una vez cargados, se muestran los elementos de la interfaz de usuario.

### Estilo y Diseño

El código utiliza varios estilos para asegurarse de que la interfaz sea atractiva y funcional. Se utilizan componentes de `react-native-paper`, como `Button` y `TextInput`, que ofrecen un diseño consistente y accesible.

### OnboardingScreen.js

Este código define un componente llamado `OnboardingScreen`, que utiliza la biblioteca `react-native-app-intro-slider` para crear una serie de pantallas de introducción que permiten a los usuarios familiarizarse con las características de la aplicación CiudadGPS. Se utilizan iconos de `react-native-vector-icons/Ionicons` y estilos personalizados.

### Componentes Clave

1. **Importaciones**:
    - Se importan las bibliotecas necesarias, incluyendo `React`, componentes de `react-native`, `AppIntroSlider`, y `Icon`.
    - Se importan `images` y `colores` desde un archivo de constantes que probablemente define imágenes y paletas de colores para la aplicación.
2. **Dimensiones**:
    - Se obtienen las dimensiones de la ventana para ajustar el diseño según el tamaño de la pantalla del dispositivo.
3. **Estilos**:
    - Se definen estilos utilizando `StyleSheet.create`, incluyendo estilos para botones, títulos, subtítulos y las diapositivas.
4. **Funciones de Renderizado de Botones**:
    - `_renderNextButton`: Renderiza un botón para avanzar a la siguiente diapositiva con un ícono de flecha hacia adelante.
    - `_renderDoneButton`: Renderiza un botón de "hecho" con un ícono de verificación.
5. **Datos de las Diapositivas**:
    - Se define un array `slides` que contiene los datos de cada diapositiva, incluyendo un título, un subtítulo, una imagen y un color de fondo.
6. **Función para Renderizar Diapositivas**:
    - `_renderItem`: Esta función toma un ítem (diapositiva) y renderiza su contenido, incluyendo la imagen, el logotipo de CiudadGPS, el título y el subtítulo.
7. **Componente Principal**:
    - `OnboardingScreen`: Este es el componente principal que utiliza `AppIntroSlider` para mostrar las diapositivas de introducción. Se pasan las funciones y datos relevantes, como `onDone`, que llama a la función `initialize` cuando el usuario completa el recorrido de introducción.

### Diseño y Estilo

El diseño es moderno y atractivo, con un enfoque en la usabilidad. Las imágenes y los textos están bien organizados para captar la atención del usuario y proporcionar información clara sobre la aplicación.

- **Colores**: Se utilizan colores definidos en el objeto `colores` para asegurar que el estilo sea consistente con la identidad de la marca.
- **Iconos**: Se utilizan iconos para mejorar la experiencia del usuario y hacer que la navegación sea más intuitiva.

### Funcionamiento

Cuando el usuario inicia la aplicación, verá las pantallas de introducción en orden. Al llegar a la última diapositiva y presionar el botón "hecho", se ejecutará la función `initialize`, que puede llevar al usuario a la pantalla principal de la aplicación.

### PaymentScreen.js

Este código implementa una pantalla de pago donde los usuarios pueden ingresar los datos de su tarjeta de crédito para completar un proceso de registro. A continuación se describen las secciones y funciones principales del componente `PaymentScreen`.

### Componentes Clave

1. **Importaciones**:
    - Se importan módulos de React, componentes de `react-native` y componentes personalizados como `Processing`, `Success`, `Error` y `CreditCardInput`.
    - Se extraen imágenes, iconos y colores de un archivo de constantes.
2. **Estado Inicial**:
    - Se define un estado inicial (`initialState`) que incluye propiedades como `processing`, `loading`, `success`, `error`, y los campos de la tarjeta de crédito (`cvc`, `expiry`, `name`, `number`, `valid`).
3. **Métodos de la Clase**:
    - **`pay`**: Este método se encarga de gestionar el proceso de pago. Valida los datos ingresados y realiza una solicitud a la API de Stripe para crear un `paymentIntent`.
        - Si los datos son inválidos o incompletos, se muestra una alerta correspondiente.
        - Si la validación es exitosa, se envía la información de la tarjeta de crédito a la API y se gestiona el estado de éxito o error basado en la respuesta de la API.
    - **`componentDidMount`**: Este método se ejecuta cuando el componente se monta. Aquí se agrega un listener para resetear el estado cada vez que la pantalla vuelve a estar en foco.
    - **`componentDidUpdate`**: Método que imprime el estado actual en la consola cada vez que se actualiza.
4. **Renderizado**:
    - **Éxito/Error**: Si el pago es exitoso o hay un error, se renderizan los componentes `Success` o `Error`, respectivamente.
    - **Interfaz de Usuario**:
        - Se muestra una vista principal con un fondo blanco.
        - Se incluye un componente `Processing` que se muestra mientras se procesa el pago.
        - Se proporciona un botón para regresar a la pantalla anterior.
        - Se incluye un `ScrollView` que permite ingresar los detalles de la tarjeta de crédito usando el componente `CreditCardInput`.
        - Un botón de "Aceptar" que, al presionarlo, llama al método `pay` para procesar el pago.

### Funcionamiento

Cuando el usuario navega a la pantalla de pago:

1. Se presenta un mensaje informativo sobre la cantidad a debitar.
2. Se solicita que ingrese los datos de su tarjeta de crédito.
3. Al hacer clic en el botón "Aceptar", se validan los datos y se realiza la transacción a través de la API de Stripe.
4. Dependiendo del resultado, se muestra una pantalla de éxito o un mensaje de error.

### Questions.js

### Descripción

El componente `Questions` permite a los usuarios enviar preguntas relacionadas con un comercio específico. Muestra las preguntas ya enviadas y permite a los usuarios registrados formular nuevas preguntas.

### Props

- **route**: Contiene los parámetros de navegación. Se espera que tenga el siguiente parámetro:
    - **commerceId**: El ID del comercio para el cual se están enviando las preguntas.
- **navigation**: Proporciona acceso a las funciones de navegación de React Navigation.

### Estado

El componente utiliza el siguiente estado interno:

- **loaded**: Un booleano que indica si las preguntas han sido cargadas.
- **questions**: Un arreglo que almacena las preguntas obtenidas del comercio.
- **message**: Una cadena que contiene el texto de la pregunta que el usuario desea enviar.
- **processing**: Un booleano que indica si se está procesando una solicitud (por ejemplo, al enviar una pregunta).

### Contexto

El componente utiliza un contexto (`Contexto`) que proporciona información sobre el usuario actual y su token de autorización.

### Funciones Principales

1. **handleSubmit**:
    - Envía una nueva pregunta al comercio.
    - Realiza validaciones para asegurarse de que el mensaje no esté vacío.
    - Muestra una alerta de éxito o error según el resultado de la operación.
2. **getQuestionsCommerce**:
    - Realiza una solicitud para obtener las preguntas ya enviadas al comercio especificado.
    - Actualiza el estado con las preguntas obtenidas.
3. **handleMount**:
    - Función que se ejecuta cuando el componente se monta. Llama a `getQuestionsCommerce` para cargar las preguntas.

### Efectos

- Utiliza `useFocusEffect` de React Navigation para cargar las preguntas cada vez que el componente obtiene foco.

### Renderizado

El componente renderiza:

- Una barra de encabezado que permite regresar a la pantalla anterior.
- Una lista de preguntas en un `ScrollView`. Si no hay preguntas, se muestra un mensaje indicando que no hay preguntas disponibles.
- Un campo de entrada para que los usuarios registrados puedan enviar nuevas preguntas, junto con un botón de envío.

### Ejemplo de Uso

```jsx
<Questions
    route={{ params: { commerceId: '12345' } }}
    navigation={navigation}
/>

```

### Notas

- Se requiere que el usuario esté autenticado para poder enviar preguntas.
- Se utilizan estilos de `react-native-paper` para una mejor presentación visual.

Aquí tienes una versión traducida de la sección de la documentación del componente `Register` en español:

---

### Register.js

El componente `Register` es una pantalla de registro que permite a los usuarios crear una nueva cuenta. Utiliza `React Native` y varios componentes de la biblioteca de `React Native Paper`. A continuación se detalla su implementación y funcionamiento.

### Estructura del Componente

1. **Imports**: El componente importa varias bibliotecas y componentes necesarios, incluyendo:
    - `React` y componentes básicos como `View`, `Text`, `TextInput`, `Image`, `TouchableOpacity`, etc.
    - Componentes personalizados como `Spinner`, `ErrorHandling`, `FacebookLogin`, `GoogleLogin`, y `AppleLogin`.
    - `WebBrowser` y `Linking` de `expo` para manejar la autenticación.
    - `Button` y `Appbar` de `react-native-paper` para botones y la barra de navegación.
    - Iconos de `MaterialCommunityIcons` para mostrar un icono de visibilidad de contraseña.
2. **Estado del Componente**:
    - Se inicializa el estado del componente con propiedades como `error`, `name`, `email`, `password`, `secureTextEntry`, `starting`, y `token`.
3. **Métodos**:
    - **endsWith**: Verifica si un token termina con `#_=_` y lo reemplaza.
    - **parseUrlParams**: Analiza los parámetros de la URL.
    - **verifyTokenAndAuth**: Verifica el token de autenticación y obtiene la información del usuario.
    - **openAuthSession**: Abre una sesión de autenticación en el navegador.
    - **getUserInfo**: Obtiene la información del usuario a través de una llamada API.
    - **register**: Envía una solicitud de registro a la API.
4. **Renderizado**:
    - Si hay un error, se muestra un componente de manejo de errores.
    - Si la solicitud está en progreso, se muestra un `Spinner` indicando que se está registrando al usuario.
    - En la vista de registro:
        - Se muestra una barra de navegación con un botón para regresar.
        - Se presenta un formulario que incluye campos para el nombre, correo electrónico y contraseña.
        - Se proporciona un botón para registrarse y opciones para iniciar sesión con redes sociales (Facebook, Google, y Apple).

### Search.js

El componente `Search` es una interfaz de usuario para permitir a los usuarios buscar comercios y categorías. Utiliza React Native y la biblioteca `react-native-paper` para ofrecer una experiencia fluida y moderna.

### Propiedades

Este componente no recibe propiedades explícitas, pero utiliza la navegación proporcionada por React Navigation a través de `this.props.navigation`.

### Estado Inicial

El componente mantiene un estado interno que se define en `initialState`:

- `text`: El texto ingresado por el usuario en el campo de búsqueda.
- `commerces`: Una lista de comercios obtenidos de la API.
- `categories`: Una lista de categorías obtenidas de la API.
- `tags`: Una lista de etiquetas, aunque no se usa en la implementación actual.
- `searching`: Un booleano que indica si se está realizando una búsqueda.
- `queryResult`: Almacena el resultado de la búsqueda.
- `error`: Indica si ocurrió un error durante la búsqueda.

### Métodos

- **`onChangeText(text)`**: Se activa cuando el usuario cambia el texto en el campo de búsqueda. Inicia una búsqueda con un retraso de 200 ms después de que el usuario deja de escribir.
- **`onSubmit()`**: Se llama cuando el usuario envía la búsqueda (presiona "Buscar" o la tecla de retorno). Navega a la pantalla `ShowCommerces` con las coordenadas y el texto de búsqueda.
- **`componentDidMount()`**: Se ejecuta cuando el componente se monta. Configura un listener para reiniciar el estado al volver a la pantalla de búsqueda.

### Renderizado

El componente renderiza lo siguiente:

1. **Encabezado de la Aplicación**: Utiliza `Appbar` de `react-native-paper` para el encabezado con un botón de retroceso y el título "Buscar".
2. **Campo de Búsqueda**: Un `TextInput` donde los usuarios pueden ingresar texto para buscar. Hay un botón que activa la búsqueda.
3. **Resultados de Búsqueda**:
    - Si el texto ingresado no está vacío, se muestra una lista de categorías y comercios que coinciden con la búsqueda.
    - Cada categoría y comercio se puede presionar para navegar a su respectiva pantalla.
    - Si no se encuentran resultados, se muestra una imagen de "no encontrado".
4. **Indicador de Carga**: Mientras se procesa la búsqueda, se muestra un `ActivityIndicator`.
5. **Mensajes de Búsqueda**: Mensajes orientativos para el usuario según el estado de la búsqueda.

### Estilos

Se aplican varios estilos a través de propiedades inline y estilos de componente para asegurar una presentación adecuada en diferentes dispositivos. Se utiliza `SafeAreaView` para garantizar que el contenido no se superponga con áreas no seguras.

### Dependencias

- `react-native-paper`: Para el componente de barra de aplicación.
- `react-native-vector-icons`: Para los íconos utilizados en la interfaz.
- `react-native`: Para los componentes básicos de la interfaz.

### ShowCommerces.js

El componente `ShowCommerces` es un componente de React Native que se encarga de mostrar una lista de comercios en función de la ubicación del usuario y los criterios de búsqueda proporcionados. Este componente permite la búsqueda, la clasificación y la visualización de los comercios en diferentes vistas (lista o mapa).

### Props

- `route`: Objeto que contiene los parámetros de navegación. Incluye:
    - `params`:
        - `text`: Texto de búsqueda inicial.
        - `destacados`: Booleano que indica si se deben mostrar comercios destacados.
- `navigation`: Propiedades de navegación que permiten la navegación hacia otras pantallas.

### Estado

- `commerceData`: Array que contiene los datos de los comercios.
- `searching`: Booleano que indica si se está realizando una búsqueda.
- `count`: Número total de comercios encontrados.
- `page`: Número de página actual para la paginación.
- `masResultados`: Booleano que indica si hay más resultados para cargar.
- `orderBy`: Criterio por el cual se ordenan los resultados (por distancia o calificación).
- `error`: Booleano que indica si se ha producido un error durante la búsqueda.
- `text`: Texto de búsqueda actual.
- `destacados`: Booleano que indica si se están mostrando los comercios destacados.
- `newResults`: Booleano que indica si hay nuevos resultados disponibles.
- `location`: Ubicación actual del usuario.
- `view`: Tipo de vista actual (lista o mapa).
- `orderModal`: Booleano que indica si el modal de ordenación es visible.
- `viewModal`: Booleano que indica si el modal de vista es visible.
- `latPromedio`, `lonPromedio`, `latDeltaPromedio`, `lonDeltaPromedio`: Parámetros relacionados con la ubicación media y el rango de distancia para la visualización de los comercios en el mapa.

### Métodos

- `getCommerces()`: Método asincrónico que obtiene los comercios desde una API en función de la ubicación y los parámetros de búsqueda.
- `onEndReached()`: Método que se llama cuando se alcanza el final de la lista, cargando más resultados si están disponibles.
- `fetchData()`: Método que reinicia el estado de los datos y vuelve a cargar los comercios.
- `reload()`: Método que actualiza la ubicación del usuario y recarga los datos.
- `handleFilter(orderParam)`: Método que maneja la ordenación de los comercios según el parámetro proporcionado.
- `handleView(viewType)`: Método que maneja el tipo de vista seleccionada (lista o mapa).
- `handleVisibleOrderModal()`: Método que muestra u oculta el modal de ordenación.
- `handleVisibleViewModal()`: Método que muestra u oculta el modal de vista.

### Renderizado

El componente renderiza:

- Un modal para seleccionar el criterio de ordenación de los comercios.
- Un modal para seleccionar el tipo de vista (lista o mapa).
- Una barra de navegación que muestra el número de comercios encontrados o el estado de búsqueda.
- Una lista de comercios que se pueden mostrar en función del estado del componente.

### Soporte.js

El componente `Soporte` permite a los usuarios enviar un ticket de soporte a la aplicación. Este formulario incluye campos para el nombre, correo electrónico, asunto, descripción y la opción de adjuntar una imagen.

### Estado

El componente mantiene el siguiente estado:

- **loaded**: Indica si los datos del usuario han sido cargados.
- **processing**: Indica si se está procesando el envío del ticket.
- **email**: Almacena el correo electrónico del usuario.
- **name**: Almacena el nombre del usuario.
- **subject**: Almacena el asunto del ticket.
- **description**: Almacena la descripción del problema.
- **image**: Almacena la imagen adjunta (si existe).

### Métodos

- **componentDidMount**: Se ejecuta al montar el componente, cargando el correo electrónico y el nombre del usuario desde el contexto.
- **pickImage**: Permite al usuario seleccionar una imagen de su galería. Utiliza el módulo `ImagePicker` de `expo-image-picker` para acceder a la biblioteca de imágenes. Si el usuario selecciona una imagen, se actualiza el estado con la información de la imagen seleccionada.
- **handleSubmit**: Se ejecuta al enviar el formulario. Crea un objeto `FormData` con los datos del formulario y envía una solicitud POST a la API para crear un nuevo ticket de soporte. Muestra un modal de carga mientras se procesa la solicitud y notifica al usuario cuando el ticket se ha creado con éxito.

### Renderizado

- **Modal de carga**: Se muestra un modal con un indicador de carga mientras se envía el ticket.
- **Encabezado de la barra de aplicación**: Contiene un botón de retroceso y un título que indica que se está creando un ticket.
- **Formulario de entrada**:
    - Campos para el correo electrónico, nombre, asunto y descripción.
    - Un botón para adjuntar imágenes.
    - Un texto que permite a los usuarios contactar directamente al soporte por correo electrónico.
- **Botón de envío**: Un botón que permite enviar el ticket.

### Stories.js

El componente `Stories` permite visualizar y gestionar historias de un local en la aplicación. Proporciona una interfaz para mostrar una lista de historias y eliminar las que el usuario seleccione.

### Propiedades

- **route**: Este objeto contiene información sobre la ruta actual, incluyendo parámetros que son necesarios para la funcionalidad del componente.
    - **params**:
        - **stories**: Un arreglo de historias que se mostrarán en la lista.
        - **afterDestroyStory**: Función que se ejecuta después de que se elimina una historia.

### Estado

- **processing**: Un booleano que indica si se está procesando una operación (como la eliminación de una historia). Se utiliza para mostrar un indicador de carga.

### Métodos

- **destroyStory(story_id)**:
    - **Descripción**: Envía una solicitud para eliminar una historia específica.
    - **Parámetros**:
        - `story_id`: El identificador de la historia que se desea eliminar.
    - **Uso**: Llama a este método al presionar el botón de eliminar en una historia. Se muestra un modal de carga mientras se procesa la solicitud. Una vez completada, se muestra un mensaje de confirmación y se regresa a la pantalla anterior.

### Renderizado

- El componente renderiza un encabezado con el título "Historias" y un botón de retroceso.
- Si hay historias disponibles, se muestran en una lista utilizando `FlatList`. Cada elemento de la lista incluye:
    - Una imagen de la historia.
    - Un tiempo que indica cuándo fue creada la historia.
    - Un botón para eliminar la historia, que muestra una alerta de confirmación antes de proceder a la eliminación.
- Si no hay historias disponibles, se muestra un mensaje informando que no se han subido historias en las últimas 24 horas, junto con una imagen representativa.

### Thread.js

El componente `Thread` se utiliza para mostrar un hilo de preguntas y respuestas en una aplicación React Native. Permite a los usuarios ver una pregunta, sus respuestas, y enviar nuevas respuestas. Además, proporciona la funcionalidad para eliminar preguntas si el usuario tiene los permisos adecuados.

### Props

- **route**: Contiene parámetros de navegación, incluyendo `questionId`, que se usa para cargar la pregunta específica.
- **navigation**: Proporciona funciones de navegación para permitir a los usuarios navegar entre pantallas.

### Estado Interno

- **loaded**: Indica si los datos han sido cargados.
- **question**: Almacena la pregunta cargada.
- **answers**: Contiene las respuestas a la pregunta.
- **users**: Almacena los usuarios que han respondido a la pregunta.
- **commerce**: Almacena información sobre el comercio relacionado con la pregunta.
- **answerMessage**: Almacena el mensaje de respuesta que el usuario está escribiendo.
- **processing**: Indica si se está procesando una acción (como enviar una respuesta o eliminar una pregunta).

### Funciones

- **getQuestion**: Realiza una solicitud a la API para obtener la pregunta y sus respuestas.
- **handleSubmitAnswer**: Envía la respuesta escrita por el usuario a la API y actualiza el estado con la nueva respuesta.
- **handleDestroy**: Elimina la pregunta si el usuario tiene los permisos necesarios, mostrando una alerta de confirmación antes de proceder.
- **isCommerceAdmin**: Verifica si el usuario actual es un administrador del comercio.
- **isQuestionOwner**: Verifica si el usuario actual es el propietario de la pregunta.
- **canAnswer**: Verifica si el usuario puede responder a la pregunta, basado en sus permisos.

### Efectos

Utiliza el hook `useFocusEffect` para cargar la pregunta y sus respuestas cada vez que el componente se enfoca, asegurando que los datos estén siempre actualizados.

### Renderizado

- **Modal de carga**: Muestra un indicador de actividad mientras se procesan las acciones.
- **Barra de navegación**: Permite al usuario regresar a la pantalla anterior.
- **Pregunta**: Muestra la pregunta cargada, junto con el avatar del usuario que la hizo y el tiempo desde su creación.
- **Respuestas**: Muestra una lista de respuestas utilizando el componente `AnswerItem`.
- **Formulario de respuesta**: Permite al usuario escribir y enviar su respuesta si tiene los permisos necesarios.

### TuNegocio.js

El componente `TuNegocio` es una interfaz de usuario diseñada para permitir a los usuarios registrar un nuevo negocio. Este componente incluye la recolección de datos importantes, como información del negocio, detalles del propietario, datos de contacto y selección de categorías.

### Props

El componente no recibe props externas, ya que utiliza el contexto para obtener la información del usuario y la ubicación.

### Estado Inicial

El estado inicial del componente incluye varias propiedades, entre las cuales se destacan:

- `success`: Indica si el registro se ha completado con éxito.
- `error`: Indica si hubo un error durante el proceso de registro.
- `processing`: Indica si el formulario está en proceso de envío.
- `loaded`: Indica si los datos requeridos han sido cargados.
- `multiselectVisible`: Controla la visibilidad del selector múltiple de categorías.
- `name`: Nombre del negocio.
- `user_name`: Nombre del propietario.
- `user_lastname`: Apellido del propietario.
- `user_email`: Correo electrónico del propietario.
- `telephone`: Número de teléfono.
- `info`: Detalles del establecimiento.
- `logo`: Logo del negocio.
- `photos`: Fotografías del establecimiento.
- `selectedCategories`: Categorías seleccionadas.
- `lat` y `lon`: Coordenadas geográficas del negocio.

### Métodos

- **`componentDidMount`**: Este método se ejecuta cuando el componente se monta. Se encarga de cargar las categorías disponibles desde la API y establecer la ubicación del usuario.
- **`handleSubmit`**: Este método se invoca al enviar el formulario. Verifica que todos los campos obligatorios estén completos y envía los datos a la API para registrar el negocio. Maneja la respuesta y muestra alertas en caso de error.
- **`handleDraggableMarker`**: Permite actualizar las coordenadas del negocio mediante un marcador en el mapa.
- **`pickImage`**: Permite seleccionar una imagen para el logo del negocio desde la galería.
- **`pickMultipleImages`**: Permite seleccionar múltiples imágenes para las fotos del establecimiento.
- **`handleVisible`**: Controla la visibilidad del selector múltiple de categorías.
- **`handleSetSelectedCategories`**: Actualiza el estado con las categorías seleccionadas.
- **`updateTagState`**: Actualiza el estado con las etiquetas que el usuario desee agregar.

### Integración

Este componente se integra en la aplicación utilizando el contexto para acceder a la ubicación del usuario y los datos de autenticación. Asegúrate de que el contexto esté correctamente configurado y que la API de backend esté disponible para manejar las solicitudes.

### ViewReport.js

El componente `ViewReport` es una vista que muestra un informe de visitas para un comercio específico. Utiliza un gráfico de líneas para representar las visitas del primer y segundo semestre del año. A continuación se describen sus características, estado y funciones principales.

## Importaciones

```jsx
import React, { useState, useCallback, useEffect, useContext } from "react";
import { View, Image, Text, ScrollView, StatusBar } from 'react-native';
import { LineChart, Spinner } from "../components";
import { useFocusEffect } from "@react-navigation/native";
import { NumericFormat } from 'react-number-format';
import { Contexto } from "../functions/Context";
import { Appbar } from "react-native-paper";
import { MaterialCommunityIcons } from '@expo/vector-icons';

```

## Estado del Componente

El componente utiliza varios estados locales para almacenar datos:

- **primerSemestre**: Array de nombres de meses del primer semestre.
- **dataPrimerSemestre**: Datos para el gráfico del primer semestre.
- **segundoSemestre**: Array de nombres de meses del segundo semestre.
- **dataSegundoSemestre**: Datos para el gráfico del segundo semestre.
- **visitasTotales**: Número total de visitas.
- **likes**: Número de favoritos.
- **loaded**: Booleano que indica si los datos han sido cargados.
- **commerce**: Información sobre el comercio.
- **commerce_id**: ID del comercio recibido como parámetro de ruta.

## Funciones Principales

### fetchData

```jsx
const fetchData = async () => {
  await fetch(`${EXPO_PUBLIC_API_URL}/api/auth/visits?commerce_id=${commerce_id}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Authorization': contexto?.token
      }
  })
  .then(res => res.json())
  .then((res) => {
      console.log(res);
      setVisitasTotales(res.visitasTotales);
      setLikes(res.likes);
      setDataSegundoSemestre(res.segundoSemestreData);
      setDataPrimerSemestre(res.primerSemestreData);
      setCommerce(res.commerce);
  })
  .catch(e => console.log(e));
}

```

Esta función se encarga de realizar una solicitud GET al servidor para obtener datos de visitas y favoritos del comercio especificado por `commerce_id`. Actualiza los estados locales con los datos recibidos.

### useFocusEffect

```jsx
useFocusEffect(useCallback(() => {
    setLoaded(false);
    fetchData();
}, [commerce_id]));

```

Se utiliza para cargar los datos cada vez que la vista entra en foco. Cuando la vista se vuelve activa, se restablece `loaded` a `false` y se llama a `fetchData`.

### useEffect

```jsx
useEffect(() => {
    dataPrimerSemestre?.length > 0 && setLoaded(true);
}, [dataPrimerSemestre]);

```

Este efecto se ejecuta cuando `dataPrimerSemestre` cambia. Si hay datos en el primer semestre, actualiza `loaded` a `true`, lo que indica que los datos se han cargado.

## Renderización

La interfaz de usuario se compone de:

- Un encabezado (`Appbar.Header`) con un botón de retroceso y el título "Reporte de Visitas".
- Un componente `ScrollView` que contiene la información del comercio, incluyendo:
    - Logo del comercio.
    - Total de visitas y favoritos, utilizando `NumericFormat` para formatear los números.
    - Gráficos de líneas para el primer y segundo semestre, representados por el componente `LineChart`.

Si `loaded` es `false`, se muestra un componente `Spinner` que indica que los datos se están cargando.

## Estilos

Los estilos están implementados inline y se utilizan para definir la apariencia de la vista, incluyendo:

- Colores de fondo.
- Espaciados y márgenes.
- Estilos de texto y contenedores.

## Exportación

```jsx
export default ViewReport;
```

El componente se exporta como el valor predeterminado para su uso en otras partes de la aplicación.

---

## 4. Carpeta `constants`

La carpeta `constants` es un lugar designado para almacenar valores constantes que son utilizados en toda la aplicación. Al mantener estos valores centralizados, se mejora la mantenibilidad del código y se facilita su modificación si es necesario.

### index.js

El archivo `index.js` en la carpeta `constants` actúa como un punto de entrada que agrupa y exporta todos los valores constantes de la carpeta. Esto simplifica la importación de constantes en otras partes de la aplicación, permitiendo un acceso más fácil y organizado a las diferentes constantes que se utilizan a lo largo del proyecto.

### Estructura del Archivo

El archivo `index.js` contiene las siguientes importaciones y exportaciones:

```jsx
import icons from "./Icons";
import images from "./Images";
import { colores, tamaños, fuentes } from "./Theme";

export { icons, images, colores, tamaños, fuentes };

```

### Descripción de las Importaciones

1. **`import icons from "./Icons";`**
    - Importa un conjunto de íconos definidos en el archivo `Icons.js`. Estos íconos pueden ser utilizados en la interfaz de usuario para mejorar la experiencia visual y funcional de la aplicación.
2. **`import images from "./Images";`**
    - Importa un conjunto de imágenes definidas en el archivo `Images.js`. Estas imágenes pueden incluir logotipos, ilustraciones, y cualquier otra gráfica que se requiera en la aplicación.
3. **`import { colores, tamaños, fuentes } from "./Theme";`**
    - Importa tres grupos de constantes desde el archivo `Theme.js`:
        - **`colores`**: Define los colores que se utilizan en la aplicación, como el color de fondo, texto, y otros elementos de diseño.
        - **`tamaños`**: Define los tamaños utilizados en la aplicación, como márgenes, paddings y dimensiones de componentes.
        - **`fuentes`**: Define las fuentes tipográficas utilizadas en la aplicación, asegurando consistencia en los estilos de texto.

### Descripción de las Exportaciones

El archivo exporta los siguientes elementos:

- **`icons`**: Un objeto que contiene todos los íconos importados desde el archivo `Icons.js`. Permite acceder a los íconos en cualquier parte de la aplicación.
- **`images`**: Un objeto que contiene todas las imágenes importadas desde el archivo `Images.js`. Facilita el uso de imágenes en toda la aplicación.
- **`colores`**: Un objeto que contiene todas las constantes de color definidas en `Theme.js`. Se puede usar para aplicar estilos de color coherentes en los componentes.
- **`tamaños`**: Un objeto que contiene todas las constantes de tamaño definidas en `Theme.js`. Permite utilizar dimensiones estándar en toda la aplicación.
- **`fuentes`**: Un objeto que contiene todas las constantes de fuente definidas en `Theme.js`. Asegura que se utilicen las mismas fuentes en toda la interfaz de usuario.

### Conclusión

El archivo `index.js` en la carpeta `constants` es fundamental para la organización y la eficiencia de las importaciones en la aplicación. Actúa como un punto central para acceder a todos los íconos, imágenes, colores, tamaños y fuentes, facilitando la consistencia y mantenibilidad del código en el desarrollo de la interfaz de usuario.

## 5. Carpeta `functions`

La carpeta `functions` contiene funciones reutilizables que se utilizan en diferentes partes de la aplicación. Este enfoque promueve la modularidad y la mantenibilidad del código, permitiendo que las funciones se importen fácilmente donde se necesiten.

### Estructura del Archivo `index.js`

El archivo `index.js` actúa como un punto de entrada para exportar las funciones definidas en la carpeta. Aquí está la estructura del archivo:

```jsx
import isLiked from "./isLiked";
import checkForUpdates from "./checkForUpdates";
import distanceBetweenTwoPoints from "./distanceBetweenTwoPoints";
import { getRegion, maxDistance } from './functionsMapView';

export { isLiked, checkForUpdates, distanceBetweenTwoPoints, getRegion, maxDistance };

```

### Descripción de las Funciones Importadas

1. **`isLiked`**
    - Esta función se encarga de verificar si un Comercio ha sido marcado como "me gusta" por un usuario. Puede utilizarse para gestionar la interacción del usuario y personalizar la experiencia en la interfaz.
2. **`checkForUpdates`**
    - Esta función comprueba si hay actualizaciones disponibles para la aplicación o algún componente específico. Se puede utilizar para notificar a los usuarios sobre la disponibilidad de nuevas características o correcciones de errores.
3. **`distanceBetweenTwoPoints`**
    - Calcula la distancia entre dos puntos geográficos dados sus coordenadas (latitud y longitud). Es útil en aplicaciones que requieren cálculos de distancia, como mapas o servicios basados en ubicación.
4. **`getRegion`**
    - Esta función obtiene información sobre una región geográfica específica, en relación con mapas o datos de ubicación. Facilita la manipulación y visualización de datos geográficos en la aplicación.
5. **`maxDistance`**
    - Define la distancia máxima permitida para ciertas operaciones, como la búsqueda de comercios o servicios dentro de un rango específico. Puede ayudar a optimizar las consultas y mejorar la experiencia del usuario al limitar los resultados según la proximidad.

### Conclusión

La carpeta `functions` proporciona un conjunto de utilidades que simplifican el desarrollo de la aplicación. Al exportar funciones desde `index.js`, se garantiza que se puedan importar y utilizar de manera eficiente en diferentes módulos, fomentando la reutilización del código y mejorando la organización del proyecto. Esta estructura es clave para mantener un código limpio y fácil de entender a medida que la aplicación crece y evoluciona.

## 6. Carpeta `components`

La carpeta `components` contiene una serie de componentes reutilizables que encapsulan funcionalidades específicas dentro de la aplicación. Estos componentes se utilizan en diversas partes de la interfaz de usuario para mejorar la modularidad, reutilización del código y mantener un diseño consistente a lo largo de la aplicación.

### Estructura del Archivo `index.js`

El archivo `index.js` de esta carpeta actúa como un punto central donde se importan y exportan todos los componentes disponibles, facilitando su uso en otros módulos de la aplicación. Esto permite que los desarrolladores puedan importar directamente cualquier componente desde la carpeta `components` sin tener que referirse a los archivos individuales de cada componente.

```jsx
import CustomDrawer from "./CustomDrawer";
import Error from "./Error";
import LoadingLottie from "./LoadingLottie";
import MultiSelect from "./MultiSelect";
import Processing from "./Processing";
import Success from "./Success";
import SearchingCommerces from "./SearchingCommerces";
import Spinner from "./Spinner";
import ErrorHandling from "./ErrorHandling";
import SuccessHandling from "./SuccessHandling";
import MapViewDirections from "./MapViewDirections";
import InstaStory from "./InstaStory";
import FacebookLogin from './FacebookLogin';
import GoogleLogin from './GoogleLogin';
import { CreditCardInput } from './react-native-credit-card-input';
import TagInput from './react-native-tags-input';
import ComerciosAsociadosList from './ComerciosAsociadosList';
import Reestablecer from './Reestablecer';
import VistaMapa from './VistaMapa';
import LineChart from './LineChart';
import CommercesList from './CommercesList';
import CartExcerpt from './CartExcerpt';
import SliderComponent from './SliderComponent';
import Pricing from './Pricing';
import AppleLogin from './AppleLogin';
import SwipeDownModal from "./SwipeDownModal";
import Horario from "./Horario";
import Notification from "./Notification";
import QuestionOnCommerce from "./questions/QuestionOnCommerce";
import PcategoriesModal from "./products/PcategoriesModal";

export {
    CustomDrawer,
    Error,
    LoadingLottie,
    MultiSelect,
    Processing,
    Success,
    SearchingCommerces,
    Spinner,
    ErrorHandling,
    SuccessHandling,
    MapViewDirections,
    InstaStory,
    GoogleLogin,
    FacebookLogin,
    AppleLogin,
    CreditCardInput,
    TagInput,
    ComerciosAsociadosList,
    Reestablecer,
    VistaMapa,
    LineChart,
    CommercesList,
    CartExcerpt,
    SliderComponent,
    Pricing,
    SwipeDownModal,
    Horario,
    Notification,
    QuestionOnCommerce,
    PcategoriesModal
}

```

### Descripción de los Componentes

1. **`CustomDrawer`**
    - Un componente de menú lateral personalizado (drawer), que permite una navegación intuitiva y rápida dentro de la aplicación.
2. **`Error`**
    - Componente que muestra mensajes de error en caso de que algo salga mal en la aplicación, proporcionando una experiencia de usuario clara y comprensible.
3. **`LoadingLottie`**
    - Un componente que utiliza animaciones Lottie para indicar que algo está cargando. Mejora la estética visual durante procesos que tardan un poco.
4. **`MultiSelect`**
    - Proporciona una interfaz para seleccionar múltiples opciones de una lista, comúnmente usado en formularios o filtros.
5. **`Processing`**
    - Componente de procesamiento que muestra una animación o mensaje indicando que una tarea está en progreso.
6. **`Success`**
    - Componente que muestra mensajes de éxito después de que una operación se haya completado correctamente.
7. **`SearchingCommerces`**
    - Muestra un indicador de búsqueda mientras la aplicación busca comercios.
8. **`Spinner`**
    - Indicador de carga circular que se utiliza para mostrar que un proceso está en marcha.
9. **`ErrorHandling`**
    - Componente encargado de manejar errores, mostrando mensajes claros cuando ocurre un fallo inesperado.
10. **`SuccessHandling`**
    - Gestiona y muestra notificaciones de éxito tras la realización de una acción.
11. **`MapViewDirections`**
    - Componente que facilita la visualización de rutas en mapas, útil para indicar direcciones entre dos puntos geográficos.
12. **`InstaStory`**
    - Un componente para mostrar historias al estilo de Instagram, utilizado para mostrar contenido de manera atractiva y rápida.
13. **`GoogleLogin` y `FacebookLogin`**
    - Estos componentes facilitan la autenticación a través de Google y Facebook, proporcionando un acceso rápido y seguro para los usuarios.
14. **`AppleLogin`**
    - Componente de autenticación que permite a los usuarios iniciar sesión a través de Apple ID.
15. **`CreditCardInput`**
    - Un componente para la entrada de información de tarjetas de crédito, usado en el flujo de pago.
16. **`TagInput`**
    - Entrada de etiquetas o palabras clave, útil en formularios que requieren categorizar o añadir varios términos.
17. **`ComerciosAsociadosList`**
    - Muestra una lista de comercios asociados, proporcionando un listado visual de las opciones disponibles para los usuarios.
18. **`Reestablecer`**
    - Componente relacionado con la funcionalidad de restablecer contraseñas u otros elementos dentro de la aplicación.
19. **`VistaMapa`**
    - Un componente para la visualización de mapas interactivos, útil para ubicaciones y navegación.
20. **`LineChart`**
    - Muestra gráficos de líneas, comúnmente usados para visualizaciones de datos, como tendencias de ventas o estadísticas.
21. **`CommercesList`**
    - Lista de comercios, mostrando un resumen de cada comercio disponible en la plataforma.
22. **`CartExcerpt`**
    - Muestra un resumen del carrito de compras, permitiendo al usuario ver un resumen rápido de sus productos antes de finalizar la compra.
23. **`SliderComponent`**
    - Un componente de carrusel o "slider" que muestra múltiples elementos desplazables, ideal para galerías de productos o promociones.
24. **`Pricing`**
    - Muestra la estructura de precios o detalles de costos de los productos o servicios.
25. **`SwipeDownModal`**
    - Modal que se cierra al deslizar hacia abajo, usado para mostrar información temporal o ventanas emergentes.
26. **`Horario`**
    - Componente para gestionar y mostrar horarios, útil para definir las horas de apertura de comercios.
27. **`Notification`**
    - Maneja las notificaciones dentro de la aplicación, mostrando alertas o recordatorios a los usuarios.
28. **`QuestionOnCommerce`**
    - Componente para manejar preguntas relacionadas con comercios específicos, permitiendo a los usuarios enviar y ver preguntas/respuestas.
29. **`PcategoriesModal`**
    - Modal para la gestión de categorías de productos, facilitando la selección o filtrado de categorías en vistas de productos.

### Conclusión

La carpeta `components` alberga componentes reutilizables y clave para la experiencia de usuario en la aplicación. Al agruparlos de manera modular y exportarlos desde un único archivo `index.js`, se simplifica su integración en diferentes partes de la aplicación. Esto no solo mejora la organización del proyecto, sino que también optimiza el flujo de trabajo de desarrollo, al permitir que los componentes sean fácilmente accesibles y mantenibles.