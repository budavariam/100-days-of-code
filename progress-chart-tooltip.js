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

    const click = function (e) { 
        const elem = e.target || e.srcElement;
        const date = elem.getAttribute('data-date');
        const dayNum = elem.getAttribute('data-daynum');
        const targetID = `day-${dayNum}-${date}`
        const targetLink = document.getElementById(targetID)
        if (targetLink) {
            targetLink.scrollIntoView()
        }
        tip.style.display = 'none';
    }
    
    for (let i = 0; i < elems.length; i++) {
        if (elems[i].addEventListener) {
            elems[i].addEventListener('mouseover', mouseOver, false);
            elems[i].addEventListener('mouseout', mouseOut, false);
            elems[i].addEventListener('click', click, false);
        } else {
            elems[i].attachEvent('onmouseover', mouseOver);
            elems[i].attachEvent('onmouseout', mouseOut);
            elems[i].attachEvent('click', click);
        }
    }
}

window.addEventListener('load', function () {
    console.log('Init tooltips')
    tooltipInit();
})