"use strict";

/* Employee Data */
const employees = [
    {
        id: "EMP-1001",
        name: "John Doe",
        email: "john.doe@email.com",
        department: "IT",
        job: "Software Engineer",
        joined: "2020-10-17",
        joinedLabel: "17 Oct, 2020",
        status: "Active",
        avatar: "John"
    },
    {
        id: "EMP-1002",
        name: "Dianne Russell",
        email: "willie.jennings@example.com",
        department: "HR",
        job: "President of Sales",
        joined: "2020-02-01",
        joinedLabel: "01 Feb, 2020",
        status: "In Progress",
        avatar: "Dianne"
    },
    {
        id: "EMP-1003",
        name: "Kristin Watson",
        email: "michael.mitc@example.com",
        department: "Finance",
        job: "Nursing Assistant",
        joined: "2020-09-08",
        joinedLabel: "08 Sep, 2020",
        status: "Active",
        avatar: "Kristin"
    },
    {
        id: "EMP-1004",
        name: "Courtney Henry",
        email: "debbie.baker@example.com",
        department: "Marketing",
        job: "Medical Assistant",
        joined: "2020-05-24",
        joinedLabel: "24 May, 2020",
        status: "Active",
        avatar: "Courtney"
    },
    {
        id: "EMP-1005",
        name: "Kathryn Murphy",
        email: "michelle.rivera@example.com",
        department: "Sales",
        job: "Web Designer",
        joined: "2020-09-21",
        joinedLabel: "21 Sep, 2020",
        status: "Declined",
        avatar: "Kathryn"
    },
    {
        id: "EMP-1006",
        name: "Darrell Steward",
        email: "felicia.reid@example.com",
        department: "IT",
        job: "Web Designer",
        joined: "2020-09-30",
        joinedLabel: "30 Sep, 2020",
        status: "In Progress",
        avatar: "Darrell"
    },
    {
        id: "EMP-1007",
        name: "Ronald Richards",
        email: "ronald.richards@example.com",
        department: "HR",
        job: "UI Designer",
        joined: "2020-10-21",
        joinedLabel: "21 Oct, 2020",
        status: "Active",
        avatar: "Ronald"
    },
    {
        id: "EMP-1008",
        name: "Eleanor Pena",
        email: "eleanor.pena@example.com",
        department: "Finance",
        job: "Account Manager",
        joined: "2020-11-13",
        joinedLabel: "13 Nov, 2020",
        status: "Active",
        avatar: "Eleanor"
    },
    {
        id: "EMP-1009",
        name: "Cameron Williamson",
        email: "cameron.williamson@example.com",
        department: "Design",
        job: "UX Designer",
        joined: "2020-07-07",
        joinedLabel: "07 Jul, 2020",
        status: "In Progress",
        avatar: "Cameron"
    },
    {
        id: "EMP-1010",
        name: "Esther Howard",
        email: "esther.howard@example.com",
        department: "Support",
        job: "Support Specialist",
        joined: "2020-06-11",
        joinedLabel: "11 Jun, 2020",
        status: "Active",
        avatar: "Esther"
    }
];

/* Chart Data */
const chartData = [
    { month: "Jan", hires: 31, exits: 10 },
    { month: "Feb", hires: 44, exits: 24 },
    { month: "Mar", hires: 48, exits: 32 },
    { month: "Apr", hires: 56, exits: 22 },
    { month: "May", hires: 32, exits: 16 },
    { month: "Jun", hires: 47, exits: 28 },
    { month: "Jul", hires: 48, exits: 16 },
    { month: "Aug", hires: 29, exits: 15 },
    { month: "Sep", hires: 48, exits: 19 },
    { month: "Oct", hires: 57, exits: 24 },
    { month: "Nov", hires: 34, exits: 28 }
];

/* Dashboard State */
const state = {
    search: "",
    status: "All",
    sortDate: "default",
    selectedEmployees: new Set()
};

/* DOM References */
const elements = {
    body: document.body,
    sidebar: document.getElementById("sidebar"),
    sidebarOverlay: document.getElementById("sidebarOverlay"),
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    performanceToggle: document.getElementById("performanceToggle"),
    performanceSubmenu: document.getElementById("performanceSubmenu"),
    favoritesToggle: document.getElementById("favoritesToggle"),
    favoritesList: document.getElementById("favoritesList"),
    closePlanCard: document.getElementById("closePlanCard"),
    planCard: document.getElementById("planCard"),
    globalSearch: document.getElementById("globalSearch"),
    employeeSearch: document.getElementById("employeeSearch"),
    employeeTableBody: document.getElementById("employeeTableBody"),
    employeeTable: document.querySelector(".employee-table"),
    emptyState: document.getElementById("emptyState"),
    selectAllEmployees: document.getElementById("selectAllEmployees"),
    dateFilterBtn: document.getElementById("dateFilterBtn"),
    dateFilterMenu: document.getElementById("dateFilterMenu"),
    statusFilterBtn: document.getElementById("statusFilterBtn"),
    statusFilterMenu: document.getElementById("statusFilterMenu"),
    statusFilterText: document.getElementById("statusFilterText"),
    moreFilterBtn: document.getElementById("moreFilterBtn"),
    moreFilterMenu: document.getElementById("moreFilterMenu"),
    clearFiltersBtn: document.getElementById("clearFiltersBtn"),
    exportBtn: document.getElementById("exportBtn"),
    editTableBtn: document.getElementById("editTableBtn"),
    editTableModal: document.getElementById("editTableModal"),
    resultModal: document.getElementById("resultModal"),
    resultSummary: document.getElementById("resultSummary"),
    saveColumnsBtn: document.getElementById("saveColumnsBtn"),
    barChart: document.getElementById("barChart"),
    toast: document.getElementById("toast"),
    toastMessage: document.getElementById("toastMessage")
};

function getAvatarUrl(seed) {
    return `https://api.dicebear.com/9.x/notionists/svg?seed=${encodeURIComponent(seed)}&backgroundColor=e8d8cf,d6e2e6,f2d3c7`;
}

function getStatusClass(status) {
    if (status === "Active") return "status--active";
    if (status === "Declined") return "status--declined";
    return "status--progress";
}

function getFilteredEmployees() {
    let result = [...employees];

    if (state.search) {
        const query = state.search.toLowerCase().trim();

        result = result.filter((employee) => {
            return [
                employee.id,
                employee.name,
                employee.email,
                employee.department,
                employee.job,
                employee.status
            ].some((value) => value.toLowerCase().includes(query));
        });
    }

    if (state.status !== "All") {
        result = result.filter((employee) => employee.status === state.status);
    }

    if (state.sortDate === "newest") {
        result.sort((a, b) => new Date(b.joined) - new Date(a.joined));
    }

    if (state.sortDate === "oldest") {
        result.sort((a, b) => new Date(a.joined) - new Date(b.joined));
    }

    return result;
}

function renderEmployees() {
    const data = getFilteredEmployees();

    elements.employeeTableBody.innerHTML = data.map((employee) => {
        const isSelected = state.selectedEmployees.has(employee.id);

        return `
            <tr class="${isSelected ? "selected" : ""}" data-employee-id="${employee.id}">
                <td class="column-id">
                    <div class="table-heading">
                        <input class="employee-checkbox" type="checkbox" value="${employee.id}" aria-label="Select ${employee.name}" ${isSelected ? "checked" : ""}>
                        <span>${employee.id}</span>
                    </div>
                </td>

                <td class="column-name">
                    <div class="employee-cell">
                        <img src="${getAvatarUrl(employee.avatar)}" alt="${employee.name}">
                        <span>${employee.name}</span>
                    </div>
                </td>

                <td class="column-email">${employee.email}</td>
                <td class="column-department"><span class="tag">${employee.department}</span></td>
                <td class="column-job"><span class="tag">${employee.job}</span></td>
                <td class="column-date">${employee.joinedLabel}</td>
                <td class="column-status"><span class="status ${getStatusClass(employee.status)}">${employee.status}</span></td>
            </tr>
        `;
    }).join("");

    elements.emptyState.hidden = data.length > 0;
    elements.employeeTable.style.display = data.length ? "" : "none";

    updateSelectAllState(data);
    bindEmployeeCheckboxes();
}

function bindEmployeeCheckboxes() {
    document.querySelectorAll(".employee-checkbox").forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            const employeeId = checkbox.value;
            const row = checkbox.closest("tr");

            if (checkbox.checked) {
                state.selectedEmployees.add(employeeId);
                row.classList.add("selected");
            } else {
                state.selectedEmployees.delete(employeeId);
                row.classList.remove("selected");
            }

            updateSelectAllState(getFilteredEmployees());
        });
    });
}

function updateSelectAllState(data) {
    if (!data.length) {
        elements.selectAllEmployees.checked = false;
        elements.selectAllEmployees.indeterminate = false;
        return;
    }

    const selectedVisible = data.filter((employee) => state.selectedEmployees.has(employee.id)).length;

    elements.selectAllEmployees.checked = selectedVisible === data.length;
    elements.selectAllEmployees.indeterminate = selectedVisible > 0 && selectedVisible < data.length;
}

function renderChart() {
    const maxValue = 60;

    elements.barChart.innerHTML = chartData.map((item) => {
        const hireHeight = `${(item.hires / maxValue) * 100}%`;
        const exitHeight = `${(item.exits / maxValue) * 100}%`;
        const activeClass = item.month === "Apr" ? "bar-group--active" : "";

        return `
            <div class="bar-group ${activeClass}">
                <div class="bar-group__bars">
                    <span class="chart-bar chart-bar--hire" data-height="${hireHeight}" title="${item.month}: ${item.hires} new hires"></span>
                    <span class="chart-bar chart-bar--exit" data-height="${exitHeight}" title="${item.month}: ${item.exits} exits"></span>
                </div>

                <span class="bar-group__month">${item.month}</span>
            </div>
        `;
    }).join("");

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.querySelectorAll(".chart-bar").forEach((bar) => {
                bar.style.height = bar.dataset.height;
            });
        });
    });
}

function toggleSidebar(force) {
    const shouldOpen = typeof force === "boolean" ? force : !elements.body.classList.contains("sidebar-open");

    elements.body.classList.toggle("sidebar-open", shouldOpen);
    elements.mobileMenuBtn.setAttribute("aria-expanded", String(shouldOpen));
}

function closeDropdowns(exception = null) {
    const dropdownPairs = [
        [elements.dateFilterBtn, elements.dateFilterMenu],
        [elements.statusFilterBtn, elements.statusFilterMenu],
        [elements.moreFilterBtn, elements.moreFilterMenu]
    ];

    dropdownPairs.forEach(([button, menu]) => {
        if (menu !== exception) {
            menu.classList.remove("open");
            button.setAttribute("aria-expanded", "false");
        }
    });
}

function toggleDropdown(button, menu) {
    const willOpen = !menu.classList.contains("open");

    closeDropdowns(menu);
    menu.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", String(willOpen));
}

function openModal(modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    const focusTarget = modal.querySelector("button, input");

    if (focusTarget) {
        setTimeout(() => focusTarget.focus(), 100);
    }
}

function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");

    if (!document.querySelector(".modal.open")) {
        document.body.style.overflow = "";
    }
}

let toastTimeout;

function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.add("show");

    window.clearTimeout(toastTimeout);

    toastTimeout = window.setTimeout(() => {
        elements.toast.classList.remove("show");
    }, 2600);
}

function resetFilters() {
    state.search = "";
    state.status = "All";
    state.sortDate = "default";

    elements.employeeSearch.value = "";
    elements.globalSearch.value = "";
    elements.statusFilterText.textContent = "All Status";

    renderEmployees();
    closeDropdowns();
    showToast("Employee filters have been reset.");
}

function exportCSV() {
    const data = getFilteredEmployees();

    if (!data.length) {
        showToast("There is no employee data to export.");
        return;
    }

    const headers = [
        "User ID",
        "Name",
        "Email Address",
        "Department",
        "Job Title",
        "Joined Date",
        "Status"
    ];

    const rows = data.map((employee) => [
        employee.id,
        employee.name,
        employee.email,
        employee.department,
        employee.job,
        employee.joinedLabel,
        employee.status
    ]);

    const csv = [headers, ...rows]
        .map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","))
        .join("\n");

    const blob = new Blob([csv], {
        type: "text/csv;charset=utf-8;"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "zenus-employees.csv";

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    closeDropdowns();
    showToast("Employee CSV exported successfully.");
}

function showResult(type) {
    const filtered = getFilteredEmployees();

    const active = filtered.filter((employee) => employee.status === "Active").length;
    const progress = filtered.filter((employee) => employee.status === "In Progress").length;
    const declined = filtered.filter((employee) => employee.status === "Declined").length;

    if (type === "chart") {
        const totalHires = chartData.reduce((sum, item) => sum + item.hires, 0);
        const totalExits = chartData.reduce((sum, item) => sum + item.exits, 0);
        const netGrowth = totalHires - totalExits;

        elements.resultSummary.innerHTML = `
            <div class="result-item">
                <span>Total new hires</span>
                <strong>${totalHires}</strong>
            </div>

            <div class="result-item">
                <span>Total exits</span>
                <strong>${totalExits}</strong>
            </div>

            <div class="result-item">
                <span>Net growth</span>
                <strong>+${netGrowth}</strong>
            </div>

            <div class="result-item">
                <span>Best hiring month</span>
                <strong>Oct</strong>
            </div>
        `;
    } else {
        elements.resultSummary.innerHTML = `
            <div class="result-item">
                <span>Displayed employees</span>
                <strong>${filtered.length}</strong>
            </div>

            <div class="result-item">
                <span>Active</span>
                <strong>${active}</strong>
            </div>

            <div class="result-item">
                <span>In progress</span>
                <strong>${progress}</strong>
            </div>

            <div class="result-item">
                <span>Declined</span>
                <strong>${declined}</strong>
            </div>
        `;
    }

    openModal(elements.resultModal);
}

function saveColumnPreferences() {
    document.querySelectorAll("[data-column]").forEach((checkbox) => {
        const column = checkbox.dataset.column;

        elements.employeeTable.classList.toggle(`hide-${column}`, !checkbox.checked);
    });

    closeModal(elements.editTableModal);
    showToast("Table preferences saved.");
}

function initializeInteractions() {
    elements.mobileMenuBtn.addEventListener("click", () => {
        toggleSidebar();
    });

    elements.sidebarOverlay.addEventListener("click", () => {
        toggleSidebar(false);
    });

    elements.performanceToggle.addEventListener("click", () => {
        const expanded = elements.performanceToggle.getAttribute("aria-expanded") === "true";

        elements.performanceToggle.setAttribute("aria-expanded", String(!expanded));
        elements.performanceSubmenu.classList.toggle("open", !expanded);
    });

    elements.favoritesToggle.addEventListener("click", () => {
        const expanded = elements.favoritesToggle.getAttribute("aria-expanded") === "true";

        elements.favoritesToggle.setAttribute("aria-expanded", String(!expanded));
        elements.favoritesList.classList.toggle("collapsed", expanded);
    });

    elements.closePlanCard.addEventListener("click", () => {
        elements.planCard.classList.add("hidden");
    });

    elements.globalSearch.addEventListener("input", (event) => {
        elements.employeeSearch.value = event.target.value;
        state.search = event.target.value;

        renderEmployees();
    });

    elements.employeeSearch.addEventListener("input", (event) => {
        state.search = event.target.value;

        renderEmployees();
    });

    elements.selectAllEmployees.addEventListener("change", () => {
        getFilteredEmployees().forEach((employee) => {
            if (elements.selectAllEmployees.checked) {
                state.selectedEmployees.add(employee.id);
            } else {
                state.selectedEmployees.delete(employee.id);
            }
        });

        renderEmployees();
    });

    elements.dateFilterBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        toggleDropdown(elements.dateFilterBtn, elements.dateFilterMenu);
    });

    elements.statusFilterBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        toggleDropdown(elements.statusFilterBtn, elements.statusFilterMenu);
    });

    elements.moreFilterBtn.addEventListener("click", (event) => {
        event.stopPropagation();

        toggleDropdown(elements.moreFilterBtn, elements.moreFilterMenu);
    });

    elements.dateFilterMenu.querySelectorAll("[data-sort-date]").forEach((button) => {
        button.addEventListener("click", () => {
            state.sortDate = button.dataset.sortDate;

            renderEmployees();
            closeDropdowns();
        });
    });

    elements.statusFilterMenu.querySelectorAll("[data-status]").forEach((button) => {
        button.addEventListener("click", () => {
            state.status = button.dataset.status;

            elements.statusFilterText.textContent = button.dataset.status === "All" ? "All Status" : button.dataset.status;

            renderEmployees();
            closeDropdowns();
        });
    });

    elements.clearFiltersBtn.addEventListener("click", resetFilters);
    elements.exportBtn.addEventListener("click", exportCSV);

    elements.editTableBtn.addEventListener("click", () => {
        openModal(elements.editTableModal);
    });

    elements.saveColumnsBtn.addEventListener("click", saveColumnPreferences);

    document.querySelectorAll("[data-close-modal]").forEach((element) => {
        element.addEventListener("click", () => {
            closeModal(elements.editTableModal);
        });
    });

    document.querySelectorAll("[data-close-result]").forEach((element) => {
        element.addEventListener("click", () => {
            closeModal(elements.resultModal);
        });
    });

    document.querySelectorAll(".view-result-btn").forEach((button) => {
        button.addEventListener("click", () => {
            showResult(button.dataset.result);
        });
    });

    document.querySelectorAll(".nav-link[href]").forEach((link) => {
        link.addEventListener("click", () => {
            document.querySelectorAll(".nav-link[href]").forEach((item) => {
                item.classList.remove("active");
            });

            link.classList.add("active");

            if (window.innerWidth <= 900) {
                toggleSidebar(false);
            }
        });
    });

    document.addEventListener("click", (event) => {
        if (!event.target.closest(".filter-dropdown")) {
            closeDropdowns();
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") return;

        closeDropdowns();

        if (elements.editTableModal.classList.contains("open")) {
            closeModal(elements.editTableModal);
        }

        if (elements.resultModal.classList.contains("open")) {
            closeModal(elements.resultModal);
        }

        if (elements.body.classList.contains("sidebar-open")) {
            toggleSidebar(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 900) {
            toggleSidebar(false);
        }
    });
}

function initializeDashboard() {
    renderChart();
    renderEmployees();
    initializeInteractions();
}

initializeDashboard();