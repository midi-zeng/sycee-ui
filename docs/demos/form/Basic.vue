<script setup lang="ts">
import { reactive, ref } from 'vue';
import { Button, Form, FormItem, Input, Select, message } from '@sycee-ui/vue';
import type { FormRule } from '@sycee-ui/vue';

const model = reactive({ name: '', role: '' });

const rules: Record<string, FormRule[]> = {
  name: [
    { required: true, message: 'Name is required' },
    {
      validator: (value) =>
        typeof value === 'string' && value.trim().length >= 2
          ? true
          : 'Name must be at least 2 characters',
    },
  ],
  role: [{ required: true, message: 'Pick a role' }],
};

const formRef = ref<InstanceType<typeof Form> | null>(null);

const roles = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Manager', value: 'manager' },
];

async function submit() {
  const valid = await formRef.value?.validate();
  message.info(valid ? 'Form is valid' : 'Please fix the errors');
}
</script>

<template>
  <Form ref="formRef" :model="model" :rules="rules" label-width="80" style="max-width: 360px">
    <FormItem prop="name" label="Name">
      <Input v-model="model.name" placeholder="Your name" />
    </FormItem>
    <FormItem prop="role" label="Role">
      <Select v-model="model.role" :options="roles" placeholder="Choose one" />
    </FormItem>
    <FormItem>
      <Button variant="solid" @click="submit">Submit</Button>
    </FormItem>
  </Form>
</template>
