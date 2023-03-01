![github-image-magneto-min](https://user-images.githubusercontent.com/83787591/221999916-7684851f-19ba-47a8-9aeb-43b15faa3764.jpg)


# Astro Magneto
Let an element follow the mouse cursor with a graceful and smooth motion.

### [Live Demo](https://stackblitz.com/edit/withastro-astro-hjhuav?file=src%2Fpages%2Findex.astro)

## Instalation
> using npm
```
npm install astro-magneto
```
> using pnpm
```
pnpm add astro-magneto
```

## Possible Props 
If Visual Studio Code is your preferred IDE, simply press CRTL+SPACE / CMD+SPACE to reveal the valid properties.
- **class** [sting] 
- **options** [object]
- **transition** [object]

| Property           | Object    | Type              | Default | Desctription                                         |
| ------------------ | :-------: | :---------------: | :-----: | ---------------------------------------------------- |
| class              | -         | string            | -       | Add classes to the element                           |
| triggerArea        | options   | number            | 100     | Element follows the mouse cursor in this range (around the element) |
| movementRatio      | options   | 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8 | 0.5 | The triggerArea size directly affects the element's movement area, determining the space in which the element can be repositioned. |
| rootMargin         | options   | string | 0px | IntersectionObserver rootMargin option |
| threshold          | options   | number | 0.5 | IntersectionObserver threshold option  |
| duration           | transition | string | 250ms | Element speed to base position  |
| timing             | transition | string | ease  | Transition timing function  |
| delay              | transition | string | 0s  | Transition timing function  |


## How to use
```html
---
import { Magneto } from 'astro-magneto';
---

<div>

  <!-- basic -->
  <Magneto>
    <button type="button">Click Me</button>
  </Magneto>

  <!-- using class with tailwind -->
  <Magneto class="text-red-500">
    <button type="button">Click Me</button>
  </Magneto>

  <!-- using options -->
  <Magneto 
    options={{ 
      triggerArea: 200,
      movementRatio: 0.8,
      rootMargin: '100px 0px',
      threshold: 1
    }}
  >
    <button type="button">Click Me</button>
  </Magneto>

  <!-- using transition -->
  <Magneto 
    transition={{ 
      duration: '500ms',
      timing: 'linear',
      delay: '5s'
    }}
  >

</div>
```

> Keep in mind that Magneto use the mousemove event, if the element is in the given (rootMargin, threashold) range.
> Additionally, the mousemove event will be automatically disabled once the element moves out of the viewport.
