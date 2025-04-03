// Function to load HTML content into an element
function loadHTML(elementId, filePath, callback) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;
            if (callback) callback();
        });
}

// Function to setup Dark Mode
function setupDarkMode() {
    // Check if dark mode is enabled from localStorage and apply it on page load
    if (localStorage.getItem('dark-mode') === 'enabled') {
        document.body.classList.add('dark-mode');
    }

    // Dark mode toggle button logic
    const toggleButton = document.getElementById('dark-mode-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                localStorage.setItem('dark-mode', 'enabled');
            } else {
                localStorage.setItem('dark-mode', 'disabled');
            }
        });
    }
}

// Function to load specific article based on page
function loadArticles() {
    const path = window.location.pathname; // Get current page path

    // Check if the specific article container exists and load the corresponding article
    if (document.getElementById("sports-complex-text")) {
        fetch('../txt/sports-complex.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById("sports-complex-text").innerHTML = `<p>${data}</p>`;
            })
            .catch(error => console.error('Error loading Sports Complex article:', error));
    }

    if (document.getElementById("patriotism-week-text")) {
        fetch('../txt/patriotism-week.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById("patriotism-week-text").innerHTML = `<p>${data}</p>`;
            })
            .catch(error => console.error('Error loading Patriotism Week article:', error));
    }

    if (document.getElementById("upcoming-event-text")) {
        fetch('../txt/upcoming-event.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById("upcoming-event-text").innerHTML = `<p>${data}</p>`;
            })
            .catch(error => console.error('Error loading Upcoming event article:', error));
    }

    if (document.getElementById("science-fair-text")) {
        fetch('../txt/science-fair.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById("science-fair-text").innerHTML = `<p>${data}</p>`;
            })
            .catch(error => console.error('Error loading Science Fair article:', error));
    }

    if (document.getElementById("library-opening-text")) {
        fetch('../txt/library-opening.txt')
            .then(response => response.text())
            .then(data => {
                document.getElementById("library-opening-text").innerHTML = `<p>${data}</p>`;
            })
            .catch(error => console.error('Error loading Library opening article:', error));
    }
}

function searchFunction() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let sections = document.querySelectorAll("section, article, h2, h3, h4"); // Select sections and headings

    let found = false;
    
    sections.forEach(section => {
        let text = section.textContent.toLowerCase();
        
        if (text.includes(input) && !found) {
            section.scrollIntoView({ behavior: "smooth", block: "start" });
            section.style.backgroundColor = "yellow"; // Highlight the section briefly
            setTimeout(() => section.style.backgroundColor = "", 2000); // Remove highlight after 2 sec
            found = true;
        }
    });

    if (!found) {
        alert("No matching section found!");
    }
}

function setActiveNav() {
    let currentPage = window.location.pathname.split("/").pop() || "index.html"; //Get the current page name & default to homepage
    let navLinks = document.querySelectorAll("nav a");

    //List of pages for each section

    const pages = {
        index:["index.html"],
        academics:["academics.html"],
        about_us: ["about_us.html"],
        contact_us: ["contact_us.html"],
        gallery: ["gallery.html"],
        news: ["news.html", "recent_news.html", "featured_news.html", "news_upload.html", "upcoming_events.html"]
    };
    
    //Looping through each link in the nav bar
    navLinks.forEach(link => {
        link.classList.remove("active"); // Reset all links

        let linkHref = link.getAttribute("href");
        
        //Checking for each page and marking the corresponding nav tab active
        for (const page in pages) {
        if (pages[page].includes(currentPage) && linkHref === `${page}.html`) {
            link.classList.add("active");
        }
    }
    });
}


// Wait for the (only) DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Load header and footer (same for all pages)
    loadHTML('header', 'header.html', function () {
        // After the header is loaded, set up event listeners for search
        const searchBtn = document.getElementById("searchBtn");
        const searchInput = document.getElementById("searchInput");

        if (searchBtn && searchInput) {
            searchBtn.addEventListener("click", searchFunction);
            searchInput.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    searchFunction();
                }
            });
        }

        // Setup dark mode after header is loaded
        setupDarkMode();

        // Set active navigation link after header is loaded
        setActiveNav();
    });

    loadHTML('footer', 'footer.html');
    
    // Load the relevant articles (this will load only the articles that are on the current page)
    loadArticles();
});


