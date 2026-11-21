import { Result, Button } from '@sycee-ui/react';

export default function Basic() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
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
  );
}
