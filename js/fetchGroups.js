document.addEventListener("DOMContentLoaded", function () {
    const groupListContainer = document.getElementById("groupList");
    const paginationContainer = document.querySelector(".pagination");
    const loader = document.getElementById("loader"); // Loader element
    const noDataMessage = document.getElementById("noDataMessage"); // No Data Found Message

    const API_URL = "https://groupshub-api-python.onrender.com/api/groups";
    const SEARCH_API_URL = "https://groupshub-api-python.onrender.com/api/groups/search/";
    const groupsPerPage = 5;
    let currentPage = 1;
    let groupsData = [];

    const SECRET_KEY = "YourSecretKey123!";

    function encryptData(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    }

    async function fetchGroups(url) {
        try {
            showLoader();
            const response = await fetch(url);
            groupsData = await response.json();

            if (groupsData.length === 0) {
                noDataMessage.style.display = "block";
            } else {
                noDataMessage.style.display = "none";
            }

            renderGroups();
            renderPagination();
        } catch (error) {
            console.error("Error fetching groups:", error);
            groupListContainer.innerHTML = "<p class='text-center text-danger'>Failed to load groups.</p>";
            noDataMessage.style.display = "block"; // Show message if an error occurs
        } finally {
            hideLoader();
        }
    }

    function renderGroups() {
        groupListContainer.innerHTML = "";
        const start = (currentPage - 1) * groupsPerPage;
        const paginatedGroups = groupsData.slice(start, start + groupsPerPage);
        
        paginatedGroups.forEach(group => {
            const encryptedData = encryptData({ group_id: group.group_id, cat_id: group.cat_id });
            const encodedData = encodeURIComponent(btoa(encryptedData));
            const groupCard = `
                <div class="card mb-3 border-0 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex align-items-center">
                            <img src="${group.group_image || 'default_icon.png'}" class="rounded-circle me-3" width="50" height="50" alt="Group Icon">
                            <div>
                                <h6 class="mb-0">${group.group_name}</h6>
                                <small class="text-muted">${group.cat_name} || ${group.country} || ${group.language}</small>
                            </div>
                        </div>
                        <p class="mt-2">${group.group_desc}</p>
                        <p class="mt-2">${group.tags}</p>
                        <hr>
                        <a href="/pages/groupInvite/groupInvite.html?data=${encodedData}" class="btn btn-outline-primary btn-sm">Join Group</a>
                    </div>
                </div>
            `;
            groupListContainer.innerHTML += groupCard;
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(groupsData.length / groupsPerPage);
        if (totalPages <= 1) return;

        paginationContainer.innerHTML += `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>`;
        
        for (let i = 1; i <= totalPages; i++) {
            paginationContainer.innerHTML += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>`;
        }

        paginationContainer.innerHTML += `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>`;
    }

    window.changePage = function (page) {
        if (page < 1 || page > Math.ceil(groupsData.length / groupsPerPage)) return;
        currentPage = page;
        renderGroups();
        renderPagination();
    };

    function searchGroups() {
        const category = document.getElementById("categorySelect").value;
        const country = document.getElementById("countrySelect").value;
        const language = document.getElementById("languageSelect").value;
        const application = document.getElementById("applicationSelect").value;
        
        const params = new URLSearchParams();
        if (category && category !== "Any Category") params.append("cat_id", category);
        if (country && country !== "Any Country") params.append("country", country);
        if (language && language !== "Any Language") params.append("language", language);
        if (application && application !== "Application") params.append("application", application);

        const searchUrl = params.toString() ? `${SEARCH_API_URL}?${params}` : SEARCH_API_URL;
        fetchGroups(searchUrl);
    }

    document.querySelector(".btn-primary").addEventListener("click", searchGroups);

    function showLoader() {
        loader.style.display = "block";
    }

    function hideLoader() {
        loader.style.display = "none";
    }

    fetchGroups(API_URL);
});
