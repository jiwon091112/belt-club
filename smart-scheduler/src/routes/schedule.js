const express = require('express');
const { findBestSlotAndAddEvent, getSchedules } = require('../logic/scheduler');
const router = express.Router();

// 현재 모든 일정 가져오기
router.get('/schedules', (req, res) => {
    res.json(getSchedules());
});

// 새 일정 추가하기
router.post('/schedule', (req, res) => {
    const { eventName, duration } = req.body;

    if (!eventName || !duration) {
        return res.status(400).json({ message: '일정 이름과 소요 시간을 입력해야 합니다.' });
    }

    try {
        const newEvent = findBestSlotAndAddEvent(eventName, duration);
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;