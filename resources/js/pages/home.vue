
<template>
  <div style="margin-top:20px;">
    <div class="row">
      <filter-posts @filterChanged="filterPosts" />
      <sort-posts @sort="sortPosts" />
    </div>
    <card v-for="post in posts" v-show="post.category.name === postFilter || postFilter === 'Any'" :key="post.id" :title="post.title" style="margin-top:20px;">
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
    </card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
import moment from 'moment'
import filterPosts from '../components/FilterPosts'
import sortPosts from '../components/SortPosts'
export default {
  middleware: 'auth',
  components: { filterPosts, sortPosts },
  filters: {
    ago (date) {
      return moment(date).fromNow()
    }
  },

  data () {
    return {
      posts: [],
      categories: [],
      postFilter: 'Any',
      sorted: true
    }
  },

  computed: mapGetters({
    user: 'auth/user'
  }),

  metaInfo () {
    return { title: this.$t('home') }
  },

  created () {
    axios.get('/api/posts').then(response => { this.posts = response.data })
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
    }
  }
}
</script>
