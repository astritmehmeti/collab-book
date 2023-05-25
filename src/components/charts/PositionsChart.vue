<template>
  <div class="container my-chart-container mt-5">
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  name: "PositionsChart",
  components: { Bar },
  data() {
    return {
      chartOptions: {
        responsive: true,
      },
    };
  },
  computed: {
    getPositionsData() {
      return this.$store.getters["contacts/getPositionsData"];
    },
    chartData() {
      return {
        labels: this.getPositionsData.labels,

        datasets: [
          {
            label: "Contacts Overview by Job Positions",
            data: this.getPositionsData.data,
            backgroundColor: this.generateColors(
              this.getPositionsData.labels.length
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
  width: 45rem;
  height: 45rem;
}
</style>