<template>
  <main>
    <h1>History {{$route.query.action || ''}}</h1>
    <template v-if="historyList.length > 0">
      <HistoryAction
              v-for="point in historyList.slice().reverse()"
              :key="point.date"
              :name="users[point.elementId].name"
              :id="point.elementId"
              :date="point.date"
              :status="point.status"
      />
    </template>
    <template v-else>
      <p>History {{$route.query.action || ''}} is missing</p>
    </template>
  </main>
</template>

<script>
  import HistoryAction from '@/components/HistoryAction'
  import {mapGetters} from 'vuex'
  export default {
    name: 'History',
    components: {HistoryAction},
    computed: {
      ...mapGetters({
        users: 'users',
        history: 'history',
      }),
      historyList() {
        const action = this.$route.query.action
        return action
            ? this.history.filter((point) => point.status === action)
            : this.history
      }
    }
  }
</script>

<style scoped>

</style>
