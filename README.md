# RapidType - Typing Speed Tester

A clean, minimal web-based typing speed test application that measures how fast and accurately you type in 60 seconds.

![RapidType](https://img.shields.io/badge/RapidType-Typing%20Test-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![License](https://img.shields.io/badge/license-MIT-lightgrey)

## 🚀 Features

- **60-Second Typing Test** - Measure your typing speed under time pressure
- **Real-time Statistics** - Live updates of Words Per Minute (WPM) and accuracy
- **Random Word Generator** - Fresh content for every test session
- **Results Summary** - Detailed performance breakdown after each test
- **Local Leaderboard** - Save and compare your top scores in browser storage
- **Dark/Light Mode** - Toggle between themes for comfortable typing
- **Responsive Design** - Works perfectly on desktop and mobile devices

## 🎯 How It Works

1. **Start Test** - Click the "Start Test" button to begin
2. **Type Words** - Type the displayed words as quickly and accurately as possible
3. **Space to Advance** - Press spacebar to move to the next word
4. **View Results** - See your WPM and accuracy after 60 seconds
5. **Save Score** - Optional: Save your result to the local leaderboard

## 📊 Metrics Calculated

- **WPM (Words Per Minute)** - Number of words typed per minute or in a minute
- **Accuracy** - Percentage of correctly typed characters
- **Correct Words** - Words typed without errors

## 🛠️ Installation

No installation required! RapidType runs directly in your web browser.

### Local Development

1. Clone or download the project files
2. Open `index.html` in your web browser
3. Start typing!

### 🧱 Project Structure
>
> ```
> rapidtype/
> ├─ index.html        # Structure
> ├─ styles.css        # Styling (non-bright colors)
> ├─ script.js         # Core logic (typing, timer, results, leaderboard)
> └─ README.md         # Documentation
> ```

## 💻 Technology Stack

- **HTML5** - Semantic structure and accessibility
- **CSS3** - Modern styling with CSS variables and flexbox
- **JavaScript (ES6+)** - Core functionality and local storage
- **Local Storage** - Persistent data storage in browser

## 🎨 Customization

### Themes
RapidType supports both light and dark themes. Toggle between them using the moon/sun icon in the header.

### Word Bank
Modify the `wordBank` array in the JavaScript to customize the vocabulary used in tests.

### Styling
CSS custom properties (variables) make theme customization easy:
```css
:root {
    --primary-color: #4a6fa5;
    --bg-color: #f5f5f5;
    --text-color: #333;
    /* ... more variables */
}
```

## 📱 Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🔧 Local Storage

RapidType uses browser localStorage to save:
- Top 10 typing scores
- User theme preference
- Leaderboard entries

Data persists between browser sessions but is specific to each browser/device.

## 🎮 Usage Tips

- **Focus on accuracy** - Speed comes with practice
- **Use the spacebar** to quickly advance to the next word
- **Don't look at the keyboard** - Develop muscle memory
- **Practice regularly** to see improvement over time
- **Compare scores** using the local leaderboard

## 📈 Understanding Your Results

- **< 30 WPM** - Beginner typist
- **30-50 WPM** - Average typist
- **50-80 WPM** - Proficient typist
- **80+ WPM** - Advanced typist
- **100+ WPM** - Expert level

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Areas for Improvement
- Additional test durations (30s, 2min, 5min)
- Different word categories (programming, quotes, etc.)
- Sound effects for typing feedback
- Social sharing of results
- Multi-language support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Bug Reports

Found a bug? Please open an issue with:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

## 🌟 Acknowledgments

- Inspired by popular typing test websites
- Built with vanilla JavaScript (no frameworks)
- Designed for performance and accessibility
- Perfect for typing practice and skill assessment

---

**Happy Typing!** 🚀

Practice regularly and watch your typing speed improve with RapidType!