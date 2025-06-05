document.addEventListener('DOMContentLoaded', () => {
  const modules = ['audio', 'video'];

  modules.forEach(name => {
    fetch(`modules/${name}.html`)
      .then(res => res.text())
      .then(html => {
        const section = document.createElement('div');
        section.innerHTML = html;
        document.getElementById('test-container').appendChild(section);

        section.querySelectorAll('.fold-toggle').forEach(toggle => {
          toggle.addEventListener('click', () => {
            const foldable = toggle.closest('.foldable');
            foldable.classList.toggle('collapsed');

            toggle.textContent = toggle.textContent.includes('▾')
              ? toggle.textContent.replace('▾', '▸')
              : toggle.textContent.replace('▸', '▾');
          });
        });
      });
  });
});
