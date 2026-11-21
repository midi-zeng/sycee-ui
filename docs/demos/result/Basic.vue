<script setup lang="ts">
import { Result, Button } from '@sycee-ui/vue';
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 12px">
    <Result
      status="success"
      title="Payment complete"
      description="A receipt has been sent to your email address."
    >
      <Button>Back to dashboard</Button>
    </Result>
    <Result
      status="danger"
      title="Something went wrong"
      description="We could not process your request. Please try again later."
    />
  </div>
</template>
