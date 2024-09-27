window.onload = function() {
    let card_data = ['football', 'cricket', 'badminton', 'esports'];
    let card_colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F'];

    const cards_container = document.querySelector('.cards_container');
    const shiftButton = document.getElementById("shift"); 
    
    card_data.forEach((element, index) => {
        const newCard = document.createElement('div');
        newCard.id = element+'_card';
        newCard.classList.add('card');
        newCard.classList.add('card-'+(index+1).toString());
        newCard.textContent = element;
        newCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(newCard);
    });

    shiftButton.addEventListener("click", function() {
        let last_card_index = cards_container.childElementCount.toString();
        let last_card = document.querySelector('.card-' + last_card_index);
        
        last_card.classList.add('card-0');
        
        setTimeout(() => {
            cards_container.removeChild(last_card);

            for (i=last_card_index;i>1;i--){
                current_card = document.querySelector('.card-' + (i-1).toString());
                current_card.classList.add('card-' + (i).toString());
                current_card.classList.remove('card-' + (i-1).toString());

                console.log('card-' + (i-1).toString(), 'card-' + (i).toString());
            }
            
            setTimeout(() => {
                last_card.className = "card card-1";
                cards_container.appendChild(last_card);
            }, 500);

        }, 200); // Match the transition duration



    });

};
