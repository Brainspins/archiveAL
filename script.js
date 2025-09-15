fetch('./data_original.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('gallery');
    const glitchGrid = document.getElementById('glitch-grid');
    const switcher = document.getElementById('mode-switcher');
    const instruction = document.getElementById('instruction');

    // --- render gallery (your original) ---
    function renderGallery() {
      gallery.innerHTML = '';
      data.forEach(item => {
        const img = document.createElement('img');
        img.src = item.image;

        const bodyWidth = document.body.scrollWidth - 150;
        const bodyHeight = document.body.scrollHeight - 150;
        img.style.top = Math.random() * bodyHeight + 'px';
        img.style.left = Math.random() * bodyWidth + 'px';

        gallery.appendChild(img);

        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.innerText = item.prompt;
        document.body.appendChild(tooltip);

        img.addEventListener('mousemove', (e) => {
          let x = e.pageX + 20;
          let y = e.pageY + 20;
          if (x + 250 > window.scrollX + window.innerWidth) x = e.pageX - 270;
          if (y + 50 > window.scrollY + window.innerHeight) y = e.pageY - 70;
          tooltip.style.top = y + 'px';
          tooltip.style.left = x + 'px';
          tooltip.style.opacity = 1;
        });
        img.addEventListener('mouseleave', () => { tooltip.style.opacity = 0; });
      });
    }

    // --- render glitch mode (new) ---
    fetch('./glitchData.json')
      .then(r => r.json())
      .then(glitchData => {
        function renderGlitch() {
          glitchGrid.innerHTML = '';
          glitchData.forEach(item => {
            const cell = document.createElement('div');
            cell.className = 'glitch-cell';

            const img = document.createElement('img');
            img.src = item.image;

            const text = document.createElement('div');
            text.textContent = item.text;

            const audio = document.createElement('audio');
            audio.src = item.audio;

            cell.appendChild(img);
            cell.appendChild(text);
            cell.appendChild(audio);

            cell.addEventListener('mouseenter', () => {
              audio.play();
            });
            cell.addEventListener('mouseleave', () => {
              audio.pause();
              audio.currentTime = 0;
            });

            glitchGrid.appendChild(cell);
          });
        }

        // --- mode switcher ---
        let inGlitch = false;
        switcher.addEventListener('click', () => {
          inGlitch = !inGlitch;
          if (inGlitch) {
            document.body.classList.add('glitch-mode');
            document.body.classList.remove('gallery-mode');
            gallery.style.display = 'none';
            glitchGrid.style.display = 'grid';
            instruction.style.display = 'block';
            document.body.style.background = '#fff';
            renderGlitch();
            switcher.textContent = 'Back to Gallery';
          } else {
            document.body.classList.add('gallery-mode');
            document.body.classList.remove('glitch-mode');
            glitchGrid.style.display = 'none';
            instruction.style.display = 'none';
            gallery.style.display = 'block';
            document.body.style.background = '#0e1158ff';
            renderGallery();
            switcher.textContent = 'Glitch Mode';
          }
        });

        // init default
        renderGallery();
      });
  });


