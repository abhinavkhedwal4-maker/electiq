// ============================================
//   ELECTIQ — NEWS.JS
//   Curated election news + calendar
// ============================================

const NEWS_DATA = [
  {
    id: 1, cat: 'india',
    icon: '🗳️',
    title: 'Election Commission Announces Phase-wise Schedule for Bihar Assembly Elections',
    summary: 'The Election Commission of India has released the detailed schedule for the upcoming Bihar state assembly elections, with polling to be conducted in 5 phases across all 243 constituencies.',
    source: 'ECI Press Release',
    date: '2 hours ago',
    url: 'https://eci.gov.in'
  },
  {
    id: 2, cat: 'india',
    icon: '📋',
    title: 'Model Code of Conduct in Force Across 3 States Ahead of By-elections',
    summary: 'The Model Code of Conduct has been enforced in Uttar Pradesh, Maharashtra and West Bengal as by-elections are scheduled for 12 assembly seats next month.',
    source: 'The Hindu',
    date: '5 hours ago',
    url: '#'
  },
  {
    id: 3, cat: 'india',
    icon: '🖥️',
    title: 'EVM Verification Camps Held Across Districts; Over 2 Lakh Voters Participate',
    summary: 'The Election Commission organized public EVM demonstration camps in over 600 districts to build voter confidence ahead of the general elections.',
    source: 'PIB India',
    date: '1 day ago',
    url: '#'
  },
  {
    id: 4, cat: 'world',
    icon: '🌍',
    title: 'EU Elections See Record Voter Turnout in Eastern Europe',
    summary: 'Preliminary results show voter turnout in Eastern European EU member states reached a decade high during the recent parliamentary elections, with youth voters leading the surge.',
    source: 'Reuters',
    date: '3 hours ago',
    url: '#'
  },
  {
    id: 5, cat: 'world',
    icon: '🏛️',
    title: "Brazil's Supreme Electoral Court Certifies 2026 Presidential Candidates",
    summary: "Brazil's TSE has officially certified the list of presidential candidates for the 2026 elections, with major party registrations complete and campaigning set to begin.",
    source: 'AP News',
    date: '6 hours ago',
    url: '#'
  },
  {
    id: 6, cat: 'policy',
    icon: '📜',
    title: 'New Voter ID Linking with Aadhaar: What It Means for 97 Crore Voters',
    summary: 'The government\'s push to link Voter ID cards with Aadhaar numbers on a voluntary basis aims to eliminate duplicate entries and streamline the electoral roll verification process.',
    source: 'Indian Express',
    date: '8 hours ago',
    url: '#'
  },
  {
    id: 7, cat: 'policy',
    icon: '⚖️',
    title: 'Supreme Court Upholds EVM Integrity, Dismisses Petition for Paper Ballot Return',
    summary: 'The Supreme Court of India dismissed a petition seeking return to paper ballot voting, affirming the technical soundness and security architecture of Electronic Voting Machines.',
    source: 'Bar & Bench',
    date: '2 days ago',
    url: '#'
  },
  {
    id: 8, cat: 'results',
    icon: '📊',
    title: 'Complete Analysis: How Caste Equations Shaped the Recent UP By-poll Results',
    summary: 'Political analysts break down the vote share data, swing percentages and demographic trends that determined the outcome of the recently concluded Uttar Pradesh by-elections.',
    source: 'Mint',
    date: '1 day ago',
    url: '#'
  },
  {
    id: 9, cat: 'india',
    icon: '👥',
    title: 'Voter Registration Drive: 1.5 Crore New Voters Added in First-Time Voter Initiative',
    summary: 'The Election Commission\'s SVEEP program has successfully onboarded 1.5 crore first-time voters aged 18-19 through college campus drives and social media awareness campaigns.',
    source: 'Times of India',
    date: '4 hours ago',
    url: '#'
  },
  {
    id: 10, cat: 'world',
    icon: '🗺️',
    title: 'Nigeria Holds Gubernatorial Elections in 6 States Amid Heavy Security Deployment',
    summary: 'Gubernatorial elections in six Nigerian states proceeded under tight security, with INEC deploying new biometric voter verification systems to prevent double voting.',
    source: 'Al Jazeera',
    date: '12 hours ago',
    url: '#'
  },
  {
    id: 11, cat: 'results',
    icon: '🏆',
    title: 'Delhi MCD Election Results: Ward-wise Breakdown and Swing Analysis',
    summary: 'Comprehensive ward-by-ward analysis of the recent MCD election results shows key swing factors, incumbency impact and the changing urban voting patterns in the capital.',
    source: 'NDTV',
    date: '3 days ago',
    url: '#'
  },
  {
    id: 12, cat: 'policy',
    icon: '💻',
    title: 'Online Voting Pilot to Be Tested for Diaspora in Upcoming State Elections',
    summary: 'The Election Commission is considering a limited pilot program for Indian diaspora voters using secure online voting infrastructure in select states.',
    source: 'Business Standard',
    date: '5 hours ago',
    url: '#'
  }
];

const CALENDAR_DATA = [
  { day: '15', month: 'May', title: 'Bihar Assembly Elections — Phase 1', location: 'Bihar, India', status: 'upcoming' },
  { day: '22', month: 'May', title: 'Bihar Assembly Elections — Phase 2', location: 'Bihar, India', status: 'upcoming' },
  { day: '03', month: 'Jun', title: 'Jharkhand Local Body Elections', location: 'Jharkhand, India', status: 'upcoming' },
  { day: '18', month: 'Jun', title: 'West Bengal By-elections (8 seats)', location: 'West Bengal, India', status: 'upcoming' },
  { day: '07', month: 'Jul', title: 'Rajasthan Panchayat Elections', location: 'Rajasthan, India', status: 'upcoming' },
  { day: '20', month: 'Aug', title: 'UK Local Government Elections', location: 'United Kingdom', status: 'upcoming' },
  { day: '15', month: 'Mar', title: 'Uttar Pradesh By-polls (3 seats)', location: 'UP, India', status: 'completed' },
];

const TICKER_HEADLINES = [
  'Bihar Assembly Elections: Phase 1 dates announced',
  'ECI orders removal of 3.2 lakh bogus voters from rolls',
  'Model Code of Conduct in force in 3 states',
  'Supreme Court dismisses EVM challenge petition',
  'Voter turnout hits 72% in Himachal by-poll',
  'Election Commission launches AI-based fake news detection',
  'First-time voters surge in urban constituencies',
  'Brazil certifies presidential candidates for 2026 polls',
  'EU Parliament elections see decade-high youth participation',
];

let currentFilter = 'all';

function renderNews(filter = 'all') {
  const grid = document.getElementById('newsGrid');
  const loading = document.getElementById('newsLoading');
  if (!grid) return;

  loading.style.display = 'flex';
  grid.innerHTML = '';

  setTimeout(() => {
    loading.style.display = 'none';
    const filtered = filter === 'all' ? NEWS_DATA : NEWS_DATA.filter(n => n.cat === filter);

    filtered.forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'news-card';
      card.style.animationDelay = `${i * 0.07}s`;
      card.innerHTML = `
        <div class="news-card-img">${item.icon}</div>
        <div class="news-card-body">
          <div class="news-cat">${item.cat}</div>
          <h3>${item.title}</h3>
          <p>${item.summary}</p>
          <div class="news-card-footer">
            <span class="news-source">${item.source}</span>
            <span class="news-date">${item.date}</span>
          </div>
        </div>`;
      card.onclick = () => window.open(item.url, '_blank');
      grid.appendChild(card);
    });
  }, 600);
}

function renderTicker() {
  const container = document.getElementById('tickerItems');
  if (!container) return;
  const doubled = [...TICKER_HEADLINES, ...TICKER_HEADLINES];
  container.innerHTML = doubled.map(h => `<span>${h}</span>`).join('');
}

function renderCalendar() {
  const list = document.getElementById('calendarList');
  if (!list) return;
  list.innerHTML = CALENDAR_DATA.map(ev => `
    <div class="calendar-item">
      <div class="cal-date">
        <div class="cal-month">${ev.month}</div>
        <div class="cal-day">${ev.day}</div>
      </div>
      <div class="cal-info">
        <h4>${ev.title}</h4>
        <p>📍 ${ev.location}</p>
      </div>
      <span class="cal-status ${ev.status}">${ev.status}</span>
    </div>
  `).join('');
}

// Filter buttons
document.querySelectorAll('.news-filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.news-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.cat;
    renderNews(currentFilter);
  });
});

// Init
renderNews();
renderTicker();
renderCalendar();