document.addEventListener('DOMContentLoaded', () => {

    // Certificate Modal
    const certBtn = document.getElementById('certBtn');
    const certModal = document.getElementById('certModal');
    const closeModals = document.querySelectorAll('.close-modal');

    // Add click event if the cert button exists (might be hidden on mobile based on CSS)
    if(certBtn && certModal) {
        certBtn.addEventListener('click', () => {
            certModal.classList.add('active');
        });
    }

    closeModals.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.closest('.modal-overlay').classList.remove('active');
        });
    });

    if(certModal) {
        certModal.addEventListener('click', (e) => {
            if(e.target === certModal) {
                certModal.classList.remove('active');
            }
        });
    }

    // Accept Delivery Request Button Interaction
    const acceptBtns = document.querySelectorAll('.accept-req-btn');
    acceptBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const currentBtn = e.target;
            
            if(currentBtn.disabled) return;
            
            const originalText = currentBtn.innerHTML;
            
            currentBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Adding to Route...';
            currentBtn.disabled = true;

            setTimeout(() => {
                currentBtn.innerHTML = '<i class="fa-solid fa-check"></i> Added to Route';
                currentBtn.style.backgroundColor = '#48BB78'; // Green
                currentBtn.style.color = 'white';
                currentBtn.style.borderColor = '#48BB78';
                
                // Dim the card visually
                const reqCard = currentBtn.closest('.req-card');
                if(reqCard) {
                    reqCard.style.opacity = '0.6';
                    reqCard.style.pointerEvents = 'none';
                }
                
                // Increment mileage counter visually
                const mileage = document.getElementById('mileageCounter');
                if(mileage) {
                    let text = mileage.innerText; // "124 km"
                    let val = parseInt(text.split(' ')[0]);
                    val += 5; // Fake 5km addition
                    
                    // Simple animate up
                    mileage.style.transform = 'scale(1.2)';
                    mileage.style.transition = 'transform 0.3s ease';
                    setTimeout(() => {
                        mileage.innerText = val + ' km';
                        mileage.style.color = '#FFF';
                    }, 150);
                    
                    setTimeout(() => {
                        mileage.style.transform = 'scale(1)';
                    }, 400);
                }

            }, 1000);
        });
    });

});
