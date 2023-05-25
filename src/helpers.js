export async function fetchCityData() {
  try {
    const response = await fetch("/data/kosova_cities.json");
    const data = await response.json();
    data.sort((a, b) => a.name.localeCompare(b.name));
    return data;
  } catch (error) {
    console.error("Error fetching city data:", error);
    return [];
  }
}
