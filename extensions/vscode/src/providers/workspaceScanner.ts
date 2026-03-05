import * as vscode from 'vscode'

export interface ComponentLocation {
  uri: vscode.Uri
  line: number
}

interface ProjectCache {
  components: Map<string, ComponentLocation>
  lastScan: number
}

const SCAN_INTERVAL = 30_000
const PASCAL_CASE_RE = /^[A-Z][a-zA-Z0-9]+$/

let cache: ProjectCache = { components: new Map(), lastScan: 0 }

// Patterns that export DOMQL components
const EXPORT_RE = /export\s+(?:const|let|var|function)\s+([A-Z][a-zA-Z0-9]+)/g
const OBJECT_KEY_RE = /^\s+([A-Z][a-zA-Z0-9]+)\s*[:{]/gm

function extractComponentsWithLines(text: string): { name: string; line: number }[] {
  const results: { name: string; line: number }[] = []
  const seen = new Set<string>()

  // Named exports: export const Button = { ... }
  EXPORT_RE.lastIndex = 0
  let m: RegExpExecArray | null
  while ((m = EXPORT_RE.exec(text))) {
    if (PASCAL_CASE_RE.test(m[1]) && !seen.has(m[1])) {
      seen.add(m[1])
      const line = text.substring(0, m.index).split('\n').length - 1
      results.push({ name: m[1], line })
    }
  }

  // Object keys inside component definitions
  OBJECT_KEY_RE.lastIndex = 0
  while ((m = OBJECT_KEY_RE.exec(text))) {
    if (PASCAL_CASE_RE.test(m[1]) && !seen.has(m[1])) {
      seen.add(m[1])
      const line = text.substring(0, m.index).split('\n').length - 1
      results.push({ name: m[1], line })
    }
  }

  return results
}

export async function scanWorkspaceComponents(): Promise<string[]> {
  await ensureScan()
  return [...cache.components.keys()].sort()
}

export async function getComponentLocation(name: string): Promise<ComponentLocation | undefined> {
  await ensureScan()
  return cache.components.get(name)
}

async function ensureScan(): Promise<void> {
  const now = Date.now()
  if (now - cache.lastScan < SCAN_INTERVAL && cache.components.size > 0) return

  const components = new Map<string, ComponentLocation>()

  try {
    const files = await vscode.workspace.findFiles(
      '**/*.{js,ts,jsx,tsx}',
      '{**/node_modules/**,**/dist/**,**/out/**,**/build/**,.next/**}',
      500
    )

    for (const file of files) {
      try {
        const doc = await vscode.workspace.openTextDocument(file)
        const text = doc.getText()
        if (/extends\s*:|childExtends|from\s+['"](@domql|@symbo\.ls|smbls)/.test(text)) {
          for (const { name, line } of extractComponentsWithLines(text)) {
            // First definition found wins (don't overwrite)
            if (!components.has(name)) {
              components.set(name, { uri: file, line })
            }
          }
        }
      } catch {
        // skip unreadable files
      }
    }
  } catch {
    // workspace not available
  }

  cache = { components, lastScan: now }
}

export function invalidateCache(): void {
  cache.lastScan = 0
}
