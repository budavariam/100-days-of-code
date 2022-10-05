const LIMIT = 10
const BATCH_SIZE = 5

const STATS = [
    { tag: "Language Crossword", days: [34, 35, 36, 39, 41, 42, 43, 44, 47, 48] },
    { tag: "Event Scheduler", days: [12, 26, 27, 28, 29, 30, 31, 32] },
    { tag: "CSS Battle", days: [3, 4, 7, 21, 33, 40, 45] },
    { tag: "100DaysOfCode meta-development", days: [1, 9, 16, 19, 22, 50] },
    { tag: "VSCode Extension", days: [23, 24, 25] },
    { tag: "Learning-Spanish 11ty Site", days: [10, 11, 15] },
    { tag: "Absence Calendar", days: [5, 8] },
    { tag: "FlipperZero", days: [13, 14] },
    { tag: "Kubernetes", days: [17, 18] },
    { tag: "Learning", days: [46] },
    { tag: "TimesheetHelper", days: [37] },
    { tag: "CalendarExport", days: [38] },
    { tag: "P5JS", days: [2] },
    { tag: "Plotly", days: [6] },
    { tag: "Vim", days: [20] },
    { tag: "Hacktoberfest", days: [49] },
]

function createStrike(num) {
    const a = document.createElement('a')
    a.classList.toggle("day")
    // NOTE: href is fake, just here for showing a proper url
    a.setAttribute('href', `#day-${num}`); 
    a.setAttribute('title', `Day ${num}`);
    a.innerHTML = "|";
    a.addEventListener('click', function (e) {
        e.preventDefault()
        const node = document.querySelector(`[id^="day-${num}-"]`);
        if (node) {
            node.scrollIntoView()
        }
        return false
    })
    return a
}

function createStrikeGroup(items) {
    const group = document.createElement('span')
    group.classList.toggle("strike-group")
    // a.setAttribute('href',`#`);
    items.forEach(a => group.appendChild(a))
    // debugger
    return group
}

function createStats(arr) {
    let ul = document.createElement('ol')
    arr.filter((_, i) => { return i < LIMIT}).forEach(function (item) {
        let li = document.createElement('li')
        const strikes = item.days
            .map((dayNum) => createStrike(dayNum))
            .reduce((acc, curr, i) => {
                const lastBatch = (i % BATCH_SIZE !== 0) ? acc.pop() : []
                lastBatch.push(curr)
                acc.push(lastBatch)
                return acc
            }, [])
            .map(createStrikeGroup)
        li.innerHTML = `${item.tag}: `
        strikes.forEach(child => li.appendChild(child))
        ul.appendChild(li)
    });
    return ul
}

function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

window.addEventListener('load', function () {
    console.log('Init day50 stats')
    try {
        const statsHTML = createStats(STATS)
        const appendTo = document.getElementById("halfway-point")
        if (appendTo) {
            insertAfter(appendTo, statsHTML)
        }
    } catch (err) {
        console.error(err)
    }
})