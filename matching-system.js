document.addEventListener('DOMContentLoaded', () => {

    const toastContainer = document.getElementById('toastContainer');

    function createToast(type, title, message) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icon = type === 'warning' ? 'fa-triangle-exclamation fa-beat-fade' : 'fa-circle-check';
        
        toast.innerHTML = `
            <i class="fa-solid ${icon}"></i>
            <div>
                <h4>${title}</h4>
                <p>${message}</p>
            </div>
        `;
        
        toastContainer.appendChild(toast);

        // Remove after 5s
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => {
                if(toast.parentElement) toast.remove();
            }, 300);
        }, 5000);
    }

    // Assign Food Button Logic (Waitlist alert)
    const assignBtn = document.querySelector('.assign-btn');
    if(assignBtn) {
        assignBtn.addEventListener('click', (e) => {
            const btn = e.target;
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Assigned';
            btn.disabled = true;
            btn.style.opacity = '0.7';

            // Change #1 rank visual
            const item = btn.closest('.priority-item');
            item.style.borderColor = '#48BB78';
            item.style.backgroundColor = '#F0FFF4';

            // Toast
            createToast('success', 'Food Assigned', 'Hope Foundation has been prioritized. Others moved to Waitlist.');
            
            // Simulate waitlist SMS broadcast
            setTimeout(() => {
                const logBox = document.querySelector('.log-box');
                const newLog = document.createElement('div');
                newLog.className = 'log-item success';
                newLog.innerHTML = '<i class="fa-solid fa-check"></i> <span><strong>Waitlist SMS:</strong> Alert sent to Sharma Family & City Shelter regarding priority reassignment.</span>';
                logBox.appendChild(newLog);
            }, 1500);
        });
    }

    // Simulate 2-Hour Warning Expiry
    const triggerExpiryBtn = document.getElementById('triggerExpiryBtn');
    if(triggerExpiryBtn) {
        triggerExpiryBtn.addEventListener('click', () => {
            // Update Timer styling
            const timerBadge = document.getElementById('countdownTimer');
            timerBadge.innerText = '01:59:59';
            timerBadge.style.animation = 'pulse 1s infinite';
            
            // Update Progress bar to red visually
            const pBar = document.querySelector('.expiry-progress');
            pBar.style.background = '#E53E3E';
            pBar.style.width = '15%';

            createToast('warning', 'Expiry Alert Triggered!', 'Food expires in < 2 hours. Push Notifications automatically re-sent to nearby NGOs.');
        });
    }

    // Feedback Modal Logic
    const feedbackModal = document.getElementById('feedbackModal');
    const triggerFeedbackBtn = document.getElementById('triggerFeedbackBtn');
    const closeModals = document.querySelectorAll('.close-modal');

    triggerFeedbackBtn.addEventListener('click', () => {
        feedbackModal.classList.add('active');
    });

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
        });
    });

    // Star Rating
    const stars = document.querySelectorAll('.star-rating i');
    stars.forEach(star => {
        star.addEventListener('click', (e) => {
            const rating = parseInt(e.target.getAttribute('data-rating'));
            // reset all to regular
            stars.forEach(s => {
                s.className = 'fa-regular fa-star';
            });
            // highlight up to this rating
            for(let i=0; i<rating; i++) {
                stars[i].className = 'fa-solid fa-star active';
            }
        });
    });

    const submitFeedbackBtn = document.getElementById('submitFeedbackBtn');
    submitFeedbackBtn.addEventListener('click', () => {
        submitFeedbackBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
        setTimeout(() => {
            feedbackModal.classList.remove('active');
            createToast('success', 'Feedback Saved', 'Thank you! Your verified feedback updates the donor\'s trust score.');
            submitFeedbackBtn.innerHTML = 'Submit Feedback'; // reset behind scenes
            
            // Revert stars
            stars.forEach(s => s.className = 'fa-regular fa-star');
            const textarea = document.querySelector('.form-control');
            if(textarea) textarea.value = '';
        }, 1200);
    });

});
