import { useRef, useState } from 'react';
import { Button, Form, FormItem, Input, Select, message } from '@sycee-ui/react';
import type { FormHandle, FormRule } from '@sycee-ui/react';

const RULES: Record<string, FormRule[]> = {
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

const ROLES = [
  { label: 'Designer', value: 'designer' },
  { label: 'Developer', value: 'developer' },
  { label: 'Manager', value: 'manager' },
];

export default function Basic() {
  const formRef = useRef<FormHandle>(null);
  const [name, setName] = useState('');
  const [role, setRole] = useState<string | number | null>(null);
  const model = { name, role };

  async function submit() {
    const valid = await formRef.current?.validate();
    message.info(valid ? 'Form is valid' : 'Please fix the errors');
  }

  return (
    <Form ref={formRef} model={model} rules={RULES} labelWidth={80} style={{ maxWidth: 360 }}>
      <FormItem prop="name" label="Name">
        <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" />
      </FormItem>
      <FormItem prop="role" label="Role">
        <Select value={role} onChange={setRole} options={ROLES} placeholder="Choose one" />
      </FormItem>
      <FormItem>
        <Button variant="solid" onClick={submit}>
          Submit
        </Button>
      </FormItem>
    </Form>
  );
}
