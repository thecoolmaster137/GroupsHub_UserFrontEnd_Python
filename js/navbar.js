document.addEventListener("DOMContentLoaded", function () {
    const navbar = `
    <nav class="navbar navbar-expand-lg bg-light px-3">
        <div class="container-fluid">
            <a class="navbar-brand d-flex align-items-center" href="#">
                <img src="assets/logo.png" alt="GroupsHub Logo" height="40" class="me-2">
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link text-danger fw-bold" href="#">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Add Group</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Terms</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Privacy</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">Contact</a></li>
                    <li class="nav-item"><a class="nav-link" href="#">FAQ's</a></li>
                </ul>
                <form class="d-flex ms-3">
                    <input class="form-control me-2" type="search" placeholder="Search Groups By Tags" aria-label="Search">
                    <button class="btn btn-outline-success" type="submit">Search</button>
                </form>
            </div>
        </div>
    </nav>`;

    document.getElementById("navbar-container").innerHTML = navbar;
});
