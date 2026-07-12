document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTS
    ========================================== */

    const sidebar = document.querySelector(".sidebar");
    const main = document.querySelector(".main");

    const toggleSidebar =
        document.getElementById("toggleSidebar");

    const darkModeBtn =
        document.getElementById("darkModeBtn");

    const notificationBtn =
        document.getElementById("notificationBtn");

    const menuItems =
        document.querySelectorAll(".menu li");

    /* ==========================================
       SIDEBAR
    ========================================== */

    toggleSidebar.addEventListener("click", () => {

        if(window.innerWidth <= 576){

            sidebar.classList.toggle("active");

        }

        else{

            sidebar.classList.toggle("collapsed");

            main.classList.toggle("expanded");

        }

    });

    /* ==========================================
       ACTIVE MENU
    ========================================== */

    menuItems.forEach(item=>{

        item.addEventListener("click",()=>{

            menuItems.forEach(menu=>{

                menu.classList.remove("active");

            });

            item.classList.add("active");

        });

    });

    /* ==========================================
       DARK MODE
    ========================================== */

    let darkMode =
        localStorage.getItem("theme") === "dark";

    if(darkMode){

        document.body.classList.add("dark");

        darkModeBtn.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    darkModeBtn.addEventListener("click",()=>{

        darkMode = !darkMode;

        document.body.classList.toggle("dark");

        if(darkMode){

            darkModeBtn.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

            localStorage.setItem("theme","dark");

        }

        else{

            darkModeBtn.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

            localStorage.setItem("theme","light");

        }

    });

    /* ==========================================
       RESPONSIVE
    ========================================== */

    window.addEventListener("resize",()=>{

        if(window.innerWidth > 576){

            sidebar.classList.remove("active");

        }

    });

    /* ==========================================
       CARD ANIMATION
    ========================================== */

    const cards =
        document.querySelectorAll(".card");

    cards.forEach((card,index)=>{

        card.style.opacity = "0";

        card.style.transform =
        "translateY(25px)";

        setTimeout(()=>{

            card.style.transition =
            ".5s ease";

            card.style.opacity = "1";

            card.style.transform =
            "translateY(0)";

        },index*120);

        /* ==========================================
       CHART.JS
    ========================================== */

    const categoryChart =
        document.getElementById("assetCategoryChart");

    if(categoryChart){

        new Chart(categoryChart,{

            type:"doughnut",

            data:{

                labels:[

                    "Laptops",

                    "Monitors",

                    "Printers",

                    "Networking",

                    "Furniture"

                ],

                datasets:[{

                    data:[

                        420,

                        260,

                        90,

                        180,

                        298

                    ],

                    backgroundColor:[

                        "#2563EB",

                        "#22C55E",

                        "#F59E0B",

                        "#8B5CF6",

                        "#06B6D4"

                    ],

                    borderWidth:0,

                    hoverOffset:12

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                cutout:"70%",

                animation:{

                    duration:1800

                },

                plugins:{

                    legend:{

                        position:"bottom",

                        labels:{

                            usePointStyle:true,

                            padding:20,

                            font:{

                                size:13,

                                family:"Poppins"

                            }

                        }

                    }

                }

            }

        });

    }

    /* ==========================================
       STATUS CHART
    ========================================== */

    const statusChart =
        document.getElementById("assetStatusChart");

    if(statusChart){

        new Chart(statusChart,{

            type:"bar",

            data:{

                labels:[

                    "Available",

                    "Allocated",

                    "Maintenance",

                    "Reserved",

                    "Returned"

                ],

                datasets:[{

                    label:"Assets",

                    data:[

                        845,

                        331,

                        42,

                        58,

                        126

                    ],

                    backgroundColor:[

                        "#22C55E",

                        "#2563EB",

                        "#EF4444",

                        "#8B5CF6",

                        "#06B6D4"

                    ],

                    borderRadius:12,

                    borderSkipped:false

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    duration:1800

                },

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        grid:{

                            display:false

                        }

                    },

                    y:{

                        beginAtZero:true,

                        ticks:{

                            stepSize:100

                        },

                        grid:{

                            color:"#E2E8F0"

                        }

                    }

                }

            }

        });

    }
        /* ==========================================
       CHART.JS
    ========================================== */

    const categoryChart =
        document.getElementById("assetCategoryChart");

    if(categoryChart){

        new Chart(categoryChart,{

            type:"doughnut",

            data:{

                labels:[

                    "Laptops",

                    "Monitors",

                    "Printers",

                    "Networking",

                    "Furniture"

                ],

                datasets:[{

                    data:[

                        420,

                        260,

                        90,

                        180,

                        298

                    ],

                    backgroundColor:[

                        "#2563EB",

                        "#22C55E",

                        "#F59E0B",

                        "#8B5CF6",

                        "#06B6D4"

                    ],

                    borderWidth:0,

                    hoverOffset:12

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                cutout:"70%",

                animation:{

                    duration:1800

                },

                plugins:{

                    legend:{

                        position:"bottom",

                        labels:{

                            usePointStyle:true,

                            padding:20,

                            font:{

                                size:13,

                                family:"Poppins"

                            }

                        }

                    }

                }

            }

        });

    }

    /* ==========================================
       STATUS CHART
    ========================================== */

    const statusChart =
        document.getElementById("assetStatusChart");

    if(statusChart){

        new Chart(statusChart,{

            type:"bar",

            data:{

                labels:[

                    "Available",

                    "Allocated",

                    "Maintenance",

                    "Reserved",

                    "Returned"

                ],

                datasets:[{

                    label:"Assets",

                    data:[

                        845,

                        331,

                        42,

                        58,

                        126

                    ],

                    backgroundColor:[

                        "#22C55E",

                        "#2563EB",

                        "#EF4444",

                        "#8B5CF6",

                        "#06B6D4"

                    ],

                    borderRadius:12,

                    borderSkipped:false

                }]

            },

            options:{

                responsive:true,

                maintainAspectRatio:false,

                animation:{

                    duration:1800

                },

                plugins:{

                    legend:{

                        display:false

                    }

                },

                scales:{

                    x:{

                        grid:{

                            display:false

                        }

                    },

                    y:{

                        beginAtZero:true,

                        ticks:{

                            stepSize:100

                        },

                        grid:{

                            color:"#E2E8F0"

                        }

                    }

                }

            }

        });

    }
        /* ==========================================
       SEARCH
    ========================================== */

    const searchInput =
        document.querySelector(".search-box input");

    if(searchInput){

        searchInput.addEventListener("keyup",function(){

            const value =
                this.value.toLowerCase();

            const rows =
                document.querySelectorAll(
                    ".activity-table tbody tr"
                );

            rows.forEach(row=>{

                if(row.innerText
                    .toLowerCase()
                    .includes(value)){

                    row.style.display="";

                }

                else{

                    row.style.display="none";

                }

            });

        });

    }

    /* ==========================================
       ANIMATED COUNTERS
    ========================================== */

    const counters =
        document.querySelectorAll(".card h2");

    counters.forEach(counter=>{

        const target =
            Number(
                counter.innerText
                .replace(/,/g,"")
            );

        let count = 0;

        const speed =
            Math.ceil(target/70);

        function updateCounter(){

            count += speed;

            if(count < target){

                counter.innerText =
                    count.toLocaleString();

                requestAnimationFrame(updateCounter);

            }

            else{

                counter.innerText =
                    target.toLocaleString();

            }

        }

        updateCounter();

    });

    /* ==========================================
       TOAST
    ========================================== */

    function showToast(message){

        const toast =
            document.createElement("div");

        toast.className="toast";

        toast.innerHTML=`

            <i class="fa-solid fa-circle-check"></i>

            <span>${message}</span>

        `;

        document.body.appendChild(toast);

        setTimeout(()=>{

            toast.classList.add("show");

        },100);

        setTimeout(()=>{

            toast.classList.remove("show");

            setTimeout(()=>{

                toast.remove();

            },300);

        },3000);

    }

    /* ==========================================
       NOTIFICATION BUTTON
    ========================================== */

    if(notificationBtn){

        notificationBtn.addEventListener("click",()=>{

            showToast(
                "You have 5 new notifications."
            );

        });

    }

    /* ==========================================
       QUICK ACTIONS
    ========================================== */

    const quickButtons =
        document.querySelectorAll(
            ".action-buttons button"
        );

    quickButtons.forEach(button=>{

        button.addEventListener("click",()=>{

            showToast(
                button.innerText.trim()
            );

        });

    });

    /* ==========================================
       WELCOME MESSAGE
    ========================================== */

    setTimeout(()=>{

        showToast(
            "Welcome back, Het 👋"
        );

    },800);

    /* ==========================================
       FOOTER YEAR
    ========================================== */

    const footer =
        document.querySelector(
            ".dashboard-footer p"
        );

    if(footer){

        footer.innerHTML =
            footer.innerHTML.replace(
                "2026",
                new Date().getFullYear()
            );

    }

})});
