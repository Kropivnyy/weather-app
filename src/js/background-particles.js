import Particles from 'particlesjs';

window.onload = function () {
  Particles.init({
    selector: '.background-particles',
    color: '#ffffffaa',
    maxParticles: 210,
    sizeVariations: 6,
    responsive: [
      {
        breakpoint: 1279,
        options: {
          maxParticles: 0,
        },
      },
    ],
  });
};
