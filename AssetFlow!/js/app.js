/* ==========================================
   ASSETFLOW CENTRAL LOGIC & MOCK RECORDS
========================================== */

document.addEventListener("DOMContentLoaded", () => {
    initMockDatabase();
    bindCommonEvents();
    syncSidebarState();
    loadPersistentTheme();
});

// Initialize mock data models in localStorage if not already present
function initMockDatabase() {
    // 1. Assets Initial Set
    if (!localStorage.getItem("af_assets")) {
        const defaultAssets = [
            { id: "AST-1001", name: "MacBook Pro M3", type: "Laptops", cost: 1999, category: "Laptops", status: "Allocated", assignee: "Rahul Shah", dept: "Development", date: "12 Jul 2026", description: "Apple Silicon M3, 16GB Unified Memory, 512GB SSD." },
            { id: "AST-1002", name: "Dell Latitude 7440", type: "Laptops", cost: 1299, category: "Laptops", status: "Reserved", assignee: "Priya Patel", dept: "HR", date: "12 Jul 2026", description: "Intel Core i7, 16GB LPDDR5, 512GB SSD PCIe." },
            { id: "AST-1003", name: "Canon EOS R50", type: "Media Support", cost: 679, category: "Printers", status: "Maintenance", assignee: "Media Department", dept: "Marketing", date: "11 Jul 2026", description: "Mirrorless vlogging camera with 18-45mm lens kit." },
            { id: "AST-1004", name: "Projector Epson EB-X49", type: "Meeting Room Equipment", cost: 450, category: "Furniture", status: "Reserved", assignee: "Conference Room A", dept: "Admin", date: "10 Jul 2026", description: "3LCD Projector, XGA Resolution, 3400 Lumens." },
            { id: "AST-1005", name: "LG UltraFine 27\"", type: "Monitors", cost: 399, category: "Monitors", status: "Available", assignee: "", dept: "", date: "09 Jul 2026", description: "4K IPS Monitor with Type-C connectivity." },
            { id: "AST-1006", name: "HP LaserJet Pro", type: "Printers", cost: 249, category: "Printers", status: "Available", assignee: "", dept: "", date: "08 Jul 2026", description: "Monochrome Laser printer with wireless networking." },
            { id: "AST-1007", name: "Cisco Catalyst Switch", type: "Networking", cost: 1200, category: "Networking", status: "Allocated", assignee: "Amit Desai", dept: "IT Support", date: "05 Jul 2026", description: "24-port Managed Gigabit Ethernet Switch." }
        ];
        localStorage.setItem("af_assets", JSON.stringify(defaultAssets));
    }

    // 2. Bookings Initial Set
    if (!localStorage.getItem("af_bookings")) {
        const defaultBookings = [
            { id: "BKG-201", assetId: "AST-1002", assetName: "Dell Latitude 7440", borrower: "Priya Patel", startDate: "2026-07-12", endDate: "2026-07-15", status: "Active" },
            { id: "BKG-202", assetId: "AST-1004", assetName: "Projector Epson EB-X49", borrower: "Marketing Room", startDate: "2026-07-14", endDate: "2026-07-14", status: "Pending" }
        ];
        localStorage.setItem("af_bookings", JSON.stringify(defaultBookings));
    }

    // 3. Maintenance Initial Set
    if (!localStorage.getItem("af_maintenance")) {
        const defaultMaintenance = [
            { id: "MNT-901", assetId: "AST-1003", name: "Canon EOS R50", type: "Lens Alignment", vendor: "Canon Support", cost: 120, status: "In Progress", date: "2026-07-11", notes: "Calibrating lens element and resolving zoom rings friction." },
            { id: "MNT-902", assetId: "AST-1001", name: "MacBook Pro M3", type: "Battery Swap", vendor: "Apple Premium Care", cost: 249, status: "Completed", date: "2026-06-20", notes: "Normal service battery replacement done under warranty coverage." }
        ];
        localStorage.setItem("af_maintenance", JSON.stringify(defaultMaintenance));
    }

    // 4. Employees & Departments Initial Set
    if (!localStorage.getItem("af_employees")) {
        const defaultEmployees = [
            { name: "Rahul Shah", role: "Sr. Developer", email: "rahul@organization.com", dept: "Development", avatar: "1" },
            { name: "Priya Patel", role: "HR Executive", email: "priya@organization.com", dept: "HR", avatar: "5" },
            { name: "Amit Desai", role: "IT Lead", email: "amit@organization.com", dept: "IT Support", avatar: "14" },
            { name: "Meera Sen", role: "Product Designer", email: "meera@organization.com", dept: "Development", avatar: "24" }
        ];
        localStorage.setItem("af_employees", JSON.stringify(defaultEmployees));
    }

    // 5. Activity Log Initial Set
    if (!localStorage.getItem("af_activity_logs")) {
        const defaultLogs = [
            { id: "LOG-551", user: "Het Patel", action: "Assigned Asset AST-1001", target: "MacBook Pro M3", details: "Allocated to developer Rahul Shah", timestamp: "12 Jul 2026, 10:20 AM" },
            { id: "LOG-552", user: "Het Patel", action: "Registered New Asset AST-1005", target: "LG UltraFine 27\"", details: "Added to corporate inventory ledger", timestamp: "11 Jul 2026, 04:15 PM" },
            { id: "LOG-553", user: "System", action: "Maintenance Trigger AST-1003", target: "Canon EOS R50", details: "Scheduled repair due to lens alignment report", timestamp: "11 Jul 2026, 09:00 AM" }
        ];
        localStorage.setItem("af_activity_logs", JSON.stringify(defaultLogs));
    }
}

// Binds common layouts like sidebar clicks, dark mode settings, profile menu dropdowns
function bindCommonEvents() {
    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");
    const toggleBtn = document.getElementById("toggleSidebar");
    const darkBtn = document.getElementById("darkModeBtn");
    const profileBtn = document.querySelector(".navbar .profile");

    // Sidebar Toggles
    if (toggleBtn && sidebar && main) {
        toggleBtn.addEventListener("click", () => {
            if (window.innerWidth <= 576) {
                sidebar.classList.toggle("active");
            } else {
                sidebar.classList.toggle("collapsed");
                main.classList.toggle("expanded");
            }
        });
    }

    // Dynamic resize handler
    window.addEventListener("resize", () => {
        if (window.innerWidth > 576 && sidebar) {
            sidebar.classList.remove("active");
        }
    });

    // Keyboard trigger Ctrl + B
    document.addEventListener("keydown", (e) => {
        if (e.ctrlKey && e.key === "b" && sidebar && main) {
            e.preventDefault();
            sidebar.classList.toggle("collapsed");
            main.classList.toggle("expanded");
        }
    });

    // Dark Mode Toggle Trigger
    if (darkBtn) {
        darkBtn.addEventListener("click", () => {
            const isDark = document.body.classList.toggle("dark");
            localStorage.setItem("af_theme", isDark ? "dark" : "light");
            updateDarkBtnContent(darkBtn, isDark);
        });
    }

    // Profile Click navigates to profile
    if (profileBtn) {
        profileBtn.addEventListener("click", () => {
            window.location.href = "profile.html";
        });
    }
}

// Controls current sidebar highlighting matching browser path filename
function syncSidebarState() {
    const currentPath = window.location.pathname.split("/").pop();
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {
        const link = item.querySelector("a");
        if (link) {
            const href = link.getAttribute("href");
            if (href === currentPath || (currentPath === "" && href === "dashboard.html")) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        }
    });
}

// Loads Dark / Light preference from LocalStorage
function loadPersistentTheme() {
    const savedTheme = localStorage.getItem("af_theme");
    const darkBtn = document.getElementById("darkModeBtn");
    
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
        if (darkBtn) updateDarkBtnContent(darkBtn, true);
    } else {
        document.body.classList.remove("dark");
        if (darkBtn) updateDarkBtnContent(darkBtn, false);
    }
}

function updateDarkBtnContent(btn, isDark) {
    if (isDark) {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    }
}

// Util method to log activities globally
function logActivity(actionMsg, targetName, detailsText, userName = "Het Patel") {
    const logs = JSON.parse(localStorage.getItem("af_activity_logs")) || [];
    const newLog = {
        id: "LOG-" + Math.floor(Math.random() * 900 + 100),
        user: userName,
        action: actionMsg,
        target: targetName,
        details: detailsText,
        timestamp: new Date().toLocaleString()
    };
    logs.unshift(newLog);
    localStorage.setItem("af_activity_logs", JSON.stringify(logs));
}