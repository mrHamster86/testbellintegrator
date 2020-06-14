<template>
  <main>
    <h1>User list</h1>
    <div class="input-group search">
      <div class="input-group-prepend">
        <span class="input-group-text" id="basic-addon1">Search name:</span>
      </div>
      <input
              type="text"
              class="form-control"
              v-model="searchName"
      >
    </div>
    <div class="row">
      <div class="col-sm">
        <template v-if="userList.length > 0">
          <UserCard
                  v-for="userId in userList"
                  :key="userId"
                  :name="users[userId].name"
                  :friends="users[userId].friends"
          >
            <button
                    type="button"
                    class="btn btn-success"
                    @click="addElement({id: userId})"
            >+</button>
          </UserCard>
        </template>
        <template v-else>
          <p>
            <template v-if="searchName.length > 0">The user is not found</template>
            <template v-else>No unselected users</template>
          </p>
        </template>
      </div>
      <div class="col-sm">
        <template v-if="selectUser.length > 0">
          <UserCard
                  v-for="userId in selectUser"
                  :key="userId"
                  :name="users[userId].name"
                  :friends="users[userId].friends"
          >
            <button
                    type="button"
                    class="btn btn-danger"
                    @click="removeElement({id: userId})"
            >-</button>
          </UserCard>
        </template>
        <template v-else>
          <p>No selected users</p>
        </template>
      </div>
    </div>
  </main>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import UserCard from '@/components/UserCard'

  const countingOccurrences = (str, filter, count = 0) => {
    const index = str.indexOf(filter)
    return index >= 0
        ? countingOccurrences(str.slice(index + 1), filter, count += 1)
        : count
  }

  const ratingArray = (arr, filter) => {
    return arr.reduce((count, item) => {
      return countingOccurrences(item, filter, count)
    }, 0)
  }

  const getRating = (userArray, users, filter) => {
    const obj = {}

    for (let userId of userArray) {
      console.log(userId)
      const nameArray = [users[userId].name, ...users[userId].friends.map((it) => it.name)]
      obj[userId] = ratingArray(nameArray, filter)
    }

    return obj
  }

  export default {
    name: 'MainPage',
    components: {UserCard},
    data() {
      return {
        searchName: ''
      }
    },
    computed: {
      ...mapGetters({
        users: 'users',
        unselectUser: 'unselectUser',
        selectUser: 'selectUser',
      }),

      filterRating() {
        const rating = getRating([...this.unselectUser], {...this.users}, this.searchName)
        return Object.keys(rating).
            filter((id) => rating[id] > 0).
            sort((a, b) => rating[a] - rating[b])
      },
      userList() {
        return this.searchName
            ? this.filterRating
            : this.unselectUser
      }
    },
    methods: {
      ...mapActions({
        addElement: 'addElement',
        removeElement: 'removeElement',
      }),
    }
  }
</script>

<style scoped>
 .search {
   margin: 20px 0;
 }
</style>
