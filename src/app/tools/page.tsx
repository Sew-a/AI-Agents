import { freeAgentsTools, toolFaqItems } from '@/data/freeAgentsTools';
import { CopyButton } from '@/components/molecules/CopyButton';

export default function ToolsPage() {
  return (
    <>
      <p className="eyebrow">Free AI Tools</p>
      <h2>Free & open-source AI coding agents.</h2>
      <p className="subtitle">
        All 9 tools below are free to install and self-host. The only optional cost is which
        LLM you connect — local models via Ollama = $0 ongoing. Sourced from
        opensourcealternatives.to.
      </p>

      <h3>Quick Comparison</h3>
      <div className="table-wrapper" style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
        <table style={{ width: '100%', fontSize: '0.78rem', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)' }}>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>Tool</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>Type</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>Interface</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>License</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>Self-Hosted</th>
              <th style={{ textAlign: 'left', padding: '0.5rem', color: 'var(--text-muted)' }}>Stars</th>
            </tr>
          </thead>
          <tbody>
            {freeAgentsTools.map((tool, i) => (
              <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '0.5rem', fontWeight: 600 }}>{tool.name}</td>
                <td style={{ padding: '0.5rem' }}>{tool.type}</td>
                <td style={{ padding: '0.5rem' }}>{tool.interface}</td>
                <td style={{ padding: '0.5rem' }}>{tool.license}</td>
                <td style={{ padding: '0.5rem' }}>{tool.selfHosted}</td>
                <td style={{ padding: '0.5rem' }}>{tool.stars}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="content-grid" style={{ marginTop: '1.5rem' }}>
        {freeAgentsTools.map((tool, i) => (
          <article key={i} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div className="card-header">
              <span className="badge">{tool.name}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{tool.type}</span>
            </div>
            <p className="card-body">{tool.description}</p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <span className="badge" style={{ fontSize: '0.7rem' }}>{tool.license}</span>
              <span className="badge" style={{ fontSize: '0.7rem' }}>{tool.interface}</span>
              <span className="badge" style={{ fontSize: '0.7rem' }}>{tool.stars}</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>Best for: {tool.bestFor}</p>
            {tool.install && (
              <div className="copy-row" style={{ marginTop: '0.25rem' }}>
                <CopyButton text={tool.install} label="Copy install" />
                <pre style={{ margin: 0, flex: 1 }}><code>{tool.install}</code></pre>
              </div>
            )}
          </article>
        ))}
      </div>

      <h3 style={{ marginTop: '2rem' }}>FAQ</h3>
      <div style={{ marginTop: '0.75rem' }}>
        {toolFaqItems.map((item, i) => (
          <details key={i} style={{ marginBottom: '0.5rem' }}>
            <summary style={{ fontWeight: 600, cursor: 'pointer', padding: '0.5rem 0' }}>
              {item.q}
            </summary>
            <p style={{ color: 'var(--text-muted)', padding: '0 0 0.5rem 0', margin: 0 }}>
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </>
  );
}
