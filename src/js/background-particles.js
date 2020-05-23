import Particles from 'particlesjs';
window.onload = function () {
  Particles.init({
    selector: '.background',
    color: '#ffffff',
    connectParticles: true,
    maxParticles: 120,
    responsive: [
      {
        breakpoint: 768,
        options: {
          maxParticles: 70,
        },
      },
    ],
  });
};
