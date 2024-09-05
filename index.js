function init() {
    let res_elm = document.createElement("div");
    res_elm.innerHTML = "Hello, I am Aco. How can I help you?";
    res_elm.setAttribute("class", "left");

    document.getElementById('msg').appendChild(res_elm);
}

document.getElementById('reply').addEventListener("click", async (e) => {
    e.preventDefault();

    var req = document.getElementById('msg_send').value;

    if (req === undefined || req === "") {
        return; // Do nothing if input is empty
    }

    var res = "";
    try {
        // Sending a request to the chatbot API
        await axios.get(`https://api.monkedev.com/fun/chat?msg=${req}`).then(data => {
            res = data.data.response;
        });

        // Displaying user's message
        let userMessage = document.createElement('div');
        userMessage.innerHTML = req;
        userMessage.setAttribute("class", "right");

        // Displaying chatbot's response
        let botMessage = document.createElement('div');
        botMessage.innerHTML = res;
        botMessage.setAttribute("class", "left");

        let messageContainer = document.getElementById('msg');
        messageContainer.appendChild(userMessage);
        messageContainer.appendChild(botMessage);

        document.getElementById('msg_send').value = ""; // Clear input box

        // Scroll to the bottom of the message container
        messageContainer.scrollTop = messageContainer.scrollHeight;
    } catch (error) {
        console.error("Error fetching chatbot response:", error);
    }
});
