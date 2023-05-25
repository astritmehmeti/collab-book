export default {
  contacts(state) {
    return state.contacts;
  },
  getMessage(state) {
    return state.message;
  },
  getSelectedCityData(state) {
    const municipalityCounts = {};

    state.contacts.forEach((contact) => {
      const municipality = contact.selectedCity;

      if (municipalityCounts[municipality]) {
        municipalityCounts[municipality]++;
      } else {
        municipalityCounts[municipality] = 1;
      }
    });
    const labels = Object.keys(municipalityCounts);
    const data = Object.values(municipalityCounts);

    return { labels, data };
  },
  getPositionsData(state) {
    const positionsCounts = {};

    state.contacts.forEach((contact) => {
      const positions = contact.position;

      if (positionsCounts[positions]) {
        positionsCounts[positions]++;
      } else {
        positionsCounts[positions] = 1;
      }
    });
    const labels = Object.keys(positionsCounts);
    const data = Object.values(positionsCounts);

    return { labels, data };
  },
  getBirthDateData(state) {
    const birthDateCounts = {};

    state.contacts.forEach((contact) => {
      const birthDate = contact.birthDate.split("-")[0];

      if (birthDateCounts[birthDate]) {
        birthDateCounts[birthDate]++;
      } else {
        birthDateCounts[birthDate] = 1;
      }
    });
    const labels = Object.keys(birthDateCounts).sort((a, b) => a - b);
    const data = Object.values(birthDateCounts);

    return { labels, data };
  },
};
