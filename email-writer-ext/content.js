console.log("MailMinded AI - Content Script Loaded");

function createAiButton() {
    const button = document.createElement('div');
    button.className = 'T-I J-J5-Ji ao0 v7 T-I-atl L3';
    button.style.marginRight = '8px';
    button.innerHTML = 'AI Reply';
    button.setAttribute('role', 'button');
    button.setAttribute('data-tooltip', 'Generate AI Reply');
    return button;
}

function getEmailContent() {
    const selectors = [
        '.h7',
        '.a3s.aiL',
        '.gmail_quote',
        '[role="presentation"]',
    ];
    for (const selector of selectors) {
        const content = document.querySelector(selector);
        if (content){
            return content.innerText.trim();
        }
        return '';
    }
}


function findComposeToolbar() {
    const selectors = [
        '.btC',
        '.aDh',
        '[role="dialog"]',
        '.gU.Up'
    ];
    for (const selector of selectors) {
        const toolBar = document.querySelector(selector);
        if (toolBar){
            return toolBar;
        }
        return null;
    }
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
        try{
            button.innerHTML = 'Generating...';
            button.setAttribute('disabled', 'true');    

            const emailContent =  getEmailContent();

            await fetch('http://localhost:8080/api/email/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    emailContent: emailContent,
                    tone : 'professional'})
            });

            if(!Response.ok) {
                throw new Error('API request failed');
            }

            const generatedReply = await response.text();
            const composeArea = document.querySelector('[role="textbox"],[g_editable="true"]');
            if (composeArea) {
                composeArea.focus();
                document.execCommand('insertText', false, generatedReply);
            } else {
                console.error("Compose area not found.");
            }
        } catch (error) {
            console.error("Error generating AI reply:", error); 
            alert("Error generating AI reply. Please try again later.");
        } finally {
            button.innerHTML = 'AI Reply';
            button.disabled = false;
        }
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