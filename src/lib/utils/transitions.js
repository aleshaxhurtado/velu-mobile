export function slideTransition(node, { direction = 'left' } = {}) {
  return {
    duration: 300,
    easing: (t) => t * (2 - t),
    css: (t) => {
      const x = direction === 'left' ? (1 - t) * 100 : (t - 1) * 100;
      return `transform: translateX(${x}%); opacity: ${t};`;
    },
  };
}
