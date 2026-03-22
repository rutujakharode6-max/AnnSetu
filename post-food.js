document.addEventListener('DOMContentLoaded', () => {
    
    // Freshness Slider Color Update
    const slider = document.getElementById('freshnessRange');
    if (slider) {
        slider.addEventListener('input', (e) => {
            const val = e.target.value;
            // Change thumb border color based on value
            if (val == 3) {
                slider.style.setProperty('--primary-green', '#48BB78'); // Green
            } else if (val == 2) {
                slider.style.setProperty('--primary-green', '#F6AD55'); // Orange
            } else {
                slider.style.setProperty('--primary-green', '#E53E3E'); // Red
            }
        });
    }

    // Allergen Tags Logic
    const tags = document.querySelectorAll('.tag');
    const selectedTagsInput = document.getElementById('selectedTags');
    let selectedTagsArr = [];

    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const val = tag.getAttribute('data-val');
            
            if (tag.classList.contains('selected')) {
                tag.classList.remove('selected');
                selectedTagsArr = selectedTagsArr.filter(t => t !== val);
            } else {
                tag.classList.add('selected');
                selectedTagsArr.push(val);
            }
            
            selectedTagsInput.value = selectedTagsArr.join(',');
        });
    });

    // File Upload Preview
    const fileInput = document.getElementById('photoUpload');
    const dropZone = document.getElementById('dropZone');
    const previewContainer = document.getElementById('previewContainer');

    if(fileInput && dropZone) {
        // Handle drag events
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, preventDefaults, false);
        });

        function preventDefaults(e) {
            e.preventDefault();
            e.stopPropagation();
        }

        ['dragenter', 'dragover'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
        });

        // Handle drop
        dropZone.addEventListener('drop', (e) => {
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        // Handle file browse
        fileInput.addEventListener('change', function() {
            handleFiles(this.files);
        });

        function handleFiles(files) {
            // clear previous
            previewContainer.innerHTML = ''; 
            [...files].forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        img.className = 'preview-item';
                        previewContainer.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                }
            });
        }
    }

    // Form Submission
    const form = document.getElementById('detailedFoodForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.querySelector('.submit-btn-main');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Publishing...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Published Successfully!';
                btn.style.backgroundColor = '#48BB78';
                
                setTimeout(() => {
                    // Redirect back to dashboard (simulating navigation)
                    window.location.href = 'provider-dashboard.html';
                }, 1500);
            }, 1000);
        });
    }
});
