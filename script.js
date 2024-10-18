document.addEventListener('DOMContentLoaded', function () {
    const totalImages = 121;
    const carousel = document.getElementById('carousel');
    let slideIndex = 0;
    let startX = 0;
    let currentX = 0;

    // Cargar las imágenes en el carrusel
    for (let i = 1; i <= totalImages; i++) {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        
        const imageName = `img${i}.png`;
        const imagePath = `/images/${imageName}`;

        // Solo se agrega la imagen sin el precio ni la consulta
        slide.innerHTML = `
            <img src="${imagePath}" alt="Product ${i}">
        `;
        carousel.appendChild(slide);
    }

    setupCarousel();

    function setupCarousel() {
        document.querySelector('.next').addEventListener('click', () => showSlide(slideIndex + 1));
        document.querySelector('.prev').addEventListener('click', () => showSlide(slideIndex - 1));

        // Manejo de gestos táctiles
        carousel.addEventListener('touchstart', handleTouchStart, false);
        carousel.addEventListener('touchmove', handleTouchMove, false);
        carousel.addEventListener('touchend', handleTouchEnd, false);
    }

    function showSlide(index) {
        const slides = document.querySelectorAll('.carousel-slide');
        const nextButton = document.querySelector('.next');
        const prevButton = document.querySelector('.prev');

        // Verificar si se está en el último o primer slide
        if (index >= slides.length - 1) {
            showNotification(); // Mostrar notificación al llegar al último slide
            nextButton.disabled = true;
            index = slides.length - 1; // Mantener el índice en el último slide
        } else {
            nextButton.disabled = false;
        }

        if (index <= 0) {
            prevButton.disabled = true;
            index = 0; // Mantener el índice en el primer slide
        } else {
            prevButton.disabled = false;
        }

        slideIndex = index; // Actualizar el índice del slide
        document.getElementById('carousel').style.transform = `translateX(${-slideIndex * 100}%)`;
    }

    // Manejo de gestos táctiles
    function handleTouchStart(evt) {
        startX = evt.touches[0].clientX;
    }

    function handleTouchMove(evt) {
        currentX = evt.touches[0].clientX;
    }

    function handleTouchEnd() {
        const diffX = startX - currentX;

        if (Math.abs(diffX) > 50) { // Si el desplazamiento es mayor a 50px
            if (diffX > 0) {
                if (slideIndex < totalImages - 1) { // Solo avanza si no está en el último slide
                    showSlide(slideIndex + 1); 
                } else {
                    showNotification(); // Mostrar notificación cuando llega al último slide con gestos táctiles
                }
            } else {
                if (slideIndex > 0) { // Solo retrocede si no está en el primer slide
                    showSlide(slideIndex - 1);
                }
            }
        }
    }

    // Función para mostrar la notificación de final de carrusel
    function showNotification() {
        const notification = document.getElementById('notification');
        notification.classList.add('show');

        setTimeout(() => {
            notification.classList.remove('show');
        }, 3000); // La notificación desaparece después de 3 segundos
    }
});
