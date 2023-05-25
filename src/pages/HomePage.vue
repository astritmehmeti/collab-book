<template>
  <div class="container my-chart-container mt-5">
    <div class="row justify-content-center">
      <div class="col-auto">
        <button @click="showChart('municipalities')" class="btn btn-primary">
          Municipalities Chart
        </button>
      </div>
      <div class="col-auto">
        <button @click="showChart('positions')" class="btn btn-warning">
          Job Positions Chart
        </button>
      </div>
      <div class="col-auto">
        <button @click="showChart('birthdates')" class="btn btn-danger">
          Birthdates Chart
        </button>
      </div>
    </div>
    <div v-if="currentChart === 'municipalities'">
      <div v-if="contacts.length > 0">
        <h4 class="mt-5">Contacts Overview by Municipalities</h4>
        <municipalities-chart />
      </div>
      <div v-else>
        <h4 class="mt-5">
          There are no available data yet. Maybe you want to add a contact?
        </h4>
        <base-button link to="/register" class="mt-5"
          >Add New Contact <i class="mdi mdi-account-plus"></i
        ></base-button>
      </div>
    </div>
    <div v-if="currentChart === 'positions'">
      <div v-if="contacts.length > 0">
        <h4 class="mt-5">Contacts Overview by Job Positions</h4>
        <positions-chart />
      </div>
      <div v-else>
        <h4 class="mt-5">
          There are no available data yet. Maybe you want to add a contact?
        </h4>
        <base-button link to="/register" class="mt-5"
          >Add New Contact <i class="mdi mdi-account-plus"></i
        ></base-button>
      </div>
    </div>
    <div v-if="currentChart === 'birthdates'">
      <div v-if="contacts.length > 0">
        <h4 class="mt-5">Contacts Overview by Birthdates</h4>
        <birthdates-chart />
      </div>
      <div v-else>
        <h4 class="mt-5">
          There are no available data yet. Maybe you want to add a contact?
        </h4>
        <base-button link to="/register" class="mt-5"
          >Add New Contact <i class="mdi mdi-account-plus"></i
        ></base-button>
      </div>
    </div>
  </div>
</template>

<script>
import MunicipalitiesChart from "@/components/charts/MunicipalitiesChart.vue";
import PositionsChart from "@/components/charts/PositionsChart.vue";
import BirthdatesChart from "@/components/charts/BirthdatesChart.vue";
import BaseButton from "@/components/layouts/BaseButton.vue";
export default {
  components: {
    MunicipalitiesChart,
    PositionsChart,
    BirthdatesChart,
    BaseButton,
  },
  data() {
    return {
      currentChart: "municipalities",
    };
  },
  computed: {
    contacts() {
      return this.$store.getters["contacts/contacts"];
    },
  },
  methods: {
    showChart(clickedChart) {
      this.currentChart = clickedChart;
    },
  },
};
</script>
