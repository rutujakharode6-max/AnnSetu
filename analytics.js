document.addEventListener('DOMContentLoaded', () => {

    // Tab Switching Logic
    const tabs = document.querySelectorAll('.nav-tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Hide all tab contents
            contents.forEach(c => c.classList.remove('active'));
            
            // Show targeted content
            const targetId = tab.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');

            // Render chart if community tab is clicked and chart doesn't exist yet
            if(targetId === 'communityTab' && !window.myChart) {
                renderChart();
            }
        });
    });

    // Chart.js Setup
    function renderChart() {
        const ctx = document.getElementById('impactChart');
        if(!ctx) return;

        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Meals Rescued',
                    data: [12000, 19000, 25000, 31000, 38000, 45000],
                    backgroundColor: '#FF7B00',
                    borderRadius: 8,
                    barPercentage: 0.6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: '#2D3748',
                        titleFont: { family: 'Outfit', size: 14 },
                        bodyFont: { family: 'Outfit', size: 14, weight: 'bold' },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: '#F1F5F9',
                            drawBorder: false
                        },
                        ticks: {
                            family: 'Outfit',
                            color: '#718096'
                        }
                    },
                    x: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            family: 'Outfit',
                            color: '#718096'
                        }
                    }
                }
            }
        });
    }

    // Social Sharing Simulation
    const shareBtns = document.querySelectorAll('.btn-social');
    shareBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const originalText = btn.innerHTML;
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';
            setTimeout(() => {
                btn.innerHTML = originalText;
                alert('This simulates opening the native ' + e.target.innerText.trim() + ' sharing dialog with the AnnSetu milestone attached!');
            }, 800);
        });
    });
});
