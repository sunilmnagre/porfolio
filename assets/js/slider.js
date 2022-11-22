let slideIndex = 1;
showSlides('sliderMSSP', slideIndex);
showSlides('sliderADTV', slideIndex);
showSlides('conteNXT', slideIndex);


function plusSlides(className, n) {
  showSlides(className, slideIndex += n);
}

function currentSlide(n) {
  showSlides(className, slideIndex = n);
}

function showSlides(className, n) {
  let i;
  let slides = document.getElementsByClassName(className);
  if (n > slides.length) { slideIndex = 1 }
  if (n < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
}