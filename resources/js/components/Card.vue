<template>
  <div class="card border-dark mb-3">
    <div v-if="title" class="card-header border-dark mb-3">
      {{ title }}
    </div>

    <div class="card-body">
      <slot />
    </div>
    <slot name="buttons" />
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    title: { type: String, default: null }
  }
}
</script>
