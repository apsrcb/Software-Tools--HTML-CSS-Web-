// Get references to the elements
const notepadTextArea = document.getElementById('notepad');
const saveButton = document.getElementById('save-btn');
const loadButton = document.getElementById('load-btn');
const clearButton = document.getElementById('clear-btn');
const wordCountElement = document.getElementById('word-count');
const charCountElement = document.getElementById('char-count');
const boldButton = document.getElementById('bold-btn');
const italicButton = document.getElementById('italic-btn');
const underlineButton = document.getElementById('underline-btn');
const printButton = document.getElementById('print-btn');

// Load the saved text from local storage (if available)
const savedText = localStorage.getItem('notepadText');
if (savedText) {
  notepadTextArea.value = savedText;
}

// Function to update word and character count
function updateWordCharCount() {
  const text = notepadTextArea.value;
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const charCount = text.length;
  wordCountElement.textContent = wordCount;
  charCountElement.textContent = charCount;
}

// Word Count and Character Count
notepadTextArea.addEventListener('input', () => {
  updateWordCharCount();
});

// Autosave
const autosaveInterval = 5000; // Save every 5 seconds
let autosaveTimeout;

notepadTextArea.addEventListener('input', () => {
  clearTimeout(autosaveTimeout);
  autosaveTimeout = setTimeout(() => {
    const text = notepadTextArea.value;
    localStorage.setItem('notepadText', text);
    console.log('Autosaved.');
  }, autosaveInterval);
});

// Event listeners for buttons
saveButton.addEventListener('click', () => {
  const text = notepadTextArea.value;
  localStorage.setItem('notepadText', text);
  alert('Text saved successfully!');
});

loadButton.addEventListener('click', () => {
  const savedText = localStorage.getItem('notepadText');
  if (savedText) {
    notepadTextArea.value = savedText;
    updateWordCharCount(); // Update word and character count after loading
    alert('Text loaded successfully!');
  } else {
    alert('No saved text found.');
  }
});

clearButton.addEventListener('click', () => {
  notepadTextArea.value = '';
  localStorage.removeItem('notepadText');
  updateWordCharCount(); // Update word and character count after clearing
  alert('Notepad cleared successfully!');
});

// Text Formatting Options
boldButton.addEventListener('click', () => {
  document.execCommand('bold', false, null);
});

italicButton.addEventListener('click', () => {
  document.execCommand('italic', false, null);
});

underlineButton.addEventListener('click', () => {
  document.execCommand('underline', false, null);
});

// Print
printButton.addEventListener('click', () => {
  window.print();
});

// Initial update of word and character count on page load
updateWordCharCount();
