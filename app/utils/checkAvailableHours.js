/**
    @req gets requestedStartTime, requestedEndTime, unavailableHours
    @description checks of the requested time does not coincide with unavailable hours
    @res return boolean value
*/

const isTimeSlotWithinOffHours = (requestedStartTime, requestedEndTime, unavailableHours) => {

    const requestedStart = new Date(requestedStartTime);
    const requestedEnd = new Date(requestedEndTime);

    for (const hour of unavailableHours) {
        const offHourStart = new Date(hour.start);
        const offHourEnd = new Date(hour.end);

        if (requestedStart >= offHourStart && requestedStart < offHourEnd) {
            return true;
        }

        if (requestedEnd > offHourStart && requestedEnd <= offHourEnd) {
            return true;
        }
    }

    return false;
};

module.exports = { isTimeSlotWithinOffHours };