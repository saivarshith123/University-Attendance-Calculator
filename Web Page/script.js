function showCalculator(type) {
    const navTheory = document.getElementById('nav-theory');
    const navLab = document.getElementById('nav-lab');
    const theoryCalculator = document.getElementById('theory-calculator');
    const labCalculator = document.getElementById('lab-calculator');

    if (type === 'theory') {
        labCalculator.classList.remove('active');
        theoryCalculator.classList.add('active');
        navLab.classList.remove('active');
        navTheory.classList.add('active');
    } else if (type === 'lab') {
        theoryCalculator.classList.remove('active');
        labCalculator.classList.add('active');
        navTheory.classList.remove('active');
        navLab.classList.add('active');
    }
}

function showResult(element, message, type) {
    element.innerHTML = message;
    element.className = 'result-container ' + type;
    element.style.display = 'block';
}

function calculateTheoryAttendance() {
    const theoryTotalInput = document.getElementById('theory-total');
    const theoryAttendedInput = document.getElementById('theory-attended');
    const theoryResultDiv = document.getElementById('theory-result');

    const total = parseInt(theoryTotalInput.value);
    const attended = parseInt(theoryAttendedInput.value);

    if (isNaN(total) || isNaN(attended) || total < 0 || attended < 0) {
        showResult(theoryResultDiv, "Error: Please enter valid, non-negative numbers.", 'error');
        return;
    }
    if (attended > total) {
        showResult(theoryResultDiv, "Error: Attended classes cannot be greater than total classes.", 'error');
        return;
    }

    const currentPercentage = total > 0 ? (attended / total) * 100 : 0;
    let message = `Your current attendance is ${Math.floor(currentPercentage)}%.<br>`;

    if (currentPercentage >= 75) {
        const skippable = Math.floor((4 * attended / 3) - total);
        const classText = skippable === 1 ? "class" : "classes";
        message += `To maintain 75%, you can skip the next ${skippable} ${classText}.`;
        showResult(theoryResultDiv, message, 'success');
    } else {
        const needed = (3 * total) - (4 * attended);
        const classText = needed === 1 ? "class" : "classes";
        message += `You must attend the next ${needed} consecutive ${classText} to reach 75%.`;
        showResult(theoryResultDiv, message, 'warning');
    }
}

function calculateLabAttendance() {
    const labTotalInput = document.getElementById('lab-total');
    const labAttendedInput = document.getElementById('lab-attended');
    const labResultDiv = document.getElementById('lab-result');
    
    const totalTheory = parseInt(labTotalInput.value);
    const attendedTheory = parseInt(labAttendedInput.value);

    if (isNaN(totalTheory) || isNaN(attendedTheory) || totalTheory < 0 || attendedTheory < 0) {
        showResult(labResultDiv, "Error: Please enter valid, non-negative numbers.", 'error');
        return;
    }
    if (totalTheory % 2 !== 0 || attendedTheory % 2 !== 0) {
        showResult(labResultDiv, "Error: Lab hour equivalents must be even numbers.", 'error');
        return;
    }
    if (attendedTheory > totalTheory) {
        showResult(labResultDiv, "Error: Attended hours cannot be greater than total hours.", 'error');
        return;
    }
    
    const totalLabs = Math.floor(totalTheory / 2);
    const attendedLabs = Math.floor(attendedTheory / 2);
    
    const currentPercentage = totalLabs > 0 ? (attendedLabs / totalLabs) * 100 : 0;
    let message = `Your current lab attendance is ${Math.floor(currentPercentage)}%.<br>`;

    if (currentPercentage >= 75) {
        const skippable = Math.floor((4 * attendedLabs / 3) - totalLabs);
        const labText = skippable === 1 ? "lab" : "labs";
        message += `To maintain 75%, you can skip the next ${skippable} ${labText}.`;
        showResult(labResultDiv, message, 'success');
    } else {
        const needed = (3 * totalLabs) - (4 * attendedLabs);
        const labText = needed === 1 ? "lab" : "labs";
        message += `You must attend the next ${needed} consecutive ${labText} to reach 75%.`;
        showResult(labResultDiv, message, 'warning');
    }
}
