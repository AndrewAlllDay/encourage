document.addEventListener('DOMContentLoaded', () => {
    const encourageButton = document.getElementById('encourageButton');

    const encouragementModal = document.getElementById('encouragementModal');
    const modalEncouragementText = document.getElementById('modalEncouragementText');
    const closeButton = document.querySelector('.close-button');
    const breathingCircle = document.querySelector('.breathing-circle'); // Get the breathing circle element

    const phrases = [
        "Breathe - deep breath before every shot, and practice good breathing throughout the round.",
        "Commit - Focus on a spot, trust your disc and line choice.",
        "Reset - No matter the outcome of the shot, come back to emotional zero every time. Treat each shot as its own tournament. Talk about the good shots as much as the bad ones.",
        "Attitude - People will remember you for how you acted on the course, not the way you played.",
        // Reminder: If you want to style parts of these phrases,
        // you'll need to add HTML tags like <span> with classes directly into the strings.
        // Example: "You are capable of <span class='highlight-word'>amazing things</span>!"
    ];

    function showModal(message) {
        // IMPORTANT: Use innerHTML to render any HTML tags you put in your phrases
        modalEncouragementText.innerHTML = message;
        encouragementModal.classList.add('show');

        // Add class to trigger text animation AFTER modal is visible
        setTimeout(() => {
            modalEncouragementText.classList.add('animate-in');
            // Show the breathing circle when the modal appears
            if (breathingCircle) { // Check if the element exists
                breathingCircle.style.display = 'block';
            }
        }, 50); // 50ms delay
    }

    function hideModal() {
        modalEncouragementText.classList.remove('animate-in'); // Remove class when hiding
        // Hide the breathing circle immediately when the modal starts to close
        if (breathingCircle) { // Check if the element exists
            breathingCircle.style.display = 'none';
        }
        // Delay hiding the modal slightly to allow text animation to complete
        setTimeout(() => {
            encouragementModal.classList.remove('show');
        }, 300); // Wait 300ms (adjust based on text animation duration)
    }

    if (encourageButton && encouragementModal && modalEncouragementText && closeButton && breathingCircle) {
        encourageButton.addEventListener('click', () => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            showModal(phrases[randomIndex]);
            console.log('Encouragement displayed in modal:', phrases[randomIndex]);

            // Haptic feedback
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
        // More specific error message if any element is missing
        console.error('One or more required modal or button elements not found! Check your HTML IDs and classes.');
        console.log('Missing:', {
            encourageButton: !!encourageButton,
            encouragementModal: !!encouragementModal,
            modalEncouragementText: !!modalEncouragementText,
            closeButton: !!closeButton,
            breathingCircle: !!breathingCircle
        });
    }
});