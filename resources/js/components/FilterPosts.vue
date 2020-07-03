<template>
  <div class="col-md-6 text-center d-flex justify-content-center align-items-end">
    <label style="margin-right:10px;">Filter by Category:</label>
    <select v-model="selectedOption" class="form-control col-6" @change="$emit('filterChanged', selectedOption)">
      <option selected>
        Any
      </option>
      <option v-for="category in categories" :key="category.id" v-text="category.name" />
    </select>
  </div>
</template>

<script>
import axios from 'axios'

export default {

  data () {
    return {
      categories: [],
      selectedOption: 'Any'
    }
  },
  created () {
    axios.get('/api/categories').then(response => { this.categories = response.data })
  }
}
</script>
