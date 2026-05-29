window.addEventListener("load", () => {
    let turnXBtn = document.querySelector(".x");
    let turnOBtn = document.querySelector(".o");

    if (!turnXBtn || !turnOBtn) return; // Not on selectTurns.html

    turnXBtn.addEventListener("click", () => {
        localStorage.setItem('playerSymbol', 'X');
        window.location.href = 'single.html';
    });

    turnOBtn.addEventListener("click", () => {
        localStorage.setItem('playerSymbol', 'O');
        window.location.href = 'single.html';
    });
});