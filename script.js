let currentScreen = 1;
let loaderInterval = null;
let finalSequenceRunning = false;
let terminalRunning = false;

function goToScreen(screenNumber) {
    const currentActive = document.querySelector('.screen.active');
    if (currentActive) currentActive.classList.remove('active');

    const nextScreen = document.getElementById(`screen-${screenNumber}`);
    if (nextScreen) {
        nextScreen.classList.add('active');
        currentScreen = screenNumber;
        handleScreenTriggers(screenNumber);
    }
}

function handleScreenTriggers(screenNum) {
    if (screenNum === 1) runLoader();
    if (screenNum === 16) runWordCloud();
    if (screenNum === 17) runFinalLetterSequence();
    if (screenNum === 18) startLuxuryGiftScene();
}

function runLoader() {
    const bar = document.getElementById('loading-bar-fill');
    const txt = document.getElementById('loading-text');
    if (!bar || !txt) return;

    if (loaderInterval) clearInterval(loaderInterval);

    bar.style.width = '0%';
    txt.innerText = "Loading Memories...";

    const phases = [
        { p: '15%', t: 'Finding the cutest birthday girl...' },
        { p: '40%', t: 'Collecting smiles...' },
        { p: '65%', t: 'Adding lots of love...' },
        { p: '85%', t: 'Wrapping your surprise...' },
        { p: '100%', t: 'Almost there Betuuuu...' }
    ];

    let index = 0;
    loaderInterval = setInterval(() => {
        if (index < phases.length) {
            bar.style.width = phases[index].p;
            txt.innerText = phases[index].t;
            index++;
        } else {
            clearInterval(loaderInterval);
            loaderInterval = null;
            setTimeout(() => goToScreen(2), 600);
        }
    }, 1000);
}

function startLuxuryGiftScene() {
    const gift = document.getElementById('luxury-gift');
    const crystal = document.getElementById('crystal-heart');
    const prompt = document.getElementById('memory-prompt');
    const voiceMagic = document.getElementById('voice-magic');
    const giftLetter = document.getElementById('gift-letter');
    const voice = document.getElementById('memory-voice');

    if (!gift || !crystal || !prompt) return;

    gift.classList.remove('open');
    crystal.classList.remove('show');
    crystal.style.opacity = '';
    prompt.classList.remove('show');
    if (voiceMagic) voiceMagic.classList.remove('show');
    if (giftLetter) giftLetter.classList.remove('show');
    if (voice) {
        voice.pause();
        voice.currentTime = 0;
    }

    setTimeout(() => gift.classList.add('open'), 1700);
    setTimeout(() => {
    crystal.classList.add('show');
    celebrate();
}, 2600);
    setTimeout(() => prompt.classList.add('show'), 3800);
}

function playMemoryVoice() {
    const voice = document.getElementById('memory-voice');
    const prompt = document.getElementById('memory-prompt');
    const voiceMagic = document.getElementById('voice-magic');

    if (!voice) {
        alert("Voice audio element not found.");
        return;
    }

    if (prompt) prompt.classList.remove('show');

    if (voiceMagic) {
        voiceMagic.classList.add('show');
        voiceMagic.innerHTML = "<p>Just listen... 🥹</p>";
    }

    voice.currentTime = 0;

    voice.play()
        .then(() => {
            voice.onended = () => {
                setTimeout(showGiftLetterAfterVoice, 1000);
            };
        })
        .catch(() => {
            if (voiceMagic) {
                voiceMagic.innerHTML = "<p>Voice note could not play 😭<br>Try converting it to MP3 if this still happens.</p>";
            }
        });
}

function showGiftLetterAfterVoice() {
    const voiceMagic = document.getElementById('voice-magic');
    const crystal = document.getElementById('crystal-heart');
    const giftLetter = document.getElementById('gift-letter');

    if (voiceMagic) voiceMagic.classList.remove('show');
    if (crystal) crystal.style.opacity = '0';
    if (giftLetter) giftLetter.classList.add('show');
}

function chooseFavoritePerson(person) {
    const warning = document.getElementById('favorite-warning');
    const backBtn = document.getElementById('favorite-back');

    if (person === 'heet') {
        goToScreen(5);
        return;
    }

    if (warning && backBtn) {
        warning.style.display = 'block';
        warning.innerText = "Ahem ahem... wrong answer madam 😂 Birthday website locked until you choose the correct person ❤️";
        backBtn.style.display = 'inline-block';
    }
}

function resetFavoriteQuestion() {
    const warning = document.getElementById('favorite-warning');
    const backBtn = document.getElementById('favorite-back');

    if (warning) {
        warning.style.display = 'none';
        warning.innerText = '';
    }

    if (backBtn) backBtn.style.display = 'none';
}

const runAwayBtn = document.getElementById('someone-else-btn');

if (runAwayBtn) {
    function moveRunawayButton(event) {
        event.preventDefault();

        const btnWidth = runAwayBtn.offsetWidth;
        const btnHeight = runAwayBtn.offsetHeight;
        const padding = 25;
        const maxX = Math.max(window.innerWidth - btnWidth - padding, padding);
        const maxY = Math.max(window.innerHeight - btnHeight - padding, padding);
        const randomX = Math.floor(Math.random() * (maxX - padding + 1)) + padding;
        const randomY = Math.floor(Math.random() * (maxY - padding + 1)) + padding;

        runAwayBtn.style.position = 'fixed';
        runAwayBtn.style.left = `${randomX}px`;
        runAwayBtn.style.top = `${randomY}px`;
        runAwayBtn.style.zIndex = '50';
    }

    ['mouseenter', 'touchstart', 'click'].forEach((triggerEvent) => {
        runAwayBtn.addEventListener(triggerEvent, moveRunawayButton);
    });
}

function triggerJoke() {
    const heading = document.getElementById('joke-text');
    const btn = document.getElementById('joke-btn');
    if (!heading || !btn) return;

    heading.parentElement.style.transform = 'scale(0.92)';

    setTimeout(() => {
        heading.innerHTML = "Okay okay 😂❤️ <br><br> BLACK & PINK!!";
        heading.style.color = "var(--pink-glow)";
        heading.parentElement.style.borderColor = "var(--pink-glow)";
        heading.parentElement.style.transform = 'scale(1)';
        btn.innerText = "Continue ➔";
        btn.onclick = () => goToScreen(13);
    }, 1500);
}

function runWordCloud() {
    const words = document.querySelectorAll('.word');
    words.forEach((word) => word.classList.remove('show'));

    words.forEach((word, index) => {
        setTimeout(() => {
            word.classList.add('show');

            if (index === words.length - 1) {
                setTimeout(() => goToScreen(17), 2500);
            }
        }, index * 1000);
    });
}

function runFinalLetterSequence() {
    if (finalSequenceRunning) return;
    finalSequenceRunning = true;

    const container = document.getElementById('story-text');
    if (!container) return;

    const lines = [
        "Kai thyu che...? 🥹❤️",
        "Bas em j... check karvu hatu ke mari Betuuuu smile kare che ke nai.",
        "Some people become a chapter... You became Home.",
        "Thank you for making these last few months beautiful.",
        "See you on our next walk... Someday. 🚶🤍",
        "Happy Birthday\nMy Betuuuu ❤️\n\nMade with lots of love,\n— Your Heet 🫶"
    ];

    container.innerText = "";
    let currentLineIndex = 0;

    function printLine() {
        if (currentLineIndex < lines.length) {
            container.style.opacity = 0;

            setTimeout(() => {
                container.innerText = lines[currentLineIndex];
                container.style.opacity = 1;
                currentLineIndex++;

                const displayTimeout = currentLineIndex === lines.length ? 5000 : 3500;
                setTimeout(printLine, displayTimeout);
            }, 500);
        } else {
            goToSecretOutro();
        }
    }

    printLine();
}

function goToSecretOutro() {
    const currentActive = document.querySelector('.screen.active');
    const secretScreen = document.getElementById('secret-outro-screen');

    if (currentActive) currentActive.classList.remove('active');

    if (secretScreen) {
        secretScreen.classList.add('active');
        runSecretTerminalOutro();
    }
}

function runSecretTerminalOutro() {
    if (terminalRunning) return;
    terminalRunning = true;

    const outputSpan = document.getElementById('secret-typing');
    const smileBtn = document.getElementById('smile-back-btn');
    const closeBtn = document.getElementById('close-world-btn');
    const textToType = "Thank you for opening this little world I made for you. ❤️";

    if (!outputSpan) return;

    let charIndex = 0;
    outputSpan.innerText = "";

    if (smileBtn) smileBtn.style.display = "none";
    if (closeBtn) closeBtn.style.display = "none";

    function typeChar() {
        if (charIndex < textToType.length) {
            outputSpan.innerText += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(typeChar, 75);
        } else {
            setTimeout(() => {
                if (smileBtn) {
                    smileBtn.style.display = "block";
                    smileBtn.style.animation = "buttonPulse 2s infinite";
                }
                if (closeBtn) closeBtn.style.display = "block";
            }, 1000);
        }
    }

    setTimeout(typeChar, 1200);
}

function closeLittleWorld() {
    const closeNote = document.getElementById('close-note');
    alert("This little world will always stay here whenever you want to smile again ❤️");
    window.open('', '_self');
    window.close();

    if (closeNote) closeNote.style.display = 'block';
}

function triggerSmileFinish() {
    const smile = document.createElement('div');
    smile.classList.add('floating-smile');
    smile.innerText = '😊';
    document.body.appendChild(smile);

    setTimeout(() => {
        smile.remove();
        alert("Smile sent! Happy Birthday! 🎉");
    }, 2500);
}

const track = document.getElementById('bg-music');
const toggler = document.getElementById('music-toggle');
const eqAnim = document.getElementById('equalizer-animation');

if (toggler && track && eqAnim) {
    toggler.addEventListener('click', () => {
        if (track.paused) {
            track.play().catch(() => console.log("Audio playback needs one user tap."));
            eqAnim.classList.add('playing');
            toggler.innerText = "⏸ Pause";
        } else {
            track.pause();
            eqAnim.classList.remove('playing');
            toggler.innerText = "🎵 Play";
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    goToScreen(1);
});
// ===== PREMIUM CONFETTI =====
function celebrate() {

    confetti({
        particleCount: 180,
        spread: 100,
        origin: { y: 0.6 }
    });

    setTimeout(() => {
        confetti({
            particleCount: 120,
            angle: 60,
            spread: 80,
            origin: { x: 0 }
        });

        confetti({
            particleCount: 120,
            angle: 120,
            spread: 80,
            origin: { x: 1 }
        });
    }, 400);

}