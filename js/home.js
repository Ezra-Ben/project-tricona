
const Btn = document.querySelector('.testimonial-area');
const quote = document.querySelector('.quote');
const person = document.querySelector('.person');

const Testimonials = [
  {
    quote: "\"Trinity College Nabbingo taught me discipline, resilience, and the importance of faith in everything I do. It wasn't just a school — it was home.\"",
    person: "- Rebecca M., Class of 2018"
  },
  {
    quote: "\"The sisterhood at Tricona is something I still carry with me. I made lifelong friends, and the teachers genuinely cared about us growing into strong, thoughtful women.\"",
    person: "- Sarah K., Class of 2015"
  },
  {
    quote: "\"Every day at Trinity was a step toward becoming the woman I am today. From debate competitions to mass on Sundays, the experience was beautifully balanced.\"",
    person: "- Claire N., Class of 2020"
  },
  {
    quote: "\"Trinity helped me discover my confidence. Standing up to speak in assembly felt terrifying at first — now, I speak at conferences!\"",
    person: "- Joan L., Class of 2017"
  }
];
function  changeTestimonial() {
    let i = Math.floor(Math.random() * Testimonials.length);
    quote.innerText = Testimonials[i].quote;
    person.innerText = Testimonials[i].person;
  }
Btn.addEventListener('click',changeTestimonial );
setInterval(changeTestimonial, 5000);


const slides = document.querySelectorAll('.carousel-image');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex =0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

function nextSlide(){
    currentIndex =(currentIndex+1)%slides.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    showSlide(currentIndex);
  }

nextBtn.addEventListener('click',nextSlide);
prevBtn.addEventListener('click',prevSlide);
setInterval(nextSlide,10000);




