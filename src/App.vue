<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header.glossy(elevated='')
      q-toolbar
        q-btn(flat='', dense='', round='', @click='leftDrawerOpen = !leftDrawerOpen', aria-label='Menu', icon='menu')
          q-toolbar-title
            | @oarepo/invenio-quasar
          div Quasar v{{ $q.version }}
    q-drawer(v-model='leftDrawerOpen', show-if-above='', bordered='', content-class='bg-grey-2')
      q-list
        q-expansion-item(header='' label="Basic Editors")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'simple-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit simple object
      q-list
        q-expansion-item(header='' label="Array Editors")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit array
                q-item(clickable='' :to="{name: 'default-value-array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit array with default value
                q-item(clickable='' :to="{name: 'default-value-complex-array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit complex array with default value
                q-item(clickable='' :to="{name: 'complex-array-dialog-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit complex array with dialog
                q-item(clickable='' :to="{name: 'non-existing-default-value-array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit non-existing array with default value
                q-item(clickable='' :to="{name: 'non-existing-default-value-complex-array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit non-existing complex array with default value
                q-item(clickable='' :to="{name: 'non-existing-complex-array-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit non-existing complex array
        q-expansion-item(header='' label="Tree Editors")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'tree-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit tree object
        q-expansion-item(header='' label="Object Editors")
          q-card
            q-card-section
              q-list
                q-item(clickable='' :to="{name: 'object-with-no-values-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit object with no values
                q-item(clickable='' :to="{name: 'object-with-children-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit object with children
                q-item(clickable='' :to="{name: 'additional-props-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit object with additional props
                q-item(clickable='' :to="{name: 'non-existing-complex-object-dialog-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit non-existing complex object in dialog
                q-item(clickable='' :to="{name: 'non-existing-complex-object-default-value-edit'}")
                  q-item-section(avatar='')
                    q-icon(name='list')
                  q-item-section
                    q-item-label Edit non-existing complex object with default value
    q-page-container
      q-page.q-ma-lg
        router-view
</template>

<script>
export default {
  name: 'LayoutDefault',
  components: {},
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>

<style>
</style>
