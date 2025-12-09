<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ciena Finance Decision Intelligence Guide</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <!-- Icon Library -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
        body {
            font-family: 'Inter', sans-serif;
            background-color: #f3f4f6;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
        }
        
        /* Print Specific Styles */
        @media print {
            body { 
                background-color: white; 
                margin: 0;
                padding: 0;
            }
            .no-print { display: none !important; }
            .page-break { page-break-before: always; }
            
            /* Ensure cards don't get cut in half */
            section, .card-container { 
                page-break-inside: avoid; 
                break-inside: avoid;
            }

            /* Improve input visibility for print */
            textarea, input { 
                border: 1px solid #cbd5e1 !important; 
                resize: none; 
                overflow: hidden; 
                background-color: #fffbeb !important; /* Force light yellow bg to show */
            }
            
            /* Remove shadows for cleaner print */
            .shadow-sm, .shadow-lg { 
                box-shadow: none !important; 
                border: 1px solid #e2e8f0; 
            }

            /* Expand textareas to fit content */
            textarea {
                height: auto;
                min-height: 100px;
            }
        }

        .ciena-red { color: #E31837; }
        .bg-ciena-red { background-color: #E31837; }
        
        /* Custom Checkbox Logic */
        .card-select:checked + div {
            border-color: #E31837;
            background-color: #FEF2F2;
        }
    </style>
</head>
<body class="text-slate-800">

    <!-- Top Navigation / Header -->
    <header class="bg-white border-b sticky top-0 z-50 shadow-sm no-print">
        <div class="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
            <div class="flex items-center gap-3">
                <div class="font-bold text-2xl tracking-tighter text-slate-900">ciena</div>
                <div class="h-6 w-px bg-slate-300 mx-2"></div>
                <h1 class="font-semibold text-slate-600 text-sm md:text-base">Finance Decision Intelligence Guide</h1>
            </div>
            <!-- Updated Button calling handlePrint() -->
            <button onclick="handlePrint()" class="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm font-medium">
                <i data-lucide="printer" class="w-4 h-4"></i>
                <span>Print / Save as PDF</span>
            </button>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-5xl mx-auto px-4 py-8 space-y-8 print:px-0 print:py-4">

        <!-- Introduction Section -->
        <section class="bg-white rounded-xl p-6 shadow-sm border border-slate-100 card-container">
            <div class="flex flex-col md:flex-row gap-6">
                <div class="flex-1">
                    <h2 class="text-3xl font-bold text-slate-900 mb-2">Vertical Snapshot</h2>
                    <div class="h-1 w-20 bg-ciena-red mb-4"></div>
                    <p class="text-slate-600 leading-relaxed mb-4">
                        The financial services sector is under immense pressure to modernize. Banks, trading firms, and insurers are battling <strong>strict regulatory compliance (DORA, GDPR)</strong>, expanding <strong>AI-driven decisioning</strong>, and the need for <strong>ultra-low latency</strong> infrastructure.
                    </p>
                    <div class="flex items-center gap-2 text-sm text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-100 print:bg-slate-50">
                        <i data-lucide="info" class="w-4 h-4 text-slate-400"></i>
                        <span><strong>Consultant Note:</strong> Use this guide to move from transactional discussions to strategic outcomes.</span>
                    </div>
                </div>
                <div class="md:w-1/3 bg-slate-900 text-white p-6 rounded-lg flex flex-col justify-center print:bg-slate-900 print:text-white">
                    <h3 class="font-semibold mb-2 text-red-400">Market Signal</h3>
                    <ul class="space-y-3 text-sm text-slate-300 print:text-slate-200">
                        <li class="flex gap-2"><i data-lucide="trending-up" class="w-4 h-4 shrink-0"></i> AI-enabled operations</li>
                        <li class="flex gap-2"><i data-lucide="shield-check" class="w-4 h-4 shrink-0"></i> DORA & Operational Resilience</li>
                        <li class="flex gap-2"><i data-lucide="cloud" class="w-4 h-4 shrink-0"></i> Hybrid Multi-cloud interconnectivity</li>
                    </ul>
                </div>
            </div>
        </section>

        <!-- Challenges & Opportunities Grid -->
        <section class="grid md:grid-cols-2 gap-6 card-container">
            <!-- Pain Points -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div class="flex items-center gap-2 mb-4">
                    <div class="bg-red-50 p-2 rounded-full"><i data-lucide="alert-circle" class="w-5 h-5 text-red-600"></i></div>
                    <h3 class="font-bold text-lg">Customer Pain Points</h3>
                </div>
                <ul class="space-y-4">
                    <li class="flex gap-3 items-start">
                        <span class="text-red-500 font-bold mt-1">×</span>
                        <div>
                            <strong class="block text-slate-900">Latency Lag</strong>
                            <span class="text-slate-500 text-sm">Microseconds lost in trading execution cost millions in revenue.</span>
                        </div>
                    </li>
                    <li class="flex gap-3 items-start">
                        <span class="text-red-500 font-bold mt-1">×</span>
                        <div>
                            <strong class="block text-slate-900">Data Sovereignty Risk</strong>
                            <span class="text-slate-500 text-sm">Fear of compliance breaches when moving data to the cloud.</span>
                        </div>
                    </li>
                    <li class="flex gap-3 items-start">
                        <span class="text-red-500 font-bold mt-1">×</span>
                        <div>
                            <strong class="block text-slate-900">Rigid Legacy Ops</strong>
                            <span class="text-slate-500 text-sm">Inability to spin up bandwidth quickly for new AI projects.</span>
                        </div>
                    </li>
                </ul>
            </div>

            <!-- Opportunities -->
            <div class="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                <div class="flex items-center gap-2 mb-4">
                    <div class="bg-green-50 p-2 rounded-full"><i data-lucide="check-circle-2" class="w-5 h-5 text-green-600"></i></div>
                    <h3 class="font-bold text-lg">Ciena Opportunity</h3>
                </div>
                <ul class="space-y-4">
                    <li class="flex gap-3 items-start">
                        <span class="text-green-500 font-bold mt-1">✓</span>
                        <div>
                            <strong class="block text-slate-900">Low-Latency Optical</strong>
                            <span class="text-slate-500 text-sm">Position WaveLogic 6 for the fastest possible trading links.</span>
                        </div>
                    </li>
                    <li class="flex gap-3 items-start">
                        <span class="text-green-500 font-bold mt-1">✓</span>
                        <div>
                            <strong class="block text-slate-900">Encryption Everywhere</strong>
                            <span class="text-slate-500 text-sm">Sell WaveLogic Encryption for compliant, wire-speed security.</span>
                        </div>
                    </li>
                    <li class="flex gap-3 items-start">
                        <span class="text-green-500 font-bold mt-1">✓</span>
                        <div>
                            <strong class="block text-slate-900">Bandwidth on Demand</strong>
                            <span class="text-slate-500 text-sm">Use MCP to show how they can automate capacity scaling.</span>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <!-- Interactive Worksheet Header -->
        <div class="flex items-center gap-4 py-4 page-break">
            <div class="h-px flex-1 bg-slate-300"></div>
            <span class="text-slate-400 text-sm font-semibold uppercase tracking-wider">Interactive Discovery Worksheet</span>
            <div class="h-px flex-1 bg-slate-300"></div>
        </div>

        <!-- Step 1: Stakeholder -->
        <section class="card-container">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                Who are you speaking with?
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
                <label class="cursor-pointer group">
                    <input type="radio" name="stakeholder" class="peer sr-only card-select">
                    <div class="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all peer-checked:border-red-600 peer-checked:bg-red-50 h-full">
                        <div class="font-bold text-slate-900 mb-1">CIO / CTO</div>
                        <p class="text-xs text-slate-500">Focused on innovation vs. security, reducing complexity.</p>
                    </div>
                </label>
                <label class="cursor-pointer group">
                    <input type="radio" name="stakeholder" class="peer sr-only card-select">
                    <div class="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all peer-checked:border-red-600 peer-checked:bg-red-50 h-full">
                        <div class="font-bold text-slate-900 mb-1">COO</div>
                        <p class="text-xs text-slate-500">Focused on operational resilience and cost reduction.</p>
                    </div>
                </label>
                <label class="cursor-pointer group">
                    <input type="radio" name="stakeholder" class="peer sr-only card-select">
                    <div class="p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all peer-checked:border-red-600 peer-checked:bg-red-50 h-full">
                        <div class="font-bold text-slate-900 mb-1">CISO / Risk Officer</div>
                        <p class="text-xs text-slate-500">Focused on audit readiness, control, and visibility.</p>
                    </div>
                </label>
            </div>
        </section>

        <!-- Step 2: Discovery Topics -->
        <section class="space-y-6 card-container">
            <h3 class="text-xl font-bold flex items-center gap-2">
                <span class="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                Guided Conversation & Capture
            </h3>
            
            <!-- Topic A -->
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden card-container">
                <div class="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                    <span class="font-semibold text-slate-700">Topic A: AI & Real-Time Operations</span>
                    <i data-lucide="cpu" class="w-5 h-5 text-slate-400"></i>
                </div>
                <div class="p-6">
                    <div class="mb-4 text-sm text-slate-600 space-y-2">
                        <p class="italic text-slate-500">"Which of your applications or AI workloads are most sensitive to latency?"</p>
                        <p class="italic text-slate-500">"As you deploy more AI models, are you finding interconnects becoming a bottleneck?"</p>
                    </div>
                    <label class="block text-xs font-bold uppercase text-slate-400 mb-2">Capture Client Response / Pain Point:</label>
                    <textarea class="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="3" placeholder="Type notes here..."></textarea>
                </div>
            </div>

            <!-- Topic B -->
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden card-container">
                <div class="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                    <span class="font-semibold text-slate-700">Topic B: Resilience & Regulation (DORA)</span>
                    <i data-lucide="shield" class="w-5 h-5 text-slate-400"></i>
                </div>
                <div class="p-6">
                    <div class="mb-4 text-sm text-slate-600 space-y-2">
                        <p class="italic text-slate-500">"How are you currently proving SLA compliance to regulators or auditors?"</p>
                        <p class="italic text-slate-500">"How is your current infrastructure handling the new DORA resilience frameworks?"</p>
                    </div>
                    <label class="block text-xs font-bold uppercase text-slate-400 mb-2">Capture Client Response / Compliance Gap:</label>
                    <textarea class="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="3" placeholder="Type notes here..."></textarea>
                </div>
            </div>

            <!-- Topic C -->
            <div class="bg-white border border-slate-200 rounded-xl overflow-hidden card-container">
                <div class="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
                    <span class="font-semibold text-slate-700">Topic C: Efficiency & Automation</span>
                    <i data-lucide="zap" class="w-5 h-5 text-slate-400"></i>
                </div>
                <div class="p-6">
                    <div class="mb-4 text-sm text-slate-600 space-y-2">
                        <p class="italic text-slate-500">"Where can intelligent automation help you streamline change management?"</p>
                    </div>
                    <label class="block text-xs font-bold uppercase text-slate-400 mb-2">Capture Client Response / Efficiency Goal:</label>
                    <textarea class="w-full bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-yellow-400" rows="3" placeholder="Type notes here..."></textarea>
                </div>
            </div>
        </section>

        <!-- Step 3: Solution Mapping -->
        <section class="card-container">
            <h3 class="text-xl font-bold mb-4 flex items-center gap-2">
                <span class="bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                Value Positioning
                <span class="text-sm font-normal text-slate-500 ml-auto">(Select aligned values)</span>
            </h3>
            <div class="grid md:grid-cols-3 gap-4">
                
                <label class="cursor-pointer">
                    <input type="checkbox" class="sr-only card-select">
                    <div class="p-5 bg-blue-50 rounded-xl border-2 border-transparent hover:border-blue-200 transition-all h-full">
                        <h4 class="font-bold text-blue-900 mb-2">Uncompromised Security</h4>
                        <p class="text-sm text-blue-800">"Flight-data-recorder quality encryption at wire speed, ensuring DORA compliance without sacrificing performance."</p>
                    </div>
                </label>

                <label class="cursor-pointer">
                    <input type="checkbox" class="sr-only card-select">
                    <div class="p-5 bg-indigo-50 rounded-xl border-2 border-transparent hover:border-indigo-200 transition-all h-full">
                        <h4 class="font-bold text-indigo-900 mb-2">The Speed of Business</h4>
                        <p class="text-sm text-indigo-800">"Programmable infrastructure shaves milliseconds off transaction times, giving trading desks the competitive edge."</p>
                    </div>
                </label>

                <label class="cursor-pointer">
                    <input type="checkbox" class="sr-only card-select">
                    <div class="p-5 bg-purple-50 rounded-xl border-2 border-transparent hover:border-purple-200 transition-all h-full">
                        <h4 class="font-bold text-purple-900 mb-2">Future-Proof AI Ready</h4>
                        <p class="text-sm text-purple-800">"Scale effortlessly to 800G/1.6T to handle massive AI data sets without ripping and replacing fiber."</p>
                    </div>
                </label>

            </div>
        </section>

        <!-- Use Cases & Action Plan -->
        <section class="grid md:grid-cols-2 gap-6 card-container">
            <div class="bg-white p-6 rounded-xl border border-slate-200">
                <h3 class="font-bold mb-4 text-slate-900">Proven Use Cases</h3>
                <div class="space-y-4">
                    <div class="flex gap-3">
                        <div class="bg-slate-100 p-2 h-fit rounded text-slate-500 font-bold text-xs">01</div>
                        <div>
                            <div class="font-semibold text-sm">High-Frequency Trading Interconnect</div>
                            <div class="text-xs text-slate-500 mt-1">
                                <span class="text-red-500 font-medium">Outcome:</span> 20% latency reduction, reclaimed market leadership.
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <div class="bg-slate-100 p-2 h-fit rounded text-slate-500 font-bold text-xs">02</div>
                        <div>
                            <div class="font-semibold text-sm">Secure Data Center Mirroring</div>
                            <div class="text-xs text-slate-500 mt-1">
                                <span class="text-red-500 font-medium">Outcome:</span> Real-time synchronous replication with zero compliance risk.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="bg-slate-900 p-6 rounded-xl text-white">
                <h3 class="font-bold mb-4 flex items-center gap-2">
                    <i data-lucide="calendar" class="w-5 h-5"></i>
                    Action Plan
                </h3>
                <div class="space-y-4">
                    <div>
                        <label class="text-xs text-slate-400 uppercase font-bold">Agreed Next Step</label>
                        <input type="text" class="w-full bg-slate-800 border-none rounded mt-1 p-2 text-white placeholder-slate-500 focus:ring-1 focus:ring-red-500" placeholder="e.g., Schedule Workshop with CMS Team">
                    </div>
                    <div>
                        <label class="text-xs text-slate-400 uppercase font-bold">Target Date</label>
                        <input type="date" class="w-full bg-slate-800 border-none rounded mt-1 p-2 text-white focus:ring-1 focus:ring-red-500">
                    </div>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="text-center pt-8 pb-12 text-slate-400 text-sm no-print">
            <p class="mb-2">Positive Momentum | No Nonsense Business Expertise</p>
            <p>Confidential - For Internal Use Only</p>
        </footer>

    </main>

    <script>
        // DOM Loading & Icon Init
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            } else {
                console.error("Lucide library failed to load");
            }
        });

        // Function to handle printing with state preservation
        function handlePrint() {
            // 1. Sync Text Inputs & Date Pickers
            const inputs = document.querySelectorAll('input[type="text"], input[type="date"]');
            inputs.forEach(input => input.setAttribute('value', input.value));

            // 2. Sync Textareas (Critical for print)
            const textareas = document.querySelectorAll('textarea');
            textareas.forEach(textarea => textarea.innerHTML = textarea.value);

            // 3. Sync Checkboxes & Radios
            const checkboxes = document.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            checkboxes.forEach(cb => {
                if (cb.checked) {
                    cb.setAttribute('checked', 'checked');
                } else {
                    cb.removeAttribute('checked');
                }
            });

            // 4. Trigger Print
            window.focus(); // Ensure window has focus for print dialog
            window.print();
        }

        // Auto-expand textareas logic
        const tx = document.getElementsByTagName("textarea");
        for (let i = 0; i < tx.length; i++) {
            tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
            tx[i].addEventListener("input", OnInput, false);
        }

        function OnInput() {
            this.style.height = "auto";
            this.style.height = (this.scrollHeight) + "px";
        }
    </script>
</body>
</html>
