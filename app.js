document.addEventListener('DOMContentLoaded', () => {
    const encourageButton = document.getElementById('encourageButton');

    const encouragementModal = document.getElementById('encouragementModal');
    const modalEncouragementText = document.getElementById('modalEncouragementText');
    const closeButton = document.querySelector('.close-button');

    const phrases = [
        "Breathe - deep breath before every shot, and practice good breathing throughout the round.",
        "Commit - Focus on a spot, trust your disc and line choice.",
        "Reset - No matter the outcome of the shot, come back to emotional zero every time. Treat each shot as its own tournament. Talk about the good shots as much as the bad ones.",
        "Attitude - People will remember you for how you acted on the course, not the way you played.",

    ];

    function showModal(message) {
        modalEncouragementText.textContent = message;
        encouragementModal.classList.add('show');

        // Add class to trigger text animation AFTER modal is visible
        // A small delay ensures the transition works correctly
        setTimeout(() => {
            modalEncouragementText.classList.add('animate-in');
        }, 50); // 50ms delay
    }

    function hideModal() {
        modalEncouragementText.classList.remove('animate-in'); // Remove class when hiding
        // Delay hiding the modal slightly to allow text animation to complete
        setTimeout(() => {
            encouragementModal.classList.remove('show');
        }, 300); // Wait 300ms (adjust based on text animation duration)
    }

    if (encourageButton && encouragementModal && modalEncouragementText && closeButton) {
        encourageButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            showModal(phrases[randomIndex]);
            console.log('Encouragement displayed in modal:', phrases[randomIndex]);

            // Haptic feedback (as discussed previously)
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }
        });

        closeButton.addEventListener('click', hideModal);

        encouragementModal.addEventListener('click', (event) => {
            if (event.target === encouragementModal) {
                hideModal();
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && encouragementModal.classList.contains('show')) {
                hideModal();
            }
        });

    } else {
        console.error('One or more required modal elements not found!');
    }
});