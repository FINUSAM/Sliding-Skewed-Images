window.onload = function () {
    let card_data = [
        'https://img.freepik.com/premium-photo/soccer-ball-grassy-field-city-park-with-skyline-tall-buildings-background_29120-18617.jpg',
        'https://img.freepik.com/premium-photo/chessboard-postapocalyptic-landscape_332713-6735.jpg',
        'https://img.freepik.com/free-photo/badminton-concept-with-dramatic-lighting_23-2149940935.jpg',
        'https://img.freepik.com/free-vector/cartoon-ad-poster-banner-with-basketball-tournament-shining-ball-court_33099-899.jpg', 
        'https://img.freepik.com/premium-photo/controller-with-blue-x-it_388444-126797.jpg'
    ];
    let card_colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#f542a1'];

    const cards_container = document.querySelector('.cards_container');
    const shiftButton = document.getElementById("shift");

    card_data.forEach((element, index) => {
        const newCard = document.createElement('img');
        newCard.id = element + '_card';
        newCard.classList.add('card');
        newCard.classList.add('card-' + (6 + index).toString());
        newCard.src = element;
        newCard.alt = element;
        newCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(newCard);

        const otherCard = document.createElement('img');
        otherCard.id = element + '_card';
        otherCard.classList.add('card');
        otherCard.classList.add('card-' + (6 - card_colors.length + index).toString());
        otherCard.src = element;
        otherCard.alt = element;
        otherCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(otherCard);
    });    

    function shift_card() {

        let last_card_index = (5 - card_data.length + cards_container.childElementCount).toString()
        let last_card = document.querySelector('.card-' + last_card_index);

        last_card.classList.add('card-0');

        setTimeout(() => {
            cards_container.removeChild(last_card);

            for (i = last_card_index; i > 6 - card_data.length; i--) {
                current_card = document.querySelector('.card-' + (i - 1).toString());
                current_card.classList.add('card-' + (i).toString());
                current_card.classList.remove('card-' + (i - 1).toString());
            }

            setTimeout(() => {
                last_card.className = "card card-" + (6 - card_data.length).toString();
                cards_container.appendChild(last_card);

                handleSwipe();
            
            }, 100);

        }, 100); // Match the transition duration
    }

    handleSwipe();

    // Detect swipe left/right
    function handleSwipe(){
        let touchStartX, currentTranslateX = 0; // Track current translation
        swipeThreshold = 100;
        let last_card = document.querySelector('.card-' + (5 - card_data.length + cards_container.childElementCount).toString());

        function handleTouchMove(e) {
            const touchX = e.changedTouches[0].screenX;
            const deltaX = touchX - touchStartX;

            // Update card position based on touch movement
            currentTranslateX = deltaX;
            last_card.style.transform = `translateX(${currentTranslateX}px)`;

            // Trigger shift if threshold is reached
            if (deltaX > swipeThreshold) {
                shift_card();
                setTimeout(() => {
                    last_card.removeEventListener('touchmove', handleTouchMove); // Stop tracking movement
                    last_card.style.transform = `translateX(${0}px)`;
                }, 200);
                
            }
        }

        // Handle touch start
        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX;
            currentTranslateX = 0;
            last_card.addEventListener('touchmove', handleTouchMove);
        }

        last_card.addEventListener('touchstart', handleTouchStart);

        // Handle touch end
        function handleTouchEnd(e) {
            last_card.removeEventListener('touchmove', handleTouchMove);

            if (currentTranslateX <= swipeThreshold) {
                last_card.style.removeProperty('transform'); 
            }
        }
        
        last_card.addEventListener('touchend', handleTouchEnd);

    }


};
