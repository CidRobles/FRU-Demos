/*
 * GENESYS Chat Messenger
 * ======================
 * Embed the chat messenger widget on Compassion Website. This file will only create Chat Icon button, Initial form for
 * end-users data, trigger for the chat. The rest of the Chat feature is managed by Genesys code and Dash board.
 */

dKey = cmpsnWebMessenger.dKey; // Deployment Key
pEnv = cmpsnWebMessenger.pEnv; // Production Key

// Initial form screen.
const container = document.createElement('form');
container.style.position = 'fixed';
container.style.bottom = '20px';
container.style.right = '20px';
container.style.width = '300px';
container.style.background = 'white';
container.style.border = '1px solid #ccc';
container.style.borderRadius = '8px';
container.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
container.style.fontFamily = 'Arial, sans-serif';
container.style.padding = '16px';
container.style.zIndex = '1000';
container.style.display = "none";

// Chat form title
const title = document.createElement('h3');
title.textContent = 'Chat with a member of our support team';
title.style.marginTop = '0';
title.style.fontSize = '16px';
container.appendChild(title);

function createInput(labelText,type,require,name,id) {
    const wrapper = document.createElement('div');
    wrapper.style.marginBottom = '10px';

    const input = document.createElement('input');
    input.type = type;
    input.style.width = '100%';
    input.style.padding = '8px';
    input.style.marginTop = '4px';
    input.style.boxSizing = 'border-box';
    input.name = name;
    input.id = id;
    if(require === true) input.required = true;
    input.placeholder = labelText;

    wrapper.appendChild(input);
    return wrapper;
};

// Input fields for the form.
container.appendChild(createInput('First Name (Required)', 'text', true,'chatMessengerFName','chatMessengerFName'));
container.appendChild(createInput('Last Name (Required)', 'text', true,'chatMessengerLName','chatMessengerLName'));
container.appendChild(createInput('Email (Optional)', 'email',false,'chatMessengerEmail','chatMessengerEmail'));
container.appendChild(createInput('Supporter number (Optional)', 'text',false,'chatMessengerSupporterNumber','chatMessengerSupporterNumber'));

const buttonWrapper = document.createElement('div');
buttonWrapper.style.display = 'flex';
buttonWrapper.style.justifyContent = 'space-between';

// Cancel Button
const cancelBtn = document.createElement('button');
cancelBtn.textContent = 'Cancel';
cancelBtn.style.backgroundColor = '#ccc';
cancelBtn.style.padding = '8px 12px';
cancelBtn.style.border = 'none';
cancelBtn.style.borderRadius = '4px';
cancelBtn.style.cursor = 'pointer';
cancelBtn.id = "cnclButton";
cancelBtn.style.position = "fixed";
cancelBtn.style.right = "50px";
cancelBtn.style.bottom = "40px";
cancelBtn.style.display = "none";
cancelBtn.style.zIndex = "1001";
cancelBtn.onclick = () => {
    container.style.display = "none";
    startChat.style.display = "block";
    cancelBtn.style.display = "none";
    location.reload(true);
};

// Start Button
const startBtn = document.createElement('button');
startBtn.textContent = 'Start Chat';
startBtn.style.backgroundColor = '#f4c542';
startBtn.style.color = '#000';
startBtn.style.padding = '8px 12px';
startBtn.style.border = 'none';
startBtn.style.borderRadius = '4px';
startBtn.style.cursor = 'pointer';
startBtn.id = "strtBtn";

document.body.appendChild(cancelBtn);
buttonWrapper.appendChild(startBtn);
container.appendChild(buttonWrapper);

// Chat Button
startChat = document.createElement("button");
startChat.id = "start-chat";
startChat.style.border = "0px solid";
startChat.type = "button";
startChat.style.position = "fixed";
startChat.style.right = "5px";
startChat.style.bottom = "5px";
startChat.style.zIndex = "99999";
startChat.style.cursor = "pointer";
startChat.onclick = () => {
    container.style.display = 'block';
    startChat.style.display = 'none';
    cancelBtn.style.display = 'block';
};

// Chat Messenger Icon
startImg = document.createElement("img");
startImg.src = "https://raw.githubusercontent.com/createDiv1/Genesys-Cloud-Message-Form/refs/heads/main/createDIV1Form/img/downButton.png";
startImg.style.width = "56px";
startImg.style.height = "auto";
startImg.alt = "Start Chat";
startImg.style.border = "0px solid";
startChat.appendChild(startImg);


document.body.appendChild(container);
document.body.appendChild(startChat);

// Submit the initial form from end-user to Supporter Services (Agent).
container.addEventListener("submit", function(e){
    e.preventDefault();

    const fName = document.getElementById('chatMessengerFName').value;
    const lName = document.getElementById('chatMessengerLName').value;
    const email = document.getElementById('chatMessengerEmail').value;
    const supporterNumber = document.getElementById('chatMessengerSupporterNumber').value;

    container.style.display = "none";
    cancelBtn.style.display = "none";

    (function (g, e, n, es, ys) {
        g['_genesysJs'] = e;
        g[e] = g[e] || function () {
            (g[e].q = g[e].q || []).push(arguments)
        };
        g[e].t = 1 * new Date();
        g[e].c = es;
        ys = document.createElement('script'); ys.async = 1; ys.src = n; ys.charset = 'utf-8'; document.head.appendChild(ys);
    })(window, 'Genesys', 'https://apps.mypurecloud.com/genesys-bootstrap/genesys.min.js', {
        environment: pEnv,
        deploymentId: dKey
    });

    Genesys("subscribe", "Messenger.ready", function () {
        Genesys("subscribe","Database.ready", function(){
            Genesys("command", "Database.update", {
                messaging: {
                    customAttributes: {
                        fName,
                        lName,
                        email,
                        supporterNumber
                    }
                }
            });
        });
        Genesys("command", "Messenger.open");

        Genesys('subscribe','Messenger.closed',function(){
            Genesys('command','Messenger.clear');
            location.reload(true);
        });
    });
});