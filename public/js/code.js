const messages = [
  "Wooow, what are you doing?",
  "Hey there, curious!",
  "Nice try! 😉",
  "Oops, developer tools detected!",
  "You're quite persistent!",
  "Ah, exploring the unknown?",
  "Developer mode activated!",
  "A curious mind you've got!"
];

const ver = {
  v: "v 1.29.3"
}

let index = 0;

function logDiscordStyleMessage() {
  console.clear();
  const currentMessage = messages[index];
  console.log(`%c${ver.v}`, 'color: #fff; background: #7289da; padding: 8px; border-radius: 4px;');
  console.log(`%c${currentMessage}`, 'color: #fff; background: #7289da; padding: 8px; border-radius: 4px;');
  index = (index + 1) % messages.length;
}

setInterval(() => {
  logDiscordStyleMessage();
}, 500); // Log a message every 0.5 seconds

function isDevToolsOpen() {
  return new Promise(resolve => {
      const img = new Image();
      img.onload = function() {
          resolve(false);
      };
      img.onerror = function() {
          resolve(true);
      };
      img.src = 'https://www.google.com/favicon.ico'; // Use a random image to check
  });
}

setInterval(async () => {
  const devToolsOpen = await isDevToolsOpen();
  if (devToolsOpen) {
      logDiscordStyleMessage();
  }
}, 500); // Check every 1 second for dev tools

document.onkeydown = function(e) {
  if (
      e.keyCode == 123 ||
      (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) ||
      (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) ||
      (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) ||
      (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0))
  ) {
      return false;
  }
};

document.addEventListener('contextmenu', event => event.preventDefault());