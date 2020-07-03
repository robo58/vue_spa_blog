<template>
  <div class="card border-warning  mb-3" @click="isHidden = false" @blur.self="isHidden = true">
    <div class="card-header border-warning ">
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
          <option v-for="category in categories" :key="category.id" v-text="category.name" />
        </select>
        <span v-if="selectedCategory==='Choose Category...'" class="text-danger col-auto" :hidden="isHidden" v-text="errors.category" />
      </div>
    </div>
    <div class="card-footer border-warning">
      <button class="btn btn-secondary" @click.prevent="onUpdate(post)">
        Update
      </button>
      <button class="btn btn-danger" @click.prevent="$emit('toggled',post)">
        Cancel
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'

export default {

  props: {
    post: { type: Object, default: null }
  },

  data () {
    return {
      categories: [],
      title: this.post.title,
      body: this.post.body,
      errors: {
        title: 'Title is required!',
        body: 'Body cannot be empty!',
        category: 'Choose a category!'
      },
      selectedCategory: this.post.category.name,
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
    onUpdate (post) {
      axios.patch('/api/posts/' + post.id, { title: this.title, body: this.body, user_id: this.user.id, category_id: this.categories.filter(x => x.name === this.selectedCategory)[0].id })
        .then(response => {
          post.title = this.title
          post.body = this.body
          post.category_id = this.categories.filter(x => x.name === this.selectedCategory)[0].id
          this.$emit('toggled', post)
        })
    }
  }
}
</script>
