console.log("MailMinded AI - Content Script Loaded");

function createAiButton() {
}

function findComposeToolbar() {
}

function injectMailMindedButton() {
    const existingButton = document.querySelector('.mailminded-ai-button');
    if (existingButton) existingButton.remove(); 

    const toolBar = findComposeToolbar();
    if (!toolBar) {
        console.log("Compose toolbar not found, retrying...");
        return;
    }
    console.log("Compose toolbar found, injecting button.");
    const button = createAiButton();
    button.classList.add('mailminded-ai-button');

    button.addEventListener('click', async () => {
        console.log("MailMinded AI button clicked.");    
        }
    );
    toolBar.insertBefore(button, toolBar.firstChild); 

}

const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasComposeElement = addedNodes.some((node) => {
            node.nodeType === Node.ELEMENT_NODE && (node.matches('.aDh, .btC, [role="dialog"]') || node.querySelector('.aDh, .btC, [role="dialog"]'));}
        );
        if (hasComposeElement) {
            console.log("Compose element detected, injecting MailMinded AI button.");
            setTimeout(injectMailMindedButton, 500); 
        }
    } 

});

observer.observe(document.body, {
    childList: true,
    subtree: true
})