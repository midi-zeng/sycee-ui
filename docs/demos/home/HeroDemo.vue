<script setup lang="ts">
import { ref } from 'vue';
import { Button, Input, Switch, Tag, Avatar, AvatarGroup, Badge, Divider, Progress, Alert } from '@sycee-ui/vue';

const name = ref('');
const loading = ref(false);
const value = ref(72);
</script>

<template>
  <div style="display: flex; flex-direction: column; gap: 20px; font-size: 14px">
    <Alert type="info" title="Welcome to Sycee UI">
      Every component on this page is rendered by the real library.
    </Alert>
    <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap">
      <Input v-model="name" placeholder="What's your name?" clearable style="width: 200px" />
      <Button :loading="loading" @click="loading = !loading">
        {{ loading ? 'Working…' : 'Run' }}
      </Button>
      <Tag color="primary">New</Tag>
      <Tag color="success">Stable</Tag>
    </div>
    <div style="display: flex; gap: 16px; align-items: center">
      <Badge :count="5">
        <Avatar alt="ZK" size="lg" />
      </Badge>
      <AvatarGroup>
        <Avatar alt="Ada" />
        <Avatar alt="Lin" />
        <Avatar alt="Grace" />
      </AvatarGroup>
      <Divider vertical style="height: 24px" />
      <Progress :value="value" status="success" style="max-width: 200px" />
    </div>
  </div>
</template>
