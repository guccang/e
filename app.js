// ==========================================
// Fun English Learning for Kids - JavaScript
// ==========================================

// --- State ---
let soundEnabled = true;
let alphaMode = 'letter';
let currentColorQuiz = null;
let currentTraceShape = null;
let traceStart = null;

// --- Data ---
const alphabetData = [
  { letter: 'A', word: 'Apple', emoji: '🍎' },
  { letter: 'B', word: 'Ball', emoji: '⚽' },
  { letter: 'C', word: 'Cat', emoji: '🐱' },
  { letter: 'D', word: 'Dog', emoji: '🐶' },
  { letter: 'E', word: 'Elephant', emoji: '🐘' },
  { letter: 'F', word: 'Fish', emoji: '🐟' },
  { letter: 'G', word: 'Giraffe', emoji: '🦒' },
  { letter: 'H', word: 'House', emoji: '🏠' },
  { letter: 'I', word: 'Ice Cream', emoji: '🍦' },
  { letter: 'J', word: 'Juice', emoji: '🧃' },
  { letter: 'K', word: 'Kite', emoji: '🪁' },
  { letter: 'L', word: 'Lion', emoji: '🦁' },
  { letter: 'M', word: 'Monkey', emoji: '🐵' },
  { letter: 'N', word: 'Nose', emoji: '👃' },
  { letter: 'O', word: 'Orange', emoji: '🍊' },
  { letter: 'P', word: 'Pig', emoji: '🐷' },
  { letter: 'Q', word: 'Queen', emoji: '👸' },
  { letter: 'R', word: 'Rabbit', emoji: '🐰' },
  { letter: 'S', word: 'Sun', emoji: '☀️' },
  { letter: 'T', word: 'Tiger', emoji: '🐯' },
  { letter: 'U', word: 'Umbrella', emoji: '☂️' },
  { letter: 'V', word: 'Violin', emoji: '🎻' },
  { letter: 'W', word: 'Whale', emoji: '🐋' },
  { letter: 'X', word: 'Xylophone', emoji: '🎹' },
  { letter: 'Y', word: 'Yo-yo', emoji: '🪀' },
  { letter: 'Z', word: 'Zebra', emoji: '🦓' },
];

const colorsData = [
  { name: 'Red', hex: '#ff4757', emoji: '🍎' },
  { name: 'Blue', hex: '#3742fa', emoji: '🌊' },
  { name: 'Green', hex: '#2ed573', emoji: '🌿' },
  { name: 'Yellow', hex: '#ffa502', emoji: '☀️' },
  { name: 'Orange', hex: '#ff6b35', emoji: '🍊' },
  { name: 'Purple', hex: '#a55eea', emoji: '🍇' },
  { name: 'Pink', hex: '#ff6b81', emoji: '🌸' },
  { name: 'White', hex: '#f1f2f6', emoji: '☁️' },
  { name: 'Black', hex: '#2f3542', emoji: '🐧' },
  { name: 'Brown', hex: '#8B4513', emoji: '🐻' },
];

const shapesData = [
  { name: 'Circle', emoji: '⭕', svgType: 'circle' },
  { name: 'Square', emoji: '🟦', svgType: 'square' },
  { name: 'Triangle', emoji: '🔺', svgType: 'triangle' },
  { name: 'Rectangle', emoji: '⬛', svgType: 'rectangle' },
  { name: 'Star', emoji: '⭐', svgType: 'star' },
  { name: 'Heart', emoji: '❤️', svgType: 'heart' },
  { name: 'Diamond', emoji: '💎', svgType: 'diamond' },
  { name: 'Oval', emoji: '🥚', svgType: 'oval' },
];

// ==========================================
// Page Navigation
// ==========================================
function showPage(pageId) {
  // Stop any auto-advance timers from the three new modules
  if (dailyAutoTimer) { clearInterval(dailyAutoTimer); dailyAutoTimer = null; }
  if (skitAutoTimer) { clearTimeout(skitAutoTimer); clearInterval(skitAutoTimer); skitAutoTimer = null; }
  if (storyAutoTimer) { clearTimeout(storyAutoTimer); storyAutoTimer = null; }
  // Reset toggle buttons
  const dailyCheck = document.getElementById('daily-auto-advance');
  if (dailyCheck) dailyCheck.checked = false;
  const skitBtn = document.getElementById('skit-auto-btn');
  if (skitBtn) skitBtn.textContent = '▶️ Auto Play';
  const storyBtn = document.getElementById('story-auto-btn');
  if (storyBtn) storyBtn.textContent = '▶️ Auto Read';

  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById(pageId);
  if (page) {
    page.classList.add('active');
    page.style.animation = 'none';
    page.offsetHeight;
    page.style.animation = 'fadeSlideIn 0.5s ease';
  }

  if (pageId === 'alphabet-page') renderAlphabet();
  if (pageId === 'colors-page') { renderColors(); newColorQuiz(); }
  if (pageId === 'shapes-page') { renderShapes(); newTraceShape(); }
  if (pageId === 'daily-page') { renderDailyPhrase(); }
  if (pageId === 'skits-page') { renderSkit(); }
  if (pageId === 'stories-page') { renderStory(); }
}

// ==========================================
// Module 1: Daily Phrases (日常短句学习)
// ==========================================
const dailyPhrases = {
  morning: [
    { en: 'Good morning!', zh: '早上好！', emoji: '🌅' },
    { en: 'Time to wake up!', zh: '该起床了！', emoji: '⏰' },
    { en: 'Did you sleep well?', zh: '你睡得好吗？', emoji: '😴' },
    { en: 'Wash your face and brush your teeth.', zh: '洗脸刷牙吧。', emoji: '🪥' },
    { en: 'What a beautiful day!', zh: '多么美好的一天！', emoji: '☀️' },
  ],
  social: [
    { en: 'Hello! How are you?', zh: '你好！你好吗？', emoji: '👋' },
    { en: 'Nice to meet you!', zh: '很高兴认识你！', emoji: '🤝' },
    { en: 'Thank you very much!', zh: '非常感谢！', emoji: '🙏' },
    { en: 'You are welcome!', zh: '不客气！', emoji: '😊' },
    { en: 'See you later!', zh: '一会儿见！', emoji: '👋' },
    { en: 'I am sorry.', zh: '对不起。', emoji: '😔' },
  ],
  mealtime: [
    { en: 'I am hungry!', zh: '我饿了！', emoji: '😋' },
    { en: 'What is for dinner?', zh: '晚饭吃什么？', emoji: '🍽️' },
    { en: 'This is delicious!', zh: '这个真好吃！', emoji: '😍' },
    { en: 'Can I have more, please?', zh: '请再给我一点好吗？', emoji: '🥄' },
    { en: 'I am full. That was great!', zh: '我吃饱了，太好吃了！', emoji: '😊' },
    { en: 'Don\'t forget to drink water!', zh: '别忘了喝水！', emoji: '💧' },
  ],
  bedtime: [
    { en: 'It\'s time for bed.', zh: '该睡觉了。', emoji: '🌙' },
    { en: 'Put on your pajamas.', zh: '穿上睡衣。', emoji: '👕' },
    { en: 'Let me read you a story.', zh: '我给你读个故事。', emoji: '📖' },
    { en: 'Sweet dreams!', zh: '做个好梦！', emoji: '💤' },
    { en: 'Good night, sleep tight!', zh: '晚安，睡个好觉！', emoji: '🌟' },
  ],
};

let dailyMode = 'morning';
let dailyIndex = 0;
let dailyAutoTimer = null;

function switchDailyMode(mode, btn) {
  dailyMode = mode;
  dailyIndex = 0;
  document.querySelectorAll('#daily-page .mode-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderDailyPhrase();
}

function renderDailyPhrase() {
  const list = dailyPhrases[dailyMode];
  const phrase = list[dailyIndex];
  document.getElementById('daily-hero-emoji').textContent = phrase.emoji;
  document.getElementById('daily-hero-en').textContent = phrase.en;
  document.getElementById('daily-hero-zh').textContent = phrase.zh;
  document.getElementById('daily-index-indicator').textContent = (dailyIndex + 1) + ' / ' + list.length;

  // Re-trigger animation
  const hero = document.getElementById('daily-hero');
  hero.style.animation = 'none';
  hero.offsetHeight;
  hero.style.animation = 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
}

function nextDailyPhrase() {
  const list = dailyPhrases[dailyMode];
  dailyIndex = (dailyIndex + 1) % list.length;
  renderDailyPhrase();
}

function prevDailyPhrase() {
  const list = dailyPhrases[dailyMode];
  dailyIndex = (dailyIndex - 1 + list.length) % list.length;
  renderDailyPhrase();
}

function speakDailyCurrent() {
  const phrase = dailyPhrases[dailyMode][dailyIndex];
  speak(phrase.en);
}

function toggleDailyAuto() {
  const checked = document.getElementById('daily-auto-advance').checked;
  if (checked) {
    dailyAutoTimer = setInterval(() => { nextDailyPhrase(); speakDailyCurrent(); }, 3000);
  } else {
    clearInterval(dailyAutoTimer);
  }
}

// ==========================================
// Module 2: Scenario Skits (情景短剧)
// ==========================================
const skitsData = [
  {
    scene: 'At a Restaurant',
    charA: { name: 'Waiter', emoji: '👩' },
    charB: { name: 'Customer', emoji: '👦' },
    lines: [
      { speaker: 'A', text: 'Hello! Welcome to our restaurant.' },
      { speaker: 'B', text: 'Hi! Can I see the menu, please?' },
      { speaker: 'A', text: 'Of course! Here you go.' },
      { speaker: 'B', text: 'I would like some juice and a sandwich.' },
      { speaker: 'A', text: 'Anything else? We have ice cream too.' },
      { speaker: 'B', text: 'Yes, please! One ice cream!' },
      { speaker: 'A', text: 'Here is your food. Enjoy!' },
      { speaker: 'B', text: 'Thank you! It looks great!' },
    ],
  },
  {
    scene: 'At a Store',
    charA: { name: 'Shopkeeper', emoji: '👨' },
    charB: { name: 'Kid', emoji: '👧' },
    lines: [
      { speaker: 'A', text: 'Hello there! How can I help you?' },
      { speaker: 'B', text: 'Hi! I want to buy a notebook.' },
      { speaker: 'A', text: 'Sure! This blue one is very nice.' },
      { speaker: 'B', text: 'How much is it?' },
      { speaker: 'A', text: 'It is two dollars.' },
      { speaker: 'B', text: 'Here you go. Thank you!' },
      { speaker: 'A', text: 'Here is your change. Have a nice day!' },
      { speaker: 'B', text: 'Bye-bye! See you next time!' },
    ],
  },
  {
    scene: 'Meeting a Friend',
    charA: { name: 'Emma', emoji: '👩' },
    charB: { name: 'Tom', emoji: '👦' },
    lines: [
      { speaker: 'A', text: 'Hi Tom! How are you today?' },
      { speaker: 'B', text: 'Hi Emma! I\'m great! And you?' },
      { speaker: 'A', text: 'I\'m very happy! It\'s a sunny day.' },
      { speaker: 'B', text: 'Let\'s go to the park together!' },
      { speaker: 'A', text: 'That sounds fun! Let\'s go!' },
      { speaker: 'B', text: 'Do you want to play on the swings?' },
      { speaker: 'A', text: 'Yes! I love the swings!' },
      { speaker: 'B', text: 'This is the best day ever!' },
    ],
  },
  {
    scene: 'At School',
    charA: { name: 'Teacher', emoji: '👩‍🏫' },
    charB: { name: 'Student', emoji: '🧒' },
    lines: [
      { speaker: 'A', text: 'Good morning, class! Let\'s start the lesson.' },
      { speaker: 'B', text: 'Good morning, teacher!' },
      { speaker: 'A', text: 'Today we will learn about animals.' },
      { speaker: 'B', text: 'I love animals! My favorite is the dog.' },
      { speaker: 'A', text: 'Can you spell the word "dog"?' },
      { speaker: 'B', text: 'Yes! D-O-G, dog!' },
      { speaker: 'A', text: 'Excellent! You are very smart!' },
      { speaker: 'B', text: 'Thank you! Learning is so much fun!' },
    ],
  },
];

let skitIndex = 0;
let skitLineIndex = 0;
let skitAutoTimer = null;

function selectSkit(idx, btn) {
  skitIndex = idx;
  skitLineIndex = 0;
  document.querySelectorAll('.skit-select-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderSkit();
}

function renderSkit() {
  const skit = skitsData[skitIndex];
  document.getElementById('skit-scene-tag').textContent = 'Scene: ' + skit.scene;
  document.getElementById('skit-char-a').textContent = skit.charA.emoji + ' ' + skit.charA.name;
  document.getElementById('skit-char-b').textContent = skit.charB.emoji + ' ' + skit.charB.name;

  const currentLine = skit.lines[skitLineIndex];
  const currentSpeaker = currentLine.speaker;

  document.getElementById('skit-line-a').textContent = currentLine.text;
  document.getElementById('skit-line-a').className = 'skit-line';
  document.getElementById('skit-line-b').className = 'skit-line';
  document.getElementById('skit-char-a').className = 'skit-character';
  document.getElementById('skit-char-b').className = 'skit-character';

  if (currentSpeaker === 'A') {
    document.getElementById('skit-line-a').classList.add('active-line');
    document.getElementById('skit-char-a').classList.add('active-speaker');
    document.getElementById('skit-line-b').style.visibility = 'hidden';
  } else {
    document.getElementById('skit-line-b').classList.add('active-line');
    document.getElementById('skit-char-b').classList.add('active-speaker');
    document.getElementById('skit-line-a').style.visibility = 'hidden';
  }

  document.getElementById('skit-counter').textContent = 'Line ' + (skitLineIndex + 1) + ' / ' + skit.lines.length;
}

function nextSkitLine() {
  const skit = skitsData[skitIndex];
  if (skitLineIndex < skit.lines.length - 1) {
    skitLineIndex++;
    renderSkit();
    const line = skit.lines[skitLineIndex];
    setTimeout(() => speak(line.text), 200);
  }
}

function prevSkitLine() {
  if (skitLineIndex > 0) {
    skitLineIndex--;
    renderSkit();
    const line = skitsData[skitIndex].lines[skitLineIndex];
    setTimeout(() => speak(line.text), 200);
  }
}

function toggleSkitAutoPlay() {
  const btn = document.getElementById('skit-auto-btn');
  if (skitAutoTimer) {
    clearInterval(skitAutoTimer);
    skitAutoTimer = null;
    btn.textContent = '▶️ Auto Play';
  } else {
    btn.textContent = '⏸️ Stop';
    const playNext = () => {
      const skit = skitsData[skitIndex];
      const line = skit.lines[skitLineIndex];
      speak(line.text);
      if (skitLineIndex < skit.lines.length - 1) {
        skitLineIndex++;
        renderSkit();
        skitAutoTimer = setTimeout(playNext, 2500);
      } else {
        clearInterval(skitAutoTimer);
        skitAutoTimer = null;
        btn.textContent = '▶️ Auto Play';
      }
    };
    playNext();
  }
}

// ==========================================
// Module 3: Story Sentences (故事短句)
// ==========================================
const storiesData = [
  {
    title: 'The Tortoise and the Hare',
    emoji: '🐢🐰',
    sentences: [
      { en: 'Once upon a time, there was a fast rabbit.', zh: '从前，有一只跑得很快的兔子。' },
      { en: 'The rabbit laughed at the slow tortoise.', zh: '兔子嘲笑跑得慢的乌龟。' },
      { en: '"Let\'s have a race!" said the rabbit.', zh: '"我们来比赛吧！"兔子说。' },
      { en: 'The rabbit ran far ahead and took a nap.', zh: '兔子跑得很快，然后打了个盹。' },
      { en: 'The tortoise kept walking slowly but never stopped.', zh: '乌龟慢慢地走，但从不停下。' },
      { en: 'The tortoise crossed the finish line first!', zh: '乌龟第一个冲过了终点线！' },
      { en: 'Slow and steady wins the race.', zh: '慢而稳，赢比赛。' },
    ],
  },
  {
    title: 'The Lion and the Mouse',
    emoji: '🦁🐭',
    sentences: [
      { en: 'A big lion was sleeping in the forest.', zh: '一只大狮子在森林里睡觉。' },
      { en: 'A little mouse ran over the lion\'s nose.', zh: '一只小老鼠跑过狮子的鼻子。' },
      { en: 'The lion woke up and caught the mouse.', zh: '狮子醒了，抓住了老鼠。' },
      { en: '"Please let me go! I will help you someday."', zh: '"请放了我！有一天我会帮你的。"' },
      { en: 'The lion laughed but let the mouse go.', zh: '狮子笑了，但放走了老鼠。' },
      { en: 'Later, hunters caught the lion in a net.', zh: '后来，猎人用网抓住了狮子。' },
      { en: 'The mouse chewed the net and freed the lion!', zh: '老鼠咬断了网，救了狮子！' },
    ],
  },
  {
    title: 'The Little Red Hen',
    emoji: '🐔🌾',
    sentences: [
      { en: 'The little red hen found some wheat seeds.', zh: '小红母鸡找到了一些麦种。' },
      { en: '"Who will help me plant the seeds?" she asked.', zh: '"谁来帮我种麦子？"她问。' },
      { en: 'The dog, cat, and duck said, "Not I!"', zh: '狗、猫和鸭子都说："我不去！"' },
      { en: 'The little hen did all the work by herself.', zh: '小红母鸡一个人干了所有的活。' },
      { en: 'She made bread from the wheat.', zh: '她用麦子做了面包。' },
      { en: '"Who will help me eat the bread?" she asked.', zh: '"谁来帮我吃面包？"她问。' },
      { en: 'Everyone said yes, but she ate it herself!', zh: '大家都说好，但她自己吃了！' },
    ],
  },
];

let storyIndex = 0;
let storySentenceIndex = 0;
let storyAutoTimer = null;

function selectStory(idx, btn) {
  storyIndex = idx;
  storySentenceIndex = 0;
  document.querySelectorAll('.story-select-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  renderStory();
}

function renderStory() {
  const story = storiesData[storyIndex];
  const sent = story.sentences[storySentenceIndex];

  document.getElementById('story-title-emoji').textContent = story.emoji;
  document.getElementById('story-heading').textContent = story.title;
  document.getElementById('story-sentence-en').textContent = sent.en;
  document.getElementById('story-sentence-zh').textContent = sent.zh;

  const pct = ((storySentenceIndex + 1) / story.sentences.length) * 100;
  document.getElementById('story-progress-fill').style.width = pct + '%';
  document.getElementById('story-counter').textContent = (storySentenceIndex + 1) + ' / ' + story.sentences.length;

  // Re-trigger animation
  const disp = document.getElementById('story-sentence-display');
  disp.style.animation = 'none';
  disp.offsetHeight;
  disp.style.animation = 'fadeSlideIn 0.4s ease';
}

function nextStorySentence() {
  const story = storiesData[storyIndex];
  if (storySentenceIndex < story.sentences.length - 1) {
    storySentenceIndex++;
    renderStory();
  }
}

function prevStorySentence() {
  if (storySentenceIndex > 0) {
    storySentenceIndex--;
    renderStory();
  }
}

function speakStoryCurrent() {
  const sent = storiesData[storyIndex].sentences[storySentenceIndex];
  speak(sent.en);
}

function restartStory() {
  storySentenceIndex = 0;
  renderStory();
}

function toggleStoryAutoPlay() {
  const btn = document.getElementById('story-auto-btn');
  if (storyAutoTimer) {
    clearInterval(storyAutoTimer);
    storyAutoTimer = null;
    btn.textContent = '▶️ Auto Read';
  } else {
    btn.textContent = '⏸️ Stop';
    const playNext = () => {
      const story = storiesData[storyIndex];
      speak(story.sentences[storySentenceIndex].en);
      if (storySentenceIndex < story.sentences.length - 1) {
        storySentenceIndex++;
        renderStory();
        storyAutoTimer = setTimeout(playNext, 3000);
      } else {
        clearInterval(storyAutoTimer);
        storyAutoTimer = null;
        btn.textContent = '▶️ Auto Read';
      }
    };
    playNext();
  }
}

// ==========================================
// Speech Synthesis
// ==========================================
function speak(text) {
  if (!soundEnabled) return;
  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = 0.85;
  utterance.pitch = 1.1;

  // Pick a friendly voice
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang.startsWith('en') && v.name.includes('Female'))
    || voices.find(v => v.lang.startsWith('en-US'))
    || voices.find(v => v.lang.startsWith('en'));
  if (preferred) utterance.voice = preferred;

  window.speechSynthesis.speak(utterance);
}

// Preload voices
window.speechSynthesis.onvoiceschanged = () => { window.speechSynthesis.getVoices(); };
window.speechSynthesis.getVoices();

function toggleSound() {
  soundEnabled = !soundEnabled;
  document.querySelectorAll('.sound-toggle').forEach(btn => {
    btn.textContent = soundEnabled ? '🔊' : '🔇';
    if (!soundEnabled) btn.classList.add('muted');
    else btn.classList.remove('muted');
  });
}

// ==========================================
// Effects
// ==========================================
function sparkleAt(x, y, count) {
  const emojis = ['⭐', '✨', '🌟', '💫', '🎉', '💖'];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('span');
    el.className = 'sparkle';
    el.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 80;
    el.style.setProperty('--sx', Math.cos(angle) * dist + 'px');
    el.style.setProperty('--sy', Math.sin(angle) * dist + 'px');
    el.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
}

function showStarReward(x, y) {
  const el = document.createElement('span');
  el.className = 'star-reward';
  el.textContent = '🌟';
  el.style.left = (x - 25) + 'px';
  el.style.top = (y - 25) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

// ==========================================
// Floating Stars Background
// ==========================================
function createFloatingStars() {
  const container = document.getElementById('stars-container');
  const emojis = ['⭐', '✨', '🌈', '💫', '🎵'];
  for (let i = 0; i < 15; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    star.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    star.style.left = Math.random() * 100 + '%';
    star.style.animationDuration = (8 + Math.random() * 12) + 's';
    star.style.animationDelay = Math.random() * 10 + 's';
    star.style.fontSize = (16 + Math.random() * 24) + 'px';
    container.appendChild(star);
  }
}

// ==========================================
// Alphabet
// ==========================================
function renderAlphabet() {
  const grid = document.getElementById('alphabet-grid');
  grid.innerHTML = '';

  alphabetData.forEach(data => {
    const card = document.createElement('div');
    card.className = 'letter-card';

    if (alphaMode === 'letter') {
      card.textContent = data.letter;
      card.addEventListener('click', (e) => {
        speak(data.letter);
        sparkleAt(e.clientX, e.clientY, 5);
        showBigLetter(data);
      });
    } else if (alphaMode === 'word') {
      card.innerHTML = `${data.emoji}<span class="word-hint">${data.word}</span>`;
      card.style.fontSize = '40px';
      card.addEventListener('click', (e) => {
        speak(data.word);
        sparkleAt(e.clientX, e.clientY, 8);
      });
    } else {
      // mixed - show letter but show word/emoji on tap
      card.textContent = data.letter;
      card.addEventListener('click', (e) => {
        showBigLetter(data);
        speak(data.word + '. ' + data.letter);
        sparkleAt(e.clientX, e.clientY, 6);
      });
    }

    grid.appendChild(card);
  });
}

function switchAlphaMode(mode, btn) {
  alphaMode = mode;
  document.querySelectorAll('.mode-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  renderAlphabet();
}

function showBigLetter(data) {
  document.getElementById('big-letter-char').textContent = data.letter;
  document.getElementById('big-letter-word').textContent = data.word;
  document.getElementById('big-letter-emoji').textContent = data.emoji;
  document.getElementById('big-letter-overlay').classList.remove('hidden');
}

function hideBigLetter() {
  document.getElementById('big-letter-overlay').classList.add('hidden');
}

// ==========================================
// Colors
// ==========================================
function renderColors() {
  const grid = document.getElementById('colors-grid');
  grid.innerHTML = '';

  colorsData.forEach(data => {
    const card = document.createElement('div');
    card.className = 'color-card';
    card.style.background = data.hex;
    // Adjust text color for light backgrounds
    const isLight = ['White', 'Yellow'].includes(data.name);
    card.style.color = isLight ? '#333' : '#fff';
    card.style.textShadow = isLight ? 'none' : '1px 1px 3px rgba(0,0,0,0.4)';

    card.innerHTML = `${data.emoji}<br>${data.name}`;

    card.addEventListener('click', (e) => {
      speak(data.name);
      sparkleAt(e.clientX, e.clientY, 8);
      showStarReward(e.clientX, e.clientY);
    });

    grid.appendChild(card);
  });
}

// --- Color Quiz ---
function newColorQuiz() {
  const target = colorsData[Math.floor(Math.random() * colorsData.length)];
  const options = [target];
  while (options.length < 4) {
    const candidate = colorsData[Math.floor(Math.random() * colorsData.length)];
    if (!options.find(o => o.name === candidate.name)) {
      options.push(candidate);
    }
  }
  // Shuffle
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  currentColorQuiz = target;
  document.getElementById('color-target-name').textContent = target.name;
  document.getElementById('color-quiz-feedback').textContent = '';

  const optsContainer = document.getElementById('color-quiz-options');
  optsContainer.innerHTML = '';

  setTimeout(() => {
    speak('Find ' + target.name);
  }, 300);

  options.forEach(opt => {
    const el = document.createElement('div');
    el.className = 'quiz-option';
    el.style.background = opt.hex;
    el.addEventListener('click', (e) => {
      if (opt.name === target.name) {
        el.classList.add('correct');
        document.getElementById('color-quiz-feedback').textContent = '🎉 Great job! ' + target.name + '!';
        document.getElementById('color-quiz-feedback').style.color = '#2ed573';
        speak('Great job! It is ' + target.name);
        showStarReward(e.clientX, e.clientY);
      } else {
        el.classList.add('wrong');
        document.getElementById('color-quiz-feedback').textContent = 'Oops! That\'s ' + opt.name + '. Try again!';
        document.getElementById('color-quiz-feedback').style.color = '#ff6b6b';
        speak('That is ' + opt.name + '. Try again!');
      }

      // Disable further clicks
      document.querySelectorAll('#color-quiz-options .quiz-option').forEach(o => {
        o.style.pointerEvents = 'none';
      });

      if (opt.name !== target.name) {
        // Re-enable after a moment
        setTimeout(() => {
          document.querySelectorAll('#color-quiz-options .quiz-option').forEach(o => {
            o.classList.remove('wrong', 'correct');
            o.style.pointerEvents = 'auto';
          });
          document.getElementById('color-quiz-feedback').textContent = '';
        }, 1500);
      }
    });
    optsContainer.appendChild(el);
  });
}

// ==========================================
// Shapes
// ==========================================
function renderShapes() {
  const grid = document.getElementById('shapes-grid');
  grid.innerHTML = '';

  shapesData.forEach(data => {
    const card = document.createElement('div');
    card.className = 'shape-card';

    card.innerHTML = `<span class="shape-icon">${data.emoji}</span><span class="shape-name">${data.name}</span>`;

    card.addEventListener('click', (e) => {
      speak(data.name);
      sparkleAt(e.clientX, e.clientY, 6);
    });

    grid.appendChild(card);
  });
}

// --- Shape Tracing ---
function drawShape(svgType) {
  const svg = document.getElementById('trace-svg');
  svg.innerHTML = '';

  const ns = 'http://www.w3.org/2000/svg';
  let path;

  switch (svgType) {
    case 'circle':
      path = document.createElementNS(ns, 'circle');
      path.setAttribute('cx', '150'); path.setAttribute('cy', '150');
      path.setAttribute('r', '100');
      break;
    case 'square':
      path = document.createElementNS(ns, 'rect');
      path.setAttribute('x', '40'); path.setAttribute('y', '40');
      path.setAttribute('width', '220'); path.setAttribute('height', '220');
      path.setAttribute('rx', '20');
      break;
    case 'triangle':
      path = document.createElementNS(ns, 'polygon');
      path.setAttribute('points', '150,30 280,260 20,260');
      break;
    case 'rectangle':
      path = document.createElementNS(ns, 'rect');
      path.setAttribute('x', '30'); path.setAttribute('y', '60');
      path.setAttribute('width', '240'); path.setAttribute('height', '180');
      path.setAttribute('rx', '15');
      break;
    case 'star':
      path = document.createElementNS(ns, 'polygon');
      const starPts = [];
      for (let i = 0; i < 10; i++) {
        const r = i % 2 === 0 ? 120 : 55;
        const angle = (Math.PI / 5) * i - Math.PI / 2;
        starPts.push(`${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`);
      }
      path.setAttribute('points', starPts.join(' '));
      break;
    case 'heart':
      path = document.createElementNS(ns, 'path');
      path.setAttribute('d', 'M150,260 C60,180 10,120 40,70 C70,20 150,50 150,50 C150,50 230,20 260,70 C290,120 240,180 150,260Z');
      break;
    case 'diamond':
      path = document.createElementNS(ns, 'polygon');
      path.setAttribute('points', '150,20 280,150 150,280 20,150');
      break;
    case 'oval':
      path = document.createElementNS(ns, 'ellipse');
      path.setAttribute('cx', '150'); path.setAttribute('cy', '150');
      path.setAttribute('rx', '130'); path.setAttribute('ry', '90');
      break;
  }

  if (path) {
    path.setAttribute('class', 'shape-svg-' + svgType);
    path.setAttribute('stroke-width', '6');
    path.setAttribute('stroke-dasharray', '12 8');
    path.setAttribute('fill', 'none');

    // Add a wide transparent stroke for easier touch
    path.style.strokeWidth = '6';

    svg.appendChild(path);
  }

  // Add trace interaction
  svg.style.pointerEvents = 'auto';
  let traced = false;

  const onMove = (e) => {
    if (!traced) {
      traced = true;
      if (path) {
        path.setAttribute('stroke-dasharray', 'none');
        path.style.stroke = '#2ed573';
      }
      document.getElementById('trace-hint').textContent = '🎉 You traced it! Great job!';
      const rect = svg.getBoundingClientRect();
      sparkleAt(rect.left + rect.width / 2, rect.top + rect.height / 2, 10);
      speak(currentTraceShape ? currentTraceShape.name : '');
    }
  };

  svg.onpointermove = onMove;
  svg.ontouchmove = (e) => { e.preventDefault(); onMove(e); };
}

function newTraceShape() {
  const shape = shapesData[Math.floor(Math.random() * shapesData.length)];
  currentTraceShape = shape;
  document.getElementById('trace-hint').textContent = 'Move your finger or mouse over the dotted ' + shape.name + '!';
  drawShape(shape.svgType);
}

// ==========================================
// Keyboard shortcut: Escape to go home
// ==========================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (!document.getElementById('big-letter-overlay').classList.contains('hidden')) {
      hideBigLetter();
    } else {
      showPage('home-page');
    }
  }
});

// ==========================================
// Init
// ==========================================
function init() {
  createFloatingStars();
  renderAlphabet();
  renderColors();
  renderShapes();
  renderDailyPhrase();
  renderSkit();
  renderStory();

  if (window.speechSynthesis) {
    window.speechSynthesis.getVoices();
  }
}

document.addEventListener('DOMContentLoaded', init);
