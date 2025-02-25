document.addEventListener("DOMContentLoaded", function () {
    const fortuneButton = document.getElementById("fortuneButton");
    const resetButton = document.getElementById("resetButton");
    const fortuneResult = document.getElementById("fortuneResult");
    const shareButtons = document.getElementById("shareButtons");
    const customMessage = document.getElementById("customMessage");
    const copyLinkButton = document.getElementById("copyLink");

    const fortunes = [
        "大吉 (Daikichi): Great Blessing!",
        "中吉 (Chūkichi): Middle Blessing.",
        "小吉 (Shōkichi): Small Blessing.",
        "吉 (Kichi): Blessing.",
        "末吉 (Suekichi): Future Blessing.",
        "凶 (Kyō): Misfortune.",
        "大凶 (Daikyō): Great Misfortune."
    ];

    function getRandomFortune() {
        return fortunes[Math.floor(Math.random() * fortunes.length)];
    }

    function updateShareLinks(fortuneText) {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareText = encodeURIComponent(customMessage.value || `My Japanese Fortune: ${fortuneText} - Try it out!`);

        document.getElementById("twitterShare").href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`;
        document.getElementById("instagramShare").href = `https://www.instagram.com/?text=${shareText}`;
        document.getElementById("linkedinShare").href = `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`;
        document.getElementById("redditShare").href = `https://www.reddit.com/submit?url=${shareUrl}&title=${shareText}`;
    }

    function showFortune() {
        if (localStorage.getItem("fortuneGiven")) {
            alert("You have already received your fortune! You can’t try again.");
            return;
        }

        const randomFortune = getRandomFortune();
        fortuneResult.textContent = randomFortune;
        fortuneResult.classList.add("show");

        shareButtons.style.display = "block";
        updateShareLinks(randomFortune);

        fortuneButton.style.display = "none";
        resetButton.style.display = "block";

        // Store in localStorage so the user can't get another fortune
        localStorage.setItem("fortuneGiven", "true");
        localStorage.setItem("fortuneText", randomFortune);
    }

    function resetFortune() {
        alert("You cannot reset your fortune. You can only check it once!");
    }

    customMessage.addEventListener("input", () => updateShareLinks(fortuneResult.textContent));
    
    copyLinkButton.addEventListener("click", () => {
        const shareText = customMessage.value || `My Japanese Fortune: ${fortuneResult.textContent} - Try it out!`;
        navigator.clipboard.writeText(`${shareText} ${window.location.href}`).then(() => {
            alert("Link copied to clipboard!");
        });
    });

    // Check if user already got a fortune
    if (localStorage.getItem("fortuneGiven")) {
        fortuneResult.textContent = localStorage.getItem("fortuneText");
        fortuneResult.classList.add("show");
        shareButtons.style.display = "block";
        fortuneButton.style.display = "none";
        resetButton.style.display = "block";
    }

    fortuneButton.addEventListener("click", showFortune);
    resetButton.addEventListener("click", resetFortune);
});
