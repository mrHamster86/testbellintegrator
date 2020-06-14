<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">{{name}}</h5>
      <template v-if="friends.length > 0">
        <p class="card-text">Friends:</p>
        <ul class="list">
          <li
                  v-for="(friend, index) in friends"
                  class="list-item"
                  :key="`friend-${index}`"
          >{{friend.name}}</li>
        </ul>
      </template>
      <template v-else>
        <p class="card-text">No friends</p>
      </template>
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserCard',
    props: {
      name: {
        type: String,
        required: true,
      },
      friends: {
        type: Array,
        required: true,
      }
    }
  }
</script>

<style scoped>

</style>
