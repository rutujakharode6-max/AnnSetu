document.addEventListener('DOMContentLoaded', () => {
    
    // Multi-Language Simulation Trigger
    const langSelect = document.getElementById('languageToggle');
    const translateSpan = document.querySelector('[data-translate="together"]');

    if(langSelect && translateSpan) {
        langSelect.addEventListener('change', (e) => {
            const val = e.target.value;
            // Quick local dict for simulation
            const dict = {
                'en': 'Together',
                'hi': 'एक साथ',
                'mr': 'एकत्र'
            };
            
            // visually highlight change
            translateSpan.style.opacity = '0';
            setTimeout(() => {
                translateSpan.innerText = dict[val] || 'Together';
                translateSpan.style.opacity = '1';
                translateSpan.style.transition = 'opacity 0.3s ease';
            }, 300);
        });
    }

    // Newsletter Submission Simulation
    const nlForm = document.getElementById('newsletterForm');
    if(nlForm) {
        nlForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = nlForm.querySelector('button[type="submit"]');
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Subscribing...';
            btn.disabled = true;

            setTimeout(() => {
                nlForm.style.display = 'none';
                document.getElementById('nlMsg').style.display = 'block';
            }, 1000);
        });
    }

});
