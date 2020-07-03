
<template>
  <div style="margin-top:20px;">
    <div class="row">
      <filter-posts @filterChanged="filterPosts" />
      <sort-posts @sort="sortPosts" />
    </div>
    <div v-for="post in posts" :key="post.id">
      <edit-post
        v-if="edit.filter(x => x.id === post.id).length > 0"
        :post="post"
        @toggled="toggle"
      />
      <card
        v-else
        v-show="post.category.name === postFilter || postFilter === 'Any'"
        :title="post.title"
        style="margin-top:20px;"
      >
        <div>
          {{ post.body }}
        </div>
        <div>
          <p />
          <p>
            Category: {{ post.category.name }}
          </p>
          <p>
            by {{ post.user.name }}
          </p>
          <p>
            posted <strong>{{ post.created_at | ago }}</strong>
          </p>
        </div>
        <div slot="buttons" class="card-footer border-dark">
          <button class="btn btn-secondary" @click.prevent="toggle(post)">
            Edit
          </button>
          <button class="btn btn-danger" @click.prevent="onDelete(post)">
            Delete
          </button>
        </div>
      </card>
    </div>

    <new-post style="margin-top:20px;" @postAdded="addPost" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import filterPosts from '../components/FilterPosts'
import sortPosts from '../components/SortPosts'
import newPost from '../components/NewPost'
import editPost from '../components/EditPost'
export default {
  middleware: 'auth',

  components: { filterPosts, sortPosts, newPost, editPost },

  filters: {
    ago (date) {
      return moment(date).fromNow()
    }
  },

  data () {
    return {
      posts: [],
      postFilter: 'Any',
      edit: [],
      sorted: true,
      modal: false
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  metaInfo () {
    return { title: this.$t('home') }
  },

  created () {
    axios.get('/api/posts').then(response => { this.posts = response.data.filter(x => x.user_id === this.user.id) })
  },
  methods: {

    filterPosts (value) {
      this.postFilter = value
    },

    sortPosts (value) {
      if (!this.sorted) {
        this.posts.reverse()
        this.sorted = true
      } else {
        this.posts.reverse()
        this.sorted = false
      }
    },

    addPost (post) {
      if (this.sorted) {
        this.posts.unshift(post)
      } else {
        this.posts.push(post)
      }
    },

    toggle (post) {
      if (this.edit.filter(x => x.id === post.id).length > 0) {
        this.$delete(this.edit, this.edit.findIndex(x => x.id === post.id))
      } else {
        this.edit.push(post)
      }
    },

    onEdit () {
      console.log('edit clicked')
    },

    onDelete (post) {
      this.$confirm('Are you sure you want to delete this post?').then(() => {
        axios.delete('/api/posts/' + post.id, { category: post })
          .then(response => {
            this.$delete(this.posts, this.posts.findIndex(x => x.id === post.id))
          })
      }).catch(err => { console.log(err) })
    }

  }
}
</script>
