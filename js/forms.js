// ============================================
// NailDrip — Form Submission Handler
// ============================================
// Replace this URL with your deployed Google Apps Script URL
const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzMMiAVSJjCpH869XcQCsBVQ2gPdioUbVBBxLcwfVQAkw4N7vLAWZ0T5ZEGhpib5UwOIg/exec';

document.addEventListener('DOMContentLoaded', function () {
  const forms = document.querySelectorAll('.email-form');

  forms.forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const input = form.querySelector('input[type="email"]');
      const button = form.querySelector('button');
      const email = input.value.trim();

      if (!email) return;

      // Determine source based on location on page
      const isWaitlist = form.closest('.waitlist-card');
      const source = isWaitlist ? 'waitlist' : 'newsletter';

      // Disable while submitting
      const originalText = button.textContent;
      button.textContent = 'Sending...';
      button.disabled = true;
      input.disabled = true;

      fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, source: source })
      })
        .then(function () {
          // no-cors means we can't read the response, but if it didn't throw, it sent
          input.value = '';
          button.textContent = "You're in!";
          button.classList.add('btn-success');

          setTimeout(function () {
            button.textContent = originalText;
            button.classList.remove('btn-success');
            button.disabled = false;
            input.disabled = false;
          }, 3000);
        })
        .catch(function () {
          button.textContent = 'Try again';
          button.classList.add('btn-error');

          setTimeout(function () {
            button.textContent = originalText;
            button.classList.remove('btn-error');
            button.disabled = false;
            input.disabled = false;
          }, 3000);
        });
    });
  });
});
