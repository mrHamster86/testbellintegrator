<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
      <p class="card-text">id: {{id}}</p>
      <p class="card-text">action: {{status}}</p>
      <p class="card-text">date: {{date}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HistoryAction',
    props: {
      name: {
        type: String,
        required: true,
      },
      id: {
        type: String,
        required: true,
      },
      date: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        validate: (val) => ['add', 'remove'].indexOf(val) >= 0
      }
    }
  }
</script>

<style scoped>

</style>
