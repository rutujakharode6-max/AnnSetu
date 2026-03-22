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
        
        setTimeout(() => {
            toast.style.animation = 'fadeOut 0.3s forwards';
            setTimeout(() => { if(toast.parentElement) toast.remove(); }, 300);
        }, 5000);
    }

    // FSSAI Document Upload Simulation
    const certInput = document.getElementById('certFile');
    if(certInput) {
        certInput.addEventListener('change', (e) => {
            if(e.target.files.length > 0) {
                const fileName = e.target.files[0].name;
                const uploadContainer = document.getElementById('fssaiUpload');
                
                uploadContainer.style.borderColor = '#FF7B00';
                uploadContainer.innerHTML = '<div class="upload-content text-center"><i class="fa-solid fa-spinner fa-spin text-orange"></i><span class="text-sm font-weight-bold ml-2">Verifying Document via AI...</span></div>';
                
                setTimeout(() => {
                    const block = uploadContainer.closest('.verify-block');
                    block.classList.remove('pending');
                    block.classList.add('verified');
                    
                    const vIcon = block.querySelector('.v-icon');
                    vIcon.innerHTML = '<i class="fa-solid fa-certificate"></i>';
                    
                    const vStatus = block.querySelector('.v-status');
                    vStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Verified';
                    vStatus.style.color = '#48BB78';
                    
                    uploadContainer.style.display = 'none';

                    // Update Top Counter
                    const pt = document.querySelector('.progress-text');
                    if(pt) pt.innerText = '2/2 Completed';

                    createToast('success', 'FSSAI License Verified', `${fileName} was scanned and securely verified by our agents.`);
                }, 2000);
            }
        });
    }

    // Incident Report Submission
    const incidentForm = document.getElementById('incidentForm');
    if(incidentForm) {
        incidentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = incidentForm.querySelector('button[type="submit"]');
            const originalHTML = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting securely...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Report Filed Confidentially';
                btn.style.backgroundColor = '#48BB78';
                btn.style.borderColor = '#48BB78';
                btn.style.color = 'white';

                createToast('success', 'Incident Reported', 'Our dedicated Trust & Safety team has received your report. We will investigate this transaction immediately.');

                setTimeout(() => {
                    incidentForm.reset();
                    btn.innerHTML = originalHTML;
                    btn.style.backgroundColor = 'transparent';
                    btn.style.borderColor = '#E53E3E';
                    btn.style.color = '#E53E3E';
                    btn.disabled = false;
                }, 4000);
            }, 1000);
        });
    }
});
