<template>
  <ValidationProvider v-slot="{ errors }" :name="label" :rules="validationRules">
    <div :class="{ 'mb-2': errors[0] }">
      <label :for="id" class="block text-sm font-medium text-gray-200" v-text="label" />
      <div class="mt-1">
        <input
          :id="id" v-model="model" v-mask="mask" type="text" :name="id" :autocomplete="autocomplete"
          class="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </div>
    <p class="text-red-600 text-xs" v-text="errors[0]" />
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      default: ''
    },
    validationRules: {
      type: String,
      default: ''
    },
    autocomplete: {
      type: String,
      default: ''
    },
    mask: {
      type: String,
      default: ''
    }
  },
  computed: {
    model: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    }
  }
}
</script>
