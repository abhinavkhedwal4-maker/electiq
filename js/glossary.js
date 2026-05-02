// ============================================
//   ELECTIQ — GLOSSARY DATA & LOGIC
// ============================================

const GLOSSARY_TERMS = [
  // A
  { term: "Affidavit", abbr: null, tag: "india", definition: "A sworn statement that every election candidate must file disclosing their criminal records, assets and liabilities, and educational qualifications. Mandatory for all candidates in India." },
  { term: "Assembly Constituency", abbr: "AC / Vidhan Sabha Seat", tag: "india", definition: "A geographic area that elects one representative to the State Legislative Assembly (Vidhan Sabha). India has 4,033 assembly constituencies." },
  { term: "Anti-Defection Law", abbr: "Schedule 10", tag: "india", definition: "A law under the 10th Schedule of the Constitution that disqualifies elected members if they vote against their party's direction or voluntarily leave the party." },

  // B
  { term: "Ballot", abbr: null, tag: "concept", definition: "The method by which voters make their choice in an election. Can be paper ballot (traditional) or electronic (EVM in India). The word comes from Italian 'ballota' meaning small ball." },
  { term: "By-election", abbr: "Bye-poll", tag: "concept", definition: "An election held to fill a single vacant seat in a legislature, caused by the death, resignation, or disqualification of the sitting member. Called 'bye-poll' in India." },
  { term: "Block Vote", abbr: null, tag: "world", definition: "A voting system where voters in a multi-member constituency can vote for as many candidates as there are seats to fill." },

  // C
  { term: "Candidate", abbr: null, tag: "concept", definition: "A person who has filed nomination papers and is competing for election to a public office. Must meet eligibility criteria set by the constitution and election laws." },
  { term: "Chief Electoral Officer", abbr: "CEO", tag: "india", definition: "The senior IAS officer in each state responsible for supervising the electoral roll preparation and conduct of elections under the direction of the Election Commission of India." },
  { term: "Constituency", abbr: null, tag: "concept", definition: "A geographic area whose residents elect a representative to a legislative body. Also called a 'seat' or 'ward' depending on the level of government." },
  { term: "Counting Agent", abbr: null, tag: "india", definition: "A representative appointed by a candidate to observe and monitor the vote counting process to ensure transparency and fairness." },

  // D
  { term: "Delimitation", abbr: null, tag: "india", definition: "The process of redrawing the boundaries of electoral constituencies based on the latest census data. Done by the Delimitation Commission appointed by the President." },
  { term: "Democracy", abbr: null, tag: "concept", definition: "A system of government where citizens exercise power through elected representatives. From Greek 'demos' (people) + 'kratos' (power). India is the world's largest democracy." },
  { term: "Deposited Forfeited", abbr: null, tag: "india", definition: "When a candidate fails to secure more than 1/6th of total valid votes in their constituency, their security deposit (₹25,000 for LS) is forfeited to the government." },

  // E
  { term: "Election Commission of India", abbr: "ECI", tag: "india", definition: "The constitutional body established in 1950 under Article 324 responsible for superintending, directing and controlling all elections to Parliament and State Legislatures and to the offices of President and Vice-President." },
  { term: "Electoral Bond", abbr: null, tag: "india", definition: "A financial instrument for political funding where anyone can purchase bonds from the SBI and donate to political parties. Declared unconstitutional by the Supreme Court in February 2024." },
  { term: "Electoral Roll", abbr: "Voter List", tag: "india", definition: "The official list of all registered voters in a constituency. Also called the Voter Roll or Voters' List. Maintained and updated by the Election Commission." },
  { term: "Electronic Voting Machine", abbr: "EVM", tag: "india", definition: "A standalone, battery-operated device used in Indian elections since 1982. Consists of a Control Unit (with polling officer) and Ballot Unit (with voter). Approved by the Supreme Court multiple times." },
  { term: "Exit Poll", abbr: null, tag: "concept", definition: "A poll conducted after voters have exited polling stations, asking who they voted for. Used to predict results before official counting. Cannot be broadcast until all polling phases complete." },

  // F
  { term: "First Past The Post", abbr: "FPTP", tag: "concept", definition: "An electoral system where the candidate who receives the most votes wins, even without an absolute majority. Used in India, the UK, USA, and Canada for most elections." },
  { term: "Form 6", abbr: null, tag: "india", definition: "The application form used by a new voter to register on the Electoral Roll. Available at Election Registration Offices and online at voters.eci.gov.in." },

  // G
  { term: "General Election", abbr: null, tag: "concept", definition: "A nationwide election to choose representatives for the national legislature. In India, Lok Sabha general elections are held every 5 years. Called 'Aam Chunav' in Hindi." },
  { term: "Governor", abbr: null, tag: "india", definition: "The constitutional head of a state, appointed by the President. Plays a key role in government formation after state elections, especially in hung assembly situations." },

  // H
  { term: "Hung Parliament", abbr: null, tag: "concept", definition: "A situation where no single party or pre-election alliance wins an outright majority of seats, requiring coalition-building. Also called a 'hung assembly' at the state level." },

  // I
  { term: "Indelible Ink", abbr: null, tag: "india", definition: "Blue-black ink applied to the left index finger of voters after they cast their ballot. Made from silver nitrate, it's visible for several weeks and prevents double voting. Produced at Mysore Paints." },

  // L
  { term: "Lok Sabha", abbr: "House of the People", tag: "india", definition: "The lower house of India's Parliament with 543 elected members. Members are directly elected by eligible voters from single-member constituencies using FPTP. Maximum term is 5 years." },

  // M
  { term: "Manifesto", abbr: "Party Manifesto", tag: "concept", definition: "A public document issued by a political party before elections outlining their policies, promises and goals if elected to power. Serves as a contract with voters." },
  { term: "Model Code of Conduct", abbr: "MCC", tag: "india", definition: "A set of guidelines issued by the Election Commission that political parties and candidates must follow during the election period. Enforceable from the announcement of election schedule." },

  // N
  { term: "Nomination", abbr: null, tag: "concept", definition: "The formal process by which a candidate declares their intention to contest an election by submitting required forms, documents and security deposit within the specified window." },
  { term: "NOTA", abbr: "None Of The Above", tag: "india", definition: "An option on Indian EVMs (and some other countries) allowing voters to officially register disapproval of all candidates. Introduced in India in 2013 following Supreme Court direction in PUCL vs Union of India." },

  // O
  { term: "Observer", abbr: "Election Observer", tag: "india", definition: "Senior IAS/IPS officers deployed by the Election Commission in constituencies to oversee the election process, monitor compliance with MCC, and ensure free and fair elections." },
  { term: "Opinion Poll", abbr: null, tag: "concept", definition: "A survey of voters' opinions and voting intentions conducted before an election to predict outcomes. Cannot be published during the 48 hours before polling in India." },

  // P
  { term: "Polling Booth", abbr: "Polling Station", tag: "concept", definition: "The designated location where voters go to cast their ballot. In India, norms specify one booth per 1,500 voters maximum, with separate queues for men and women." },
  { term: "Postal Ballot", abbr: null, tag: "india", definition: "A facility allowing certain categories of voters (military, police on duty, senior citizens 85+, PwD, essential service workers) to vote by mail without going to the polling booth." },
  { term: "President's Rule", abbr: "Article 356", tag: "india", definition: "A constitutional provision where the central government takes over administration of a state when constitutional government cannot be carried on. Often invoked after hung assembly situations." },
  { term: "Proportional Representation", abbr: "PR", tag: "world", definition: "An electoral system where parties gain seats proportional to their share of votes. Used in many European countries and for Rajya Sabha elections in India. Ensures minority voices are heard." },
  { term: "President of India", abbr: null, tag: "india", definition: "The constitutional head of state elected by an Electoral College comprising elected MPs and MLAs. Plays a key role in inviting parties to form government after general elections." },

  // R
  { term: "Rajya Sabha", abbr: "Council of States", tag: "india", definition: "The upper house of India's Parliament with 245 members. 233 members are elected by state legislative assemblies and 12 are nominated by the President. Members serve 6-year terms." },
  { term: "Re-poll", abbr: null, tag: "india", definition: "When the Election Commission orders voting to be conducted again in a polling station or constituency due to booth capturing, violence, EVM malfunction, or other irregularities." },
  { term: "Returning Officer", abbr: "RO", tag: "india", definition: "A district-level officer appointed by the Election Commission to oversee the election process in a constituency, scrutinize nominations, and officially declare election results." },

  // S
  { term: "Schedule", abbr: "Election Schedule", tag: "concept", definition: "The official timetable announced by the Election Commission specifying key dates: notification, nomination, scrutiny, withdrawal, polling, and counting for an election." },
  { term: "Security Deposit", abbr: null, tag: "india", definition: "Money deposited by candidates at the time of filing nominations. For Lok Sabha: ₹25,000 (general) / ₹12,500 (SC/ST). Forfeited if candidate gets less than 1/6th of votes polled." },
  { term: "SVEEP", abbr: "Systematic Voters' Education and Electoral Participation", tag: "india", definition: "The flagship program of the Election Commission of India to increase voter awareness, encourage participation, and make the democratic process more inclusive, especially for first-time and marginalized voters." },
  { term: "Swing", abbr: "Vote Swing", tag: "concept", definition: "The shift in voter support between parties from one election to another. Expressed as percentage points. A positive swing indicates gain; negative indicates loss for a party." },

  // T
  { term: "Turnout", abbr: "Voter Turnout", tag: "concept", definition: "The percentage of eligible registered voters who actually cast their ballot in an election. High turnout is generally considered a sign of healthy democracy. India's 2024 LS turnout was ~65%." },

  // U
  { term: "Universal Adult Franchise", abbr: null, tag: "concept", definition: "The right of every adult citizen to vote regardless of class, caste, gender, religion or wealth. India adopted this at independence in 1947, well ahead of many Western democracies." },

  // V
  { term: "Vidhan Sabha", abbr: "State Legislative Assembly", tag: "india", definition: "The lower house of a state legislature in India. Members (MLAs) are directly elected from constituencies within the state. The assembly forms the state government." },
  { term: "Voter ID Card", abbr: "EPIC", tag: "india", definition: "The Elector Photo Identity Card (EPIC) issued by the Election Commission of India as proof of voter registration. Also used as a general-purpose photo ID document." },
  { term: "Voter Registration", abbr: null, tag: "concept", definition: "The process by which a citizen enrolls on the electoral roll to gain the right to vote. In India, citizens must register in their constituency using Form 6 at age 18." },
  { term: "Voter Verifiable Paper Audit Trail", abbr: "VVPAT", tag: "india", definition: "A printer attached to EVMs that produces a paper slip showing the candidate name, symbol and serial number voted for. The slip is visible through a transparent window for 7 seconds before dropping into a sealed container." },

  // W
  { term: "Ward", abbr: null, tag: "concept", definition: "The smallest electoral unit, typically used for local government (municipal corporation or panchayat) elections. Each ward elects one councillor or member to the local body." },

  // Z
  { term: "Zero Hour", abbr: null, tag: "india", definition: "A parliamentary procedure in India where MPs can raise urgent matters immediately after Question Hour, without prior notice to the Speaker. Begins at 12 noon, hence the name." },
];

let allTerms = [...GLOSSARY_TERMS].sort((a, b) => a.term.localeCompare(b.term));
let currentLetter = 'all';

function renderGlossary(terms) {
  const grid = document.getElementById('glossaryGrid');
  const noResults = document.getElementById('noResults');
  grid.innerHTML = '';

  if (terms.length === 0) {
    noResults.classList.remove('hidden');
    return;
  }

  noResults.classList.add('hidden');

  // Group by first letter
  const groups = {};
  terms.forEach(term => {
    const letter = term.term[0].toUpperCase();
    if (!groups[letter]) groups[letter] = [];
    groups[letter].push(term);
  });

  Object.keys(groups).sort().forEach(letter => {
    const letterEl = document.createElement('div');
    letterEl.className = 'glossary-letter-group';
    letterEl.innerHTML = `<h2>${letter}</h2>`;
    grid.appendChild(letterEl);

    groups[letter].forEach((item, i) => {
      const card = document.createElement('div');
      card.className = 'glossary-term-card';
      card.style.animationDelay = `${i * 0.04}s`;
      card.innerHTML = `
        <div class="term-header">
          <div class="term-name">${item.term}</div>
          <span class="term-tag ${item.tag}">${item.tag}</span>
        </div>
        ${item.abbr ? `<div class="term-abbr">${item.abbr}</div>` : ''}
        <div class="term-definition">${item.definition}</div>
      `;
      card.onclick = () => {
        // Open chat and ask about this term
        toggleChat();
        const input = document.getElementById('chatInput');
        if (input) {
          input.value = `Tell me more about "${item.term}" in the context of elections.`;
        }
      };
      grid.appendChild(card);
    });
  });

  document.getElementById('searchCount').textContent = `${terms.length} terms`;
}

function filterGlossary(query) {
  const q = query.toLowerCase().trim();
  document.getElementById('searchQuery').textContent = query;

  const filtered = q === ''
    ? allTerms
    : allTerms.filter(t =>
        t.term.toLowerCase().includes(q) ||
        t.definition.toLowerCase().includes(q) ||
        (t.abbr && t.abbr.toLowerCase().includes(q))
      );

  renderGlossary(filtered);
}

function buildAlphaNav() {
  const nav = document.getElementById('alphNav');
  const letters = [...new Set(allTerms.map(t => t.term[0].toUpperCase()))];
  const allLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const allBtn = document.createElement('button');
  allBtn.className = 'alpha-btn active';
  allBtn.textContent = 'All';
  allBtn.onclick = () => {
    document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
    allBtn.classList.add('active');
    renderGlossary(allTerms);
    document.getElementById('glossarySearch').value = '';
  };
  nav.appendChild(allBtn);

  allLetters.forEach(letter => {
    const btn = document.createElement('button');
    btn.className = `alpha-btn${letters.includes(letter) ? '' : ' disabled'}`;
    btn.textContent = letter;
    if (letters.includes(letter)) {
      btn.onclick = () => {
        document.querySelectorAll('.alpha-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filtered = allTerms.filter(t => t.term[0].toUpperCase() === letter);
        renderGlossary(filtered);
        document.getElementById('glossarySearch').value = '';
      };
    }
    nav.appendChild(btn);
  });
}

// Init
buildAlphaNav();
renderGlossary(allTerms);