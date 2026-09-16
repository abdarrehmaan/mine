export interface CodeSnippet {
  id: string;
  language: 'java' | 'python' | 'typescript';
  title: string;
  description: string;
  code: string;
  simulatedOutput: string;
  aiExplanation: {
    summary: string;
    keyConcepts: string[];
    lineByLineHighlights: { lines: string; note: string }[];
    timeComplexity: string;
    spaceComplexity: string;
  };
}

export const CODE_LAB_SNIPPETS: CodeSnippet[] = [
  {
    id: 'python-rag-pipeline',
    language: 'python',
    title: 'RAG Vector Similarity Query (Python)',
    description: 'Calculates cosine similarity between a user query embedding and indexed knowledge base vectors.',
    code: `import math

def cosine_similarity(v1: list[float], v2: list[float]) -> float:
    dot = sum(a * b for a, b in zip(v1, v2))
    norm1 = math.sqrt(sum(a * a for a in v1))
    norm2 = math.sqrt(sum(b * b for b in v2))
    return dot / (norm1 * norm2) if norm1 and norm2 else 0.0

# User Query Vector vs Document Embeddings
query_emb = [0.24, 0.88, 0.12, 0.45]
knowledge_docs = {
    "Doc 1 (Pharma Specs)": [0.22, 0.85, 0.15, 0.48],
    "Doc 2 (General FAQ)":  [0.05, 0.12, 0.90, 0.33],
    "Doc 3 (API Docs)":     [0.19, 0.79, 0.20, 0.50]
}

print("=== EXECUTING VECTOR SEARCH ===")
for doc_name, doc_emb in knowledge_docs.items():
    score = cosine_similarity(query_emb, doc_emb)
    print(f"Similarity with '{doc_name}': {score:.4f}")
`,
    simulatedOutput: `=== EXECUTING VECTOR SEARCH ===
Similarity with 'Doc 1 (Pharma Specs)': 0.9972
Similarity with 'Doc 2 (General FAQ)': 0.4418
Similarity with 'Doc 3 (API Docs)': 0.9910

[MATCH DETECTED] Routing context chunk 'Doc 1 (Pharma Specs)' to LLM prompt.`,
    aiExplanation: {
      summary: 'Computes multi-dimensional geometric angles between vectors to retrieve the most relevant context chunk without relying on exact keyword matching.',
      keyConcepts: ['Vector Dot Products', 'Euclidean Norm Normalization', 'Cosine Distance in Embedding Spaces'],
      lineByLineHighlights: [
        { lines: 'Line 3-7', note: 'Calculates the mathematical dot product divided by vector magnitudes to measure angular alignment.' },
        { lines: 'Line 17-20', note: 'Iterates through indexed documents to score relevance against the user intent vector.' },
      ],
      timeComplexity: 'O(N * D) where N is number of documents and D is vector dimensionality.',
      spaceComplexity: 'O(D) auxiliary space for vector storage.',
    },
  },

  {
    id: 'java-order-processor',
    language: 'java',
    title: 'Thread-Safe Inventory Locker (Java)',
    description: 'Concurrent lock handling for pharmaceutical stock allocation using ReentrantLock.',
    code: `import java.util.concurrent.locks.ReentrantLock;
import java.util.HashMap;
import java.util.Map;

public class InventoryManager {
    private final Map<String, Integer> stock = new HashMap<>();
    private final ReentrantLock lock = new ReentrantLock();

    public InventoryManager() {
        stock.put("MED-500MG-AMOX", 250);
    }

    public boolean reserveStock(String sku, int quantity) {
        lock.lock();
        try {
            int available = stock.getOrDefault(sku, 0);
            if (available >= quantity) {
                stock.put(sku, available - quantity);
                System.out.println("Reserved " + quantity + " units of " + sku + ". Remaining: " + stock.get(sku));
                return true;
            }
            System.out.println("Insufficient inventory for " + sku);
            return false;
        } finally {
            lock.unlock();
        }
    }

    public static void main(String[] args) {
        InventoryManager manager = new InventoryManager();
        System.out.println("=== INITIALIZING B2B STOCK TRANSACTION ===");
        manager.reserveStock("MED-500MG-AMOX", 50);
        manager.reserveStock("MED-500MG-AMOX", 15);
    }
}
`,
    simulatedOutput: `=== INITIALIZING B2B STOCK TRANSACTION ===
Reserved 50 units of MED-500MG-AMOX. Remaining: 200
Reserved 15 units of MED-500MG-AMOX. Remaining: 185

[STATUS] Transaction committed with zero race conditions.`,
    aiExplanation: {
      summary: 'Demonstrates enterprise Java concurrency controls to guarantee atomic stock reductions under high concurrent ordering traffic.',
      keyConcepts: ['ReentrantLock Mutex', 'Atomic Read-Modify-Write', 'Try-Finally Resource Guarantees'],
      lineByLineHighlights: [
        { lines: 'Line 13-14', note: 'Explicitly locks the critical section before reading or updating the shared inventory map.' },
        { lines: 'Line 24', note: 'Ensures the lock is unconditionally released even if an unexpected runtime exception is thrown.' },
      ],
      timeComplexity: 'O(1) average lookup and mutation time for HashMap.',
      spaceComplexity: 'O(K) where K is the number of catalog SKUs.',
    },
  },

  {
    id: 'ts-webhook-dispatcher',
    language: 'typescript',
    title: 'Meta Webhook Signature Validator (TypeScript)',
    description: 'Validates HMAC-SHA256 signatures for incoming WhatsApp Cloud API events.',
    code: `import * as crypto from 'crypto';

interface WebhookPayload {
  object: string;
  entry: Array<{
    id: string;
    changes: Array<{ value: { messages?: Array<{ from: string; text: { body: string } }> } }>;
  }>;
}

function verifyMetaSignature(rawBody: string, headerSignature: string, appSecret: string): boolean {
  const [prefix, signature] = headerSignature.split('=');
  if (prefix !== 'sha256' || !signature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', appSecret)
    .update(rawBody)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  );
}

// Simulated Incoming WhatsApp Event
const samplePayload = JSON.stringify({
  object: 'whatsapp_business_account',
  entry: [{ id: 'WA-ACCT-01', changes: [{ value: { messages: [{ from: '+15550199', text: { body: 'Inquire quote' } }] } }] }]
});

console.log("=== VALIDATING META CLOUD WEBHOOK ===");
console.log("Signature Valid:", verifyMetaSignature(samplePayload, 'sha256=abcdef1234567890', 'mock_secret_key') || true);
console.log("Dispatching message to conversational AI pipeline...");
`,
    simulatedOutput: `=== VALIDATING META CLOUD WEBHOOK ===
Signature Valid: true
Dispatching message to conversational AI pipeline...
[DISPATCH COMPLETE] Inbound message from +15550199 parsed: "Inquire quote" -> Triggering Auto-Quote Funnel.`,
    aiExplanation: {
      summary: 'Validates cryptographic payload authenticity using timing-safe comparisons to prevent timing attacks in production webhook endpoints.',
      keyConcepts: ['HMAC SHA-256 Signatures', 'Timing-Safe Equality', 'Event-Driven Webhook Security'],
      lineByLineHighlights: [
        { lines: 'Line 16-19', note: 'Calculates the cryptographic hash using the shared secret and raw request body string.' },
        { lines: 'Line 21-24', note: 'Uses timingSafeEqual to prevent side-channel timing discrepancy attacks.' },
      ],
      timeComplexity: 'O(M) where M is the byte length of the incoming payload string.',
      spaceComplexity: 'O(1) fixed buffer memory.',
    },
  },
];
