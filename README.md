“Work in progress. README will be completed during final delivery.”

# Aplicación web para la gestión de asesoría laboral

> _TODO_: Este documento será la "_página de aterrizaje_" de tu proyecto. Será lo primero que vean los que se interesen por él. Cúida su redacción con todo tu mimo. Elimina posteriormente todas las lineas "_TODO_" cuando creas finalizada su redacción.
> Puedes acompañar a la redacción de este fichero con imágenes o gifs, pero no abuses de ellos.

## Descripción

Este proyecto consiste en el desarrollo de una aplicación web orientada a apoyar la gestión interna de una asesoría laboral. La aplicación permite organizar de forma estructurada la información relacionada con empresas, autónomos y trabajadores, así como realizar el seguimiento de incidencias laborales habituales como altas, bajas, vacaciones, incapacidades temporales o variaciones de datos.

El objetivo principal es centralizar la información laboral en un único entorno accesible, facilitando la consulta del estado de las gestiones y mejorando la organización del trabajo diario tanto para la asesoría como para sus clientes. La aplicación no realiza trámites oficiales con la administración, sino que actúa como una herramienta de apoyo y control interno, utilizando datos de prueba en un contexto académico.

Este proyecto se desarrolla como parte del Proyecto Fin de Ciclo y sirve como ejercicio práctico de análisis, diseño y desarrollo de una aplicación web moderna, aplicando buenas prácticas de programación, documentación y control de versiones.

Actualmente se encuentra en fase de prototipo funcional (Prototipo 1).

> _TODO_: Realiza una breve descripción del proyecto. No menos de 100 palabras y no más de 300. Resalta lo fundamental **con tus propias palabras**. Utiliza un lenguaje correcto, **pero natural**, que lo entienda todo el mundo, incluso y en especial, las personas que no tengan un conocimiento técnico avanzado. Puede ser un estracto o resumen de apartados que ya contemples en otros ficheros.

## Instalación / Puesta en marcha

La aplicación está pensada para ejecutarse en un entorno local de desarrollo.

### Requisitos previos

- Node.js (versión LTS recomendada)
- npm
- Git

### Pasos de instalación

1. Clonar el repositorio:

```bash
git clone https://gitlab.iessanclemente.net/dawd/a25daviddt.git
```

2. Acceder al directorio del frontend

```bash
cd a25daviddt/frontend
```

3. Instalar las dependencias

```bash
npm install
```

4. Ejecutar el servidor de desarrollo

```bash
npm run dev
```

5. La consola mostrará la direión URL en la que estará disponible, generalmente:

```bash
➜  Local:   http://localhost:5173/
```

> _TODO_: En este apartado describe con toda precisión y a poder ser con la mayor simplicidad/facilidad posible, cómo poner en marcha tu aplicación para probarla (en un ambiente local). Se valorará muy positivamente que este proceso sea lo más fácil posible, con una simple instrucción (p. e. un script de instalación). Docker es ideal para esto.

## Uso

La _aplicación_ ofrece una interfaz web accesible desde el navegador.

- Los usuarios no autenticados pueden acceder a la parte **pública** del sitio, donde se presenta la información general del proyecto.
- Tras **iniciar sesión**, el usuario accede a un **panel principal (dashboard)** desde el que puede:
  - Consultar sus empresas o clientes asociados.
  - Gestionar trabajadores.
  - Registrar y realizar seguimiento de incidencias laborales.
  - Acceder a información de perfil y preferencias.

- El uso está orientado a la **consulta** y **organización** de la información, no a la realización de trámites oficiales.

> _TODO_: Es este apartado describe brevemente cómo se usará este software. Plantea un uso básico (como un _quickstart_) Si tiene una interfaz de terminal, puedes describir aquí su sintaxis. Si tiene una interfaz gráfica de usuario, describe aquí **sólo el uso** (a modo de sumario) **de los aspectos más relevantes de su funcionamiento** (máxima brevedad, como si fuese un anuncio reclamo o comercial).
> Podrías incluso hacer una pequeña demo en _gif_ o un pantallazo de la misma muy descriptivo. Recueda que esto es un reclamo para que la prueben o lean tu documentación más extensa.

## Sobre el autor

#### David Docampo Trabazo

Estudiante de **Desarrollo de Aplicaciones Web**, con especial interés en el **desarrollo frontend** y en la arquitectura de aplicaciones web. Actualmente trabajo principalmente con tecnologías como **HTML**, **CSS** y **JavaScript**, aplicadas al desarrollo de interfaces modernas mediante **React**.

En el ámbito del backend y la persistencia de datos, utilizo **Node.js** junto con **Express** para la creación de APIs REST, y **PostgreSQL** como sistema gestor de bases de datos relacional. Estas tecnologías constituyen la base técnica principal del proyecto.

La elección de este proyecto responde al interés por aplicar los conocimientos adquiridos a un contexto realista, relacionado con la gestión laboral y administrativa, combinando análisis funcional, diseño de interfaces y desarrollo web dentro de un entorno académico.

> _TODO_: Realiza una breve descripción de quien eres (perfil profesional), tus puntos fuertes, o tecnologías que más dominas... y porqué te has decantado por este proyecto. **No más de 200 palabras**. Indica la forma fiable de contactar contigo en el presente y en el futuro.

## Licencia

Este proyecto se distribuye bajo la licencia **MIT**, una licencia de software libre que permite el uso, modificación y redistribución del código, siempre que se mantenga el aviso de copyright original.

El texto completo de la licencia puede consultarse en el archivo [LICENSE](LICENSE) incluido en la raíz del repositorio.

> _TODO_: Brevísimamente. Indica qué licencia usarás y crea un link a ella. Hay miles de ejemplos en Github.
> _TODO_: Es requisito INDISPENSABLE el licenciar explícitamente el proyecto software. Se recomienda licenciar con _MIT License_ (como viene en la plantilla) o _GNU Free Documentation License Version 1.3_. Presencia de un fichero `LICENSE` en la raiz del repo, con tu fichero de licencia. Recuerda que si empleas una licencia de software libre estás autorizando la derivación de tu obra bajo la misma licencia que elijas, pudiendo dar continuidad, p. e. otro alumno, para continuar tu proyecto en otro curso.
> Si tu proyecto tiene además otro tipo contenido documental, recomendamos los términos de _GNU Free Documentation License Version 1.3_, crea igualmente el fichero `LICENSE`. Será especialmente valorado en este caso, la claridad de la especificación para que el proyecto pueda ser ejecutado partiendo de lo proyectado.
> Ten en cuenta que estás cediendo el uso de este software y sus subproductos generados a la comunidad.

## Documentación

> _TODO_: Emplaza a quien se haya interesado en tu proyecto a leer una guía o documentación extendida del mismo. Haz un link a ella en este punto.

## Documentación

La documentación técnica y funcional del proyecto se encuentra desarrollada en un documento independiente, donde se detallan el análisis, el diseño, la planificación y las decisiones técnicas adoptadas.

Puede consultarse en el siguiente enlace:

[Documentación del proyecto](doc/doc.md)

## Guía de contribución

Este proyecto tiene un carácter **académico** y forma parte de un Proyecto Fin de Ciclo. No obstante, cualquier sugerencia de mejora, corrección o ampliación puede proponerse mediante revisiones del código o comentarios, siempre respetando el alcance definido en la documentación.

> _TODO_: Tratándose de un proyecto de software libre, es muy importante que expongas cómo se puede contribuir con tu proyecto. Algunos ejemplos de esto son realizar nuevas funcionalidades, corrección y/u optimización del código, realización de tests automatizados, nuevas interfaces de integración, desarrollo de plugins, etc. etc. Sé lo más conciso que puedas.
