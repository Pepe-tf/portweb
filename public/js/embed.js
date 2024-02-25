const embed = {
    title: 'Welcome to My Website!',
    description: 'This is a Discord-like embed message for my website.',
    color: '#3498db', // You can use hex color codes or color names
    timestamp: new Date(),
    footer: {
        text: 'My Website',
    },
};

// Create an HTML structure for the embed
const embedHtml = `
    <div style="border: 1px solid #ccc; border-radius: 5px; padding: 10px; max-width: 400px;">
        <h2 style="color: ${embed.color};">${embed.title}</h2>
        <p>${embed.description}</p>
        <div style="color: #777; font-size: smaller; margin-top: 10px;">
            <span>${embed.timestamp.toLocaleString()}</span>
            <span style="float: right;">${embed.footer.text}</span>
        </div>
    </div>
`;

// Display the embed in the container
document.getElementById('discord-like-embed').innerHTML = embedHtml;