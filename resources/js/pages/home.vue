<template>
  <card :title="user.name">
    {{ $t('you_are_logged_in') }}
  </card>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  middleware: 'auth',

  computed: mapGetters({
    user: 'auth/user'
  }),

  metaInfo () {
    return { title: this.$t('home') }
  }
}
</script>
