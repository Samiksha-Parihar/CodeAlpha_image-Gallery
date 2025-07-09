document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox-img');
  const closeBtn = document.querySelector('.close-btn');
  const nextBtn = document.querySelector('.next-btn');
  const prevBtn = document.querySelector('.prev-btn');
  const filterBtns = document.querySelectorAll('.filter-btn');

  let currentIndex = 0;
  let filteredItems = items;

  function openLightbox(index) {
    currentIndex = index;
    lightboxImg.src = filteredItems[currentIndex].src;
    lightbox.classList.remove('hidden');
  }

  function closeLightbox() {
    lightbox.classList.add('hidden');
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % filteredItems.length;
    lightboxImg.src = filteredItems[currentIndex].src;
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length;
    lightboxImg.src = filteredItems[currentIndex].src;
  }

  items.forEach((img, idx) => {
    img.addEventListener('click', () => {
      openLightbox(filteredItems.indexOf(img));
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', e => {
    if (e.target === lightbox) closeLightbox();
  });

  // Filter logic
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');

      const cat = btn.dataset.category;
      filteredItems = items.filter(img => {
        const parent = img.closest('.gallery-item');
        return cat === 'all' || parent.dataset.category === cat;
      });

      document.querySelectorAll('.gallery-item').forEach(div => {
        const img = div.querySelector('img');
        div.style.display = filteredItems.includes(img) ? 'block' : 'none';
      });
    });
  });
});
