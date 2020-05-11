# @oarepo/data-editor

A library for editing of rendered JSON data

<p align="center">
    <a href="https://travis-ci.org/oarepo/data-editor" target="_blank">
        <img src="https://img.shields.io/travis/oarepo/data-editor"
            alt="travis build stat"></a>
    <a href="https://www.npmjs.com/package/@oarepo/data-editor" target="_blank">
        <img src="https://img.shields.io/npm/v/@oarepo/data-editor"
            alt="npm version"></a>
</p>

<!-- toc -->

- [Installation](#installation)
- [Usage](#usage)
  * [Record](#record)
  * [Options](#options)
  * [Layout](#layout)
  * [Dialog component](#dialog-component)
- [Examples](#examples)
  * [Simple array](#simple-array)
  * [Complex array with default value](#complex-array-with-default-value)
  * [Complex array with dialog](#complex-array-with-dialog)
  * [Record with dialog component and no data layout](#record-with-dialog-component-and-no-data)
  * [Empty object with dialog component and default value function](#empty-object-with-dialog-component-and-default-value-function)
  * [Record as a tree](#record-as-a-tree)

<!-- tocstop -->

## Installation

``@oarepo/data-editor`` requires ``@oarepo/data-renderer`` to be installed as well.

```
yarn add @oarepo/data-editor
yarn add @oarepo/data-renderer
```

To register/configure the library, add a new boot file to quasar 
(or main.js for vue-cli projects):

```javascript
import DataEditor from '@oarepo/data-editor'
import DataRenderer from '@oarepo/data-renderer'

export default async ({ Vue, store, router }) => {
    Vue.use(DataEditor, {})
    Vue.use(DataRenderer, {})
 }
```

## Usage

To use data editor, add ``data-editor`` to template. ``data-editor`` accepts``record``, ``options``, ``layout`` and ``pathLayouts`` and renders interface to edit received data with buttons to edit, add and remove buttons based on data type.
Dialog components and default values can be passed to ``data-editor``

#### Record

 ``record`` contains json data to be passed to data-editor.
 * simple object: ```record: { object: { a: 1 } }```
 * simple array: ```record: { array: [1, 2] }```
 * complex array: ```record: { array: [{ a: 1 }}, { b: 2 }] }```
 * empty record: ```record: {}```

#### Options

``options`` may consist of schema, extraProps.
 * ``schema`` of rendered data (inline, block, table, flex), defaults to table
    * table ```options: { schema: table }```
    * inline ```options: { schema: inline }```
 * ``extraProps`` (submit, cancel method for data editor)
    * ```options: { extraProps: { submit: { submit: this.submit, cancel: this.cancel } } }```

#### Layout

``layout`` can be used to define layout of empty record, to associate dialog components or default values with props, to define children.
 * basic layout: ```layout: [{ 'path': 'a', 'label': 'a' }]```
 * layout with dialog component: ```layout: [{ 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, dynamic: true }]```
 * layout with default value: ```layout: [{ 'path': 'a', 'label': 'a', defaultValue: () => 1, dynamic: true }]```
 * layout with default value as a function: ```layout: [{ 'path': 'a', 'label': 'a', defaultValue: defaultValue, dynamic: true }]```
 
``pathLayouts`` can be used to associate dialog components or default values with objects or arrays regardless of their position within layout.
    * simple default value ```options: { pathLayouts: { simpleArray: defaultValue: () => 1 } }```
    * complex default value ```options: { pathLayouts: { complexArray: defaultValue: () => { a: 1 } } }```
    
If there is a complex value in ``layout`` and not in ``data``, then this complex value must be created by clicking displayed button before it and its content can be edited.
    
``layout`` and ``pathLayouts`` are described in more detail here: https://github.com/oarepo/data-renderer/

#### Dialog component

Specifies dialog component to be used with data editor, e.g. dialog to add object with default property to array, dialog to enter property and value to be added to object etc.

## Examples

Examples are located at [/src/components](https://github.com/oarepo/data-editor/blob/master/src/components.vue):
 
#### simple object

Example of a simple object. Src at [/src/components/SimpleEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/SimpleEdit.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'simple-edit',
  data: function () {
    return {
      record: {
        Contact: {
          Phone: '+420123123123',
          Email: 'mary.black@gmail.com'
        }
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        showEmpty: true
      }
    }
  },
  methods: {
    submit ({ context, prop, value, op }) {
      isNaN(value)
      if (op === 'add') {
        Vue.set(context, prop, value)
      }
      if (op === 'replace') {
        if (context[prop] === undefined) {
          Vue.set(context, prop, value)
        } else {
          context[prop] = value
        }
      }
    },
    cancel (props) {
      console.log('cancelling')
    }
  }
}
</script>
```

#### Simple array

Example of a simple array. Src at [/src/components/SimpleArray.vue](https://github.com/oarepo/data-editor/blob/master/src/components/SimpleArray.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
export default {
  name: 'array-edit',
  data: function () {
    return {
      record: {
        keywords: ['first keyword', 'second keyword']
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        children: [
          {
            prop: 'keywords',
            label: {
              label: 'keywordArray'
            },
            item: {
              label: {
                label: 'keyword'
              }
            }
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
        }
      }
      if (op === 'replace') {
        Vue.set(context, prop, value)
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```


#### Complex array with default value

Example of a complex array with default value for newly added items. Src at [/src/components/SimpleArray.vue](https://github.com/oarepo/data-editor/blob/master/src/components/SimpleArray.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>

export default {
  name: 'default-value-complex-array-edit',
  data: function () {
    return {
      record: {
        contact: [{ email: 1 }, { phone: '+420123123123' }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        children: [{
          prop: 'contact',
          additionalProps: { defaultValue: () => ({ phone: '+420123123124' }) }
        }]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          context[prop] = value
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```

#### Complex array with dialog

Example of a complex array with dialog for addition of new items. Src at [/src/components/ComplexArrayDialogEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/ComplexArrayDialogEdit.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DialogComponent from './DialogComponent'

export default {
  name: 'complex-array-dialog-edit',
  data: function () {
    return {
      record: {
        contact: [{ phone: '+420123123124' }, { email: 'mary.black@gmail.com' }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel,
          dialogComponent: DialogComponent
        }
      },
      layout: {
        children: [
          {
            prop: 'contact'
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```

#### Record with dialog component and no data

Example of an empty record with layout and dialog. Src at [/src/components/NonExistingObjectDialogEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/NonExistingObjectDialogEdit.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DialogWithPropertyComponent from './DialogWithPropertyComponent'

export default {
  name: 'non-existing-object-dialog-edit',
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        showEmpty: true,
        children: [
          {
            prop: 'object',
            additionalProps: { dialogComponent: DialogWithPropertyComponent },
            children: []
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```

Example of a dialog component (src at [/src/components/DialogComponent.vue](https://github.com/oarepo/data-editor/blob/master/src/components/DialogComponent.vue)): 
 ```vue
<template lang="pug">
q-dialog(ref="dialog" @hide="onDialogHide")
  q-card
    q-card-section
      q-form(ref="form")
        q-input(label="value" v-model="value")
    q-card-actions(align="right")
      q-btn(color="primary" type="submit" label="OK" @click="onOKClick")
      q-btn(color="primary" label="Cancel" @click="onCancelClick")
</template>

<script>
export default {
  name: 'dialog-component',
  data: function () {
    return {
      value: null
    }
  },
  props: {
    initialValue: Object
  },
  mounted () {
    if (this.initialValue) {
      this.value = this.initialValue
    }
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    async onOKClick () {
      if (await this.$refs.form.validate()) {
        this.$emit('ok', { phone: this.value })
        this.hide()
      }
    },
    onCancelClick () {
      this.hide()
    }
  }
}
</script>
```

#### Empty object with dialog component and default value function

Example of object with default value as a function and dialog component. (src at [/src/components/AdditionalPropsEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/AdditionalPropsEdit.vue)): 
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'

function defaultValue ({ context, layout }) {
  for (const prop of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    if (context[layout.prop][prop] === undefined) {
      return { prop: prop, value: 'keyword' }
    }
  }
}

export default {
  name: 'additional-props-edit',
  data: function () {
    return {
      record: {
        creator: { name: 'Mary Black' },
        contact: { phone: '+420123123124' },
        keywords: {}
      },
      layout: {
        children: [
          { prop: 'creator', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'contact', additionalProps: { dialogComponent: DialogWithPropertyComponent } },
          { prop: 'keywords', additionalProps: { defaultValue: defaultValue } }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```

#### Record as a tree

Example of record as a tree with a complex default value for addition of new items.  Src at [/src/components/TreeEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/TreeEdit.vue):
```vue
<template lang="pug">
div
  data-editor(:record="record" :options="options" :layout="layout" :path-layouts="pathLayouts")
</template>

<script>
import Vue from 'vue'

export default {
  name: 'tree-edit',
  data: function () {
    return {
      record: {
        object: [
          { creator: 'Mary Black' },
          {
            contact: [
              { phone: '+420123123123' },
              { email: ['mary.black@gmail.com'] }]
          }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: {
        children: [
          {
            prop: 'object',
            additionalProps: { defaultValue: () => ({ keywords: ['first keyword', 'second keyword'] }) }
          }
        ]
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
        } else {
          Vue.set(context, prop, value)
        }
      }
      if (op === 'replace') {
        context[prop] = value
      }
      if (op === 'remove') {
        if (Array.isArray(context)) {
          context.splice(prop, 1)
        } else {
          delete context[prop]
        }
      }
    },
    cancel ({ props }) {
      console.log('cancelling')
    }
  }
}
</script>
```
