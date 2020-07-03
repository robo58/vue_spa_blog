<template>
  <div class="card border-primary mb-3" @click="isHidden = false" @blur.self="isHidden = true">
    <div class="card-header border-primary">
      <input v-model="title" class="form-control col-3" type="text" placeholder="Enter post title...">
      <span v-if="!title" class="text-danger" :hidden="isHidden" v-text="errors.title" />
    </div>

    <div class="card-body row d-flex justify-content-center">
      <div class="col-7">
        <textarea v-model="body" name="body" class="form-control" rows="4" placeholder="Enter text here.." />
        <span v-if="!body" class="text-danger" :hidden="isHidden" v-text="errors.body" />
      </div>
      <div class="col-5">
        <select v-model="selectedCategory" class="form-control" style="margin-top: 15px; margin-left:10px;" title="Select category...">
          <option selected disabled>
            Choose Category...
          </option>
          <option v-for="category in categories" :key="category.id" v-text="category.name" />
        </select>
        <span v-if="selectedCategory==='Choose Category...'" class="text-danger col-auto" :hidden="isHidden" v-text="errors.category" />
      </div>
    </div>
    <div class="card-footer border-primary d-flex justify-content-center">
      <button class="btn btn-primary col-3" :disabled="!title || !body || selectedCategory==='Choose Category...'" @click.prevent="onAdd">
        Add post
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      categories: [],
      title: '',
      body: '',
      errors: {
        title: 'Title is required!',
        body: 'Body cannot be empty!',
        category: 'Choose a category!'
      },
      selectedCategory: 'Choose Category...',
      isHidden: true
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  created () {
    axios.get('/api/categories').then(response => { this.categories = response.data })
  },

  methods: {
    onAdd () {
      axios.post('/api/posts', { title: this.title, body: this.body, user_id: this.user.id, category_id: this.categories.filter(x => x.name === this.selectedCategory)[0].id })
        .then(response => {
          this.title = ''
          this.body = ''
          this.selectedCategory = 'Choose Category...'
          this.$emit('postAdded', response.data)
        })
    }
  }
}
</script>
