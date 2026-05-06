function Hamburg(){
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
}

function cancel(){
    const navbar = document.querySelector(".dropdown"); 
    navbar.style.transform = "translateY(-500px)";
}

const texts = [
    "DEVELOPER",
    "PROGRAMMER",
    "FRONTEND & MOBILE DEVELOPER"
];

const textElement = document.querySelector(".typewriter-text");
let textindex = 0;
let characterindex = 0;
let isDeleting = false;

function typeEffect() {
    const currentText = texts[textindex];
        if (isDeleting) {
        textElement.textContent = currentText.substring(0, characterindex - 1);
        characterindex--;
    } else {
        textElement.textContent = currentText.substring(0, characterindex + 1);
        characterindex++;
    }
    let typeSpeed = 100; 
    if (isDeleting) {
        typeSpeed = 100; 
    }
    if (!isDeleting && characterindex === currentText.length) {
        typeSpeed = 1500; 
        isDeleting = true;
    } 
    else if (isDeleting && characterindex === 0) {
        isDeleting = false;
        textindex = (textindex + 1) % texts.length; 
        typeSpeed = 500; 
    }
    setTimeout(typeEffect, typeSpeed);
}

window.onload = typeEffect;



// Contact Form Logic (Formspree Integration)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('form-status');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault(); 

            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return; 
            }

            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = 'Sending... <i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.style.opacity = '0.7';
            submitBtn.style.pointerEvents = 'none';

            const formEndpoint = 'https://formspree.io/f/mvzlpwnr'; 
            
            const formData = new FormData(contactForm);

            try {
                const response = await fetch(formEndpoint, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    formStatus.innerHTML = 'Message sent successfully! ✨ I will get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset(); 
                } else {
                    formStatus.innerHTML = 'Oops! There was a problem sending your message.';
                    formStatus.className = 'form-status error';
                }
            } catch (error) {
                formStatus.innerHTML = 'Oops! Please check your internet connection.';
                formStatus.className = 'form-status error';
            }
            
            submitBtn.innerHTML = originalBtnText;
            submitBtn.style.opacity = '1';
            submitBtn.style.pointerEvents = 'auto';
            
            setTimeout(() => {
                formStatus.className = 'form-status';
            }, 5000);
        });
    }
});