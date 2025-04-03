
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section section');
    sections.forEach(section => section.classList.remove('active'));

    const selectedSection = document.getElementById(sectionId);
    selectedSection.classList.add('active'); 

    const image = document.getElementById('section-image');
    if (sectionId === 'history') {
        image.src = 'images/history.jpg';
        image.alt = 'History Image';
    } else if (sectionId === 'Mission') {
        image.src = 'images/mission_image.jpg';
        image.alt = 'Mission Image';
    } else if (sectionId === 'Vision') {
        image.src = 'images/vision.jpg';
        image.alt = 'Vision Image';
    } else if (sectionId === 'Values') {
        image.src = 'images/values.jpg';
        image.alt = 'Values Image';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    showSection('history');
});

function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        alert('Please enter your name.');
        return false;
    }
    if (email === '') {
        alert('Please enter your email.');
        return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        return false;
    }
    if (message === '') {
        alert('Please enter your message.');
        return false;
    }
    return true; // Allow form submission if all fields are valid
}