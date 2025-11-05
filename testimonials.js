const track = document.getElementById('testimonial-track');
const testimonials = document.querySelectorAll('.testimonial');
let index = 0;

// Fonction pour récupérer la largeur d'une carte + margin droit
function getTestimonialWidth() {
  const style = window.getComputedStyle(testimonials[0]);
  const marginRight = parseInt(style.marginRight) || 0;
  return testimonials[0].offsetWidth + marginRight;
}

function slideTestimonials() {
  index++;
  if (index >= testimonials.length) index = 0;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${getTestimonialWidth() * index}px)`;
}

// Slide automatique toutes les 3 secondes
let interval = setInterval(slideTestimonials, 3000);

// Ajuster si la fenêtre change de taille
window.addEventListener('resize', () => {
  track.style.transition = "none"; // désactive temporairement la transition
  track.style.transform = `translateX(-${getTestimonialWidth() * index}px)`;
  setTimeout(() => track.style.transition = "transform 0.5s ease", 50); // réactive transition
});
