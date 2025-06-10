document.addEventListener('DOMContentLoaded', () => {
    const encourageButton = document.getElementById('encourageButton');

    const encouragementModal = document.getElementById('encouragementModal');
    const modalEncouragementText = document.getElementById('modalEncouragementText');
    const closeButton = document.querySelector('.close-button');
    const breathingCircle = document.querySelector('.breathing-circle');
    // GET A REFERENCE TO THE NEW TEXT ELEMENT
    const breathingInstructionText = document.getElementById('breathingInstructionText');

    const phrases = [
        "<span class='bold-it'>Breathe</span> - deep breath before every shot, and practice good breathing throughout the round.",
        "<span class='bold-it'>Commit</span> - Focus on a spot, trust your disc and line choice.", // Fixed unclosed span tag here
        "<span class='bold-it'>Reset</span> - No matter the outcome of the shot, come back to emotional zero every time. Treat each shot as its own tournament. Talk about the good shots as much as the bad ones.",
        "<span class='bold-it'>Attitude</span> - People will remember you for how you acted on the course, not the way you played.",
        // Reminder: If you want to style parts of these phrases,
        // you'll need to add HTML tags like <span> with classes directly into the strings.
        // Example: "You are capable of <span class='highlight-word'>amazing things</span>!"
    ];

    function showModal(message) {
        modalEncouragementText.innerHTML = message;
        encouragementModal.classList.add('show');

        // Text and circle appear together AFTER modal itself starts showing
        setTimeout(() => {
            modalEncouragementText.classList.add('animate-in');
            if (breathingCircle) {
                breathingCircle.classList.add('show-circle');
            }
            // SHOW THE NEW TEXT
            if (breathingInstructionText) {
                breathingInstructionText.classList.add('show-text'); // Add a class for fading in
            }
        }, 50); // Small delay for entrance animation
    }

    function hideModal() {
        modalEncouragementText.classList.remove('animate-in'); // Text animation removed
        if (breathingCircle) {
            breathingCircle.classList.remove('show-circle'); // Remove class to hide the circle
        }
        // HIDE THE NEW TEXT
        if (breathingInstructionText) {
            breathingInstructionText.classList.remove('show-text'); // Remove class for fading out
        }

        encouragementModal.classList.remove('show');
    }

    // UPDATED: Check for the new breathingInstructionText element as well
    if (encourageButton && encouragementModal && modalEncouragementText && closeButton && breathingCircle && breathingInstructionText) {
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
        console.error('One or more required modal or button elements not found! Check your HTML IDs and classes.');
        console.log('Missing:', {
            encourageButton: !!encourageButton,
            encouragementModal: !!encouragementModal,
            modalEncouragementText: !!modalEncouragementText,
            closeButton: !!closeButton,
            breathingCircle: !!breathingCircle,
            breathingInstructionText: !!breathingInstructionText // Check for the new element
        });
    }
});