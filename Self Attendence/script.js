// --- TIMETABLE & CONFIG ---
const timetable = {
    1: [{ name: 'Fundamentals of Block Chain Technology', time: '11:40 AM – 12:30 PM', location: 'AB3-407' }],
    2: [{ name: 'Fundamentals of Block Chain Technology', time: '08:55 AM – 09:45 AM', location: 'AB3-407' }, { name: 'Computer Networks', time: '09:50 AM – 10:40 AM', location: 'AB3-109' }, { name: 'Human Computer Interaction', time: '10:45 AM – 11:35 AM', location: 'AB3-513' }, { name: 'Web Programming', time: '11:40 AM – 12:30 PM', location: 'AB3-205' }, { name: 'Web Programming Lab', time: '03:50 PM – 05:30 PM', location: 'AB1-514' }],
    3: [{ name: 'Human Computer Interaction', time: '08:00 AM – 08:50 AM', location: 'AB3-513' }, { name: 'Computer Networks Lab', time: '03:50 PM – 05:30 PM', location: 'AB3-310' }],
    4: [{ name: 'Fundamentals of Block Chain Technology', time: '09:50 AM – 10:40 AM', location: 'AB3-407' }, { name: 'Computer Networks', time: '10:45 AM – 11:30 AM', location: 'AB3-109' }, { name: 'Web Programming Lab', time: '03:50 PM – 05:30 PM', location: 'AB1-514' }],
    5: [{ name: 'Computer Networks', time: '08:00 AM – 08:50 AM', location: 'AB3-109' }, { name: 'Human Computer Interaction', time: '08:55 AM – 09:45 AM', location: 'AB3-513' }],
    0: [], 6: []
};
const allCourses = ["Web Programming", "Computer Networks", "Human Computer Interaction", "Fundamentals of Block Chain Technology", "Computer Networks Lab", "Web Programming Lab"];

// --- DOM ELEMENTS ---
const navDashboard = document.getElementById('nav-dashboard');
const navSummary = document.getElementById('nav-summary');
const pageDashboard = document.getElementById('page-dashboard');
const pageSummary = document.getElementById('page-summary');
const datePicker = document.getElementById('date-picker');
const scheduleContainer = document.getElementById('schedule-container');
const summaryTableBody = document.getElementById('summary-table-body');
const modal = document.getElementById('details-modal');

// --- NAVIGATION LOGIC ---
navDashboard.addEventListener('click', () => {
    pageSummary.classList.remove('active');
    pageDashboard.classList.add('active');
    navSummary.classList.remove('active');
    navDashboard.classList.add('active');
});
navSummary.addEventListener('click', () => {
    pageDashboard.classList.remove('active');
    pageSummary.classList.add('active');
    navDashboard.classList.remove('active');
    navSummary.classList.add('active');
    updateSummary();
});

// --- ANIMATED COUNTER ---
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
}

// --- CORE APP FUNCTIONS ---
function displaySchedule() {
    const selectedDate = new Date(datePicker.value + 'T00:00:00Z');
    const dayOfWeek = selectedDate.getUTCDay();
    const dateKey = datePicker.value;
    scheduleContainer.innerHTML = '';
    const classesToday = timetable[dayOfWeek] || [];
    const savedAttendance = JSON.parse(localStorage.getItem(dateKey) || '{}');
    if (classesToday.length === 0) {
        scheduleContainer.innerHTML = `<div id="message">🎉 No classes scheduled.</div>`; return;
    }
    classesToday.forEach(course => {
        const courseName = course.name;
        const status = savedAttendance[courseName];
        const presentSelected = status === true ? 'selected' : '';
        const absentSelected = status === false ? 'selected' : '';
        const classElement = document.createElement('div');
        classElement.className = 'class-item';
        classElement.innerHTML = `<div class="class-details"><h3>${courseName}</h3></div><div class="attendance-marker"><button class="att-btn present ${presentSelected}" data-course="${courseName}" data-status="present">Present</button><button class="att-btn absent ${absentSelected}" data-course="${courseName}" data-status="absent">Absent</button></div>`;
        scheduleContainer.appendChild(classElement);
    });
}

scheduleContainer.addEventListener('click', function (event) {
    if (!event.target.classList.contains('att-btn')) return;
    const button = event.target;
    const courseName = button.dataset.course;
    const statusToSet = button.dataset.status;
    const dateKey = datePicker.value;
    const savedAttendance = JSON.parse(localStorage.getItem(dateKey) || '{}');
    savedAttendance[courseName] = (statusToSet === 'present');
    localStorage.setItem(dateKey, JSON.stringify(savedAttendance));
    button.parentElement.querySelectorAll('.att-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
});

function updateSummary() {
    const summary = {};
    allCourses.forEach(course => { summary[course] = { total: 0, attended: 0 }; });
    for (let i = 0; i < localStorage.length; i++) {
        const dateKey = localStorage.key(i);
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
            const savedDate = new Date(dateKey + 'T00:00:00Z');
            const dayOfWeek = savedDate.getUTCDay();
            const classesOnThisDay = timetable[dayOfWeek] || [];
            const savedAttendance = JSON.parse(localStorage.getItem(dateKey) || '{}');
            classesOnThisDay.forEach(course => {
                if (savedAttendance.hasOwnProperty(course.name)) {
                    summary[course.name].total++;
                    if (savedAttendance[course.name] === true) summary[course.name].attended++;
                }
            });
        }
    }
    renderSummaryTable(summary);
}

function renderSummaryTable(summary) {
    summaryTableBody.innerHTML = '';
    allCourses.forEach(courseName => {
        const data = summary[courseName];
        const row = document.createElement('tr');
        if (data.total === 0) {
            row.innerHTML = `<td data-label="Course"><strong>${courseName}</strong></td><td data-label="Total">0</td><td data-label="Attended">0</td><td data-label="Percentage"><span class="percentage">-</span></td><td data-label="Status"><span class="status-neutral">No data</span></td><td data-label="Details">-</td>`;
        } else {
            const percentage = (data.attended / data.total) * 100;
            const percentageClass = percentage >= 75 ? 'good' : 'bad';
            let statusText = (percentage >= 75) ? `<span class="status-good">Can skip ${Math.floor((4.0 * data.attended / 3.0) - data.total)}</span>` : `<span class="status-bad">Must attend ${Math.max(0, (3 * data.total) - (4 * data.attended))}</span>`;
            row.innerHTML = `<td data-label="Course"><strong>${courseName}</strong></td><td data-label="Total" class="animated-total">${data.total}</td><td data-label="Attended" class="animated-attended">${data.attended}</td><td data-label="Percentage"><span class="percentage ${percentageClass}">${percentage.toFixed(0)}%</span></td><td data-label="Status">${statusText}</td><td data-label="Details"><button class="details-btn" data-course="${courseName}">View</button></td>`;
        }
        summaryTableBody.appendChild(row);
        const totalCell = row.querySelector('.animated-total');
        if (totalCell) animateValue(totalCell, 0, data.total, 800);
        const attendedCell = row.querySelector('.animated-attended');
        if (attendedCell) animateValue(attendedCell, 0, data.attended, 800);
    });
}

function showDetailsModal(courseName) {
    document.getElementById('modal-title').textContent = `${courseName} Details`;
    const detailsTableBody = document.querySelector('#details-table tbody');
    detailsTableBody.innerHTML = '';
    let history = [];
    for (let i = 0; i < localStorage.length; i++) {
        const dateKey = localStorage.key(i);
        if (/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) {
            const savedDate = new Date(dateKey + 'T00:00:00Z');
            const dayOfWeek = savedDate.getUTCDay();
            const classesOnThisDay = timetable[dayOfWeek] || [];
            const savedAttendance = JSON.parse(localStorage.getItem(dateKey) || '{}');
            const courseInfo = classesOnThisDay.find(c => c.name === courseName);
            if (courseInfo && savedAttendance.hasOwnProperty(courseName)) {
                history.push({ date: dateKey, day: savedDate.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(), status: savedAttendance[courseName], time: courseInfo.time, location: courseInfo.location });
            }
        }
    }
    history.sort((a, b) => new Date(b.date) - new Date(a.date));
    history.forEach((record, index) => {
        const statusClass = record.status ? '' : 'status-absent';
        const statusText = record.status ? 'Present' : 'Absent';
        detailsTableBody.innerHTML += `<tr><td>${index + 1}</td><td>${record.date}</td><td>${record.location}</td><td>${record.day}, ${record.time}</td><td class="${statusClass}">${statusText}</td></tr>`;
    });
    modal.style.display = 'block';
}

function initializePage() {
    const today = new Date();
    datePicker.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    datePicker.addEventListener('change', displaySchedule);
    summaryTableBody.addEventListener('click', (event) => {
        if (event.target.classList.contains('details-btn')) showDetailsModal(event.target.getAttribute('data-course'));
    });
    window.onclick = (event) => { if (event.target == modal) modal.style.display = "none"; };
    document.getElementById('clear-data-btn').addEventListener('click', () => {
        if (confirm("Are you sure? This will clear ALL attendance data.")) {
            Object.keys(localStorage).filter(k => /^\d{4}-\d{2}-\d{2}$/.test(k)).forEach(k => localStorage.removeItem(k));
            alert("All attendance data has been cleared.");
            displaySchedule(); updateSummary();
        }
    });
    displaySchedule();
}

initializePage();
