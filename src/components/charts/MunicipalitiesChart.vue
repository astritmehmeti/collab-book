<template>
  <div class="container my-chart-container mt-5">
    <Doughnut id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Title, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Title, Tooltip, Legend);

export default {
  name: "MunicipalitiesChart",
  components: { Doughnut },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    getMunicipalityData() {
      return this.$store.getters["contacts/getSelectedCityData"];
    },
    chartData() {
      return {
        labels: this.getMunicipalityData.labels,

        datasets: [
          {
            data: this.getMunicipalityData.data,
            backgroundColor: this.generateColors(
              this.getMunicipalityData.labels.length
            ),
          },
        ],
      };
    },
  },
  methods: {
    generateColors(count) {
      const colors = [];
      const letters = "024689ABCDEF";
      for (let i = 0; i < count; i++) {
        let color = "#";
        for (let j = 0; j < 6; j++) {
          color += letters[Math.floor(Math.random() * letters.length)];
        }
        colors.push(color);
      }
      return colors;
    },
  },
};
</script>

<style scoped>
.my-chart-container {
  width: 35rem;
  height: 35rem;
}
</style>