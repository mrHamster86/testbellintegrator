<template>
  <header>
    <ul class="nav nav-pills">
      <li class="nav-item">
        <router-link
                class="nav-link"
                to="/"
                active-class="active"
                exact
        >Home</router-link>
      </li>
      <li class="nav-item">
        <router-link
                class="nav-link"
                to="/history"
                active-class="active"
                exact
        >History</router-link>
      </li>
      <li class="nav-item">
        <router-link
                class="nav-link"
                to="/history?action=add"
                active-class="active"
                exact
        >History add</router-link>
      </li>
      <li class="nav-item">
        <router-link
                class="nav-link"
                to="/history?action=remove"
                active-class="active"
                exact
        >History remove</router-link>
      </li>
    </ul>
  </header>
</template>

<script>
  export default {
    name: 'navbar',
  }
</script>

<style scoped>
  header {
    padding: 20px 0;
  }
</style>
