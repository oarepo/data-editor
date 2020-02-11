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

```
yarn add @oarepo/data-editor
```

To register/configure the library, add a new boot file to quasar 
(or main.js for vue-cli projects):

```javascript
import DataEditor from '@oarepo/data-editor'
import VueUid from 'vue-uid';

export default async ({ Vue, store, router }) => {
    Vue.use(VueUid);
    Vue.use(DataEditor, {})
 }
```

## Usage

To use data editor, add ``oarepo-record-inplace-editor`` to template. ``record``, ``options``, ``layout`` and ``dialogComponent`` can be passed to ``oarepo-record-inplace-editor``.

#### Record

 ``record`` contains json data to be passed to data-editor.
 * simple object: ```record: {a: 1}```
 * simple array: ```record: [1, 2]```
 * complex array: ```record: [{ a: 1 }}, { b: 2 }]```
 * empty record: ```record: {}```

#### Options

``options`` may consist of schema, extraProps, pathLayouts, showEmpty.
 * ``schema`` of rendered data (inline, block, table, flex), defaults to table
    * table ```options: { schema: table }```
    * inline ```options: { schema: inline }```
 * ``extraProps`` (submit, cancel method for data editor)
    * ```options: { extraProps: { submit: { submit: this.submit, cancel: this.cancel } } }```
 * ``pathLayouts`` (to associate default value with arrays)
    * simple default value ```options: { pathLayouts: { simpleArray: defaultValue: () => 1 } }```
    * complex default value ```options: { pathLayouts: { complexArray: defaultValue: () => { a: 1 } } }```
 * ``showEmpty`` when set true, empty values are shown, defaults to false
    * show empty records ```options: { showEmpty: true }```

#### Layout

``layout`` can be used to define layout of empty record, to associate dialog components or default values with paths, to define children.
 * basic layout: ```layout: [{ 'path': 'a', 'label': 'a' }]```
 * layout with dialog component: ```layout: [{ 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, dynamic: true }]```
 * layout with default value: ```layout: [{ 'path': 'a', 'label': 'a', defaultValue: () => 1, dynamic: true }]```
 * layout with default value as a function: ```layout: [{ 'path': 'a', 'label': 'a', defaultValue: defaultValue, dynamic: true }]```
 * layout with children: ```layout: [{ 'path': 'a', 'label': 'a' }, { children: [{ 'path': 'b', 'label': 'b' }, { 'path': 'c', 'label': 'c' }] }]```

#### Dialog component

Specifies dialog component to be used with data editor, e.g. dialog to add object with default property to array, dialog to enter property and value to be added to object etc.

## Examples

Examples are located at [/src/components](https://github.com/oarepo/data-editor/blob/master/src/components.vue):
 
#### simple object

Example of a simple object. Src at [/src/components/SimpleEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/SimpleEdit.vue):
```vue
<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>
<script>
export default {
  name: 'simple-edit',
  data: function () {
    return {
      record: {
        firstname: 'John', 
        lastname: 'Doe'
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
    submit ({ context, prop, value }) {
      context[prop] = value
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
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>
<script>
export default {
  name: 'array-edit',
  data: function () {
    return {
      record: {
        array: [1, 2]
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


#### Complex array with default value

Example of a complex array with default value for newly added items. Src at [/src/components/SimpleArray.vue](https://github.com/oarepo/data-editor/blob/master/src/components/SimpleArray.vue):
```vue
<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>
<script>
export default {
  name: 'default-value-complex-array-edit',
  data: function () {
    return {
      record: {
        complexArray: [{ a: 1 }, { b: 2 }, { c: 3 }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          complexArray: {
            defaultValue: () => ({ a: '1' })
          }
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
  oarepo-record-inplace-editor(:record="record" :options="options" :dialog-component="dialogComponent")
</template>

<script>
import Vue from 'vue'
import DialogComponent from './DialogComponent'

export default {
  name: 'complex-array-dialog-edit',
  data: function () {
    return {
      record: {
        complexArray: [{ a: 1 }, { a: 2 }, { a: 3 }]
      },
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      dialogComponent: DialogComponent
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
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import Vue from 'vue'
import DialogComponent from './DialogComponent'

export default {
  name: 'non-existing-object-dialog-edit',
  data: function () {
    return {
      record: {},
      options: {
        schema: 'table',
        showEmpty: true,
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        }
      },
      layout: [{ 'path': 'a', 'label': 'a', dialogComponent: DialogComponent, dynamic: true }]
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
        q-input(label="a" v-model="a")
    q-card-actions(align="right")
      q-btn(color="primary" type="submit" label="OK" @click="onOKClick")
      q-btn(color="primary" label="Cancel" @click="onCancelClick")
</template>

<script>
export default {
  name: 'dialog-component',
  data: function () {
    return {
      a: null
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
        this.$emit('ok', { a: this.a })
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

Example of object with default value as function and dialog component. (src at [/src/components/AdditionalPropsEdit.vue](https://github.com/oarepo/data-editor/blob/master/src/components/AdditionalPropsEdit.vue)): 
```vue
<template lang="pug">
div
  oarepo-record-inplace-editor(:record="record" :options="options" :layout="layout")
</template>

<script>
import DialogWithPropertyComponent from './DialogWithPropertyComponent'
import Vue from 'vue'
function defaultValue ({ context, layout }) {
  for (const prop of 'abcdefghijklmnopqrstuvwxyz'.split('')) {
    if (context[layout.path][prop] === undefined) {
      return { prop: prop, value: 1 }
    }
  }
}
export default {
  name: 'additional-props-edit',
  data: function () {
    return {
      record: {
        a: { a: 1 },
        b: { b: 2 },
        c: { c: 3 },
        d: {},
        e: {}
      },
      layout: [
        { 'path': 'a', 'label': 'a', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'b', 'label': 'b', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'c', 'label': 'c', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'd', 'label': 'd', dynamic: true, additionalProps: { dialogComponent: DialogWithPropertyComponent } },
        { 'path': 'e', 'label': 'e', dynamic: true, additionalProps: { defaultValue: defaultValue } }],
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        showEmpty: true
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
  oarepo-record-inplace-editor(:record="record" :options="options")
</template>

<script>
export default {
  name: 'tree-edit',
  data: function () {
    return {
      record: {
        tree: [{ a: [1, 2, 3] }, { b: [1, 2, 3] }, { c: [5] }, { d: { e: 1, f: 2 } }]
      },
      options: {
        schema: 'table',
        extraProps: {
          submit: this.submit,
          cancel: this.cancel
        },
        pathLayouts: {
          tree: {
            defaultValue: () => ({ d: [1, 2, 3] })
          }
        }
      }
    }
  },
  methods: {
    submit ({ path, context, prop, value, op, pathValues }) {
      if (op === 'add') {
        if (Array.isArray(context)) {
          context.push(value)
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
