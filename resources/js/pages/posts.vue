
<template>
  <div style="margin-top:20px;">
    <card v-for="post in posts" :key="post.id" :title="post.title" style="margin-top:20px;">
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
      </div>
    </card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import axios from 'axios'
export default {
  middleware: 'auth',

  data () {
    return {
      posts: []
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
  }
}
</script>
