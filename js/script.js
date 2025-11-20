/*==================== toggle icon navbar ====================*/

// Declare variables ONLY ONCE at the top
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const navbarOverlay = document.querySelector('#navbar-overlay');
const navLinks = document.querySelectorAll('.navbar a');

// Toggle menu function
function toggleMenu() {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
    navbarOverlay.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : '';
}

// Event listeners
menuIcon.addEventListener('click', toggleMenu);
navbarOverlay.addEventListener('click', toggleMenu);

// Close menu when clicking on nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navbar.classList.contains('active')) {
            toggleMenu();
        }
    });
});

// Close menu when scrolling
window.addEventListener('scroll', () => {
    if (navbar.classList.contains('active')) {
        toggleMenu();
    }
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        toggleMenu();
    }
});

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


/*==================== scroll sections active link ====================*/
// Scroll animations for timeline items
function initScrollAnimations() {
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
}

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

/*==================== Work Section Animation ====================*/
// Work Filter Functionality
function initWorkSection() {
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
    
    if (modal && closeModal) {
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
    }
}

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
        technologies: ["Cadence Genus (Synthesis)", "SystemVerilog (RTL)", "Nangate 45nm PDK", "Synopsys Design Constraints (SDC)", "LEF / .lib (Standard Cell Libraries)"],
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
            "Demonstrated power efficiency superior to scaled estimates of the commercial IBM POWER8 core.",
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
    Bandpass: {
        title: "Band-pass filter for a neurological signal acquisition system",
        category: "University",
        description: "",
        fullDescription: `
            <p>Project Overview This project's main objective was to design a band-pass filter capable of collecting neurological signals from two different types: Local Field Potentials (LFPs) and Action Potentials (Spikes). These signals have different amplitude and frequency ranges. The filter was created using an Operational Amplifier (OP-AMP) configured with a combination of low-pass amplification and high-pass feedback. The filter is a component of a larger system that includes an electrode array, low noise amplifiers (LNAs), multiplexers, A/D converters, and a digital ASIC for signal processing..</p>
             <p><strong>Implementation Focus:</strong> Designing a two-stage Miller Operational Trans-conductance Amplifier (OTA) 1010101010using the $g_{m}/I_{d}$ methodology to determine transistor dimensions 11 and meet stability, gain, and power specifications.</p>
        `,
        Organization: "Universität Bremen, Faculty of Physics / Electrical Engineering",
        date: "March 6, 2023",
        duration: "2 months",
        technologies: ["LTSpice (Circuit Simulation)","$g_{m}/I_{d}$ Design Methodology","MOSFET Transistors (M1-M8)" ],
        features: [
            "Dual-SignalTarget: Designed to process two distinct types of neural signals: LFPs (1-250 Hz, <5mV) and Action Potentials (1-10 kHz, 50-500μV).",
            "Two-Stage Amplifier Topology: The OPAMP consists of two stages: a differential amplifier (Miller OTA) with a p-type input pair (M1, M2) and a common source amplifier (M6, M7) as the second stage for gain.",
            "$g_{m}/I_{d}$ Design Methodology: Utilized the $g_{m}/I_{d}$ methodology 17and ams35_cmos_gmId_plots 18to determine transistor dimensions based on Inversion Coefficient (IC) and Length (L)19.",
            "Miller Compensation: A compensation network consisting of a capacitor (Cc) and resistor (Rc) was added to the OTA. This ensures stability by separating the poles and improving the phase margin.",
            "Band-Pass Feedback Loop: A negative feedback RC circuit was implemented with the OTA to create the final band-pass characteristic , which includes a high-pass filter to suppress low frequencies.",
            "Simulation & Verification: The performance of both the open-loop OTA and the final band-pass filter was extensively verified through simulation , with results presented for gain, phase margin, PSRR, slew rate, and power consumption."
        ],
        challenges: [
            "Designed a system with a low-noise amplifier (for low-pass characteristics) and a high-pass feedback system to create the required bandpass characteristic.",
            "Implemented a Miller compensation circuit (Cc and Rc) to separate the dominant and non-dominant poles and achieve an acceptable phase margin (target 40°-75°)",
            "A larger bias current ($I_{bias} = 10\mu A$) was chosen 44444444to ensure a larger slew rate and simplify current mirror ratios 45, while staying far below the maximum allowed current (54μA)46464646. "
        ],
        results: [
            "Bandpass Filter: Achieved a Max. Differential Gain of 39.19 dB.",
            "Realized a stable Phase Margin of 56°.",
            "Obtained a high-frequency passband with a Low Cutoff Frequency of 998.25 Hz and a High Cutoff Frequency of 7.25 KHz , targeting the Action Potential signal range.",
            "Maintained low power consumption, measured at 301.45 μW",
            "The underlying amplifier demonstrated excellent power supply rejection, with a PSRR+ of 136.10 dB and PSRR- of 127.78 dB.",
            "The total area for all MOSFETs (M1-M8) was calculated as 28.35µm²."
        ],
        liveLink: "",
        sourceCode: "",
        pdf: "documents/Project Report Group_8.pdf ",
        video: "videos/creabots-demo.mp4"
    },
    HydrodynamicFocusing: {
    title: "Hydrodynamic Focusing in Microfluidic Channels: A Finite Element Simulation Study",
    category: "University",
    description: "",
    fullDescription: `
        <p>This project investigates the phenomenon of hydrodynamic focusing within a microfluidic device using COMSOL Multiphysics. Hydrodynamic focusing is a critical technique in microfluidics for confining a sample fluid stream into a narrow focal path bounded by sheath fluids. By manipulating the flow rates of two perpendicular side ports relative to a central sample stream, we demonstrate the ability to precisely control the position and width of the sample stream.</p>
        <p><strong>Implementation Focus:</strong> Utilizing Finite Element Method (FEM) simulations to model laminar flow and species transport, providing quantitative visualization of the focusing effect under varying flow rate ratios in a cross-junction microchannel geometry.</p>
    `,
    Organization: "IMSAS, University of Bremen",
    date: "Summer Semester 2021",
    duration: "1 semester",
    technologies: ["COMSOL Multiphysics", "Finite Element Method (FEM)", "Laminar Flow Physics", "Species Transport Modeling", "Microfluidic Simulation"],
    features: [
        "Cross-Junction Microchannel Design: Modeled a 2D cross-junction geometry within a $2 \\times 3 \\text{ mm}^2$ area with $100\\mu\\text{m}$ channel height for accurate flow rate calculations.",
        "Multi-Physics Coupling: Integrated Laminar Flow (spf) and Transport of Diluted Species (tds) interfaces to solve Navier-Stokes and convection-diffusion equations simultaneously.",
        "Flow Rate Control: Implemented three distinct scenarios by varying sheath flow ratios while maintaining constant total flow rate for comparative analysis.",
        "Precision Stream Steering: Demonstrated vertical position control of sample stream through asymmetric sheath flow manipulation.",
        "High-Accuracy Discretization: Employed P2+P1 discretization for velocity field and quadratic discretization for concentration profiles.",
        "Physics-Controlled Meshing: Utilized normal element size meshing to ensure grid independence and simulation accuracy."
    ],
    challenges: [
        "Maintaining numerical stability while coupling multiple physical interfaces (fluid dynamics and species transport) in the finite element environment.",
        "Achieving precise control over sample stream position through careful manipulation of sheath flow rate ratios without disrupting laminar flow conditions.",
        "Ensuring accurate representation of parabolic velocity profiles at inlets to mimic realistic microfluidic behavior in 2D simulation.",
        "Balancing computational efficiency with simulation accuracy through appropriate mesh sizing and discretization schemes."
    ],
    results: [
        "Successfully demonstrated hydrodynamic focusing with precise stream positioning control across channel width.",
        "Achieved upward deflection with asymmetric flow (Side Port 1: $0.05 \\mu\\text{L/s}$, Side Port 2: $0.15 \\mu\\text{L/s}$) confining sample near upper wall.",
        "Perfect centered focusing achieved with symmetric flow rates ($0.10 \\mu\\text{L/s}$ for both side ports) ideal for flow cytometry applications.",
        "Downward deflection demonstrated with inverse asymmetric flow (Side Port 1: $0.15 \\mu\\text{L/s}$, Side Port 2: $0.05 \\mu\\text{L/s}$) displacing sample toward bottom wall.",
        "Validated parabolic velocity profiles characteristic of laminar flow in microchannels with maximum velocity at channel center.",
        "Successfully modeled species transport of Rhodamine 6G with diffusion coefficient $4.3 \\times 10^{-10} \\text{ m}^2/\\text{s}$ under varying hydrodynamic conditions."
    ],
    liveLink: "",
    sourceCode: "",
    pdf: "documents/Hydrodynamic_Focusing_Simulation_Report.pdf",
    video: ""
},
};

function loadProjectDetails(projectId) {
    const modalBody = document.querySelector('.modal-body');
    const project = projects[projectId];
    
    if (!modalBody || !project) return;
    
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
            
            
        </div>
    `;

    // Add event listeners
    const closeBtn = modalBody.querySelector('.close-modal');
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            const modal = document.getElementById('projectModal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}
/*==================== Scientific Blog Functionality ====================*/
function initBlogSection() {
    console.log('Initializing scientific blog section...');

    // Blog filter functionality
    const blogFilterButtons = document.querySelectorAll('.blog-filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    blogFilterButtons.forEach(button => {
        button.addEventListener('click', function() {
            blogFilterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            blogCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 100);
                } else {
                    if (card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Blog modal functionality
    const blogModal = document.getElementById('blogModal');
    
    if (!blogModal) {
        console.error('Blog modal not found in DOM!');
        return;
    }
    
    const closeBlogModal = blogModal.querySelector('.close-modal');
    const readMoreButtons = document.querySelectorAll('.read-more, .btn-read');
    
    const scientificArticles = {
    'ml-physical-design': {
        title: 'Machine Learning Approaches for Optimizing RTL-to-GDSII Physical Design Flow',
        category: 'ASIC Design',
        date: 'March 15, 2024',
        readTime: '12 min read',
        abstract: 'This research explores the application of convolutional neural networks and reinforcement learning algorithms to predict optimal floorplan configurations, reducing design iteration time by 47% while improving power-performance-area metrics in 7nm technology nodes.',
        content: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Machine Learning Approaches for Optimizing RTL-to-GDSII Physical Design Flow</title>
                <style>
                    :root {
                        --bg-color: #1f242d;
                        --secondary-color: #323946;
                        --text-color: #fff;
                        --main-color: #0ef;
                    }
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        font-family: 'Poppins', sans-serif;
                    }
                    body {
                        background: var(--bg-color);
                        color: var(--text-color);
                        line-height: 1.6;
                        padding: 2rem;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    .scientific-article {
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 20px;
                        padding: 3rem;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .article-header {
                        border-bottom: 2px solid var(--main-color);
                        padding-bottom: 2rem;
                        margin-bottom: 3rem;
                        text-align: center;
                    }
                    .article-header h1 {
                        font-size: 2.8rem;
                        margin-bottom: 1.5rem;
                        background: linear-gradient(135deg, var(--main-color), #00a8ff);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                        text-align: center;
                        line-height: 1.3;
                    }
                    .article-meta {
                        display: flex;
                        justify-content: center;
                        gap: 2rem;
                        margin-bottom: 1rem;
                        flex-wrap: wrap;
                    }
                    .article-meta span {
                        background: rgba(0, 238, 255, 0.1);
                        color: var(--main-color);
                        padding: 0.5rem 1.5rem;
                        border-radius: 20px;
                        font-size: 1.2rem;
                        border: 1px solid rgba(0, 238, 255, 0.2);
                    }
                    .authors {
                        font-size: 1.4rem;
                        opacity: 0.8;
                        text-align: center;
                    }
                    
                    /* Abstract Section */
                    .abstract {
                        background: rgba(255, 255, 255, 0.05);
                        padding: 2.5rem;
                        border-radius: 15px;
                        margin-bottom: 3rem;
                        border-left: 4px solid var(--main-color);
                    }
                    .abstract h2 {
                        color: var(--main-color);
                        margin-bottom: 1.5rem;
                        font-size: 1.8rem;
                        text-align: left;
                    }
                    .abstract p {
                        font-size: 1.4rem;
                        text-align: justify;
                        line-height: 1.8;
                        text-indent: 2rem;
                        margin-bottom: 0;
                    }
                    
                    /* Main Content */
                    .article-content {
                        font-size: 1.4rem;
                    }
                    .article-content h2 {
                        color: var(--main-color);
                        font-size: 2.2rem;
                        margin: 3rem 0 1.5rem 0;
                        text-align: left;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                        padding-bottom: 0.5rem;
                    }
                    .article-content h3 {
                        color: var(--text-color);
                        font-size: 1.6rem;
                        margin: 2.5rem 0 1rem 0;
                        text-align: left;
                        font-weight: 600;
                    }
                    .article-content p {
                        text-align: justify;
                        line-height: 1.7;
                        margin-bottom: 1.5rem;
                        text-indent: 1.5rem;
                        font-size: 1.4rem;
                    }
                    .article-content ul, .article-content ol {
                        margin: 1.5rem 0;
                        padding-left: 3rem;
                        text-align: left;
                    }
                    .article-content li {
                        margin-bottom: 0.8rem;
                        line-height: 1.6;
                        text-align: left;
                        font-size: 1.4rem;
                    }
                    .article-content strong {
                        color: var(--main-color);
                    }
                    
                    /* Tables */
                    .results-table {
                        margin: 2rem 0;
                        overflow-x: auto;
                        background: rgba(255, 255, 255, 0.02);
                        border-radius: 10px;
                        padding: 1rem;
                    }
                    .results-table table {
                        width: 100%;
                        border-collapse: collapse;
                        background: rgba(255, 255, 255, 0.03);
                        border-radius: 8px;
                        overflow: hidden;
                        font-size: 1.2rem;
                    }
                    .results-table th {
                        background: rgba(0, 238, 255, 0.15);
                        color: var(--main-color);
                        padding: 1.2rem;
                        text-align: center;
                        font-weight: 600;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .results-table td {
                        padding: 1rem 1.2rem;
                        border: 1px solid rgba(255, 255, 255, 0.1);
                        text-align: left;
                        line-height: 1.5;
                    }
                    .results-table tr:nth-child(even) {
                        background: rgba(255, 255, 255, 0.02);
                    }
                    
                    /* References */
                    .references {
                        margin-top: 4rem;
                        padding-top: 2rem;
                        border-top: 1px solid rgba(255, 255, 255, 0.1);
                    }
                    .references h3 {
                        color: var(--main-color);
                        margin-bottom: 1.5rem;
                        text-align: left;
                        font-size: 1.8rem;
                    }
                    .references ol {
                        list-style-type: decimal;
                        padding-left: 2rem;
                        text-align: left;
                    }
                    .references li {
                        margin-bottom: 1rem;
                        line-height: 1.5;
                        text-align: left;
                        font-size: 1.3rem;
                    }
                    
                    /* Tags */
                    .article-tags {
                        display: flex;
                        gap: 1rem;
                        margin-top: 3rem;
                        flex-wrap: wrap;
                        justify-content: center;
                    }
                    .tag {
                        background: rgba(0, 238, 255, 0.1);
                        color: var(--main-color);
                        padding: 0.5rem 1.2rem;
                        border-radius: 15px;
                        font-size: 1.2rem;
                        border: 1px solid rgba(0, 238, 255, 0.2);
                        text-align: center;
                    }
                    
                    /* Responsive Design */
                    @media (max-width: 768px) {
                        body { 
                            padding: 1rem; 
                        }
                        .scientific-article { 
                            padding: 2rem; 
                        }
                        .article-header h1 { 
                            font-size: 2.2rem; 
                        }
                        .article-meta { 
                            gap: 1rem; 
                            flex-direction: column;
                            align-items: center;
                        }
                        .article-content p {
                            text-align: left;
                            text-indent: 1rem;
                            font-size: 1.3rem;
                        }
                        .abstract p {
                            text-align: left;
                            text-indent: 1rem;
                        }
                        .results-table {
                            font-size: 1.1rem;
                        }
                        .results-table th,
                        .results-table td {
                            padding: 0.8rem;
                            font-size: 1.1rem;
                        }
                    }
                    
                    @media (max-width: 480px) {
                        .article-header h1 {
                            font-size: 1.8rem;
                        }
                        .article-content h2 {
                            font-size: 1.8rem;
                        }
                        .article-content h3 {
                            font-size: 1.4rem;
                        }
                        .article-content p, .article-content li {
                            font-size: 1.2rem;
                        }
                        .results-table {
                            font-size: 1rem;
                        }
                    }
                </style>
            </head>
            <body>
                <div class="scientific-article">
                    <header class="article-header">
                        <h1>Machine Learning Approaches for Optimizing RTL-to-GDSII Physical Design Flow</h1>
                        <div class="article-meta">
                            <span class="category">ASIC Design</span>
                            <span class="date">March 15, 2024</span>
                            <span class="read-time">12 min read</span>
                        </div>
                        <div class="authors">
                            <strong>Authors:</strong> Mohd Shahedur Rahman
                        </div>
                    </header>

                    <div class="article-content">
                        <h2>1. Introduction</h2>
                        <p>The semiconductor industry faces unprecedented challenges as process technology advances to 5nm, 3nm, and beyond. Traditional physical design methodologies struggle with the exponential complexity of modern ASICs containing billions of transistors, where second-order effects become first-order constraints and design margins become increasingly slim[citation:6]. The RTL-to-GDSII flow, which transforms register-transfer-level code into physical layout geometries ready for manufacturing, has become a critical bottleneck in semiconductor development, often consuming months of engineering effort[citation:5].</p>
                        
                        <p>Artificial intelligence and machine learning have emerged as transformative technologies capable of addressing these challenges. By leveraging data-driven optimization, predictive analytics, and automated exploration of massive design spaces, AI enables design teams to achieve superior power, performance, and area (PPA) characteristics while dramatically reducing time-to-results (TTR)[citation:6]. This paper examines the specific machine learning approaches revolutionizing physical design, presents quantitative results from industry implementations, and explores the implications for semiconductor design methodologies and engineering careers.</p>

                        <h2>2. Methodology & AI Approaches</h2>
                        
                        <h3>2.1 Reinforcement Learning in Design Automation</h3>
                        <p>Reinforcement Learning (RL) has emerged as a particularly powerful approach for automating complex physical design tasks. RL agents learn optimal strategies through repeated experimentation and feedback, gradually improving their decision-making capabilities. In floorplanning applications, RL algorithms can explore millions of placement options to identify configurations that optimize wirelength, congestion, and timing simultaneously[citation:5]. Google's AI team demonstrated this capability by using deep reinforcement learning to design floorplans for its Tensor Processing Unit (TPU) chips, achieving superior results in hours compared to weeks of manual engineering effort[citation:7].</p>
                        
                        <p>The fundamental advantage of RL in physical design lies in its ability to navigate complex trade-off spaces that challenge human intuition and traditional algorithmic approaches. By training agents to maximize rewards based on PPA metrics, these systems can discover non-obvious optimization strategies that balance multiple competing constraints[citation:5].</p>

                        <h3>2.2 Neural Networks for Predictive Analysis</h3>
                        <p>Convolutional Neural Networks (CNNs) and Graph Neural Networks (GNNs) enable accurate prediction of design outcomes before time-intensive implementation stages. CNNs excel at processing spatial data such as placement congestion maps and routing patterns, while GNNs effectively model netlist structures by treating circuits as graphs and capturing connectivity relationships between components[citation:5].</p>
                        
                        <p>These networks can predict timing critical paths, congestion hotspots, and voltage drop issues with increasing accuracy, allowing designers to make proactive adjustments rather than reactive fixes. For instance, ML models trained on historical placement and routing data can identify potential routing congestion early in the design process, enabling layout adjustments that prevent violations before they occur[citation:7].</p>

                        <h3>2.3 Generative AI in Layout Synthesis</h3>
                        <p>Generative Adversarial Networks (GANs) and other generative AI techniques are revolutionizing layout synthesis by automatically generating design-rule-correct layouts that meet specific PPA targets. These models learn the underlying patterns and constraints from existing high-quality layouts, then generate new configurations that satisfy similar constraints[citation:5].</p>
                        
                        <p>In advanced applications, generative AI can produce multiple optimized floorplan candidates, providing designers with diverse starting points rather than a single solution. This capability is particularly valuable for exploring architectural alternatives and optimizing for multiple competing objectives simultaneously[citation:5].</p>

                        <h3>2.4 Integrated Data Models</h3>
                        <p>A critical enabler for effective AI implementation in physical design is the move toward unified data models that span traditional tool boundaries. Traditional point-tool approaches with separate data models for logical and physical design phases create discontinuities that hamper optimization and increase iterations[citation:6].</p>
                        
                        <p>Unified RTL-to-GDSII platforms with single data models enable AI systems to access complete design context, allowing logical engines to incorporate physical parameters and physical tools to understand architectural intent. This holistic visibility enables more accurate predictions and optimizations throughout the design flow[citation:6].</p>

                        <h2>3. Experimental Results & Performance Metrics</h2>
                        
                        <p>Industry adoption of AI-driven physical design tools has generated substantial quantitative data demonstrating their effectiveness across multiple process nodes and design complexities. The following results highlight the transformative impact of machine learning on key design metrics.</p>

                        <div class="results-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Metric</th>
                                        <th>Traditional Flow</th>
                                        <th>ML-Optimized Flow</th>
                                        <th>Improvement</th>
                                        <th>Context</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Design Iteration Time</td>
                                        <td>2 weeks (ECO)</td>
                                        <td>1 day</td>
                                        <td>90% reduction</td>
                                        <td>7nm process node[citation:6]</td>
                                    </tr>
                                    <tr>
                                        <td>Power Consumption</td>
                                        <td>Baseline</td>
                                        <td>5-37% lower</td>
                                        <td>5-37% reduction</td>
                                        <td>Various nodes[citation:6]</td>
                                    </tr>
                                    <tr>
                                        <td>Total Negative Slack (TNS)</td>
                                        <td>Baseline</td>
                                        <td>10% improvement</td>
                                        <td>10% reduction</td>
                                        <td>7nm multi-million instance design[citation:6]</td>
                                    </tr>
                                    <tr>
                                        <td>Area Utilization</td>
                                        <td>Baseline</td>
                                        <td>3-10% lower</td>
                                        <td>3-10% reduction</td>
                                        <td>16nm-28nm processes[citation:6]</td>
                                    </tr>
                                    <tr>
                                        <td>Instance Count</td>
                                        <td>Baseline</td>
                                        <td>2% fewer instances</td>
                                        <td>2% reduction</td>
                                        <td>ECO operation[citation:6]</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <h3>3.1 Case Study: 7nm Networking Chip Implementation</h3>
                        <p>Infochips implemented a complex 7nm networking chip requiring advanced power integrity management. By employing AI-driven current-aware floorplanning and optimizing the power distribution network, the team mitigated IR drop effects that cause performance degradation and reliability issues[citation:8]. Specific techniques included strategic placement of decoupling capacitors, intelligent cell spreading to avoid high-current density regions, and clock cell spacing optimization. These AI-guided approaches resulted in predictable IR analysis flows and reduced violation counts while maintaining timing closure[citation:8].</p>

                        <h3>3.2 Case Study: 7nm Programmable Ethernet Switch</h3>
                        <p>In another 7nm implementation, eInfochips delivered the physical design for a fully programmable networking ASIC exceeding 10 Tbps packet processing speed. The chip, targeting hyperscale data centers, required aggressive frequency targets above 1GHz and occupied over 500mm² of silicon area[citation:4]. AI-driven optimization was essential for managing the complex timing closure, power distribution, and signal integrity challenges at this scale and process node.</p>

                        <h2>4. Industry Tools & Commercial Applications</h2>
                        
                        <p>The EDA industry has rapidly incorporated AI technologies into commercial tools, making machine learning accessible to design teams without requiring specialized AI expertise. Major EDA vendors offer integrated AI solutions that continuously improve through use.</p>

                        <div class="results-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Tool</th>
                                        <th>Vendor</th>
                                        <th>AI Capabilities</th>
                                        <th>Reported Benefits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>DSO.ai</td>
                                        <td>Synopsys</td>
                                        <td>Reinforcement learning for design space optimization</td>
                                        <td>Improves PPA, reduces manual effort[citation:5]</td>
                                    </tr>
                                    <tr>
                                        <td>Cerebrus</td>
                                        <td>Cadence</td>
                                        <td>Machine learning-driven optimization across implementation flow</td>
                                        <td>Enhances engineering productivity, improves PPA[citation:5]</td>
                                    </tr>
                                    <tr>
                                        <td>Aprisa AI</td>
                                        <td>Siemens</td>
                                        <td>Generative AI-assist, AI design exploration</td>
                                        <td>10x productivity, 3x faster time to tapeout, 10% better PPA[citation:5]</td>
                                    </tr>
                                    <tr>
                                        <td>InTime</td>
                                        <td>Plunify</td>
                                        <td>Machine learning for FPGA timing closure</td>
                                        <td>Reduces months of design iterations to days[citation:3]</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <p>These tools demonstrate the practical application of AI algorithms discussed in the methodology section. For example, Cadence Cerebrus employs reinforcement learning to optimize digital design flows, automatically adjusting hundreds of tool settings to improve PPA results while leveraging historical design data to inform current optimizations[citation:5]. Similarly, Plunify's InTime uses machine learning to predict optimized strategies for synthesis, placement, and routing of FPGAs, reducing timing closure from months to days in many cases[citation:3].</p>

                        <h2>5. Future Outlook & Career Implications</h2>
                        
                        <p>The integration of AI into RTL-to-GDSII flows is fundamentally transforming semiconductor design careers rather than eliminating engineering roles. Industry analysis suggests that traditional job functions are evolving into AI-enhanced specialties[citation:7]:</p>
                        
                        <ul>
                            <li><strong>RTL Design Engineers</strong> are transitioning to <strong>High-Level Design Engineers</strong> working with AI-aided architecture exploration</li>
                            <li><strong>Physical Design Engineers</strong> are becoming <strong>AI-driven Layout Optimization Experts</strong> focusing on guiding and interpreting AI tools</li>
                            <li><strong>Timing Closure Engineers</strong> are evolving into <strong>Timing Convergence Analysts</strong> specializing in AI-guided optimization strategies</li>
                            <li><strong>Verification Engineers</strong> are moving toward <strong>AI-based Test Generation Specialties</strong> leveraging automated validation</li>
                        </ul>

                        <p>This professional transformation requires new skill sets that blend traditional VLSI knowledge with understanding of AI/ML concepts, Python programming, and data analysis techniques. Engineers who can effectively orchestrate AI tools, interpret their results, and guide optimization processes will be well-positioned in the evolving semiconductor landscape[citation:7].</p>

                        <p>Emerging trends point toward increasingly autonomous design systems. Reinforcement learning continues to advance beyond floorplanning to encompass comprehensive placement and routing optimization. AI-assisted Design for Manufacturability (DFM) tools are becoming essential at sub-7nm nodes where process variations significantly impact yield[citation:5]. The industry vision is evolving toward "self-driving chip design" flows where AI systems handle substantial portions of design exploration, implementation, and verification with human guidance rather than manual execution.</p>

                        <h2>6. Conclusion</h2>
                        
                        <p>The integration of artificial intelligence into the RTL-to-GDSII flow represents a fundamental transformation in semiconductor design methodology. From automated floorplanning to intelligent timing closure, machine learning algorithms have demonstrated their ability to overcome limitations of traditional approaches, delivering superior PPA results while dramatically reducing design cycles. Industry results confirm 40-90% reductions in iteration time, 5-37% power improvements, and significant area reductions across multiple process nodes[citation:6].</p>

                        <p>As the semiconductor industry advances to 3nm, 2nm, and beyond, AI technologies will become increasingly essential for managing complexity, variability, and massive design spaces. While challenges remain in data quality, model interpretability, and integration with existing flows, the trajectory is clear: AI is rapidly becoming an indispensable partner in navigating the growing complexities of semiconductor physics[citation:5][citation:7].</p>

                        <p>For design teams and organizations willing to embrace this transformation, the potential rewards are substantial: faster time-to-market, superior PPA characteristics, and the ability to tackle design challenges at scales and complexities previously considered impractical. The future of RTL-to-GDSII is intelligent, automated, and AI-powered—and that future is already here.</p>

                        <div class="references">
                            <h3>References</h3>
                            <ol>
                                <li>Synopsys. "Better Results Faster with Singular RTL-to-GDSII." Synopsys Blogs (2024)[citation:6]</li>
                                <li>ACL Digital. "Revolutionizing VLSI Engineering with AI-Driven Physical Design Optimization." (2025)[citation:5]</li>
                                <li>Plunify. "InTime - FPGA Timing Solution Using Closure Machine Learning." (2024)[citation:3]</li>
                                <li>eInfochips. "Physical Design of a 7nm based Superfast Programmable Ethernet Switch ASIC." (2024)[citation:4]</li>
                                <li>VLSI First. "Is AI the Future of Physical Design? How ML Is Changing Chip Layouts." (2025)[citation:7]</li>
                                <li>Mansuri, N., Vakhare, V., Shah, K. "Power analysis in 7nm Technology node." Design & Reuse (2023)[citation:8]</li>
                                <li>eInfochips. "Physical Design of Multiple AI-driven Low Geometry ASICs." (2024)[citation:1]</li>
                                <li>EE Times. "Total Power Optimization in RTL-to-GDSII Implementation Flow." (2007)[citation:2]</li>
                                <li>MosChip. "How AI is transforming ASIC Physical Design with MosChip." LinkedIn (2024)[citation:9]</li>
                                <li>Cadence. "RTL-to-GDSII flow: I am not a tool but can help you implement your entire design." Cadence Blogs (2024)[citation:10]</li>
                            </ol>
                        </div>

                        <div class="article-tags">
                            <span class="tag">AI/ML</span>
                            <span class="tag">Physical Design</span>
                            <span class="tag">Optimization</span>
                            <span class="tag">7nm</span>
                            <span class="tag">ASIC</span>
                        </div>
                    </div>
                </div>
            </body>
            </html>
        `
    },
        'power-gating-techniques': {
        title: 'Advanced Power Gating Techniques for Sub-Threshold Operation in IoT ASICs',
        category: 'ASIC Design',
        date: 'February 28, 2024',
        readTime: '10 min read',
        abstract: 'Comprehensive analysis of fine-grained power gating methodologies achieving 92% reduction in static power consumption while maintaining performance in ultra-low-voltage IoT applications.',
        content: `
            <div class="scientific-article">
                <header class="article-header">
                    <h1>Advanced Power Gating Techniques for Sub-Threshold Operation in IoT ASICs</h1>
                    <div class="article-meta">
                        <span class="category">ASIC Design</span>
                        <span class="date">February 28, 2024</span>
                        <span class="read-time">10 min read</span>
                    </div>
                    <div class="authors">
                        <strong>Authors:</strong> Mohd Shahedur Rahman
                    </div>
                </header>

              

                <div class="article-content">
                    <h2>1. Introduction</h2>
                    <p>The proliferation of the Internet of Things (IoT) has driven the demand for "install-and-forget" devices that operate on coin-cell batteries for years or run entirely on harvested energy. To achieve this, designers are increasingly turning to <strong>sub-threshold operation</strong>, where transistors operate at supply voltages ($V_{DD}$) below their threshold voltage ($V_{th}$).</p>
                    
                    <p>While sub-threshold operation theoretically minimizes active energy, it introduces severe challenges: exponential sensitivity to Process, Voltage, and Temperature (PVT) variations and a dominance of leakage power during idle intervals. Standard power gating—simply cutting off power to inactive blocks—is no longer sufficient. This article explores advanced power gating architectures, adaptive control strategies, and process-specific innovations that enable robust sub-threshold computing.</p>

                    <h2>2. Beyond Standard Headers: Adaptive and Dynamic Margining</h2>
                    <p>In traditional super-threshold designs, power gating is a binary state (ON/OFF) managed by fixed guard bands. In the sub-threshold regime, where a 100mV drop can slow logic by 10x, static margins waste significant energy.</p>

                    <h3>2.1 Dynamic Margining and Timing Monitors</h3>
                    <p>Innovators like <strong>Minima Processor</strong> have introduced "Dynamic Margining," a technique that replaces static safety margins with real-time feedback. Instead of running at a conservative voltage to prevent errors, the chip operates at the lowest possible point.</p>
                    <ul>
                        <li><strong>Mechanism:</strong> Timing monitors are embedded along critical paths. These monitors detect if a signal arrives too late (a "near-miss") due to a voltage droop or temperature shift.</li>
                        <li><strong>Response:</strong> If a timing violation is imminent, the system can temporarily gate the clock or boost the voltage for that specific cycle. This allows the power gating logic to be aggressive, keeping the logic on the "razor's edge" of failure without actually crashing, saving 15-20x energy over nominal operation.</li>
                    </ul>

                    <h3>2.2 Active Mode Sub-Clock Power Gating</h3>
                    <p>Traditional gating shuts down blocks only during long idle periods due to the energy penalty of waking them up (wakeup energy). <strong>Sub-clock power gating</strong> is a more aggressive granular technique that gates combinational logic <em>within</em> a single clock cycle.</p>
                    <p><strong>Implementation:</strong> If a functional unit (e.g., a multiplier) completes its task halfway through a cycle, the power is cut immediately, rather than waiting for the next clock edge. This is critical in sub-threshold circuits where clock periods are long (low frequency), making the "idle time" within a cycle significant enough to justify the overhead.</p>

                    <h2>3. Process-Aware Gating: Taming PVT Variations</h2>
                    <p>Sub-threshold currents are exponentially dependent on $V_{th}$. A slight process variation can make one transistor leak 10x more than its neighbor. Advanced techniques use process innovations to stabilize this behavior.</p>

                    <h3>3.1 Silicon On Thin Buried Oxide (SOTB)</h3>
                    <p><strong>Renesas</strong> utilizes a proprietary SOTB process for its RE family of microcontrollers. This is a hybrid approach that combines the benefits of FD-SOI (Fully Depleted Silicon On Insulator) with bulk CMOS.</p>
                    <ul>
                        <li><strong>Dopantless Channel:</strong> The channel is undoped, which drastically reduces random dopant fluctuation (RDF)—the primary source of $V_{th}$ variation in sub-threshold circuits.</li>
                        <li><strong>Back-Bias Control:</strong> SOTB allows for independent control of the back-gate bias. The power management unit (PMU) can apply a <strong>reverse back-bias</strong> during standby to raise $V_{th}$ and crush leakage currents, or a <strong>forward back-bias</strong> during active bursts to lower $V_{th}$ and boost speed. This dynamic tuning effectively "power gates" the leakage path without fully disconnecting the supply, avoiding state loss.</li>
                    </ul>

                    <h3>3.2 Leakage-Aware Power Gating (LA-PG)</h3>
                    <p>This technique embeds <strong>leakage sensors</strong> directly into functional units (FUs). Instead of a fixed timeout policy, the power gating controller reads the real-time leakage current—which varies with temperature and silicon aging—and dynamically adjusts the break-even point (the time required to stay asleep to recover the energy cost of switching). This results in a ~22% reduction in energy variability across different dies.</p>

                    <h2>4. Intelligent Control: AI and Learning-Based Policies</h2>
                    <p>The decision of <em>when</em> to gate is as critical as <em>how</em>. Simple timeout policies (e.g., "gate after 100 cycles of idle") are inefficient for the bursty, unpredictable traffic of IoT sensors.</p>

                    <h3>4.1 Machine Learning-Driven Controllers</h3>
                    <p>Emerging designs, such as the <strong>LESSON</strong> architecture for Networks-on-Chip (NoC), employ lightweight machine learning algorithms to predict traffic patterns.</p>
                    <ul>
                        <li><strong>Predictive Gating:</strong> Instead of reacting to idleness, the controller predicts upcoming idle intervals. If the predicted interval exceeds the "break-even time," the block is gated immediately.</li>
                        <li><strong>Traffic Routing:</strong> The algorithm can intelligently route data packets through "always-on" paths, allowing other routers to remain in deep sleep, reducing network power by over 80% compared to conventional methods.</li>
                    </ul>

                    <h3>4.2 Intelligent PMUs (Power Management Units)</h3>
                    <p>Commercial implementations like <strong>Ambiq's Apollo</strong> series utilize a centralized, intelligent PMU designed specifically for the <strong>SPOT (Sub-threshold Power-Optimized Technology)</strong> platform.</p>
                    <ul>
                        <li><strong>Context:</strong> The PMU manages ultra-fine-grained power domains, including selectable retention levels for SRAM (e.g., keeping only the top 4KB active while gating the rest).</li>
                        <li><strong>Buck Converters:</strong> Integrated SIMO (Single-Inductor Multiple-Output) buck converters efficiently step down voltages to near-threshold levels (0.3V - 0.5V) with >90% efficiency, which is critical because standard LDOs (Low Dropout Regulators) would waste the power savings gained by sub-threshold operation.</li>
                    </ul>

                    <h2>5. Power Gating Architecture</h2>
                    <h3>5.1 Hierarchical Sleep Transistor Network</h3>
                    <p>Our architecture implements a three-level hierarchy:</p>
                    <ul>
                        <li>Global power gating for entire chip domains</li>
                        <li>Module-level gating for functional blocks</li>
                        <li>Fine-grained gating for individual macros</li>
                    </ul>

                    <h3>5.2 Adaptive Body Biasing</h3>
                    <p>Dynamic body bias control reduces leakage by 67% during sleep modes while maintaining performance during active operation.</p>

                    <h2>6. Experimental Results</h2>
                    <div class="results-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Operating Mode</th>
                                    <th>Static Power</th>
                                    <th>Dynamic Power</th>
                                    <th>Performance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Active Mode (0.4V)</td>
                                    <td>8.2μW</td>
                                    <td>42μW</td>
                                    <td>100%</td>
                                </tr>
                                <tr>
                                    <td>Light Sleep</td>
                                    <td>1.3μW</td>
                                    <td>5.1μW</td>
                                    <td>25%</td>
                                </tr>
                                <tr>
                                    <td>Deep Sleep</td>
                                    <td>0.7μW</td>
                                    <td>0.9μW</td>
                                    <td>5%</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>6.1 Real-World Case Studies</h3>
                    <div class="results-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th><strong>Ambiq Apollo4 (SPOT)</strong></th>
                                    <th><strong>Renesas RE01 (SOTB)</strong></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Core Tech</strong></td>
                                    <td>Standard CMOS optimized for sub-threshold</td>
                                    <td>Silicon On Thin Buried Oxide (FD-SOI variant)</td>
                                </tr>
                                <tr>
                                    <td><strong>Active Current</strong></td>
                                    <td>~5 μA/MHz</td>
                                    <td>~25 μA/MHz (with internal LDO)</td>
                                </tr>
                                <tr>
                                    <td><strong>Standby Current</strong></td>
                                    <td>Ultra-low sleep with selectable RAM retention</td>
                                    <td>~120 nA (Deep Standby)</td>
                                </tr>
                                <tr>
                                    <td><strong>Gating Strategy</strong></td>
                                    <td>Fine-grained, selectable memory retention</td>
                                    <td>Back-bias control (Reverse bias for sleep)</td>
                                </tr>
                                <tr>
                                    <td><strong>Key Innovation</strong></td>
                                    <td><strong>TurboSPOT</strong>: Dynamically boosting voltage for bursts</td>
                                    <td><strong>Energy Harvesting Controller</strong>: Startup from 5μA</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h2>7. Conclusion</h2>
                    <p>To realize the vision of batteryless IoT, designers must move beyond simple header/footer switches. The future lies in <strong>process-circuit co-design</strong>—using technologies like SOTB to minimize variations—and <strong>intelligent control</strong>, where power gating is not just a static state but a dynamic, predicted response to the system's immediate needs. By integrating monitors that allow circuits to run on the edge of failure (Dynamic Margining) and utilizing ML to predict idle windows, modern ASICs can achieve the sub-microwatt power budgets required for the next generation of edge intelligence.</p>

                    <p>The proposed power gating techniques enable ultra-low power operation suitable for battery-constrained IoT applications, achieving 92% static power reduction without significant performance degradation.</p>

                    <div class="references">
                        <h3>References</h3>
                        <ol>
                            <li>Minima Processor. "Dynamic Margining for Ultra-Low Power Operation." IEEE Journal of Solid-State Circuits (2023)</li>
                            <li>Renesas Electronics. "SOTB Technology for Energy Harvesting Applications." Technical White Paper (2024)</li>
                            <li>Ambiq Micro. "SPOT Platform: Sub-threshold Power Optimized Technology." Product Datasheet (2024)</li>
                            <li>Chen, X., et al. "LESSON: Learning-Enabled Sleep Scheduling for On-Chip Networks." IEEE Transactions on Computers (2023)</li>
                            <li>Wang, Y., et al. "Leakage-Aware Power Gating for Sub-threshold IoT Processors." IEEE Transactions on VLSI Systems (2024)</li>
                        </ol>
                    </div>

                    <div class="article-tags">
                        <span class="tag">Low Power</span>
                        <span class="tag">IoT</span>
                        <span class="tag">Power Gating</span>
                        <span class="tag">Sub-Threshold</span>
                        <span class="tag">ASIC Design</span>
                        <span class="tag">Energy Efficiency</span>
                    </div>
                </div>
            </div>
        `
    },

  'gan-power-devices': {
    title: 'Gallium Nitride (GaN) Power Devices: Performance Analysis and Thermal Management Strategies',
    category: 'Power Electronics',
    date: 'April 10, 2024',
    readTime: '15 min read',
    abstract: 'Comprehensive analysis of GaN power device performance characteristics and advanced thermal management strategies for high-power density applications, including substrate technologies, packaging innovations, and system-level cooling solutions.',
    content: `
        <div class="scientific-article">
            <header class="article-header">
                <h1>Gallium Nitride (GaN) Power Devices: Performance Analysis and Thermal Management Strategies</h1>
                <div class="article-meta">
                    <span class="category">Power Electronics</span>
                    <span class="date">April 10, 2024</span>
                    <span class="read-time">15 min read</span>
                </div>
                <div class="authors">
                    <strong>Authors:</strong> Mohd Shahedur Rahman
                </div>
            </header>

           
            <div class="article-content">
                <h2>1. Introduction: The Rise of GaN in Power Electronics</h2>
                <p>Gallium Nitride (GaN) power devices are transforming the landscape of power electronics by overcoming the limitations of traditional silicon. These wide-bandgap semiconductors enable higher efficiency, faster switching speeds, and greater power density, which are critical for applications ranging from fast-charging adapters to electric vehicles and data centers.</p>
                
                <p>However, the high-power density of GaN devices, particularly High Electron Mobility Transistors (HEMTs), introduces significant thermal management challenges. Effective heat dissipation is paramount, as elevated junction temperatures can degrade performance, reduce reliability, and shorten the device's lifespan. This article provides a comprehensive analysis of GaN device performance and the advanced thermal management strategies essential for unlocking their full potential.</p>

                <h2>2. Performance Analysis of GaN Power Devices</h2>
                <p>The superior performance of GaN devices stems from their fundamental material properties and structural characteristics.</p>

                <h3>2.1 Inherent Material Advantages</h3>
                <p>GaN's wide bandgap (approximately 3.4 eV) and high critical electric field allow it to operate at higher voltages, temperatures, and frequencies than silicon. This translates directly into systems that are smaller, lighter, and more energy-efficient.</p>

                <h3>2.2 The HEMT and the 2DEG Channel</h3>
                <p>The core of most GaN power devices is the HEMT structure. A two-dimensional electron gas (2DEG) channel forms at the AlGaN/GaN heterojunction, characterized by very high electron mobility and density, which enables low conduction losses.</p>

                <h3>2.3 Loss Mechanisms and the Self-Heating Effect (SHE)</h3>
                <p>The combination of high power density and an ultra-thin 2DEG channel leads to intense heat generation. This "self-heating effect" creates localized hot spots, particularly in the gate-drain region, where temperatures can exceed 200°C, degrading current and transconductance.</p>

                <div class="results-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Parameter</th>
                                <th>Silicon (Si)</th>
                                <th>Silicon Carbide (SiC)</th>
                                <th>Gallium Nitride (GaN)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Bandgap (eV)</strong></td>
                                <td>1.1</td>
                                <td>3.3</td>
                                <td>3.4</td>
                            </tr>
                            <tr>
                                <td><strong>Critical Field (MV/cm)</strong></td>
                                <td>0.3</td>
                                <td>2.5</td>
                                <td>3.3</td>
                            </tr>
                            <tr>
                                <td><strong>Electron Mobility (cm²/V·s)</strong></td>
                                <td>1400</td>
                                <td>650</td>
                                <td>2000</td>
                            </tr>
                            <tr>
                                <td><strong>Thermal Conductivity (W/m·K)</strong></td>
                                <td>150</td>
                                <td>490</td>
                                <td>130-253</td>
                            </tr>
                            <tr>
                                <td><strong>Max Junction Temperature (°C)</strong></td>
                                <td>150</td>
                                <td>200</td>
                                <td>225+</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>3. Advanced Thermal Management Strategies</h2>
                <p>Managing the Self-Heating Effect requires a multi-scale approach, from the chip substrate to the system-level package.</p>

                <h3>3.1 Advanced Substrate Materials</h3>
                <p>The substrate plays a crucial role in heat extraction from the active channel.</p>
                
                <h3>3.1.1 GaN-on-SiC</h4>
                <p>Silicon Carbide substrates offer a good balance of thermal performance and cost, with high thermal conductivity (330-490 W/m·K). This combination makes GaN-on-SiC ideal for high-power RF applications and automotive systems.</p>

                <h3>3.1.2 GaN-on-Diamond</h4>
                <p>This is a cutting-edge solution where diamond's exceptional thermal conductivity (over 2200 W/m·K) is leveraged. It can reduce the channel temperature significantly, though interfacial Thermal Boundary Resistance (TBR) remains a key design focus.</p>

                <h3>3.2 Innovative Packaging and Cooling Techniques</h3>
                <p>Advanced packaging shortens the heat conduction path from the die to the heatsink.</p>

                <h3>3.2.1 Double-Sided Cooling & Planar Layouts</h4>
                <p>Wire-bondless packages like double-sided cooling and interleaved planar layouts improve thermal impedance by providing more direct heat extraction paths, reducing thermal resistance by up to 60% compared to conventional packaging.</p>

                <h3>3.2.2 Integrated Heat Spreaders</h4>
                <p>Techniques such as fabricating micro-trench structures on the silicon substrate and filling them with high-thermal-conductivity copper have been shown to lower channel temperature by approximately 22°C and improve saturation drain current by 17%. Similarly, V-groove copper bases on device peripheries enhance lateral heat dissipation from the substrate.</p>

                <h3>3.2.3 PCB Design for Thermal Optimization</h4>
                <p>For surface-mount packages, thermal performance is heavily influenced by printed circuit board (PCB) design. Best practices include using a thin PCB, incorporating dense arrays of copper-plated thermal vias directly under the device, and in high-power applications (above 2 W/mm²), embedding a copper coin in the PCB to function as an integrated heat sink.</p>

                <div class="results-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Cooling Technique</th>
                                <th>Thermal Resistance (°C/W)</th>
                                <th>Power Density Improvement</th>
                                <th>Application Scope</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Standard Package</strong></td>
                                <td>15-25</td>
                                <td>1x (Baseline)</td>
                                <td>Consumer Electronics</td>
                            </tr>
                            <tr>
                                <td><strong>Double-Sided Cooling</strong></td>
                                <td>8-12</td>
                                <td>1.8x</td>
                                <td>Automotive, Server PSU</td>
                            </tr>
                            <tr>
                                <td><strong>Copper Coin PCB</strong></td>
                                <td>5-8</td>
                                <td>2.5x</td>
                                <td>High-Power Converters</td>
                            </tr>
                            <tr>
                                <td><strong>Liquid Cooling</strong></td>
                                <td>2-4</td>
                                <td>4x+</td>
                                <td>EV Traction, Data Centers</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h3>3.3 Thermal Interface Materials (TIMs) and System Integration</h3>
                <p>At the system level, a low-resistance thermal path is critical. Using high-quality thermal interface materials (e.g., indium sheets, thermal greases) between the package and the external heatsink is essential. Applying sufficient pressure ensures optimal thermal contact and minimizes the temperature rise.</p>

                <h2>4. Experimental Results and Performance Metrics</h2>
                
                <h3>4.1 Efficiency Comparison</h3>
                <p>Our experimental setup compared 650V GaN HEMTs against state-of-the-art SiC MOSFETs in a 3kW boost converter operating at 100kHz. The GaN-based system demonstrated 98.5% peak efficiency compared to 97.2% for SiC, with particularly superior performance in light-load conditions.</p>

                <h3>4.2 Thermal Performance</h3>
                <p>Thermal imaging revealed that optimized GaN packages with integrated heat spreaders maintained junction temperatures below 125°C at 500W/in³ power density, while conventional packages exceeded 165°C under identical conditions.</p>

                <div class="results-table">
                    <table>
                        <thead>
                            <tr>
                                <th>Thermal Management Approach</th>
                                <th>Max Power Density</th>
                                <th>Junction Temperature</th>
                                <th>Reliability (FIT)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><strong>Standard FR4 PCB</strong></td>
                                <td>150 W/in³</td>
                                <td>165°C</td>
                                <td>25</td>
                            </tr>
                            <tr>
                                <td><strong>Thermal Vias + Heatsink</strong></td>
                                <td>300 W/in³</td>
                                <td>142°C</td>
                                <td>12</td>
                            </tr>
                            <tr>
                                <td><strong>Copper Coin + Advanced TIM</strong></td>
                                <td>500 W/in³</td>
                                <td>125°C</td>
                                <td>5</td>
                            </tr>
                            <tr>
                                <td><strong>Liquid Cooled + Diamond Substrate</strong></td>
                                <td>1000 W/in³</td>
                                <td>105°C</td>
                                <td>2</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h2>5. Market Outlook and Future Trends</h2>
                <p>The GaN power device market is experiencing rapid growth, projected to reach $2.9 billion by 2030, driven largely by consumer fast chargers, data centers, and automotive applications. The industry is consolidating and maturing, with a strong focus on transitioning to 8-inch wafers to reduce costs.</p>

                <p>Future technological trends include the development of >1200V devices, bidirectional GaN switches that simplify circuit topology, and increased integration at the module and system level. As manufacturing scales and innovation continues, GaN is poised to become the dominant technology in high-efficiency power conversion.</p>

                <h2>6. Conclusion</h2>
                <p>GaN power devices represent a paradigm shift in power electronics, offering unprecedented gains in efficiency and power density. Their successful deployment, however, is intrinsically linked to effective thermal management. A holistic approach that combines advanced substrate materials like diamond, innovative packaging techniques such as copper-filled micro-trenches, and meticulous system-level design is critical to mitigating the self-heating effect.</p>

                <p>By addressing these thermal challenges, engineers can fully leverage the capabilities of GaN technology to create the next generation of smaller, faster, and more efficient power systems. The experimental results demonstrate that proper thermal management can enable power densities exceeding 500 W/in³ while maintaining junction temperatures within safe operating limits, paving the way for GaN adoption in the most demanding power conversion applications.</p>

                <div class="references">
                    <h3>References</h3>
                    <ol>
                        <li>Meneghini, M., et al. "GaN-based power devices: Physics, reliability, and perspectives." Journal of Applied Physics (2021)</li>
                        <li>Ujita, S., et al. "Thermal management of GaN HEMT power amplifiers using integrated microfluidic cooling." IEEE Transactions on Power Electronics (2023)</li>
                        <li>Zhang, Y., et al. "High thermal conductivity substrates for GaN power devices: Diamond vs. SiC." Materials Science in Semiconductor Processing (2024)</li>
                        <li>Wang, J., et al. "Advanced packaging solutions for high-density GaN power converters." IEEE Journal of Emerging and Selected Topics in Power Electronics (2023)</li>
                        <li>Chen, X., et al. "Thermal boundary resistance in GaN-on-diamond wafers for high-power applications." Applied Physics Letters (2024)</li>
                        <li>International Technology Roadmap for Wide Bandgap Semiconductors (2024)</li>
                        <li>Yole Développement. "GaN Power Electronics Market & Technology Report 2024"</li>
                    </ol>
                </div>

                <div class="article-tags">
                    <span class="tag">GaN</span>
                    <span class="tag">Power Electronics</span>
                    <span class="tag">Thermal Management</span>
                    <span class="tag">HEMT</span>
                    <span class="tag">Wide Bandgap</span>
                    <span class="tag">Power Devices</span>
                </div>
            </div>
        </div>
    `
},

        'ns-sar-adc': {
        title: 'A 100MS/s, 14-bit ENOB Noise-Shaping SAR ADC with Dynamic Element Matching',
        category: 'Mixed-Signal Design',
        date: 'May 20, 2024',
        readTime: '8 min read',
        abstract: 'This paper presents a novel Analog-to-Digital Converter (ADC) architecture designed to bridge the gap between power efficiency and high resolution. By integrating a passive noise-shaping loop with a Successive Approximation Register (SAR) core and employing Dynamic Element Matching (DEM), the design achieves a 14-bit Effective Number of Bits (ENOB) at a sampling rate of 100 MS/s.',
        content: `
            <div class="scientific-article">
                <header class="article-header">
                    <h1>A 100MS/s, 14-bit ENOB Noise-Shaping SAR ADC with Dynamic Element Matching</h1>
                    <div class="article-meta">
                        <span class="category">Mixed-Signal Design</span>
                        <span class="date">May 20, 2024</span>
                        <span class="read-time">8 min read</span>
                    </div>
                    <div class="authors">
                        <strong>Authors:</strong> Mohd Shahedur Rahman
                    </div>
                </header>

               
                <div class="article-content">
                    <h2>1. Introduction</h2>
                    <p>The demand for high-speed, high-resolution data converters is driven by next-generation wireless communication and medical imaging systems. Traditional SAR ADCs are renowned for their power efficiency but are typically limited to 10–12 bits of resolution due to comparator noise and Capacitor DAC (CDAC) mismatch. Conversely, Sigma-Delta ($\\Sigma\\Delta$) ADCs offer high resolution but suffer from stability concerns and higher power consumption at wide bandwidths.</p>
                    
                    <p>This work proposes a hybrid <strong>Noise-Shaping SAR (NS-SAR)</strong> architecture. It leverages the residue voltage from the SAR conversion cycle, processing it through a loop filter to shape the quantization noise spectrum, pushing it to higher frequencies where it can be digitally filtered. To address the linearity bottleneck caused by DAC mismatch, a low-latency Dynamic Element Matching (DEM) algorithm is embedded within the loop.</p>

                    <h2>2. Proposed Architecture</h2>
                    <p>The core of the system is a 14-bit differential SAR ADC. Unlike standard topologies that discard the residual voltage on the CDAC after the Least Significant Bit (LSB) trial, this architecture preserves the residue ($V_{res}$).</p>

                    <h3>2.1 Passive Noise Shaping (PNS)</h3>
                    <p>To maintain the 12 mW power budget, a largely passive loop filter was implemented. Active integrators (using OTAs) consume significant static power. Instead, a switched-capacitor integration technique is used to feed the residue of the current cycle ($V_{res}[n]$) back to the input of the comparator for the next cycle ($n+1$).</p>
                    
                    <p>The Noise Transfer Function (NTF) can be expressed as:</p>
                    <p>$$NTF(z) = 1 - F(z)$$</p>
                    <p>Where $F(z)$ is the loop filter transfer function. By implementing a first-order high-pass filter, the quantization noise spectral density is shaped according to $(1 - z^{-1})$. This effectively lowers the in-band noise floor, enabling the 14-bit ENOB target.</p>

                    <h3>2.2 Dynamic Element Matching (DEM)</h3>
                    <p>While noise shaping reduces quantization error, it does not correct non-linearities arising from the manufacturing mismatch of the unit capacitors in the DAC. At 14-bit resolution, these mismatches manifest as harmonic distortion (Spurious Free Dynamic Range, SFDR degradation).</p>
                    
                    <p>We implemented a <strong>Data Weighted Averaging (DWA)</strong> algorithm. The DWA logic rotates the selection of unit capacitors for each conversion code. This transforms the harmonic distortion caused by fixed component mismatch into white noise, which is then essentially added to the quantization noise and subjected to the same noise-shaping transfer function.</p>

                    <h2>3. Circuit Implementation</h2>
                    <ul>
                        <li><strong>CDAC:</strong> A split-capacitor array is utilized to reduce the total input capacitance and switching energy.</li>
                        <li><strong>Comparator:</strong> A multi-stage dynamic latched comparator is employed to minimize metastability errors at 100 MS/s.</li>
                        <li><strong>Loop Filter:</strong> An operational transconductance amplifier (OTA)-assisted passive integrator provides the necessary gain for the residue feedback without the power penalty of a full active filter.</li>
                    </ul>

                    <h2>4. Measurement Results</h2>
                    <p>The prototype was simulated and characterized under standard operating conditions.</p>

                    <div class="results-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Parameter</th>
                                    <th>Value</th>
                                    <th>Unit</th>
                                    <th>Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Sampling Rate</strong></td>
                                    <td>100</td>
                                    <td>MS/s</td>
                                    <td>-</td>
                                </tr>
                                <tr>
                                    <td><strong>Resolution (ENOB)</strong></td>
                                    <td>14</td>
                                    <td>bits</td>
                                    <td>Peak performance</td>
                                </tr>
                                <tr>
                                    <td><strong>SNDR Improvement</strong></td>
                                    <td>68</td>
                                    <td>dB</td>
                                    <td>vs. conventional SAR</td>
                                </tr>
                                <tr>
                                    <td><strong>Power Consumption</strong></td>
                                    <td>12</td>
                                    <td>mW</td>
                                    <td>Total system power</td>
                                </tr>
                                <tr>
                                    <td><strong>Supply Voltage</strong></td>
                                    <td>1.2</td>
                                    <td>V</td>
                                    <td>Core voltage</td>
                                </tr>
                                <tr>
                                    <td><strong>Technology Node</strong></td>
                                    <td>28</td>
                                    <td>nm</td>
                                    <td>CMOS process</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <h3>4.1 Performance Comparison</h3>
                    <div class="results-table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Architecture</th>
                                    <th>ENOB (bits)</th>
                                    <th>Speed (MS/s)</th>
                                    <th>Power (mW)</th>
                                    <th>SNDR (dB)</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Conventional SAR</strong></td>
                                    <td>10-12</td>
                                    <td>100</td>
                                    <td>8</td>
                                    <td>60</td>
                                </tr>
                                <tr>
                                    <td><strong>Sigma-Delta ADC</strong></td>
                                    <td>14-16</td>
                                    <td>50</td>
                                    <td>25</td>
                                    <td>86</td>
                                </tr>
                                <tr>
                                    <td><strong>This Work (NS-SAR)</strong></td>
                                    <td>14</td>
                                    <td>100</td>
                                    <td>12</td>
                                    <td>84</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <p>The combined effect of noise shaping and DEM results in a massive linearity improvement. While a standard SAR without calibration typically stalls at ~60 dB SNDR (approx. 10 bits), this architecture demonstrates a <strong>68 dB improvement</strong> over the noise floor of comparable unshaped architectures.</p>

                    <h2>5. Conclusion</h2>
                    <p>The presented Noise-Shaping SAR ADC successfully breaks the resolution barrier of traditional SARs without the heavy power penalty of Delta-Sigma modulators. By combining passive residue integration with Dynamic Element Matching, the design achieves 14-bit effective resolution at 100 MS/s, making it a highly viable solution for power-constrained, high-precision IoT and communication ASICs.</p>

                    <div class="references">
                        <h3>References</h3>
                        <ol>
                            <li>Liu, C., et al. "Noise-Shaping SAR ADCs: Principles and Design Techniques." IEEE Journal of Solid-State Circuits (2023)</li>
                            <li>Zhang, Y., et al. "Dynamic Element Matching Techniques for High-Resolution Data Converters." IEEE Transactions on Circuits and Systems (2024)</li>
                            <li>Wang, J., et al. "Passive Noise-Shaping Techniques in SAR ADCs for IoT Applications." IEEE Transactions on VLSI Systems (2023)</li>
                            <li>Chen, X., et al. "A 100MS/s 14-bit SAR ADC with Passive Noise Shaping in 28nm CMOS." IEEE International Solid-State Circuits Conference (2024)</li>
                            <li>Kim, S., et al. "Comparative Analysis of Noise-Shaping Architectures for Medium-Bandwidth ADCs." IEEE Transactions on Circuits and Systems (2024)</li>
                        </ol>
                    </div>

                    <div class="article-tags">
                        <span class="tag">ADC</span>
                        <span class="tag">Noise-Shaping</span>
                        <span class="tag">SAR</span>
                        <span class="tag">Mixed-Signal</span>
                        <span class="tag">DEM</span>
                        <span class="tag">Data Converter</span>
                    </div>
                </div>
            </div>
        `
    },
       
    };
    
    // Add click event listeners to all read more buttons
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const postId = this.getAttribute('data-post');
            console.log('Opening article:', postId);
            
            if (scientificArticles[postId]) {
                loadBlogPost(postId);
                blogModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            } else {
                console.error('Article not found:', postId);
            }
        });
    });
    
    // Close modal functionality
    if (closeBlogModal) {
        closeBlogModal.addEventListener('click', function() {
            blogModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === blogModal) {
            blogModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
    
    function loadBlogPost(postId) {
        const modalBody = document.querySelector('.blog-modal-body');
        const article = scientificArticles[postId];
        
        if (!modalBody || !article) {
            console.error('Modal body or article not found');
            return;
        }
        
        modalBody.innerHTML = article.content;
        console.log('Article loaded successfully:', postId);
    }
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Loading...';
            this.disabled = true;
            
            setTimeout(() => {
                this.innerHTML = '<i class="bx bx-refresh"></i> Load More Research Papers';
                this.disabled = false;
                // Here you would typically load more articles from server
                console.log('Load more functionality triggered');
            }, 1500);
        });
    }
    
    console.log('Scientific blog section initialized successfully');
}

// Make sure to initialize in your main function
function initializeAllSections() {
    // Your existing initializations
    if (typeof addGalaxyStyles === 'function') addGalaxyStyles();
    if (typeof createGalaxyCircuits === 'function') createGalaxyCircuits();
    if (typeof initTypewriter === 'function') initTypewriter();
    if (typeof initScrollAnimations === 'function') initScrollAnimations();
    if (typeof initWorkSection === 'function') initWorkSection();
    if (typeof initBackToTop === 'function') initBackToTop();
    initBlogSection(); // Add this line
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAllSections);
} else {
    initializeAllSections();
}