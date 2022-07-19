<template>
  <v-menu
    v-model="menu"
    :min-width="`${Math.max(336,windowWidth/3)}px`"
    offset-y
  >
    <template #activator="{on: onDialog}">
      <v-tooltip top>
        <template #activator="{ on: onTooltip }">
          <v-btn
            icon
            class="mb-1"
            v-on="{...onDialog, ...onTooltip}"
          >
            <v-icon class="grey--text text--darken-1">
              mdi-information-outline
            </v-icon>
          </v-btn>
        </template>
        <span>A propos</span>
      </v-tooltip>
    </template>
    <v-card v-if="menu">
      <v-toolbar
        dense
        flat
      >
        <v-toolbar-title>{{ title }}</v-toolbar-title>
        <v-spacer />
        <v-btn
          icon
          @click.native="menu = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text v-html="text" />
    </v-card>
  </v-menu>
</template>

<script>
import { marked } from 'marked'
import { mapGetters } from 'vuex'

export default {
  props: {
    field: { type: String, required: true }
  },
  data () {
    return {
      menu: null
    }
  },
  computed: {
    ...mapGetters(['config']),
    text () {
      return marked.parse(this.config['desc' + this.field])
    },
    title () {
      return this.config['titleTooltip' + this.field]
    }
  }
}
</script>
