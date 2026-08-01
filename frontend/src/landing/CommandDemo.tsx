import { useState } from 'react'
import { demoSessions, type DemoCommand } from './content'

const demoCommands = Object.keys(demoSessions) as DemoCommand[]

interface CommandDemoProps {
  title?: string
}

export function CommandDemo({ title = 'passm — local session' }: CommandDemoProps) {
  const [activeCommand, setActiveCommand] = useState<DemoCommand>('init')

  return (
    <div className="command-demo">
      <div className="command-demo__bar">
        <div className="command-demo__lights" aria-hidden="true"><i /><i /><i /></div>
        <span>{title}</span>
        <small>LOCAL</small>
      </div>
      <div className="command-demo__screen" aria-live="polite">
        {demoSessions[activeCommand].map(([line, tone], index) => (
          <p className={`is-${tone}`} key={`${activeCommand}-${index}`}>{line}</p>
        ))}
        <span className="command-demo__cursor" aria-hidden="true" />
      </div>
      <div className="command-demo__tabs" role="tablist" aria-label="Try a PassM command">
        {demoCommands.map((command) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeCommand === command}
            className={activeCommand === command ? 'is-active' : ''}
            onClick={() => setActiveCommand(command)}
            key={command}
          >
            {command}
          </button>
        ))}
      </div>
    </div>
  )
}
