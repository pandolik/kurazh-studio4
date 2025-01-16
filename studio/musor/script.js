// Open menu
document.addEventListener('click', documentClick);

function documentClick(e) {
    const targetItem = e.target;
    if(targetItem.closest('.icon-menu')){
        document.documentElement.classList.toggle('menu-open');
    }
}

// Scroll
window.onscroll = function() {
  var el = document.getElementsByTagName('header')[0];
  var className = 'small';
  if (el.classList) {
    if (window.scrollY > 10)
      el.classList.add(className);
    else
      el.classList.remove(className);
  }
};

// button
const button = document.getElementById('button-our-projects-more');
        const blocks = document.querySelectorAll('.block-container');

        button.addEventListener('click', function() {
            blocks.forEach(block => {
                block.style.display = block.style.display === 'none' ? 'flex' : 'none';
            });
        });

