
document.getElementById("newsForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    let isValid = true;

    // Get form values
    let title = document.getElementById("title").value.trim();
    let description = document.getElementById("description").value.trim();
    let date = document.getElementById("date").value;
    let imageInput = document.getElementById("image");

    // Validate title
    if (title === "") {
        document.getElementById("titleError").innerText = "Title is required.";
        isValid = false;
    } else {
        document.getElementById("titleError").innerText = "";
    }

    // Validate description
    if (description === "") {
        document.getElementById("descriptionError").innerText = "Description is required.";
        isValid = false;
    } else {
        document.getElementById("descriptionError").innerText = "";
    }

    // Validate date
    if (date === "") {
        document.getElementById("dateError").innerText = "Event date is required.";
        isValid = false;
    } else {
        document.getElementById("dateError").innerText = "";
    }

    // Validate image (optional)
    let imageUrl = "";
    if (imageInput.files.length > 0) {
        let file = imageInput.files[0];
        let reader = new FileReader();
        reader.onload = function(event) {
            imageUrl = event.target.result;
            saveEvent(title, description, date, imageUrl);
        };
        reader.readAsDataURL(file);
    } else {
        saveEvent(title, description, date, "");
    }
});

function saveEvent(title, description, date, imageUrl) {
    let eventList = document.getElementById("eventList");

     // Generate a unique ID for the event
    let eventId = Date.now();  // Use timestamp as a unique ID

    let eventItem = document.createElement("div");
    eventItem.classList.add("event-item");
    eventItem.setAttribute("data-id", eventId);  // Set the data-id attribute
 

    eventItem.innerHTML = `
        <h3>${title}</h3>
        <p><strong>Date:</strong> ${date}</p>
        <p>${description}</p>
        ${imageUrl ? `<img src="${imageUrl}" alt="Event Image">` : ""}
        <button class="delete-btn" onclick="deleteEvent(${eventId})">Delete</button>

    `;

    eventList.prepend(eventItem);

    // Save to Local Storage
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push({ id: eventId, title, description, date, imageUrl }); //Saving with ID
    localStorage.setItem("events", JSON.stringify(events));

    // Reset form
    document.getElementById("newsForm").reset();
}

function displayEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    let eventList = document.getElementById("eventList");
    eventList.innerHTML = "";
    
    // Check if dark mode is active
    let isDarkMode = document.body.classList.contains("dark-mode");
    
        events.forEach(event => {
        let eventItem = document.createElement("div");
        eventItem.classList.add("event-item");
        eventItem.setAttribute("data-id", event.id);  // Store ID in data attribute
        
        // If dark mode is active, apply dark mode-specific classes & styles
        if (isDarkMode) {
            eventItem.classList.add("dark-mode-event");
        }

        eventItem.innerHTML = `
            <h3>${event.title}</h3>
            <p><strong>Date:</strong> ${event.date}</p>
            <p>${event.description}</p>
            ${event.imageUrl ? `<img src="${event.imageUrl}" alt="Event Image">` : ""}
            <button class="delete-btn" onclick="deleteEvent(${event.id})">Delete</button>
        `;

        eventList.appendChild(eventItem);
    });
}

function deleteEvent(eventId) {
    let events = JSON.parse(localStorage.getItem("events")) || [];

    //Filter out the event to delete
    events = events.filter(event => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(events));

    let eventItem = document.querySelector(`.event-item[data-id="${eventId}"]`);
    if (eventItem) {
            eventItem.remove();
        }
}


window.onload = displayEvents;
