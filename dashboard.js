document.addEventListener('DOMContentLoaded', () => {
    // Notification Toggle
    const notifWrapper = document.querySelector('.notification-wrapper');
    if (notifWrapper) {
        notifWrapper.addEventListener('click', (e) => {
            // Close if clicking outside
            e.stopPropagation();
            notifWrapper.classList.toggle('active');
        });

        // Close when clicking document
        document.addEventListener('click', () => {
            notifWrapper.classList.remove('active');
        });

        // Prevent closing when clicking inside dropdown
        notifWrapper.querySelector('.notification-dropdown').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    // Post Food Form Submit Simulator -> Real-time notification effect
    const postFoodForm = document.getElementById('postFoodForm');
    if (postFoodForm) {
        postFoodForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const btn = postFoodForm.querySelector('button[type="submit"]');
            const originalContent = btn.innerHTML;
            
            // Loading State
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Posting...';
            btn.disabled = true;

            // Real API Call
            const payload = {
                description: document.getElementById('foodDesc')?.value || '',
                quantity: document.getElementById('foodQty')?.value || '',
                expiry_time: document.getElementById('foodExpiry')?.value || '',
                location: document.getElementById('foodLoc')?.value || ''
            };

            fetch('/api/food_posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(res => res.json())
            .then(data => {
                if(data.success) {
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Posted Successfully!';
                    btn.style.backgroundColor = 'var(--primary-green)';
                    
                    // Reset styling and form after 2 seconds
                    setTimeout(() => {
                        btn.innerHTML = originalContent;
                        btn.style.backgroundColor = '';
                        btn.disabled = false;
                        postFoodForm.reset();
                        
                        // Simulate claim notification after 5 seconds
                        simulateClaimNotification();
                    }, 2000);
                } else {
                    throw new Error(data.error);
                }
            })
            .catch(err => {
                console.error(err);
                btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Failed';
                btn.style.backgroundColor = '#E53E3E';
                setTimeout(() => {
                    btn.innerHTML = originalContent;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 2000);
            });
        });
    }

    // Function to simulate real-time notification
    function simulateClaimNotification() {
        setTimeout(() => {
            // Update badge
            const badge = document.getElementById('notifBadge');
            let count = parseInt(badge.innerText);
            badge.innerText = count + 1;
            
            // Add animation
            badge.style.transform = 'scale(1.5)';
            setTimeout(() => badge.style.transform = 'scale(1)', 300);

            // Add new item to dropdown
            const dropdown = document.querySelector('.notification-dropdown');
            const newNotif = document.createElement('div');
            newNotif.className = 'notification-item unread';
            newNotif.innerHTML = `
                <div class="icon green"><i class="fa-solid fa-bolt"></i></div>
                <div>
                    <p><strong>City Shelter NGO</strong> just accepted your new donation!</p>
                    <span>Just now</span>
                </div>
            `;
            
            // Insert after H4
            dropdown.insertBefore(newNotif, dropdown.children[1]);
            
            // Highlight bell
            const bell = notifWrapper.querySelector('i.fa-bell');
            bell.style.color = 'var(--primary-orange)';
            bell.classList.add('fa-shake');
            setTimeout(() => {
                bell.classList.remove('fa-shake');
            }, 2000);
            
        }, 5000);
    }
});
