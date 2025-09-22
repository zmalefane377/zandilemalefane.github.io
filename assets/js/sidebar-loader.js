// Universal Sidebar Loader for all pages
document.addEventListener('DOMContentLoaded', function() {
    console.log('Universal sidebar loader initialized');
    
    function loadSidebar() {
        const sidebarContainer = document.getElementById('sidebar');
        if (!sidebarContainer) {
            console.error('Sidebar container not found');
            return;
        }
        
        // Show loading state
        sidebarContainer.innerHTML = `
            <div class="inner">
                <p>Loading sidebar...</p>
            </div>
        `;
        
        // Load sidebar.html
        fetch('sidebar.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load sidebar: ${response.status}`);
                }
                return response.text();
            })
            .then(html => {
                // Inject the sidebar content directly
                sidebarContainer.innerHTML = html;
                console.log('Sidebar loaded successfully');
                
                // Initialize sidebar functionality
                initializeSidebar();
            })
            .catch(error => {
                console.error('Error loading sidebar:', error);
                sidebarContainer.innerHTML = `
                    <div class="inner">
                        <p style="color: red; padding: 20px;">
                            Error loading sidebar. <a href="javascript:location.reload()">Refresh page</a>
                        </p>
                        <!-- Fallback simple navigation -->
                        <nav id="menu">
                            <header class="major">
                                <h2>Menu</h2>
                            </header>
                            <ul>
                                <li><a href="index.html">Homepage</a></li>
                                <li><a href="week1.html">Week 1</a></li>
                                <li><a href="week2.html">Week 2</a></li>
                                <li><a href="about.html">About</a></li>
                            </ul>
                        </nav>
                    </div>
                `;
            });
    }
    
    function initializeSidebar() {
        // Initialize menu openers (dropdown functionality)
        const menuOpeners = document.querySelectorAll('#menu .opener');
        menuOpeners.forEach(opener => {
            // Set initial state - hide submenus by default
            const submenu = opener.nextElementSibling;
            if (submenu && submenu.tagName === 'UL') {
                submenu.style.display = 'none';
            }
            
            opener.addEventListener('click', function(event) {
                event.preventDefault();
                
                // Toggle active class
                this.classList.toggle('active');
                
                // Toggle the submenu
                const submenu = this.nextElementSibling;
                if (submenu && submenu.tagName === 'UL') {
                    if (this.classList.contains('active')) {
                        submenu.style.display = 'block';
                    } else {
                        submenu.style.display = 'none';
                    }
                }
            });
        });
        
        // Mobile sidebar toggle functionality
        initializeMobileToggle();
        
        console.log('Sidebar functionality initialized');
    }
    
    function initializeMobileToggle() {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;
        
        // Create toggle button if it doesn't exist
        if (!sidebar.querySelector('.toggle')) {
            const toggleButton = document.createElement('a');
            toggleButton.href = '#sidebar';
            toggleButton.className = 'toggle';
            toggleButton.innerHTML = 'Toggle';
            toggleButton.style.display = 'none';
            
            toggleButton.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
                sidebar.classList.toggle('inactive');
            });
            
            sidebar.appendChild(toggleButton);
        }
        
        // Handle responsive behavior
        function handleResponsive() {
            const toggleButton = sidebar.querySelector('.toggle');
            if (!toggleButton) return;
            
            if (window.innerWidth <= 980) { // Mobile/tablet
                toggleButton.style.display = 'block';
                sidebar.classList.add('inactive'); // Start with sidebar hidden on mobile
            } else { // Desktop
                toggleButton.style.display = 'none';
                sidebar.classList.remove('inactive'); // Always show on desktop
            }
        }
        
        // Initial check
        handleResponsive();
        
        // Check on resize
        window.addEventListener('resize', handleResponsive);
        
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(event) {
            if (window.innerWidth <= 980 && 
                !sidebar.contains(event.target) && 
                !event.target.classList.contains('toggle')) {
                sidebar.classList.add('inactive');
            }
        });
        
        // Prevent sidebar clicks from closing the sidebar
        sidebar.addEventListener('click', function(event) {
            if (window.innerWidth <= 980) {
                event.stopPropagation();
            }
        });
    }
    
    // Start loading the sidebar
    loadSidebar();
});