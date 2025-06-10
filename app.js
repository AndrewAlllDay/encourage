document.addEventListener('DOMContentLoaded', () => {
    const encourageButton = document.getElementById('encourageButton');

    const encouragementModal = document.getElementById('encouragementModal');
    const modalEncouragementText = document.getElementById('modalEncouragementText');
    const closeButton = document.querySelector('.close-button');

    const phrases = [
        "Every throw is a new opportunity!",
        "Shake it off. You've got this!",
        "Focus on the next shot, not the last one.",
        "Your best disc golf is still ahead!",
        "Trust your throw. Believe in yourself.",
        "One bad hole doesn't define your game.",
        "Stay calm, stay focused. You're a disc golf warrior!",
        "Visualize success on this next shot.",
        "Greatness comes from consistency, not perfection.",
        "Keep your head up and throw your heart out!",
        "Embrace the challenge, find your rhythm.",
        "A clear mind leads to a clear flight.",
        "Let go of the past, focus on the present flight path."
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