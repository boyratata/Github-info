document.addEventListener('DOMContentLoaded', () => {
  const $ = id => document.getElementById(id)
  const hero = document.querySelector('.hero')
  const projects = document.querySelector('.projects')
  const footer = document.querySelector('footer')
  const loadingBar = $('loading-bar')
  const loadingBarContainer = $('loading-bar-container')

  fetch('https://api.github.com/users/boyratata')
    .then(res => res.json())
    .then(d => {
      $('profile-avatar').src = d.avatar_url
      $('profile-name').textContent = d.name || 'Jay'
      $('profile-bio').textContent = d.bio || 'kaboom'
      $('profile-link').href = d.html_url
    })
    .catch(console.error)

  let width = 0
  const int = setInterval(() => {
    loadingBar.style.width = `${width += 10}%`
    if (width >= 100) {
      clearInterval(int)
      setTimeout(() => {
        [hero, projects, footer].forEach(e => {
          e.style.display = 'block'
          e.classList.add('fade-in')
        })
        loadingBarContainer.style.display = 'none'
      }, 200)
    }
  }, 100)
})
