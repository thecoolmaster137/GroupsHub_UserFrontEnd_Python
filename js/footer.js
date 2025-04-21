document.addEventListener("DOMContentLoaded", function () {
    const footer = document.createElement("footer");
    footer.className = "footer bg-dark text-white text-center py-3";
    footer.innerHTML = `
        <p>&copy; 2025 GroupsHub. All rights reserved.</p>
    `;

    document.body.appendChild(footer);
});
