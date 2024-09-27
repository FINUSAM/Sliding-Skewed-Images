window.onload = function() {
    let card_data = ['football', 'cricket', 'badminton', 'esports', 'tt'];
    let card_colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#f542a1'];

    const cards_container = document.querySelector('.cards_container');
    const shiftButton = document.getElementById("shift"); 

    card_data.forEach((element, index) => {
        const newCard = document.createElement('div');
        newCard.id = element+'_card';
        newCard.classList.add('card');
        newCard.classList.add('card-'+(6+index).toString());
        newCard.textContent = element;
        newCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(newCard);

        const otherCard = document.createElement('div');
        otherCard.id = element+'_card';
        otherCard.classList.add('card');
        otherCard.classList.add('card-'+(6-card_colors.length+index).toString());
        otherCard.textContent = element;
        otherCard.style.backgroundColor = card_colors[index];
        cards_container.appendChild(otherCard);
    });

    shiftButton.addEventListener("click", function() {

        shiftButton.disabled = true;

        let last_card_index = (5-card_data.length + cards_container.childElementCount).toString()
        let last_card = document.querySelector('.card-' + last_card_index);
        
        last_card.classList.add('card-0');
        
        setTimeout(() => {
            cards_container.removeChild(last_card);

            for (i=last_card_index;i>6-card_data.length;i--){
                current_card = document.querySelector('.card-' + (i-1).toString());
                current_card.classList.add('card-' + (i).toString());
                current_card.classList.remove('card-' + (i-1).toString());
            }
            
            setTimeout(() => {
                last_card.className = "card card-" + (6-card_data.length).toString();
                cards_container.appendChild(last_card);

                shiftButton.disabled = false;

            }, 500);

        }, 200); // Match the transition duration

    });

};
