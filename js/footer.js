document.addEventListener("DOMContentLoaded", function () {
    const footer = document.createElement("footer");
    footer.className = "footer bg-dark text-white text-center py-3";
    footer.innerHTML = `
        <p>&copy; 2025 Your Website Name. All rights reserved.</p>
    `;

    document.body.appendChild(footer);
});
