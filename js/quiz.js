// ============================================
//   ELECTIQ — QUIZ ENGINE
// ============================================

const QUIZ_QUESTIONS = [
  // EASY
  { q: "What does 'EVM' stand for in Indian elections?", options: ["Electronic Voting Machine", "Election Verification Module", "Electoral Value Measure", "Electronic Vote Monitor"], answer: 0, category: "India", difficulty: "easy", explanation: "EVM stands for Electronic Voting Machine, used in Indian elections since 1982." },
  { q: "Who conducts elections in India?", options: ["Parliament of India", "Supreme Court", "Election Commission of India", "Ministry of Home Affairs"], answer: 2, category: "India", difficulty: "easy", explanation: "The Election Commission of India (ECI), established in 1950, is responsible for conducting all elections." },
  { q: "What is the minimum voting age in India?", options: ["16 years", "18 years", "21 years", "25 years"], answer: 1, category: "India", difficulty: "easy", explanation: "The voting age was lowered from 21 to 18 years in India in 1989 via the 61st Constitutional Amendment." },
  { q: "What color is the indelible ink applied to voters' fingers?", options: ["Red", "Blue", "Black", "Green"], answer: 1, category: "India", difficulty: "easy", explanation: "Blue-black indelible ink is applied to the left index finger to prevent double voting. It's made in Mysore by the National Physical Laboratory." },
  { q: "What does NOTA stand for?", options: ["None Of The Accused", "None Of The Applicants", "None Of The Above", "Not Only The Answer"], answer: 2, category: "India", difficulty: "easy", explanation: "NOTA (None Of The Above) was introduced in 2013 after a Supreme Court ruling, allowing voters to reject all candidates." },

  // MEDIUM
  { q: "How many seats are there in the Lok Sabha?", options: ["543", "545", "552", "560"], answer: 0, category: "India", difficulty: "medium", explanation: "There are 543 elected seats in Lok Sabha. Historically 2 Anglo-Indian seats were nominated but were abolished in 2020." },
  { q: "What is VVPAT?", options: ["Verified Vote Paper Audit Trail", "Voter Verifiable Paper Audit Trail", "Voter Verified Paperless Audit Test", "Virtual Vote Paper Authentication Terminal"], answer: 1, category: "India", difficulty: "medium", explanation: "VVPAT (Voter Verifiable Paper Audit Trail) generates a paper slip visible for 7 seconds so voters can verify their vote was cast correctly." },
  { q: "What is the security deposit for a Lok Sabha candidate?", options: ["₹10,000", "₹15,000", "₹25,000", "₹50,000"], answer: 2, category: "India", difficulty: "medium", explanation: "A general category candidate must pay ₹25,000 as security deposit for Lok Sabha. SC/ST candidates pay ₹12,500. It's forfeited if they get less than 1/6th of votes." },
  { q: "The Model Code of Conduct is enforced from:", options: ["Nomination filing date", "Election announcement date", "10 days before polling", "1 month before polling"], answer: 1, category: "India", difficulty: "medium", explanation: "The MCC comes into force immediately upon the announcement of the election schedule by the Election Commission." },
  { q: "Which country uses the Electoral College system?", options: ["United Kingdom", "Germany", "France", "United States"], answer: 3, category: "World", difficulty: "medium", explanation: "The United States uses the Electoral College — 538 electors — where a candidate needs 270 to win the Presidency." },

  // HARD
  { q: "The 'First Past The Post' system means:", options: ["Candidate needs 50%+ votes", "Earliest filing candidate wins", "Candidate with most votes wins (even without majority)", "Voters rank all candidates"], answer: 2, category: "Concepts", difficulty: "hard", explanation: "FPTP means the candidate with the most votes wins the constituency, even without an absolute majority. India and the UK use this system." },
  { q: "In which year were EVMs first used in Indian general elections?", options: ["1989", "1999", "2004", "1984"], answer: 1, category: "India", difficulty: "hard", explanation: "EVMs were first used on a trial basis in 1982 (Kerala by-election) but were used fully across India in the 1999 general elections." },
  { q: "Which constitutional article provides for the Election Commission?", options: ["Article 324", "Article 356", "Article 368", "Article 312"], answer: 0, category: "India", difficulty: "hard", explanation: "Article 324 of the Constitution of India vests the superintendence, direction and control of elections in the Election Commission of India." },
  { q: "What is 'Proportional Representation'?", options: ["Each state gets equal seats", "Seats allocated based on party vote share", "Only major parties represented", "Winner takes all constituencies"], answer: 1, category: "Concepts", difficulty: "hard", explanation: "Proportional Representation ensures parties get seats proportional to their vote share. Used in Germany, Netherlands and for Rajya Sabha elections in India." },
  { q: "What percentage of Lok Sabha seats needed for a simple majority?", options: ["50% + 1 of total seats", "50% + 1 of seats present and voting", "2/3rd of total seats", "1/3rd of total seats"], answer: 1, category: "Concepts", difficulty: "hard", explanation: "A simple majority requires more than 50% of members present and voting. For Lok Sabha this is 272 of 543 total seats if all are present." },
];

let currentDifficulty = 'easy';
let currentQuestions = [];
let currentQIndex = 0;
let score = 0;
let timer = null;
let timeLeft = 20;
let answered = false;
let answeredLog = [];

const difficultyMap = {
  easy: ['easy', 'medium'],
  medium: ['medium', 'hard'],
  hard: ['hard', 'medium']
};

function startQuiz() {
  score = 0;
  currentQIndex = 0;
  answered = false;
  answeredLog = [];

  const pool = QUIZ_QUESTIONS.filter(q => difficultyMap[currentDifficulty].includes(q.difficulty));
  currentQuestions = shuffle(pool).slice(0, 15);

  document.getElementById('quizStart').classList.add('hidden');
  document.getElementById('quizActive').classList.remove('hidden');
  document.getElementById('quizResult').classList.add('hidden');

  loadQuestion();
}

function loadQuestion() {
  if (currentQIndex >= currentQuestions.length) {
    endQuiz();
    return;
  }

  const q = currentQuestions[currentQIndex];
  answered = false;

  document.getElementById('progressText').textContent = `Question ${currentQIndex + 1} of ${currentQuestions.length}`;
  document.getElementById('liveScore').textContent = score;
  document.getElementById('progressFill').style.width = `${(currentQIndex / currentQuestions.length) * 100}%`;
  document.getElementById('qCategory').textContent = q.category;
  document.getElementById('qText').textContent = q.q;

  const optionsGrid = document.getElementById('optionsGrid');
  optionsGrid.innerHTML = '';
  const labels = ['A', 'B', 'C', 'D'];

  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-label">${labels[i]}</span>${opt}`;
    btn.onclick = () => selectAnswer(i, btn);
    optionsGrid.appendChild(btn);
  });

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 20;
  const display = document.getElementById('quizTimer');
  display.textContent = timeLeft;
  display.classList.remove('urgent');

  timer = setInterval(() => {
    timeLeft--;
    display.textContent = timeLeft;

    if (timeLeft <= 5) display.classList.add('urgent');

    if (timeLeft <= 0) {
      clearInterval(timer);
      if (!answered) {
        timeoutQuestion();
      }
    }
  }, 1000);
}

function selectAnswer(selectedIdx, btn) {
  if (answered) return;
  answered = true;
  clearInterval(timer);

  const q = currentQuestions[currentQIndex];
  const allBtns = document.querySelectorAll('.option-btn');

  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
    else if (i === selectedIdx) b.classList.add('wrong');
  });

  const isCorrect = selectedIdx === q.answer;
  if (isCorrect) score++;

  answeredLog.push({ question: q.q, correct: isCorrect, explanation: q.explanation });

  setTimeout(() => {
    currentQIndex++;
    loadQuestion();
  }, 1600);
}

function timeoutQuestion() {
  answered = true;
  const q = currentQuestions[currentQIndex];
  const allBtns = document.querySelectorAll('.option-btn');
  allBtns.forEach((b, i) => {
    b.disabled = true;
    if (i === q.answer) b.classList.add('correct');
  });

  answeredLog.push({ question: q.q, correct: false, explanation: q.explanation });

  setTimeout(() => {
    currentQIndex++;
    loadQuestion();
  }, 1400);
}

function skipQuestion() {
  if (answered) return;
  clearInterval(timer);
  const q = currentQuestions[currentQIndex];
  answeredLog.push({ question: q.q, correct: false, explanation: q.explanation });
  currentQIndex++;
  loadQuestion();
}

function endQuiz() {
  clearInterval(timer);
  document.getElementById('quizActive').classList.add('hidden');
  document.getElementById('quizResult').classList.remove('hidden');

  const pct = Math.round((score / currentQuestions.length) * 100);
  const { emoji, grade, msg } = getGrade(pct);

  document.getElementById('resultEmoji').textContent = emoji;
  document.getElementById('resultGrade').textContent = grade;
  document.getElementById('finalScore').textContent = score;
  document.getElementById('resultMessage').textContent = msg;

  // Animate ring
  const circle = document.getElementById('scoreRingCircle');
  const offset = 314 - (314 * pct) / 100;
  setTimeout(() => {
    circle.style.transition = 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    circle.style.strokeDashoffset = offset;
  }, 200);

  // Breakdown
  const correct = answeredLog.filter(a => a.correct).length;
  const wrong = answeredLog.filter(a => !a.correct).length;
  document.getElementById('resultBreakdown').innerHTML = `
    <div class="breakdown-row"><span>✅ Correct</span><span>${correct}</span></div>
    <div class="breakdown-row"><span>❌ Incorrect / Skipped</span><span>${wrong}</span></div>
    <div class="breakdown-row"><span>📊 Accuracy</span><span>${pct}%</span></div>
    <div class="breakdown-row"><span>🏆 Final Score</span><span>${score}/${currentQuestions.length}</span></div>
  `;
}

function getGrade(pct) {
  if (pct >= 90) return { emoji: '🏆', grade: 'Election Expert!', msg: 'Outstanding! You have an exceptional understanding of elections and democracy.' };
  if (pct >= 75) return { emoji: '🥇', grade: 'Well Informed!', msg: 'Excellent work. You know your elections very well!' };
  if (pct >= 60) return { emoji: '🥈', grade: 'Good Citizen!', msg: 'Good job! A little more study and you\'ll be an expert.' };
  if (pct >= 40) return { emoji: '📚', grade: 'Keep Learning!', msg: 'Not bad, but there\'s room to grow. Check out our glossary!' };
  return { emoji: '🌱', grade: 'Just Starting!', msg: 'Everyone starts somewhere! Explore the Process section to learn more.' };
}

function restartQuiz() {
  document.getElementById('quizResult').classList.add('hidden');
  document.getElementById('quizStart').classList.remove('hidden');
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// Difficulty selector
document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.diff-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentDifficulty = btn.dataset.diff;
  });
});