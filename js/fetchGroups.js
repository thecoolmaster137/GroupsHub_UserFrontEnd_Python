// document.addEventListener("DOMContentLoaded", function () {
//     const groupListContainer = document.getElementById("groupList");

//     // API Endpoint to fetch groups
//     const API_URL = "http://127.0.0.1:8000/api/groups";

//     async function fetchGroups() {
//         try {
//             const response = await fetch(API_URL);
//             const groups = await response.json();

//             // Clear existing content
//             groupListContainer.innerHTML = "";

//             groups.forEach(group => {

//                 console.log(group);

//                 const groupCard = `
//                     <div class="card mb-3 border-0 shadow-sm">
//                         <div class="card-body">
//                             <div class="d-flex align-items-center">
//                                 <img src="${group.group_image || 'default_icon.png'}" class="rounded-circle me-3" width="50" height="50" alt="Group Icon">
//                                 <div>
//                                     <h6 class="mb-0">${group.group_name}</h6>
//                                     <small class="text-muted">${group.cat_name} || ${group.country} || ${group.language}</small>
//                                 </div>
//                             </div>
//                             <p class="mt-2">${group.group_desc}</p>
//                             <p class="mt-2">${group.tags}</a>
//                             <hr>
//                             <button class="btn btn-outline-primary btn-sm">Join Group</button>
//                             <span class="float-end">Share on: 
//                                 <a href="#">🟢</a> 
//                                 <a href="#">📸</a>
//                                 <a href="#">📩</a>
//                             </span>
//                         </div>
//                     </div>
//                 `;
//                 groupListContainer.innerHTML += groupCard;
//             });
//         } catch (error) {
//             console.error("Error fetching groups:", error);
//             groupListContainer.innerHTML = "<p class='text-center text-danger'>Failed to load groups.</p>";
//         }
//     }

//     fetchGroups();
// });



document.addEventListener("DOMContentLoaded", function () {
    const groupListContainer = document.getElementById("groupList");
    const paginationContainer = document.querySelector(".pagination");

    const API_URL = "http://127.0.0.1:8000/api/groups";
    const groupsPerPage = 5; // Number of groups per page
    let currentPage = 1;
    let groupsData = [];

    async function fetchGroups() {
        try {
            const response = await fetch(API_URL);
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
                        <button class="btn btn-outline-primary btn-sm">Join Group</button>
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

    fetchGroups();
});
