document.addEventListener('DOMContentLoaded', () => {
    const roleBtns = document.querySelectorAll('.role-btn');
    const typeContainer = document.getElementById('typeContainer');
    const dynamicFields = document.getElementById('dynamicFields');
    const termsGroup = document.querySelector('.terms-group');
    const root = document.documentElement;

    const providerTypes = [
        "Select Provider Type",
        "Restaurant", 
        "Event Organizer", 
        "Household", 
        "Bakery", 
        "Caterer"
    ];

    const receiverTypes = [
        "Select Receiver Type",
        "NGO", 
        "Charitable Organization", 
        "Volunteer", 
        "Individual in Need"
    ];

    // Function to render the Type Dropdown
    const renderTypeDropdown = (role) => {
        const types = role === 'provider' ? providerTypes : receiverTypes;
        const iconClass = role === 'provider' ? 'fa-store' : 'fa-building-ngo';
        const labelText = role === 'provider' ? 'Provider Type *' : 'Receiver Type *';
        
        const options = types.map((type, index) => 
            `<option value="${index === 0 ? '' : type}" ${index === 0 ? 'disabled selected' : ''}>${type}</option>`
        ).join('');

        typeContainer.innerHTML = `
            <label>${labelText}</label>
            <div class="input-icon">
                <i class="fa-solid ${iconClass}"></i>
                <select id="userTypeSelect" required>
                    ${options}
                </select>
            </div>
        `;

        // Add event listener to new select
        document.getElementById('userTypeSelect').addEventListener('change', (e) => {
            renderDynamicFields(role, e.target.value);
        });
        
        // Clear dynamic fields when role changes
        dynamicFields.innerHTML = '';
    };

    // Function to render additional fields based on selection
    const renderDynamicFields = (role, selection) => {
        let html = '';

        if (role === 'provider' && ['Restaurant', 'Bakery', 'Caterer'].includes(selection)) {
            html = `
                <div class="col-half">
                    <label>FSSAI / Business License Number *</label>
                    <div class="input-icon">
                        <i class="fa-solid fa-id-card"></i>
                        <input type="text" placeholder="e.g. 10012011000001" required>
                    </div>
                </div>
                <div class="col-half">
                    <label>Business Registration File</label>
                    <div class="input-icon" style="flex-direction: column; align-items:flex-start; padding: 0.5rem 1rem; border: 1px dashed #CBD5E0; border-radius: 10px; cursor: pointer; background: var(--gray-100);">
                        <span style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.2rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Upload PDF/JPG</span>
                        <input type="file" style="padding:0; border:none; background:transparent;">
                    </div>
                </div>
            `;
        } 
        else if (role === 'receiver' && ['NGO', 'Charitable Organization'].includes(selection)) {
            html = `
                <div class="col-half">
                    <label>NGO Darpan ID / Registration Number *</label>
                    <div class="input-icon">
                        <i class="fa-solid fa-file-contract"></i>
                        <input type="text" placeholder="e.g. MH/2021/0000201" required>
                    </div>
                </div>
                <div class="col-half">
                    <label>Registration Certificate</label>
                    <div class="input-icon" style="flex-direction: column; align-items:flex-start; padding: 0.5rem 1rem; border: 1px dashed #CBD5E0; border-radius: 10px; cursor: pointer; background: var(--gray-100);">
                        <span style="font-size: 0.85rem; color: var(--text-light); margin-bottom: 0.2rem;"><i class="fa-solid fa-cloud-arrow-up"></i> Upload PDF</span>
                        <input type="file" style="padding:0; border:none; background:transparent;">
                    </div>
                </div>
            `;
        }
        else if (role === 'provider' && selection === 'Household') {
            html = `
                <div class="col-half" style="flex: 1 1 100%;">
                    <label>Estimated Quantity of Food (Daily/Weekly) *</label>
                    <div class="input-icon">
                        <i class="fa-solid fa-scale-balanced"></i>
                        <input type="text" placeholder="e.g. Enough for 2-3 people occasionally" required>
                    </div>
                </div>
            `;
        }
        else if (role === 'provider' && selection === 'Event Organizer') {
            html = `
                <div class="col-half" style="flex: 1 1 100%;">
                    <label>Event Date & Setup *</label>
                    <div class="input-icon">
                        <i class="fa-regular fa-calendar"></i>
                        <input type="text" placeholder="Usually when do you have excess food?" required>
                    </div>
                </div>
            `;
        }

        dynamicFields.innerHTML = html;
    };

    // Role Button Click Handlers
    roleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            roleBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked
            btn.classList.add('active');

            const selectedRole = btn.getAttribute('data-role');
            
            // Re-render dropdowns based on role
            renderTypeDropdown(selectedRole);

            // Change theme color highlight based on role
            const submitBtn = document.querySelector('.submit-btn');
            
            if (selectedRole === 'provider') {
                root.style.setProperty('--primary-orange', '#FF7B00');
                submitBtn.style.backgroundColor = '#FF7B00';
                submitBtn.style.boxShadow = '0 10px 25px rgba(255, 123, 0, 0.4)';
                termsGroup.style.borderLeftColor = '#FF7B00';
                termsGroup.style.backgroundColor = 'rgba(255, 123, 0, 0.05)';
            } else {
                root.style.setProperty('--primary-orange', '#2E8B57'); // Hack to change primary accent in inputs
                submitBtn.style.backgroundColor = '#2E8B57';
                submitBtn.style.boxShadow = '0 10px 25px rgba(46, 139, 87, 0.4)';
                termsGroup.style.borderLeftColor = '#2E8B57';
                termsGroup.style.backgroundColor = 'rgba(46, 139, 87, 0.05)';
            }
        });
    });

    // Initialize with provider
    renderTypeDropdown('provider');

    // Form Submit Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = document.querySelector('.submit-btn');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'Creating Account...';
            submitBtn.disabled = true;

            const activeRoleBtn = document.querySelector('.role-btn.active');
            const role = activeRoleBtn ? activeRoleBtn.getAttribute('data-role') : 'provider';
            
            const typeSelect = document.getElementById('userTypeSelect');
            const userType = typeSelect ? typeSelect.value : '';
            
            const payload = {
                name: document.getElementById('regName')?.value || '',
                email: document.getElementById('regEmail')?.value || '',
                phone: document.getElementById('regPhone')?.value || '',
                password: document.getElementById('regPassword')?.value || '',
                address: document.getElementById('regAddress')?.value || '',
                role: role,
                user_type: userType
            };

            try {
                const response = await fetch('/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                if (response.ok) {
                    window.location.href = role === 'provider' ? 'provider-dashboard.html' : 'receiver-dashboard.html';
                } else {
                    alert('Registration failed: ' + (data.error || 'Unknown error'));
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            } catch (err) {
                console.error(err);
                alert('Connection error. Please try again.');
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});
