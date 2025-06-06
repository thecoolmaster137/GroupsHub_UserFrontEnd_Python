document.addEventListener("DOMContentLoaded", function () {
    const navbar = `
    <nav class="navbar navbar-expand-lg bg-light px-3">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="/index.html">
                <img src="/assets/images/GroupsHub.png" alt="GroupsHub" height="90" width="140" class="me-2">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/index.html">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/addgroup/addgroup.html">Add Group</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/terms/terms.html">Terms</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/privacy/privacy.html">Privacy</a></li>
                    <li class="nav-item"><a class="nav-link" href="/pages/contact/contact.html">Contact</a></li>
                </ul>
            </div>
        </div>
    </nav>`;

    // Inject Navbar into the container
    document.getElementById("navbar-container").innerHTML = navbar;

    // Highlight Active Link Logic
    const currentPath = window.location.pathname.split('/').pop(); // Extracts the current filename
    const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

    navLinks.forEach(link => {
        if (link.getAttribute("href").split('/').pop() === currentPath) {
            link.classList.add("active", "fw-bold", "text-primary"); // Add active styles
        }
    });
});

