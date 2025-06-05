document.addEventListener('DOMContentLoaded', () => {
  fetch('modules/audio.html')
    .then(res => res.text())
    .then(html => {
      const container = document.getElementById('test-container');
      container.innerHTML = html;

      container.querySelectorAll('.fold-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
          const section = toggle.closest('.foldable');
          section.classList.toggle('collapsed');

          toggle.textContent = toggle.textContent.includes('▾')
            ? toggle.textContent.replace('▾', '▸')
            : toggle.textContent.replace('▸', '▾');
        });
      });
    });
});
