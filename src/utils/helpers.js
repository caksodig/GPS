/**
 * Determine vehicle status based on ACC and Speed values
 *
 * Status rules:
 * - ACC ON, Speed > 0: Running
 * - ACC OFF, Speed = 0: Parking
 * - ACC ON, Speed = 0: Stop
 *
 * @param {string} acc - ACC status ('ON' or 'OFF')
 * @param {number} speed - Vehicle speed
 * @returns {Object} Status object with name and color class
 */
export const getVehicleStatus = (acc, speed) => {
  const accStatus = acc?.toUpperCase();
  const speedValue = Number(speed);

  if (accStatus === "ON" && speedValue > 0) {
    return {
      name: "Running",
      colorClass: "status-running",
      textColorClass: "text-green-600",
    };
  } else if (accStatus === "OFF" && speedValue === 0) {
    return {
      name: "Parking",
      colorClass: "status-parking",
      textColorClass: "text-gray-600",
    };
  } else if (accStatus === "ON" && speedValue === 0) {
    return {
      name: "Stop",
      colorClass: "status-stop",
      textColorClass: "text-red-600",
    };
  } else {
    return {
      name: "Unknown",
      colorClass: "bg-gray-300",
      textColorClass: "text-gray-600",
    };
  }
};

/**
 * Format date to a readable string
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat("en-ID", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
};
