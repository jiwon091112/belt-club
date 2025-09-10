// 간단한 인메모리 데이터베이스 역할
let events = [
    // 예시: 9시 ~ 10시 일정
    { id: 1, name: '기존 회의', start: new Date(new Date().setHours(9, 0, 0, 0)), end: new Date(new Date().setHours(10, 0, 0, 0)) },
];

const workHours = {
    start: 9,
    end: 18,
};

function findBestSlotAndAddEvent(eventName, durationInMinutes) {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // 날짜만 비교하기 위해 시간 초기화

    // 오늘 날짜의 이벤트만 필터링하고 시작 시간 기준으로 정렬
    const todaysEvents = events
        .filter(event => {
            const eventDate = new Date(event.start);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate.getTime() === today.getTime();
        })
        .sort((a, b) => a.start - b.start);

    let searchStart = new Date();
    searchStart.setHours(workHours.start, 0, 0, 0);

    // 오늘 일정들 사이의 빈틈 확인
    for (const event of todaysEvents) {
        if (event.start > searchStart) {
            const freeTime = event.start.getTime() - searchStart.getTime();
            if (freeTime >= durationInMinutes * 60 * 1000) {
                return addEvent(eventName, searchStart, durationInMinutes);
            }
        }
        searchStart = event.end > searchStart ? event.end : searchStart;
    }

    // 마지막 일정 이후와 업무 종료 시간 사이의 빈틈 확인
    const workEnd = new Date();
    workEnd.setHours(workHours.end, 0, 0, 0);
    if (workEnd.getTime() - searchStart.getTime() >= durationInMinutes * 60 * 1000) {
        return addEvent(eventName, searchStart, durationInMinutes);
    }

    throw new Error('오늘 업무 시간 내에 가능한 시간을 찾을 수 없습니다.');
}

function addEvent(name, start, durationInMinutes) {
    const event = {
        id: events.length + 1,
        name,
        start,
        end: new Date(start.getTime() + durationInMinutes * 60 * 1000),
    };
    events.push(event);
    return event;
}

// 테스트: 30분짜리 새로운 이벤트 추가
try {
    const newEvent = findBestSlotAndAddEvent('새로운 회의', 30);
    console.log('새 일정 추가됨:', newEvent);
} catch (error) {
    console.error(error.message);
}

module.exports = { findBestSlotAndAddEvent, addEvent };