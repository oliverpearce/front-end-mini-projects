const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

document.querySelector("h1").onmouseover = event => {
    let iter = 0;

    const interval = setInterval(() => {
        event.target.innerText = event.target.innerText.split("")
            .map((letter,index) => {

            if (index < iter) {
                return event.target.dataset.value[index];
            }
            
            return letters[Math.floor(Math.random() * 26)]
        })
            .join("");

        if (iter >= event.target.dataset.value.length) clearInterval(interval);

        // changing the denominator determines how many random letters per cycle
        iter += 1 / 2;
    }, 30);
}