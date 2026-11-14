<script setup lang="ts">
import { ref } from 'vue';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Divider,
  Input,
  Progress,
  Tag,
} from '@sycee-ui/vue';

const name = ref('');
const loading = ref(false);
const value = ref(72);
</script>

<template>
  <div class="hero-demo">
    <Alert type="info" title="Welcome to Sycee UI">
      Every component on this page is rendered by the real library.
    </Alert>
    <div class="hero-demo__row">
      <Input v-model="name" placeholder="What's your name?" clearable style="width: 200px" />
      <Button :loading="loading" @click="loading = !loading">
        {{ loading ? 'Working…' : 'Run' }}
      </Button>
    </div>
    <div class="hero-demo__row">
      <Tag color="primary">New</Tag>
      <Tag color="success">Stable</Tag>
      <Badge :count="5">
        <Avatar alt="ZK" size="lg" />
      </Badge>
      <AvatarGroup>
        <Avatar alt="Ada" />
        <Avatar alt="Lin" />
        <Avatar alt="Grace" />
      </AvatarGroup>
    </div>
    <Divider style="margin: 4px 0" />
    <Progress :value="value" status="success" />
  </div>
</template>
