document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll(".faq-item");
    
    faqItems.forEach((item, index) => {
        // Ensure we're getting the right elements
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const toggleBtn = item.querySelector('.toggle-btn');
        
        
        // Initialize ARIA attributes
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.setAttribute('aria-controls', answer.id);
        
        // Click handler function
        const toggleAccordion = () => {
            const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
            const shouldExpand = !isExpanded;
            
            // Toggle this item
            toggleBtn.setAttribute('aria-expanded', shouldExpand);
            answer.classList.toggle('active', shouldExpand);
            
            // Close other items if opening this one
            if (shouldExpand) {
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.querySelector('.faq-answer').classList.remove('active');
                        otherItem.querySelector('.toggle-btn').setAttribute('aria-expanded', 'false');
                    }
                });
            }
        };
        
        // Add event listeners
        question.addEventListener('click', toggleAccordion);
        toggleBtn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent double trigger from question click
            toggleAccordion();
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleAccordion();
            }
        });
    });
});