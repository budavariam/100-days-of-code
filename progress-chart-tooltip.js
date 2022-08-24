function tooltipInit() {
    console.log("Hello tooltip")
    const tip = document.getElementById('tooltip');
    let elems = document.getElementsByClassName('cg-day');
    const mouseOver = function (e) {
        e = e || window.event;
        const elem = e.target || e.srcElement;
        const rect = elem.getBoundingClientRect();
        const count = elem.getAttribute('data-count');
        const date = elem.getAttribute('data-date');
        if (count > 0) {
            tip.style.display = 'block';
            tip.textContent = `${count} impression${count > 1 ? "s" : ""} on ${date}`;
            const w = tip.getBoundingClientRect().width;
            tip.style.left = `${rect.left - (w / 2) + 6}px`;
            tip.style.top = `${rect.top - 35}px`;
        }
    };
    const mouseOut = function (e) {
        e = e || window.event;
        tip.style.display = 'none';
    };
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].addEventListener) {
            elems[i].addEventListener('mouseover', mouseOver, false);
            elems[i].addEventListener('mouseout', mouseOut, false);
        } else {
            elems[i].attachEvent('onmouseover', mouseOver);
            elems[i].attachEvent('onmouseout', mouseOut);
        }
    }
}

window.addEventListener('load', function () {
    console.log('Init tooltips')
    tooltipInit();
})