// Word bank for the typing test
const wordBank = [
    'the', 'be', 'to', 'of', 'and', 'a', 'in', 'that', 'have', 'I',
    'it', 'for', 'not', 'on', 'with', 'he', 'as', 'you', 'do', 'at',
    'this', 'but', 'his', 'by', 'from', 'they', 'we', 'say', 'her', 'she',
    'or', 'an', 'will', 'my', 'one', 'all', 'would', 'there', 'their', 'what',
    'so', 'up', 'out', 'if', 'about', 'who', 'get', 'which', 'go', 'me',
    'when', 'make', 'can', 'like', 'time', 'no', 'just', 'him', 'know', 'take',
    'people', 'into', 'year', 'your', 'good', 'some', 'could', 'them', 'see', 'other',
    'than', 'then', 'now', 'look', 'only', 'come', 'its', 'over', 'think', 'also',
    'back', 'after', 'use', 'two', 'how', 'our', 'work', 'first', 'well', 'way',
    'even', 'new', 'want', 'because', 'any', 'these', 'give', 'day', 'most', 'us',
    'is', 'are', 'was', 'were', 'has', 'had', 'been', 'being', 'have', 'has', 'had'
];

// DOM Elements
const wordDisplay = document.getElementById('word-display');
const typingInput = document.getElementById('typing-input');
const startBtn = document.getElementById('start-btn');
const timerDisplay = document.getElementById('timer');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const resultsSection = document.getElementById('results');
const finalWpmDisplay = document.getElementById('final-wpm');
const finalAccuracyDisplay = document.getElementById('final-accuracy');
const userNameInput = document.getElementById('user-name');
const saveResultBtn = document.getElementById('save-result');
const leaderboard = document.getElementById('leaderboard');
const clearLeaderboardBtn = document.getElementById('clear-leaderboard');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.querySelector('.theme-icon');

// Test state variables
let testStarted = false;
let timer;
let timeLeft = 60;
let currentWordIndex = 0;
let words = [];
let correctChars = 0;
let totalChars = 0;
let startTime;
let correctWords = 0;

// Initialize the app
function init() {
    generateWords();
    updateLeaderboard();
    setupEventListeners();
    loadThemePreference();
}

// Generate random words for the test
function generateWords() {
    words = [];
    for (let i = 0; i < 50; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        words.push(wordBank[randomIndex]);
    }
    renderWords();
}

// Render words to the display
function renderWords() {
    wordDisplay.innerHTML = '';
    words.forEach((word, index) => {
        const wordSpan = document.createElement('span');
        wordSpan.textContent = word;
        wordSpan.className = 'word';
        if (index === currentWordIndex) {
            wordSpan.classList.add('current');
        }
        wordDisplay.appendChild(wordSpan);
    });
}

// Start the typing test
function startTest() {
    testStarted = true;
    startBtn.disabled = true;
    typingInput.disabled = false;
    typingInput.focus();
    startTime = new Date();
    
    // Reset stats
    timeLeft = 60;
    currentWordIndex = 0;
    correctChars = 0;
    totalChars = 0;
    correctWords = 0;
    
    updateStats();
    renderWords();
    
    // Start timer
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endTest();
        }
        
        updateStats();
    }, 1000);
    
    // Hide results if visible
    resultsSection.classList.add('hidden');
}

// End the typing test
function endTest() {
    clearInterval(timer);
    testStarted = false;
    startBtn.disabled = false;
    typingInput.disabled = true;
    typingInput.value = '';
    
    // Calculate final stats
    const finalWpm = calculateWPM();
    const finalAccuracy = calculateAccuracy();
    
    // Display final results
    finalWpmDisplay.textContent = finalWpm;
    finalAccuracyDisplay.textContent = `${finalAccuracy}%`;
    resultsSection.classList.remove('hidden');
}

// Update real-time stats
function updateStats() {
    const wpm = calculateWPM();
    const accuracy = calculateAccuracy();
    
    wpmDisplay.textContent = wpm;
    accuracyDisplay.textContent = `${accuracy}%`;
}

// Calculate words per minute
function calculateWPM() {
    if (!startTime) return 0;
    
    const timeElapsed = (new Date() - startTime) / 1000 / 60; // in minutes
    if (timeElapsed === 0) return 0;
    
    return Math.round(correctWords / timeElapsed);
}

// Calculate accuracy percentage
function calculateAccuracy() {
    if (totalChars === 0) return 100;
    return Math.round((correctChars / totalChars) * 100);
}

// Handle typing input
function handleTyping(e) {
    if (!testStarted) return;
    
    const typedText = typingInput.value.trim();
    const currentWord = words[currentWordIndex];
    
    // Check if space was pressed (word completed)
    if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        
        // Check if word is correct
        if (typedText === currentWord) {
            correctWords++;
            document.querySelectorAll('.word')[currentWordIndex].classList.add('correct');
        } else {
            document.querySelectorAll('.word')[currentWordIndex].classList.add('incorrect');
        }
        
        // Move to next word
        currentWordIndex++;
        typingInput.value = '';
        
        // Check if we need more words
        if (currentWordIndex >= words.length - 5) {
            generateMoreWords();
        }
        
        renderWords();
        
        // Scroll if needed
        const currentWordElement = document.querySelector('.word.current');
        if (currentWordElement) {
            currentWordElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    } else {
        // Update character stats in real-time
        updateCharacterStats(typedText, currentWord);
    }
}

// Update character-level statistics
function updateCharacterStats(typedText, currentWord) {
    totalChars = typedText.length;
    correctChars = 0;
    
    for (let i = 0; i < typedText.length; i++) {
        if (i < currentWord.length && typedText[i] === currentWord[i]) {
            correctChars++;
        }
    }
    
    updateStats();
}

// Generate more words when needed
function generateMoreWords() {
    const newWords = [];
    for (let i = 0; i < 20; i++) {
        const randomIndex = Math.floor(Math.random() * wordBank.length);
        newWords.push(wordBank[randomIndex]);
    }
    words = words.concat(newWords);
}

// Save result to leaderboard
function saveResult() {
    const name = userNameInput.value.trim() || 'Anonymous';
    const wpm = parseInt(finalWpmDisplay.textContent);
    const accuracy = parseInt(finalAccuracyDisplay.textContent);
    const date = new Date().toLocaleDateString();
    
    // Get existing leaderboard or initialize empty array
    const leaderboardData = JSON.parse(localStorage.getItem('rapidtypeLeaderboard') || '[]');
    
    // Add new result
    leaderboardData.push({
        name,
        wpm,
        accuracy,
        date
    });
    
    // Sort by WPM (descending) and keep top 10
    leaderboardData.sort((a, b) => b.wpm - a.wpm);
    const topResults = leaderboardData.slice(0, 10);
    
    // Save back to localStorage
    localStorage.setItem('rapidtypeLeaderboard', JSON.stringify(topResults));
    
    // Update leaderboard display
    updateLeaderboard();
    
    // Reset form
    userNameInput.value = '';
    resultsSection.classList.add('hidden');
}

// Update leaderboard display
function updateLeaderboard() {
    const leaderboardData = JSON.parse(localStorage.getItem('rapidtypeLeaderboard') || '[]');
    
    leaderboard.innerHTML = '';
    
    if (leaderboardData.length === 0) {
        leaderboard.innerHTML = '<p class="no-results">No results yet. Complete a test to see your scores here!</p>';
        return;
    }
    
    leaderboardData.forEach((entry, index) => {
        const entryElement = document.createElement('div');
        entryElement.className = 'leaderboard-entry';
        
        entryElement.innerHTML = `
            <div class="entry-info">
                <span class="entry-rank">${index + 1}.</span>
                <span class="entry-name">${entry.name}</span>
            </div>
            <div class="entry-stats">
                <span class="entry-wpm">${entry.wpm} WPM</span>
                <span class="entry-accuracy">${entry.accuracy}%</span>
                <span class="entry-date">${entry.date}</span>
            </div>
        `;
        
        leaderboard.appendChild(entryElement);
    });
}

// Clear leaderboard
function clearLeaderboard() {
    if (confirm('Are you sure you want to clear the leaderboard? This action cannot be undone.')) {
        localStorage.removeItem('rapidtypeLeaderboard');
        updateLeaderboard();
    }
}

// Toggle dark/light theme
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('rapidtypeTheme', newTheme);
    
    // Update theme icon
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
}

// Load theme preference from localStorage
function loadThemePreference() {
    const savedTheme = localStorage.getItem('rapidtypeTheme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
}

// Set up event listeners
function setupEventListeners() {
    startBtn.addEventListener('click', startTest);
    typingInput.addEventListener('keydown', handleTyping);
    saveResultBtn.addEventListener('click', saveResult);
    clearLeaderboardBtn.addEventListener('click', clearLeaderboard);
    themeToggle.addEventListener('click', toggleTheme);
    
    // Allow Enter key to save result
    userNameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            saveResult();
        }
    });
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', init);