
<template>
  <div>
    <div>
      <form @submit.prevent="onAdd">
        <input id="name" v-model="name" class="col-auto" type="text" name="name" placeholder="Add a category..." @click="isHidden = false" @blur="isHidden = true">
        <span v-if="!name" class="text-danger" :hidden="isHidden" v-text="errors.name" />
        <button class="btn btn-primary" :disabled="!name">
          Add
        </button>
      </form>
    </div>
    <table class="table" style="margin-top:30px;">
      <thead class="thead-dark">
        <tr>
          <th scope="col">
            #
          </th>
          <th scope="col">
            Name
          </th>
          <th scope="col">
            Created_at
          </th>
          <th scope="col">
            Updated_at
          </th>
          <th scope="col" />
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td v-if="edit.filter(x => x.id === category.id).length < 1">
            {{ category.name }}
          </td>
          <td v-else>
            <input v-model="category.name" type="text"><br>
            <span v-if="!category.name" class="text-danger" v-text="errors.name" />
          </td>
          <td>{{ category.created_at | format }}</td>
          <td>{{ category.updated_at | format }}</td>
          <td>
            <template v-if="edit.filter(x => x.id === category.id).length > 0">
              <button class="btn btn-info" :disabled="!category.name || category.name === edit.filter(x => x.id === category.id)[0].name" @click.prevent="onUpdate(category)">
                Update
              </button>
              <button class="btn btn-secondary" @click="toggle(category)">
                Cancel
              </button>
            </template>
            <template v-else>
              <button class="btn btn-secondary" @click.prevent="toggle(category)">
                Edit
              </button>
              <button class="btn btn-danger" @click.prevent="onDelete(category)">
                Delete
              </button>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
export default {
  middleware: 'auth',

  filters: {
    format (date) {
      return moment(date).format('Do MMMM YYYY,h:mm:ss a')
    }
  },

  data () {
    return {
      categories: [],
      name: '',
      errors: {
        name: 'The name field is required'
      },
      edit: [],
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
      axios.post('/api/categories', { name: this.name })
        .then(response => {
          this.categories.push(response.data)
          this.name = ''
        })
        .catch(error => {
          this.errors = error.response.data
        })
    },

    onDelete (category) {
      this.$confirm('Are you sure you want to delete this category and posts associated with it?').then(() => {
        axios.delete('/api/categories/' + category.id, { category: category })
          .then(response => {
            this.$delete(this.categories, this.categories.findIndex(x => x.id === category.id))
          })
      }).catch(err => { console.log(err) })
    },

    onUpdate (category) {
      axios.patch('/api/categories/' + category.id, { name: category.name, category: category })
        .then(response => {
          this.$delete(this.edit, this.edit.findIndex(x => x.id === category.id))
          category.updated_at = response.data.updated_at
        })
        .catch(error => {
          this.errors = error.response.data
        })
    },

    toggle (category) {
      if (this.edit.filter(x => x.id === category.id).length > 0) {
        category.name = this.edit.filter(x => x.id === category.id)[0].name
        this.$delete(this.edit, this.edit.findIndex(x => x.id === category.id))
      } else {
        this.edit.push({ id: category.id, name: category.name })
      }
    }
  },

  metaInfo () {
    return { title: 'Categories' }
  }

}
</script>
