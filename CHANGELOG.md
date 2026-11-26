# Changelog

Todos los cambios notables de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.1.0/),
y este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/).

## [Unreleased]

### Changed

- Reorganizada la estructura del repositorio moviendo `index.html`, `style.css`, `script.js` y `README.md` desde `Una pelotaaaa/` a la raíz del proyecto.

### Added

- Añadido `.gitignore` para excluir archivos de sistema operativo y editores.
- Añadida documentación completa en `README.md`.
- Añadida guía de contribución (`CONTRIBUTING.md`) y registro de cambios (`CHANGELOG.md`).

## [1.0.0] - Versión inicial

### Added

- Juego 2D *Juego de la Pelota Saltarina* en HTML5 Canvas (`index.html`, `style.css`, `script.js`).
- Física de salto, rotación proporcional a la velocidad y obstáculos procedimentales en dos tamaños.
- Detección de colisiones círculo-rectángulo, incremento progresivo de velocidad cada 50 puntos y persistencia de récord con `localStorage`.
- Soporte de controles por teclado (`Space`, `ArrowUp`), ratón y eventos táctiles (`pointerdown`).
