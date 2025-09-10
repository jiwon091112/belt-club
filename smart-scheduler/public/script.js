document.addEventListener('DOMContentLoaded', () => {
    const scheduleForm = document.getElementById('schedule-form');
    const scheduleInput = document.getElementById('schedule-input');
    const suggestedSchedule = document.getElementById('suggested-schedule');

    scheduleForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const userSchedule = scheduleInput.value;

        if (userSchedule) {
            const response = await fetch('/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schedule: userSchedule }),
            });

            if (response.ok) {
                const data = await response.json();
                suggestedSchedule.innerHTML = `Suggested Schedule: ${data.suggestedTime}`;
            } else {
                suggestedSchedule.innerHTML = 'Error suggesting schedule. Please try again.';
            }
        } else {
            suggestedSchedule.innerHTML = 'Please enter a schedule.';
        }
    });
});