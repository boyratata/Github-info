document.addEventListener('DOMContentLoaded', () => {
  const loadingBar = document.getElementById('loading-bar');
  const loadingBarContainer = document.getElementById('loading-bar-container');
  const hero = document.querySelector('.hero');
  const projects = document.querySelector('.projects');
  const footer = document.querySelector('footer');

  function loadProfile() {
    fetch('https://api.github.com/users/boyratata')
      .then(response => response.json())
      .then(data => {
        document.getElementById('profile-avatar').src = data.avatar_url;
        document.getElementById('profile-name').textContent = data.name || 'Jay';
        document.getElementById('profile-bio').textContent = data.bio || 'kaboom',
        document.getElementById('profile-link').href = data.html_url;
      })
      .catch(error => console.error('Error fetching GitHub profile:', error));
  }

  function showContent() {
    hero.style.display = 'block';
    projects.style.display = 'block';
    footer.style.display = 'block';
    loadingBarContainer.style.display = 'none';

    hero.classList.add('fade-in');
    projects.classList.add('fade-in');
    footer.classList.add('fade-in');
  }

  function updateLoadingBar() {
    let width = 0;
    const interval = setInterval(() => {
      width += 10;
      loadingBar.style.width = `${width}%`;
      if (width >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          showContent();
        }, 200);
      }
    }, 100);
  }

  loadProfile();
  updateLoadingBar();
});
