fetch('./data.json')
  .then(res => res.json())
  .then(data => {
    const gallery = document.getElementById('gallery');

    data.forEach(item => {
      const img = document.createElement('img');
      img.src = item.image;

      // Random placement
      const bodyWidth = document.body.scrollWidth - 150;  // minus image width
      const bodyHeight = document.body.scrollHeight - 150;
      
      img.style.top = Math.random() * bodyHeight + 'px';
      img.style.left = Math.random() * bodyWidth + 'px';

      gallery.appendChild(img);

      // Tooltip
      const tooltip = document.createElement('div');
      tooltip.className = 'tooltip';
      tooltip.innerText = item.prompt;
      document.body.appendChild(tooltip);

      img.addEventListener('mousemove', (e) => {
        const tooltipWidth = 250; // same as CSS max-width
        const tooltipHeight = 50; // approx
      
        // Use pageX/pageY instead of clientX/clientY
        let x = e.pageX + 20;
        let y = e.pageY + 20;
      
        // Prevent tooltip from going outside window edges
        if (x + tooltipWidth > window.scrollX + window.innerWidth) {
          x = e.pageX - tooltipWidth - 20;
        }
        if (y + tooltipHeight > window.scrollY + window.innerHeight) {
          y = e.pageY - tooltipHeight - 20;
        }
      
        tooltip.style.top = y + 'px';
        tooltip.style.left = x + 'px';
        tooltip.style.opacity = 1;
      });
      
      

      img.addEventListener('mouseleave', () => {
        tooltip.style.opacity = 0;
      });
    });
  });


