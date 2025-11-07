/*==================== toggle icon navbar ====================*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

/*==================== Galaxy Circuits Background Animation ====================*/

// Create galaxy with circuit connections
function createGalaxyCircuits() {
    const galaxyContainer = document.createElement('div');
    galaxyContainer.className = 'galaxy-circuits';
    galaxyContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        overflow: hidden;
        pointer-events: none;
    `;
    document.body.appendChild(galaxyContainer);

    // Create stars (galaxy part)
    createStars(galaxyContainer);
    
    // Create circuit nodes
    createCircuitNodes(galaxyContainer);
    
    // Create floating tech elements
    createTechElements(galaxyContainer);
    
    // Create energy connections
    createEnergyConnections(galaxyContainer);
}

// Create stars for galaxy effect
function createStars(container) {
    const starCount = 150;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 2 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const opacity = Math.random() * 0.7 + 0.3;
        const animationDelay = Math.random() * 5;
        
        star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${Math.random() > 0.7 ? 'var(--main-color)' : '#ffffff'};
            border-radius: 50%;
            left: ${posX}vw;
            top: ${posY}vh;
            opacity: ${opacity};
            animation: twinkle ${Math.random() * 4 + 2}s infinite alternate;
            animation-delay: ${animationDelay}s;
        `;
        
        container.appendChild(star);
    }
}

// Create circuit nodes that look like stars but with tech elements
function createCircuitNodes(container) {
    const nodeCount = 30;
    
    for (let i = 0; i < nodeCount; i++) {
        const node = document.createElement('div');
        node.className = 'circuit-node';
        
        const size = Math.random() * 6 + 4;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const pulseSpeed = Math.random() * 3 + 2;
        
        node.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, var(--main-color) 30%, transparent 70%);
            border: 1px solid var(--main-color);
            border-radius: 50%;
            left: ${posX}vw;
            top: ${posY}vh;
            animation: circuitPulse ${pulseSpeed}s infinite alternate;
            box-shadow: 0 0 10px var(--main-color);
        `;
        
        container.appendChild(node);
    }
}

// Create floating tech elements (chips, processors, etc.)
function createTechElements(container) {
    const techSymbols = ['◷', '◰', '◳', '◲', '⟁', '⧄', '⧉', '⌬', '⎔', '◈'];
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'tech-element';
        
        const symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        const size = Math.random() * 20 + 15;
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        const duration = Math.random() * 30 + 20;
        const delay = Math.random() * 10;
        
        element.style.cssText = `
            position: absolute;
            font-size: ${size}px;
            color: var(--main-color);
            opacity: ${Math.random() * 0.3 + 0.1};
            left: ${startX}vw;
            top: ${startY}vh;
            animation: floatTech ${duration}s linear infinite;
            animation-delay: ${delay}s;
            text-shadow: 0 0 8px var(--main-color);
        `;
        element.textContent = symbol;
        
        container.appendChild(element);
    }
}

// Create dynamic energy connections between nodes
function createEnergyConnections(container) {
    const nodes = container.querySelectorAll('.circuit-node');
    const connectionCount = 20;
    
    for (let i = 0; i < connectionCount; i++) {
        if (nodes.length < 2) continue;
        
        const randomNodes = getRandomNodes(nodes, 2);
        createConnection(container, randomNodes[0], randomNodes[1]);
    }
}

function getRandomNodes(nodes, count) {
    const shuffled = Array.from(nodes).sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function createConnection(container, node1, node2) {
    const connection = document.createElement('div');
    connection.className = 'energy-connection';
    
    const rect1 = node1.getBoundingClientRect();
    const rect2 = node2.getBoundingClientRect();
    
    const x1 = rect1.left + rect1.width / 2;
    const y1 = rect1.top + rect1.height / 2;
    const x2 = rect2.left + rect2.width / 2;
    const y2 = rect2.top + rect2.height / 2;
    
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
    
    connection.style.cssText = `
        position: fixed;
        width: ${length}px;
        height: 1px;
        background: linear-gradient(90deg, 
            transparent 0%, 
            var(--main-color) 20%, 
            var(--main-color) 80%, 
            transparent 100%);
        left: ${x1}px;
        top: ${y1}px;
        transform-origin: 0 0;
        transform: rotate(${angle}deg);
        opacity: 0.3;
        animation: energyFlow ${Math.random() * 2 + 1}s linear infinite;
    `;
    
    container.appendChild(connection);
}

// Add CSS animations dynamically
function addGalaxyStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; transform: scale(1); }
            50% { opacity: 1; transform: scale(1.2); }
        }
        
        @keyframes circuitPulse {
            0% { 
                opacity: 0.3; 
                box-shadow: 0 0 5px var(--main-color);
                transform: scale(1);
            }
            100% { 
                opacity: 0.8; 
                box-shadow: 0 0 20px var(--main-color), 0 0 30px var(--main-color);
                transform: scale(1.1);
            }
        }
        
        @keyframes floatTech {
            0% {
                transform: translate(0, 0) rotate(0deg) scale(1);
                opacity: 0.1;
            }
            25% {
                transform: translate(20px, -20px) rotate(90deg) scale(1.1);
                opacity: 0.3;
            }
            50% {
                transform: translate(40px, 10px) rotate(180deg) scale(1);
                opacity: 0.1;
            }
            75% {
                transform: translate(20px, 30px) rotate(270deg) scale(0.9);
                opacity: 0.3;
            }
            100% {
                transform: translate(0, 0) rotate(360deg) scale(1);
                opacity: 0.1;
            }
        }
        
        @keyframes energyFlow {
            0% { opacity: 0.1; }
            50% { opacity: 0.5; }
            100% { opacity: 0.1; }
        }
        
        /* Nebula effect */
        .galaxy-circuits::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: 
                radial-gradient(circle at 20% 80%, rgba(0, 238, 255, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 80% 20%, rgba(0, 238, 255, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 40% 40%, rgba(0, 238, 255, 0.08) 0%, transparent 50%);
            animation: nebulaFloat 20s ease-in-out infinite alternate;
        }
        
        @keyframes nebulaFloat {
            0% { transform: translate(0, 0) scale(1); }
            100% { transform: translate(-10px, -10px) scale(1.1); }
        }
    `;
    document.head.appendChild(style);
}

// Initialize galaxy circuits when page loads
document.addEventListener('DOMContentLoaded', function() {
    addGalaxyStyles();
    createGalaxyCircuits();
});


/*==================== scroll sections active link ====================*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    /*==================== sticky navbar ====================*/

    /*==================== remove toggle icon and navbar when click navbar link (scroll) ====================*/
};

/*==================== scroll reveal ====================*/
// Scroll animations for timeline items
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
/*==================== typed js ====================*/
function initTypewriter() {
    if (typeof Typed === 'undefined') {
        console.log('Waiting for Typed.js to load...');
        setTimeout(initTypewriter, 100);
        return;
    }
    
    new Typed('#typed-engineer', {
        strings: [
            'Electronic Engineer',
            'ASIC Design Engineer', 
            'PCB Designer',
            'Semiconductor Engineer',
            'Production Engineer'
        ],
        typeSpeed: 60,
        backSpeed: 40,
        backDelay: 2000,
        startDelay: 1000,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
}

// Initialize when everything is loaded
document.addEventListener('DOMContentLoaded', function() {
    addGalaxyStyles();
    createGalaxyCircuits();
    initTypewriter();
});

/*==================== Work Section Animation ====================*/
// Work Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workItems = document.querySelectorAll('.work-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            workItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hidden');
                } else {
                    if (item.getAttribute('data-category') === filterValue) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('projectModal');
    const closeModal = document.querySelector('.close-modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    
    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const projectId = this.getAttribute('data-project');
            loadProjectDetails(projectId);
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});
const projects = {
    Ibex: {
        title:"Master Project: RTL-to-GDSII Implementation of Ibex Core",
        category: "Design",
        description: "Complete RTL-to-GDSII ASIC implementation of the open-source Ibex RISC-V processor core, achieving timing closure at high-performance target frequency.",
        fullDescription: `
            <p>This project demonstrated a complete RTL-to-GDSII Application-Specific Integrated Circuit (ASIC) implementation for the open-source Ibex processor core. The Ibex core is a compact, 32-bit RISC-V processor (RV32IMCB) designed by lowRISC for low-power and embedded applications. The primary objective was to validate a robust physical design methodology and achieve timing closure at a high-performance target frequency, ultimately generating a production-ready GDSII file.</p>
            <p><strong>Implementation Focus:</strong> End-to-end physical design flow, from synthesis and floorplanning to placement, clock tree synthesis (CTS), routing, and final optimization.</p>
        `,
        Organization: "Universität Bremen, Faculty of Physics / Electrical Engineering",
        date: "August 26, 2025",
        duration: "6 months",
        technologies: ["Cadence Genus (Synthesis)", "SystemVerilog (RTL)", "Nangate 45nm PDK", "Synopsys Design Constraints (SDC)", "LEF / .lib (Standard Cell Libraries)", ],
        features: [
            "Achieved the high-performance target frequency of 500 MHz.",
            "Power Efficiency: Established a new benchmark for efficiency at 16.84 µW/MHz. This is 78% more efficient than the industry-standard ARM Cortex-M0+ (when technology-normalized).",
            "Area: Implemented in a highly compact silicon footprint of 0.032 mm² using 9,586 standard cells in 45nm technology.",
            "Optimization: The final design was achieved through a floorplan optimization that increased utilization, reduced the core area, and improved performance."
            
        ],
        challenges: [
            "Resolving critical setup and hold timing violations where signal paths were too slow or too fast.",
            "Fixing electrical Design Rule Violations (DRVs), such as max transition, max capacitance, and max fanout issues",
            "Optimizing the initial, conservative floorplan to reduce the core's large area and improve density.",
            "Designing a robust power grid (rings and stripes) with correct width and spacing to prevent IR drop and crosstalk.",
            "Correcting connectivity issues like Open and unConn Pin errors caused by improper power planning or bad LEF files."
        ],
        results: [
            "Achieved a high-performance target frequency of 500 MHz.",
            "Established a new benchmark for power efficiency at 16.84 µW/MHz.",
            "Demonstrated 78% better power efficiency than the industry-standard ARM Cortex-M0+ (when technology-normalized).",
            "Achieved a highly compact silicon footprint of 0.032 mm² with 9,586 standard cells."
        ],
        
        
        liveLink: "",
        sourceCode: "",
        pdf: "documents/Project_Ibex_A2_Boom_Mohd Shahedur Rahman_Final.pdf",
        video: "videos/creabots-demo.mp4"
    },
    
    A2O: {
        title:"Master Project: Simulation and RTL-to-GDSII Implementation of A2O Core",
        category: "Design",
        description: "Complete RTL-to-GDSII ASIC implementation of the open-source Ibex RISC-V processor core, achieving timing closure at high-performance target frequency.",
        fullDescription: `
            <p>This project involved the complete ASIC implementation of the OpenPOWER A2O core, a complex, 64-bit, dual-thread, out-of-order processor. Due to its massive scale (over 2.2 million cells), a flat implementation was not feasible. The project's success depended on a robust hierarchical methodology to manage complexity and achieve design convergence.</p>
            <p><strong>Implementation Focus:</strong> A hierarchical synthesis and implementation flow. Major functional units (e.g., Execution Units (XU), Load-Store Unit (LQ), Memory Management Unit (MMQ)) were synthesized as individual macros and then integrated at the top level.</p>
        `,
        Organization: "Universität Bremen, Faculty of Physics / Electrical Engineering",
        date: "August 26, 2025",
        duration: "6 months",
        technologies: ["Cadence Genus (Synthesis)", "SystemVerilog (RTL)", "Icarus Verilog (Gate-Level Simulation)", "Synopsys Design Vision (SAIF Generation)", "Common Power Format (CPF)","Nangate 45nm PDK", "Synopsys Design Constraints (SDC)", "LEF / .lib (Standard Cell Libraries)" ],
        features: [
            "A flat implementation was infeasible due to the 2.23M-cell count, causing excessive runtimes and poor optimization.As a result, Deployed a hierarchical flow, partitioning the design into manageable macros that were hardened independently.",
            "High cell density and numerous macros created a significant risk of wire congestion. So, Developed a congestion-aware floorplan with connectivity-driven macro placement to ensure routability.",
            "Large-Scale Design Successfully managed a high-complexity, enterprise-scale design with 2.23 million standard cells.",
            "Gate-Level Power Analysis Performed post-synthesis gate-level simulation and used SAIF file annotation to conduct a detailed, activity-based power estimation and identify hotspots.",
            "45nm Technology Targeted the 45nm technology node (PDK45) for the implementation."
        ],
        challenges: [
            "Resolving critical setup and hold timing violations where signal paths were too slow or too fast.",
            "Fixing electrical Design Rule Violations (DRVs), such as max transition, max capacitance, and max fanout issues",
            "Locating the primary power consumers within the massive design. Implemented an activity-based (SAIF) power analysis flow, which precisely identified the /a2owb/n0 submodule as the main hotspot (85.5% of total power). "
           
        ],
        results: [
            "Successfully implemented an enterprise-scale processor with 2.23 million standard cells.",
            "Achieved the 250 MHz target frequency with a competitive power efficiency of 0.367 mW/MHz.",
            "Demonstrated power efficiency superior to scaled estimates of the commercial IBM POWER8 core..",
            "Achieved a high cell density of 173,000 cells/mm² in the 45nm technology node"
        ],
        
        
        liveLink: "",
        sourceCode: "",
        pdf: "documents/Project_Ibex_A2_Boom_Mohd Shahedur Rahman_Final.pdf",
        video: "videos/creabots-demo.mp4"
    },
    
    Boom: {
        title: "RTL-to-GDSII Implementation of BOOM Core",
        category: "Design",
        description: "Design and implementation of a custom RISC-V processor core for embedded systems applications.",
        fullDescription: `
            <p>This project focused on the full ASIC implementation of the BOOM (Berkeley Out-of-Order Machine) core, a high-performance, open-source, 64-bit RISC-V processor. The Verilog RTL was first generated from its source using the Chipyard framework. The implementation then required a hierarchical approach to manage the complexity of its out-of-order microarchitecture.</p>
             <p><strong>Implementation Focus:</strong> Partitioning the complex design into major functional clusters (Integer, Floating-Point, Memory, Control) for a hierarchical synthesis and physical design flow.</p>
        `,
        Organization: "Universität Bremen, Faculty of Physics / Electrical Engineering",
        date: "August 26, 2025",
        duration: "6 months",
        technologies: ["Cadence Genus (Synthesis)","Cadence Innovus (Physical Implementation)", "Chipyard Framework (RTL Generation)", "Chisel (Hardware Construction Language)", "Common Power Format (CPF)","Nangate 45nm PDK", "Synopsys Design Constraints (SDC)", "LEF / .lib (Standard Cell Libraries)" ],
        features: [
            "RTL Generation from Chipyard The synthesizable Verilog RTL was generated from the core's Chisel description using the Chipyard framework.",
            "Hierarchical Partitioning The core was partitioned into functional clusters (Integer Execution, FP Pipeline, Memory Subsystem, Control Logic) to simplify implementation .",
            "45nm Technology Targeted the 45nm technology node (PDK45).",
            "Congestion-Aware Floorplan Large macros like Register Files and the Reorder Buffer (ROB) were placed centrally with halos to reduce routing congestion.",
            "H-Tree Clock Strategy An H-tree clock distribution strategy was implemented during CTS to minimize skew across the complex design.",
            "Out-of-Order Validation Successfully implemented the full complexity of the BOOM out-of-order engine, comprising 585,436 standard cells."
        ],
        challenges: [
            "Fixed undriven input ports by inserting explicit TIEHI/TIELO cells to prevent floating nets.",
            "Mitigated macro placement congestion and timing issues by using halos (blockages) and an H-tree clock network.",
            "Managed the out-of-order design's complexity by partitioning it into major functional clusters (Integer, FP, Memory, Control) for hierarchical synthesis . "
           
        ],
        results: [
            "Successfully validated the full RTL-to-GDSII implementation of a complex out-of-order RISC-V processor.",
            "Achieved the 250 MHz target frequency for the complex core.",
            "Managed a complex design of 585,436 standard cells in 45nm technology.",
            "Achieved power efficiency of 0.686 mW/MHz , which is highly competitive (within 17%) of the original 28nm Berkeley implementation when normalized for technology.",
            "Demonstrated excellent area efficiency with a density of 166,000 cells/mm²."
        ],
        
        
        liveLink: "",
        sourceCode: "",
        pdf: "documents/Project_Ibex_A2_Boom_Mohd Shahedur Rahman_Final.pdf",
        video: "videos/creabots-demo.mp4"
    },
    }
    // You can add more projects here following the same structure


function loadProjectDetails(projectId) {
    const modalBody = document.querySelector('.modal-body');
    const project = projects[projectId];
    
    modalBody.innerHTML = `
        <!-- Header Section -->
        <div class="project-header">
            <div class="project-badge">${project.category}</div>
            <h1>${project.title}</h1>
            <div class="project-meta-grid">
                <div class="meta-card">
                    <i class='bx bx-building'></i>
                    <div>
                        <strong>Organization</strong>
                        <span>${project.Organization}</span>
                    </div>
                </div>
                <div class="meta-card">
                    <i class='bx bx-calendar'></i>
                    <div>
                        <strong>Completed</strong>
                        <span>${project.date}</span>
                    </div>
                </div>
                <div class="meta-card">
                    <i class='bx bx-time'></i>
                    <div>
                        <strong>Duration</strong>
                        <span>${project.duration}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Main Image -->
        

        <!-- Description -->
        <div class="section">
            <h2><i class='bx bx-info-circle'></i> Project Overview</h2>
            <div class="description">${project.fullDescription}</div>
        </div>

        <!-- Features -->
        <div class="section">
            <h2><i class='bx bx-list-check'></i> Key Features</h2>
            <div class="features-grid">
                ${project.features.map((feature, index) => `
                    <div class="feature-item">
                        <span class="feature-number">${index + 1}</span>
                        <span>${feature}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Technologies -->
        <div class="section">
            <h2><i class='bx bx-cog'></i> Technologies & Tools</h2>
            <div class="tech-cloud">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>

        <!-- Challenges -->
        <div class="section">
            <h2><i class='bx bx-target-lock'></i> Challenges & Solutions</h2>
            <div class="challenges-list">
                ${project.challenges.map(challenge => `
                    <div class="challenge-item">
                        <i class='bx bx-check-circle'></i>
                        <span>${challenge}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Results -->
        <div class="section">
            <h2><i class='bx bx-trophy'></i> Achievements</h2>
            <div class="results-grid">
                ${project.results.map(result => `
                    <div class="result-item">
                        <i class='bx bx-check-shield'></i>
                        <span>${result}</span>
                    </div>
                `).join('')}
            </div>
        </div>

        <!-- Action Buttons -->
        <div class="action-buttons">
            ${project.liveLink ? `
                <a href="${project.liveLink}" class="btn btn-primary" target="_blank">
                    <i class='bx bx-link-external'></i> Live Demo
                </a>
            ` : ''}
            
            ${project.sourceCode ? `
                <a href="${project.sourceCode}" class="btn btn-secondary" target="_blank">
                    <i class='bx bx-code'></i> Source Code
                </a>
            ` : ''}
            
            ${project.pdf ? `
                <a href="${project.pdf}" class="btn btn-pdf" target="_blank">
                    <i class='bx bxs-file-pdf'></i> Project Report
                </a>
            ` : ''}
            
            <button class="close-modal">
                <i class=''></i> 
            </button>
        </div>
    `;

    // Add event listeners
    modalBody.querySelector('.close-modal').addEventListener('click', function() {
        document.getElementById('projectModal').style.display = 'none';
    });
}

// Back to top functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTop = document.querySelector('.back-to-top');
    
    if (backToTop) {
        backToTop.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Show/hide back to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (backToTop) {
            if (window.scrollY > 500) {
                backToTop.style.opacity = '1';
                backToTop.style.visibility = 'visible';
            } else {
                backToTop.style.opacity = '0';
                backToTop.style.visibility = 'hidden';
            }
        }
    });
});
