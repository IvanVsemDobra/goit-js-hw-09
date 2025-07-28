const formEl = document.querySelector('.feedback-form');


let formData = {
  email: '',
  message: '',
};

// Ключ для Local Storage
const STORAGE_KEY = 'feedback-form-state';

// Відстеження введення даних у форму
formEl.addEventListener('input', e => {
  const email = formEl.elements.email.value.trim();
  const message = formEl.elements.message.value.trim();

  formData.email = email;
  formData.message = message;

  saveToLS(STORAGE_KEY, formData); 
});

// Відновлення даних із localStorage після перезавантаження сторінки
document.addEventListener('DOMContentLoaded', () => {
  const savedData = getFromLS(STORAGE_KEY);

  if (savedData) {
    formData = savedData; 
    formEl.elements.email.value = savedData.email || '';
    formEl.elements.message.value = savedData.message || '';
  }
});


formEl.addEventListener('submit', e => {
  e.preventDefault();

  // Перевірка 
  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log('Form submitted:', formData); 
  localStorage.removeItem(STORAGE_KEY); 
  formEl.reset(); // Очищаємо форму
  formData = { email: '', message: '' }; 
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function getFromLS(key) {
  const jsonData = localStorage.getItem(key);
  try {
    return JSON.parse(jsonData);
  } catch {
    return null;
  }
}
