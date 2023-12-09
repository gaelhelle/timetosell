function getUniqueValuesPerDay(responseValues: any) {
  const valuesPerDay = {};

  // Process each value in the response
  responseValues.forEach((value: any) => {
    const date = new Date(value.created_at.split("T")[0]).toLocaleDateString("en-GB");

    // @ts-ignore
    if (!valuesPerDay[date] || parseInt(value.rank) > parseInt(valuesPerDay[date].rank)) {
      // @ts-ignore

      valuesPerDay[date] = value;
    }
  });

  // Extract the unique values per day
  const uniqueValues = Object.values(valuesPerDay);
  return uniqueValues;
}

function formatTimestamp(timestamp: string) {
  const dateTimeUTC = new Date(timestamp);
  const utcMilliseconds = dateTimeUTC.getTime();
  const dateTimePST = new Date(utcMilliseconds - 8 * 60 * 60 * 1000);

  const formattedDate = dateTimePST.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = dateTimePST.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
    timeZone: "America/Los_Angeles",
  });

  const finalFormattedString = `${formattedDate.replace(/\s\d{4}/, "")} ${formattedTime}`;
  return finalFormattedString;
}

export { getUniqueValuesPerDay, formatTimestamp };
