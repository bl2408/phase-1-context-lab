/* Your Code Here */

 function createEmployeeRecord(emp){
    return {
        firstName: emp[0],
        familyName: emp[1],
        title: emp[2],
        payPerHour: emp[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

function createEmployeeRecords(arr){
    return arr.map(emp=>createEmployeeRecord(emp));
}

function createTimeInEvent( dateStamp){
    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    });
    return this;
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0],
    });
    return this;
}

function hoursWorkedOnDate(dateStamp){
    const { hour: hourIn } = this.timeInEvents.find(timeInEvent=>timeInEvent.date === dateStamp);
    const { hour: hourOut } = this.timeOutEvents.find(timeOutEvent=>timeOutEvent.date === dateStamp);
    return (hourOut - hourIn) / 100;
}

function wagesEarnedOnDate(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour;
}

function findEmployeeByFirstName(collection, firstNameString){
    return collection.find(col=> col.firstName === firstNameString);
}

function calculatePayroll(employeeArr){
    return employeeArr.reduce((pv, cv) => pv + allWagesFor.call(cv), 0);
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}


