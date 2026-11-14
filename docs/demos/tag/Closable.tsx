import { useState } from 'react';
import { Icon, Tag } from '@sycee-ui/react';

const SKILLS = ['Vue', 'React', 'TypeScript'];

export default function Closable() {
  const [skills, setSkills] = useState(SKILLS);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        {skills.map((skill) => (
          <Tag
            key={skill}
            color="primary"
            closable
            onClose={() => setSkills(skills.filter((item) => item !== skill))}
          >
            {skill}
          </Tag>
        ))}
        {skills.length === 0 ? (
          <span style={{ color: 'var(--sy-color-text-tertiary)' }}>
            All tags removed — reload the page to reset
          </span>
        ) : null}
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <Tag size="sm" closable>
          Small
        </Tag>
        <Tag closable>Medium</Tag>
        <Tag closable disabled>
          Disabled
        </Tag>
        <Tag color="success" icon={<Icon name="check" />}>
          With icon
        </Tag>
      </div>
    </div>
  );
}
