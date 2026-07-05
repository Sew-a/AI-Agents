export default function RagPage() {
  return (
    <>
      <p className="eyebrow">RAG & Grounding</p>
      <h2>Retrieval-Augmented Generation.</h2>
      <p className="subtitle">
        RAG combines an information-retrieval component with a text-generator model.
        Instead of relying only on a model's frozen internal knowledge, RAG retrieves
        relevant external documents at query time and feeds them as context.
      </p>

      <h3>Why it matters</h3>
      <ul style={{ color: 'var(--text-soft)', lineHeight: 1.7, paddingLeft: '1.2rem' }}>
        <li>Improves factual consistency and reduces hallucination</li>
        <li>Knowledge can be updated by updating the document index — no retraining needed</li>
        <li>Performs strongly on knowledge-intensive benchmarks</li>
      </ul>

      <h3 style={{ marginTop: '1.5rem' }}>How it works</h3>
      <div className="rag-flow" style={{ marginTop: '0.75rem' }}>
        {['User Query', 'Retriever → searches vector DB', 'Top-K relevant chunks', 'Query + Context → LLM', 'Grounded Answer'].map((step, i) => (
          <div key={i} className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem' }}>
            <span className="badge" style={{ minWidth: '24px', textAlign: 'center' }}>{i + 1}</span>
            <span style={{ fontSize: '0.85rem' }}>{step}</span>
          </div>
        ))}
      </div>

      <div className="content-grid-2" style={{ marginTop: '1.5rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">RAG + Prompt</span>
          </div>
          <p className="card-body">
            Use the <strong>prompt</strong> to control behavior, tone, and decision logic.
            Use a <strong>RAG knowledge base</strong> for factual content that needs to stay current.
            Use <strong>tool calls</strong> for precision, computation, or live structured data.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Agent + RAG</span>
          </div>
          <p className="card-body">
            Agents use RAG as one tool among many. The agent decides when to search the knowledge base,
            when to call an API, and when to rely on its own reasoning.
          </p>
        </article>
      </div>
    </>
  );
}