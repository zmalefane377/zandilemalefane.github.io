document.addEventListener('DOMContentLoaded', function() {
    // For debugging
    console.log('Component loader initialized');
    
    // Check for path issues - this should appear on the console
    console.log('Current page URL:', window.location.href);
    console.log('Base path:', window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1));
    
    // Load all components with the data-component attribute
    const componentElements = document.querySelectorAll('[data-component]');
    console.log('Found component elements:', componentElements.length);
    
    componentElements.forEach(element => {
        const componentName = element.getAttribute('data-component');
        console.log('Loading component:', componentName);
        
        // Get base URL to handle various hosting scenarios
        const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
        const componentUrl = `${basePath}includes/${componentName}.html`;
        console.log('Loading component from:', componentUrl);
        
        fetch(componentUrl)
            .then(response => {
                console.log(`Response for ${componentName}:`, response.status);
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${componentName}`);
                }
                return response.text();
            })
            .then(html => {
                element.innerHTML = html;
                console.log(`Component ${componentName} loaded successfully`);
                
                // Hide fallback content when components start loading
                const fallback = document.getElementById('fallback-content');
                if (fallback) fallback.style.display = 'none';
            })
            .catch(error => {
                console.error(error);
                element.innerHTML = `<p style="color: red;">Error loading component: ${componentName}</p>`;
            });
    });

    // Handle content loading
    setTimeout(function loadContent() {
        const contentElements = document.querySelectorAll('[data-content]');
        console.log('Found content elements:', contentElements.length);
        const contentContainer = document.getElementById('content-container');
        console.log('Content container found:', !!contentContainer);
        
        if (contentElements.length > 0 && contentContainer) {
            contentElements.forEach(element => {
                const contentName = element.getAttribute('data-content');
                console.log('Loading content:', contentName);
                
                // Get base URL to handle various hosting scenarios
                const basePath = window.location.origin + window.location.pathname.substring(0, window.location.pathname.lastIndexOf('/') + 1);
                const contentUrl = `${basePath}includes/${contentName}.html`;
                console.log('Loading content from:', contentUrl);
                
                fetch(contentUrl)
                    .then(response => {
                        console.log(`Response for ${contentName}:`, response.status);
                        if (!response.ok) {
                            throw new Error(`Failed to load content: ${contentName}`);
                        }
                        return response.text();
                    })
                    .then(html => {
                        contentContainer.innerHTML = html;
                        element.style.display = 'none'; // Hide the content loader element
                        console.log(`Content ${contentName} loaded successfully`);
                    })
                    .catch(error => {
                        console.error(error);
                        contentContainer.innerHTML = `<p style="color: red;">Error loading content: ${contentName}</p>`;
                    });
            });
        } else if (contentElements.length > 0) {
            // Content container not found yet, retry after a delay
            console.log('Content container not found yet, retrying in 100ms');
            setTimeout(loadContent, 100);
        }
    }, 300); // Increased initial delay
}); 