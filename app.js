const buzzwords = [
    "Synergy", "Circle Back", "Deep Dive", "Low-Hanging Fruit", "Move the Needle",
    "Take It Offline", "Loop In", "Bandwidth", "Pivot", "Touch Base",
    "On My Radar", "Game Changer", "Pain Point", "Double Down", "Unpack",
    "Drill Down", "Alignment", "Scalable", "Ecosystem", "North Star",
    "Actionable", "End of Day", "Stakeholder", "Deliverable", "Buy-In",
    "Run It Up the Flagpole", "Boil the Ocean", "Wheelhouse", "Value Add", "Net-Net",
    "Ping Me", "Circle the Wagons", "Quick Win", "Paradigm Shift", "Core Competency",
    "Best Practice", "Thought Leader", "Agile", "30,000 Foot View", "Disruptor",
    "Onboard", "Offboard", "Cross-Functional", "Key Takeaway", "Let's Park That",
    "Bottom Line", "Cadence", "Granular", "Moving Forward", "Optics",
    "Reach Out", "Rightsizing", "Rubber Stamp", "Silo", "Table This",
    "Tiger Team", "Turnkey", "Win-Win", "Rock Star", "Ninja",
    "Empower", "At the End of the Day", "Think Outside the Box", "On the Same Page",
    "Bleeding Edge", "Disrupt", "Hustle", "Lean In", "Open the Kimono",
    "Push Back", "Swim Lane", "Use Case", "Vertical", "Pipeline"
];

let board = [];
let marked = [];
let gameWon = false;

function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function newCard() {
    gameWon = false;
    const shuffled = shuffle(buzzwords).slice(0, 24);
    board = [...shuffled.slice(0, 12), "FREE SPACE", ...shuffled.slice(12)];
    marked = Array(25).fill(false);
    marked[12] = true; // Free space

    render();
    document.getElementById('status').textContent = '';
    document.getElementById('status').className = 'status';
    document.getElementById('confetti').innerHTML = '';
}

function render() {
    const el = document.getElementById('board');
    el.innerHTML = board.map((word, i) => {
        let cls = 'cell';
        if (i === 12) cls += ' free marked';
        else if (marked[i]) cls += ' marked';
        return `<div class="${cls}" onclick="toggle(${i})">${word}</div>`;
    }).join('');
}

function toggle(i) {
    if (gameWon || i === 12) return;
    marked[i] = !marked[i];
    render();
    checkBingo();
}

function checkBingo() {
    const lines = [
        [0,1,2,3,4],[5,6,7,8,9],[10,11,12,13,14],[15,16,17,18,19],[20,21,22,23,24], // rows
        [0,5,10,15,20],[1,6,11,16,21],[2,7,12,17,22],[3,8,13,18,23],[4,9,14,19,24], // cols
        [0,6,12,18,24],[4,8,12,16,20] // diags
    ];

    for (const line of lines) {
        if (line.every(i => marked[i])) {
            gameWon = true;
            const cells = document.querySelectorAll('.cell');
            line.forEach(i => cells[i].classList.add('bingo-cell'));
            document.getElementById('status').textContent = '🎉 BINGO! You win!';
            document.getElementById('status').className = 'status won';
            launchConfetti();
            return;
        }
    }
}

function launchConfetti() {
    const container = document.getElementById('confetti');
    const colours = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899'];
    for (let i = 0; i < 100; i++) {
        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.background = colours[Math.floor(Math.random() * colours.length)];
        piece.style.animationDelay = Math.random() * 2 + 's';
        piece.style.animationDuration = (2 + Math.random() * 2) + 's';
        piece.style.width = (6 + Math.random() * 8) + 'px';
        piece.style.height = (6 + Math.random() * 8) + 'px';
        container.appendChild(piece);
    }
    setTimeout(() => container.innerHTML = '', 5000);
}

// Start
newCard();
