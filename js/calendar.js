document.addEventListener("DOMContentLoaded", function () {
    const calendarBody = document.getElementById("calendar-body");
    const currentMonthDisplay = document.getElementById("current-month");
    const prevMonthBtn = document.getElementById("prev-month");
    const nextMonthBtn = document.getElementById("next-month");

    let currentDate = new Date();
    const events = [
        {
            date: '2025-04-20',
            title: 'Annual Sports Day',
            description: 'Join us for a fun-filled day of sports activities and community bonding.'
        },
        {
            date: '2025-05-01',
            title: 'Labor Day Celebration',
            description: 'A day of fun and relaxation to celebrate Labor Day.'
        }
    ];

    renderCalendar();

    function renderCalendar() {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        currentMonthDisplay.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

        let daysHtml = "";
        let dayCounter = 1;

        for (let i = 0; i < 6; i++) { 
            let row = "<tr>";
            for (let j = 0; j < 7; j++) {
                if ((i === 0 && j < firstDay) || dayCounter > lastDate) {
                    row += "<td></td>";
                } else {
                    const dayString = `${year}-${String(month + 1).padStart(2, '0')}-${String(dayCounter).padStart(2, '0')}`;
                    
                    // Check if the current day has an event
                    const event = events.find(event => event.date === dayString);
                    let cellContent = `<td class="day" data-date="${dayString}">${dayCounter}</td>`;
                    
                    if (event) {
                        cellContent = `
                            <td class="day highlighted" data-title="${event.title}" data-summary="${event.description}" data-date="${dayString}">
                                ${dayCounter}
                            </td>`;
                    }

                    row += cellContent;
                    dayCounter++;
                }
            }
            row += "</tr>";
            daysHtml += row;
        }

        calendarBody.innerHTML = daysHtml;

        // Add hover event listeners for showing event details
        const highlightedDays = document.querySelectorAll('.highlighted');
        highlightedDays.forEach(day => {
            day.addEventListener('mouseenter', function() {
                const title = this.getAttribute('data-title');
                const summary = this.getAttribute('data-summary');
                const tooltip = document.createElement('div');
                tooltip.classList.add('event-tooltip');
                tooltip.innerHTML = `<strong>${title}</strong><p>${summary}</p>`;
                this.appendChild(tooltip);
            });

            day.addEventListener('mouseleave', function() {
                const tooltip = this.querySelector('.event-tooltip');
                if (tooltip) {
                    tooltip.remove();
                }
            });
        });
    }

    // Event listeners for prev and next buttons
    prevMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() - 1);
        renderCalendar();
    });

    nextMonthBtn.addEventListener("click", function () {
        currentDate.setMonth(currentDate.getMonth() + 1);
        renderCalendar();
    });

});