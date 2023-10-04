fetch('status.md')
  .then(response => response.text())
  .then(text => {
    const statuses = text.split('\n\n');
    const displayStatuses = statuses.slice(0, 5);

    let statusHTML = "";
    for (let status of displayStatuses) {
      const [date, ...content] = status.split(": ");
      const htmlContent = marked.parse(content.join(": "));
      statusHTML += `
        <div class="status">
          <div class="status-item status-avatar">
            <img src="img/avatar.jpg" alt="profile picture">
          </div>
          <div class="status-item status-name">
            <span><strong>Ben Whitfield-Heap</strong></span> | <span>${date}</span>
          </div>
          <div class="status-item status-content">
            ${htmlContent}
          </div>
        </div>
      `;
    }
    
    document.getElementById('status-list').innerHTML = statusHTML;
  })
  .catch(error => {
    console.error('Error fetching status:', error);
  });
