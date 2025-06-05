// Hidden redirect: click the site title 5 times quickly to enter experimental zone
document.addEventListener('DOMContentLoaded', () => {
  const siteTitle = document.getElementById('site-title');
  if (!siteTitle) return;

  let clickCount = 0;
  let lastClickTime = 0;

  siteTitle.addEventListener('click', () => {
    const now = Date.now();

    // Reset if too much time between clicks
    if (now - lastClickTime < 600) {
      clickCount++;
    } else {
      clickCount = 1;
    }

    lastClickTime = now;

    if (clickCount === 5) {
      window.location.href = '/pages/experimental/experimental.html';
    }
  });
});
