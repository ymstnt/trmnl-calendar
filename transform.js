function transform(input) {
  const rawWeather = input.IDX_0 || {};
  const current = rawWeather.current || {};
  const daily = rawWeather.daily || {};

  const isAllDayEvent = (ev) => {
    if (typeof ev.all_day === "boolean") return ev.all_day;

    const start = String(ev.DTSTART || "");
    if (!start.includes("T")) return true;

    const end = String(ev.DTEND || "");
    if (start.slice(11, 19) === "00:00:00" && end.slice(11, 19) === "00:00:00") {
      const duration = (Date.parse(end) - Date.parse(start)) / 1000;
      return duration > 0 && duration % 86400 === 0;
    }

    return false;
  };

  const events = Object.keys(input)
    .filter((key) => /^IDX_[1-9]\d*$/.test(key))
    .flatMap((key) => (Array.isArray(input[key]?.ical) ? input[key].ical : []))
    .filter((ev) => ev && ev.DTSTART)
    .map((ev) => ({
      SUMMARY: ev.SUMMARY || "",
      DTSTART: ev.DTSTART,
      all_day: isAllDayEvent(ev)
    }))
    .sort((a, b) => {
      const diff = Date.parse(a.DTSTART) - Date.parse(b.DTSTART);
      return Number.isNaN(diff) ? a.DTSTART.localeCompare(b.DTSTART) : diff;
    });

  return {
    weather: {
      current: {
        temperature_2m: current.temperature_2m,
        weather_code: current.weather_code
      },
      daily: {
        time: daily.time || [],
        weather_code: daily.weather_code || [],
        temperature_2m_min: daily.temperature_2m_min || [],
        temperature_2m_max: daily.temperature_2m_max || []
      }
    },
    events
  };
}
