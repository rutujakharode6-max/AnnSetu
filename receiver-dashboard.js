document.addEventListener('DOMContentLoaded', () => {

    // Distance Slider Logic
    const distRange = document.getElementById('distRange');
    const distVal = document.getElementById('distVal');
    
    if(distRange) {
        distRange.addEventListener('input', (e) => {
            distVal.textContent = e.target.value;
        });
    }

    // Modal Logic
    const emergencyBtn = document.getElementById('emergencyBtn');
    const emergencyModal = document.getElementById('emergencyModal');
    const closeModal = document.querySelector('.close-modal');
    
    if(emergencyBtn && emergencyModal) {
        emergencyBtn.addEventListener('click', () => {
            emergencyModal.classList.add('active');
        });

        closeModal.addEventListener('click', () => {
            emergencyModal.classList.remove('active');
        });

        emergencyModal.addEventListener('click', (e) => {
            if(e.target === emergencyModal) {
                emergencyModal.classList.remove('active');
            }
        });

        // Emergency Form Submission
        document.getElementById('emergencyForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button[type="submit"]');
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Broadcasting...';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Alert Broadcasted!';
                btn.style.backgroundColor = '#48BB78';
                
                setTimeout(() => {
                    emergencyModal.classList.remove('active');
                    btn.innerHTML = '<i class="fa-solid fa-satellite-dish fa-beat"></i> Broadcast Emergency Alert';
                    btn.style.backgroundColor = ''; // Reset to CSS default (#E53E3E)
                    e.target.reset();
                }, 2000);
            }, 1000);
        });
    }

    // Request Food Button Animation
    const requestBtns = document.querySelectorAll('.request-btn');
    requestBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if(btn.disabled) return;
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Requesting...';
            btn.style.opacity = '0.8';
            
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Requested';
                btn.style.backgroundColor = '#246B43'; // darker green
                btn.disabled = true;
                btn.style.opacity = '1';
                
                // Optional: Update bottom queue list visually
                const queueList = document.querySelector('.queue-list');
                const newQueueItem = document.createElement('div');
                newQueueItem.className = 'queue-item pending';
                newQueueItem.innerHTML = `
                    <span class="status-dot orange"></span>
                    <div class="queue-info">
                        <h4>Just Requested</h4>
                        <p>Waiting for Approval</p>
                    </div>
                `;
                // Insert at the top of queue
                queueList.insertBefore(newQueueItem, queueList.firstChild);

            }, 1000);
        });
    });

    // Map Toggle Logic
    const mapToggles = document.querySelectorAll('.map-toggles .toggle-btn');
    mapToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.map-toggles .toggle-btn.active').classList.remove('active');
            btn.classList.add('active');
            
            // Mocking view change natively via CSS filter/opacity
            const mapContainer = document.querySelector('.map-view');
            if(btn.innerText.includes('List')) {
                mapContainer.style.filter = 'grayscale(100%) brightness(50%)';
            } else {
                mapContainer.style.filter = 'none';
            }
        });
    });

    // Fetch live data
    const fetchAvailableFood = async () => {
        try {
            const res = await fetch('/api/food_posts');
            const data = await res.json();
            if(data.success && data.posts.length > 0) {
                const grid = document.querySelector('.listings-grid');
                if(grid) {
                    grid.innerHTML = ''; // clear mock data
                    data.posts.forEach(post => {
                        const card = document.createElement('div');
                        card.className = 'listing-card';
                        card.innerHTML = `
                            <div class="card-img" style="background-color: var(--gray-200); display: flex; align-items: center; justify-content: center; height: 150px;">
                                <i class="fa-solid fa-bowl-food" style="font-size: 3rem; color: var(--gray-400);"></i>
                                <span class="freshness-badge fresh">Just Posted</span>
                            </div>
                            <div class="card-body">
                                <div class="meta">
                                    <span class="category"><i class="fa-solid fa-box-open"></i> Food Post</span>
                                    <span class="distance"><i class="fa-solid fa-location-dot"></i> ${post.location}</span>
                                </div>
                                <h4 class="title">${post.description}</h4>
                                <p class="provider">By <strong>${post.provider_name}</strong></p>
                                
                                <div class="details-grid">
                                    <div>
                                        <span>Quantity:</span>
                                        <strong>${post.quantity}</strong>
                                    </div>
                                    <div>
                                        <span>Expiry:</span>
                                        <strong>${new Date(post.expiry_time).toLocaleString()}</strong>
                                    </div>
                                </div>
                                <button class="btn btn-green w-100 request-btn"><i class="fa-solid fa-hand-holding-hand"></i> Request Food</button>
                            </div>
                        `;
                        grid.appendChild(card);
                    });
                }
            }
        } catch (e) {
            console.error('Failed to fetch food posts', e);
        }
    };
    
    // Call immediately
    fetchAvailableFood();
});
