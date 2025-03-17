// document.addEventListener("DOMContentLoaded", function () {
//     const groupListContainer = document.getElementById("groupList");
//     const paginationContainer = document.querySelector(".pagination");

//     const API_URL = "http://127.0.0.1:8000/api/groups";
//     const groupsPerPage = 5; // Number of groups per page
//     let currentPage = 1;
//     let groupsData = [];

//     // 🔐 AES Encryption Secret Key (Same on Backend)
//     const SECRET_KEY = "YourSecretKey123!";

//     // 🔒 Function to Encrypt Data (group_id & cat_id)
//     function encryptData(data) {
//         return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
//     }

//     async function fetchGroups() {
//         try {
//             const response = await fetch(API_URL);
//             groupsData = await response.json();
//             renderGroups();
//             renderPagination();
//         } catch (error) {
//             console.error("Error fetching groups:", error);
//             groupListContainer.innerHTML = "<p class='text-center text-danger'>Failed to load groups.</p>";
//         }
//     }

//     function renderGroups() {
//         groupListContainer.innerHTML = "";
//         const start = (currentPage - 1) * groupsPerPage;
//         const end = start + groupsPerPage;
//         const paginatedGroups = groupsData.slice(start, end);

//         paginatedGroups.forEach(group => {
//             // Encrypt both group_id and cat_id together
//             const encryptedData = encryptData({ group_id: group.group_id, cat_id: group.cat_id });
//             const encodedData = encodeURIComponent(btoa(encryptedData)); // Base64 encode for URL safety

//             const groupCard = `
//                 <div class="card mb-3 border-0 shadow-sm">
//                     <div class="card-body">
//                         <div class="d-flex align-items-center">
//                             <img src="${group.group_image || 'default_icon.png'}" class="rounded-circle me-3" width="50" height="50" alt="Group Icon">
//                             <div>
//                                 <h6 class="mb-0">${group.group_name}</h6>
//                                 <small class="text-muted">${group.cat_name} || ${group.country} || ${group.language}</small>
//                             </div>
//                         </div>
//                         <p class="mt-2">${group.group_desc}</p>
//                         <p class="mt-2">${group.tags}</p>
//                         <input type="hidden" name="group_id" value="${group.group_id}">
//                         <input type="hidden" name="cat_id" value="${group.cat_id}">
//                         <hr>
//                         <a href="/pages/groupInvite/groupInvite.html?data=${encodedData}" class="btn btn-outline-primary btn-sm">Join Group</a>
//                         <span class="float-end">Share on: 
//                             <a href="#">🟢</a> 
//                             <a href="#">📸</a>
//                             <a href="#">📩</a>
//                         </span>
//                     </div>
//                 </div>
//             `;
//             groupListContainer.innerHTML += groupCard;
//         });
//     }

//     function renderPagination() {
//         paginationContainer.innerHTML = "";
//         const totalPages = Math.ceil(groupsData.length / groupsPerPage);

//         const prevButton = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
//             <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
//         </li>`;

//         const nextButton = `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
//             <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
//         </li>`;

//         let pageNumbers = "";
//         for (let i = 1; i <= totalPages; i++) {
//             pageNumbers += `<li class="page-item ${i === currentPage ? 'active' : ''}">
//                 <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
//             </li>`;
//         }

//         paginationContainer.innerHTML = prevButton + pageNumbers + nextButton;
//     }

//     window.changePage = function (page) {
//         if (page < 1 || page > Math.ceil(groupsData.length / groupsPerPage)) return;
//         currentPage = page;
//         renderGroups();
//         renderPagination();
//     };

//     fetchGroups();
// });

document.addEventListener("DOMContentLoaded", function () {
    const groupListContainer = document.getElementById("groupList");
    const paginationContainer = document.querySelector(".pagination");
    const findGroupButton = document.querySelector(".btn-primary");
    
    const API_URL = "http://127.0.0.1:8000/api/groups/search/";
    const groupsPerPage = 5;
    let currentPage = 1;
    let groupsData = [];

    // AES Encryption Secret Key
    const SECRET_KEY = "YourSecretKey123!";

    function encryptData(data) {
        return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
    }

    async function fetchGroups(filters = {}) {
        try {
            let queryParams = new URLSearchParams(filters).toString();
            let url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

            const response = await fetch(url);
            groupsData = await response.json();
            renderGroups();
            renderPagination();
        } catch (error) {
            console.error("Error fetching groups:", error);
            groupListContainer.innerHTML = "<p class='text-center text-danger'>Failed to load groups.</p>";
        }
    }

    function renderGroups() {
        groupListContainer.innerHTML = "";
        const start = (currentPage - 1) * groupsPerPage;
        const end = start + groupsPerPage;
        const paginatedGroups = groupsData.slice(start, end);

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
                        <input type="hidden" name="group_id" value="${group.group_id}">
                        <input type="hidden" name="cat_id" value="${group.cat_id}">
                        <hr>
                        <a href="/pages/groupInvite/groupInvite.html?data=${encodedData}" class="btn btn-outline-primary btn-sm">Join Group</a>
                        <span class="float-end">Share on: 
                            <a href="#">🟢</a> 
                            <a href="#">📸</a>
                            <a href="#">📩</a>
                        </span>
                    </div>
                </div>
            `;
            groupListContainer.innerHTML += groupCard;
        });
    }

    function renderPagination() {
        paginationContainer.innerHTML = "";
        const totalPages = Math.ceil(groupsData.length / groupsPerPage);

        const prevButton = `<li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1})">Previous</a>
        </li>`;

        const nextButton = `<li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1})">Next</a>
        </li>`;

        let pageNumbers = "";
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers += `<li class="page-item ${i === currentPage ? 'active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
            </li>`;
        }

        paginationContainer.innerHTML = prevButton + pageNumbers + nextButton;
    }

    window.changePage = function (page) {
        if (page < 1 || page > Math.ceil(groupsData.length / groupsPerPage)) return;
        currentPage = page;
        renderGroups();
        renderPagination();
    };

    findGroupButton.addEventListener("click", function () {
        const category = document.getElementById("categorySelect").value;
        const country = document.getElementById("countrySelect").value;
        const language = document.getElementById("languageSelect").value;
        const application = document.getElementById("applicationSelect").value;

        let filters = {};
        if (category !== "Any Category") filters.cat_id = category;
        if (country !== "Any Country") filters.country = country;
        if (language !== "Any Language") filters.language = language;
        if (application !== "Application") filters.application = application;

        fetchGroups(filters);
    });

    fetchGroups(); // Fetch all groups by default on page load
});

