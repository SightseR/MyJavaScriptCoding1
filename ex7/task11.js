function updateTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const timeString = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    const timeElement = document.getElementById('current-time');
    timeElement.textContent = timeString;

    if (seconds % 2 === 0) {
      timeElement.className = 'bisque';
    } else {
      timeElement.className = 'cadetblue';
    }
  }

  setInterval(updateTime, 1000);