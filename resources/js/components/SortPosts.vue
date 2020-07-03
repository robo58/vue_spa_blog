<template>
  <div class="col-md-6 text-center d-flex justify-content-center align-items-end">
    <label style="margin-right:10px;">Sort by:</label>
    <select v-model="sortOption" class="form-control col-6" @change="$emit('sort',sortOption)">
      <option selected>
        Newest
      </option>
      <option>
        Oldest
      </option>
    </select>
  </div>
</template>

<script>
export default {

  data () {
    return {
      sortOption: 'Newest'
    }
  }
}
</script>
