# Guía de contribución

¡Gracias por tu interés en mejorar **Juego de la Pelota Saltarina (`pelotaaa`)**!

## Flujo de trabajo con Git

1. Crea una rama descriptiva a partir de `main`:
   - `feat/<nombre>` para nuevas funcionalidades.
   - `fix/<nombre>` para corrección de errores.
   - `docs/<nombre>` para cambios de documentación.
   - `refactor/<nombre>` para refactorizaciones sin cambios funcionales.
2. Mantén los cambios enfocados y atómicos (un propósito por commit).
3. Verifica manualmente el juego en el navegador antes de abrir un Pull Request.

## Estándar de mensajes de commit

Este repositorio sigue la especificación [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):

```text
<tipo>[ámbito opcional]: <descripción corta en imperativo>

[cuerpo opcional]
```

### Tipos permitidos

| Tipo | Uso |
| :--- | :--- |
| `feat` | Nueva característica o mecánica de juego |
| `fix` | Corrección de un fallo |
| `docs` | Cambios exclusivos en documentación |
| `style` | Formato, espacios o ajustes visuales sin cambio de lógica |
| `refactor` | Reestructuración de código o archivos sin cambiar comportamiento |
| `perf` | Mejoras de rendimiento |
| `chore` | Mantenimiento, configuración o `.gitignore` |

### Ejemplos

- `feat(gameplay): add double jump power-up`
- `fix(collision): prevent edge clipping on tall obstacles`
- `docs: update controls table in README`
- `refactor(structure): move project files from Una pelotaaaa/ to repository root`
