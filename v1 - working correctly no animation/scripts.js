window.onload = function() {
    let card_data = ['football', 'cricket', 'badminton', 'esports'];
    let card_colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'];

    const cards_container = document.querySelector('.cards_container');
    
    card_data.forEach((element, index) => {
        const newCard = document.createElement('div');
        newCard.id = element+'_card';
        newCard.classList.add('card');
        newCard.classList.add(`card-` + (index+1).toString());
        newCard.textContent = element;
        newCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(newCard);
    });

    function swap_class(element1, element2) {
        var temp = element1.className; // Get the full class string of element1
        element1.className = element2.className; // Assign element2's classes to element1
        element2.className = temp; // Assign element1's original classes to element2
    }

    function shift_card(){
        var cards = cards_container.childNodes;
        last_element_index = cards_container.childElementCount - 1;
        document.querySelector('.card-4').style.display = 'none';
        console.log(last_element_index)
        for (i=last_element_index;i>0;i--){
            console.log(cards[0].innerHTML, cards[i].innerHTML);
            swap_class(cards[0], cards[i]);
        }
        
        document.querySelector('.card-1').style.display = 'block';
    }

    document.getElementById('shift').addEventListener('click', function() {
        shift_card();
    });

    // Detect swipe left/right
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        if (touchEndX - touchStartX > swipeThreshold) { // Swiped right
            shift_card(); // Shift the card to the back
        } else if (touchStartX - touchEndX > swipeThreshold) { // Swiped left 
            shift_card(); // Shift the card to the back 
        }
    }

    // Handle touch start
    cards_container.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    // Handle touch end
    cards_container.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe(); // Check for swipe direction
    });



};
