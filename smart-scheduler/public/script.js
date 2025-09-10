document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('schedule-form');
    const eventNameInput = document.getElementById('event-name');
    const eventDurationInput = document.getElementById('event-duration');
    const scheduleList = document.getElementById('schedule-list');

    // Load existing schedules on page load
    loadSchedules();

    scheduleForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const eventName = eventNameInput.value.trim();
        const duration = parseInt(eventDurationInput.value);

        if (eventName && duration > 0) {
            try {
                const response = await fetch('/api/schedule/schedule', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        eventName: eventName, 
                        duration: duration 
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    displaySuccess(`새 일정이 추가되었습니다: ${data.name} (${formatTime(data.start)} - ${formatTime(data.end)})`);
                    eventNameInput.value = '';
                    eventDurationInput.value = '';
                    loadSchedules(); // Refresh the schedule list
                } else {
                    const error = await response.json();
                    displayError(error.message || 'Error adding schedule. Please try again.');
                }
            } catch (error) {
                displayError('Network error. Please try again.');
            }
        } else {
            displayError('Please enter a valid event name and duration.');
        }
    });

    async function loadSchedules() {
        try {
            const response = await fetch('/api/schedule/schedules');
            if (response.ok) {
                const schedules = await response.json();
                displaySchedules(schedules);
            }
        } catch (error) {
            console.error('Error loading schedules:', error);
        }
    }

    function displaySchedules(schedules) {
        scheduleList.innerHTML = '';
        if (schedules.length === 0) {
            scheduleList.innerHTML = '<li>No schedules for today</li>';
            return;
        }

        // Filter today's schedules and sort by start time
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todaysSchedules = schedules
            .filter(schedule => {
                const scheduleDate = new Date(schedule.start);
                scheduleDate.setHours(0, 0, 0, 0);
                return scheduleDate.getTime() === today.getTime();
            })
            .sort((a, b) => new Date(a.start) - new Date(b.start));

        todaysSchedules.forEach(schedule => {
            const li = document.createElement('li');
            li.textContent = `${schedule.name}: ${formatTime(schedule.start)} - ${formatTime(schedule.end)}`;
            scheduleList.appendChild(li);
        });

        if (todaysSchedules.length === 0) {
            scheduleList.innerHTML = '<li>No schedules for today</li>';
        }
    }

    function formatTime(dateString) {
        const date = new Date(dateString);
        return date.toLocaleTimeString('ko-KR', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: false
        });
    }

    function displaySuccess(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'success-message';
        messageDiv.textContent = message;
        messageDiv.style.color = 'green';
        messageDiv.style.marginTop = '10px';
        scheduleForm.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 5000);
    }

    function displayError(message) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'error-message';
        messageDiv.textContent = message;
        messageDiv.style.color = 'red';
        messageDiv.style.marginTop = '10px';
        scheduleForm.appendChild(messageDiv);
        setTimeout(() => messageDiv.remove(), 5000);
    }
});