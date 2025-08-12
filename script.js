// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const main = document.querySelector('.main');
    const clearBtn = document.getElementById('c-all');

    // Load cards from localStorage on page load
    renderCards();

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = form.uname.value.trim();
        const email = form.email.value.trim();
        const number = form.number.value.trim();

        if (name && email && number) {
            const entry = { name, email, number };
            let entries = JSON.parse(localStorage.getItem('entries')) || [];
            entries.push(entry);
            localStorage.setItem('entries', JSON.stringify(entries));
            renderCards();
            form.reset();
        }
    });

    clearBtn.addEventListener('click', function() {
        localStorage.removeItem('entries');
        renderCards();
    });

    function renderCards() {
        main.innerHTML = '';
        let entries = JSON.parse(localStorage.getItem('entries')) || [];
        entries.forEach((entry, idx) => {
            const card = document.createElement('div');
            card.className = 'items';
            card.innerHTML = `
                <span style="cursor:pointer;" data-idx="${idx}">&times;</span>
                <h5>Name</h5>
                <div>${entry.name}</div>
                <h5>Email</h5>
                <div>${entry.email}</div>
                <h5>Phone Number</h5>
                <div>${entry.number}</div>
            `;
            main.appendChild(card);
        });

        // Add delete functionality for each card
        document.querySelectorAll('.items span').forEach(span => {
            span.onclick = function() {
                let idx = this.getAttribute('data-idx');
                let entries = JSON.parse(localStorage.getItem('entries')) || [];
                entries.splice(idx, 1);
                localStorage.setItem('entries', JSON.stringify(entries));
                renderCards();
            }
        });
    }
});
// ...existing code...


displayData();