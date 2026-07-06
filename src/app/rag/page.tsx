import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RAG & Grounding',
  description:
    'Retrieval-Augmented Generation explained. Learn how RAG gives LLMs access to external knowledge, reduces hallucination, and how to build a RAG pipeline.',
};

export default function RagPage() {
  return (
    <>
      <p className="eyebrow">RAG & Grounding</p>
      <h2>What is RAG? Retrieval-Augmented Generation.</h2>
      <p className="subtitle">
        RAG is a technique that gives large language models access to external, up-to-date
        information instead of relying only on what they learned during training.
      </p>

      <h3>What is RAG?</h3>
      <p>
        As IBM explains, RAG is an architecture for optimizing an AI model's performance
        by connecting it with external knowledge bases. AWS describes it more concretely:
        RAG optimizes an LLM's output so it references an authoritative knowledge base
        outside its training data before generating a response.
      </p>
      <p>
        The core idea, per Wikipedia: RAG lets LLMs retrieve and incorporate new information
        from external sources — the model first consults a specified set of documents, then
        answers the user's query, supplementing its pre-existing training knowledge. The term
        itself comes from a 2020 paper describing a parametric language model combined with
        non-parametric external memory accessed via retrieval at inference time.
      </p>

      <h3 style={{ marginTop: '2rem' }}>Why it matters</h3>
      <div className="content-grid-2" style={{ marginTop: '0.75rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Cost</span>
          </div>
          <p className="card-body">
            RAG lets organizations ground LLMs on their own data without retraining or
            fine-tuning, so they can deploy customized AI capabilities much faster and cheaper.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Accuracy & Freshness</span>
          </div>
          <p className="card-body">
            RAG helps reduce hallucinations, keeps responses up to date, and tailors outputs
            to a company's own content without retraining the model.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Privacy</span>
          </div>
          <p className="card-body">
            Because external knowledge bases can be stored locally or privately, RAG doesn't
            require sharing confidential data with third-party LLMs.
          </p>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Trust & Verification</span>
          </div>
          <p className="card-body">
            RAG lets LLMs cite their sources, so users can cross-check retrieved content
            for accuracy. A well-known cautionary example: Google's Bard demo once gave
            incorrect info about the James Webb Space Telescope, contributing to a $100
            billion stock drop — the kind of hallucination RAG is meant to prevent.
          </p>
        </article>
      </div>

      <h3 style={{ marginTop: '2rem' }}>How RAG works — the two-step process</h3>
      <p>
        Per an arXiv survey: RAG operates in two steps. First, a retrieval module fetches
        relevant documents based on the input prompt, typically from external sources like
        news, research, or social media. Then those retrieved documents are combined with
        the original prompt and fed into the LLM to generate the final output. This blends
        the model's own learned (&ldquo;parametric&rdquo;) knowledge with external
        (&ldquo;non-parametric&rdquo;) knowledge from the retrieved documents.
      </p>
      <p>
        Practically, an embedding model converts your data into numerical vector representations
        stored in a vector database, creating a searchable knowledge library. When a query comes
        in, it's converted to a vector too, and matched against the database — e.g., an HR
        chatbot asked &ldquo;how much annual leave do I have?&rdquo; would retrieve both the
        leave policy and that employee's leave record, because those are the most relevant vectors.
      </p>

      <div className="rag-flow" style={{ marginTop: '0.75rem' }}>
        {[
          'User Query → embedded as vector',
          'Vector search → finds top-K relevant chunks',
          'Retrieved chunks + original prompt → LLM',
          'Grounded answer with source citations',
        ].map((step, i) => (
          <div
            key={i}
            className="card"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem 1rem',
            }}
          >
            <span className="badge" style={{ minWidth: '24px', textAlign: 'center' }}>
              {i + 1}
            </span>
            <span style={{ fontSize: '0.85rem' }}>{step}</span>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '2rem' }}>Building a RAG pipeline</h3>
      <p>
        Most guides break the pipeline into the same core stages: document ingestion (pull
        data from PDFs, websites, or databases), text chunking (break documents into manageable
        pieces), embedding generation (convert chunks into vectors), storage in a vector
        database (like Pinecone or Weaviate), retrieval (find the most relevant chunks by
        similarity), and generation (an LLM turns retrieved context into a natural-language answer).
      </p>

      <h4 style={{ marginTop: '1.5rem' }}>1. Chunking</h4>
      <p>
        This is often the make-or-break step. When a RAG system performs poorly, the problem
        is often not the retriever — it's the chunks. Even a perfect retrieval system fails
        if it searches over poorly prepared data. Chunks that are too big mix multiple ideas
        together, so subtopics get lost or muddled. Common strategies include fixed-size
        splitting with overlap, or more semantic/structure-aware splitting. Libraries like
        LangChain and LlamaIndex offer built-in splitters.
      </p>

      <h4>2. Embeddings</h4>
      <p>
        Pick a model trained on data similar to yours. Larger embedding models generally
        perform better but need more compute, so you balance performance against efficiency.
        For domain-specific jargon, fine-tuning the embedding model on your own data can
        improve retrieval quality.
      </p>

      <h4>3. Indexing & Retrieval</h4>
      <p>
        Pure vector similarity isn't always enough — vector embeddings can miss exact-match
        terms like product names. Hybrid search combining BM25 keyword scoring with dense
        vector similarity — merged via Reciprocal Rank Fusion — works well for many RAG
        pipelines. A popular pattern: index small chunks for retrieval precision, but return
        the larger surrounding &ldquo;parent&rdquo; chunk to the LLM for generation, separating
        retrieval granularity from generation context.
      </p>

      <h4>4. Generation & Augmentation</h4>
      <p>
        Retrieved chunks are injected into the LLM prompt, and the LLM is prompted to produce
        a final, context-informed response.
      </p>

      <div className="content-grid-2" style={{ marginTop: '1.5rem' }}>
        <article className="card">
          <div className="card-header">
            <span className="badge">Common Tools</span>
          </div>
          <ul style={{ paddingLeft: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <li><strong>Vector DBs:</strong> Pinecone, Weaviate, Chroma, Qdrant, Milvus, pgvector, Redis</li>
            <li><strong>Frameworks:</strong> LangChain, LlamaIndex, Semantic Kernel</li>
            <li><strong>Embedding models:</strong> text-embedding-3-large, bge-large-en, all-MiniLM-L6-v2</li>
          </ul>
        </article>
        <article className="card">
          <div className="card-header">
            <span className="badge">Use Cases</span>
          </div>
          <ul style={{ paddingLeft: '1rem', fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.7 }}>
            <li>Customer support chatbots on internal docs</li>
            <li>Chatbots with near-real-time info from live sources</li>
            <li>Domain-specific assistants using internal data or scholarly journals</li>
          </ul>
        </article>
      </div>

      <h3 style={{ marginTop: '2rem' }}>Important caveats</h3>
      <p>
        RAG isn't automatically an improvement. A recent arXiv study on malware-analysis
        LLMs found the opposite in that domain: RAG frequently degraded explanation quality
        by introducing distracting or weakly related context, and could be counterproductive
        when the structured input evidence was already sufficient. Evaluate RAG against a
        strong non-RAG baseline for your specific use case.
      </p>
      <p>
        Also worth flagging: any document sources fed into a RAG system are potential attack
        vectors for bad actors to launch data poisoning attacks, so consider detection and
        filtering mechanisms.
      </p>

      <div className="content-grid-2" style={{ marginTop: '2rem' }}>
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
            Agents use RAG as one tool among many. The agent decides when to search the
            knowledge base, when to call an API, and when to rely on its own reasoning.
          </p>
        </article>
      </div>
    </>
  );
}
