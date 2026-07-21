import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const root = process.cwd()
const codexSkill = path.join(root, '.agents', 'skills', 'build-quality-react-ui')
const claudeSkill = path.join(root, '.claude', 'skills', 'build-quality-react-ui')

async function collectFiles(directory, current = directory) {
  const entries = await readdir(current, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const fullPath = path.join(current, entry.name)
    if (entry.isDirectory()) files.push(...await collectFiles(directory, fullPath))
    else files.push(path.relative(directory, fullPath).replaceAll('\\', '/'))
  }
  return files.sort()
}

async function fingerprint(directory, files) {
  const hash = createHash('sha256')
  for (const file of files) {
    hash.update(file)
    hash.update(await readFile(path.join(directory, file)))
  }
  return hash.digest('hex')
}

const [codexFiles, claudeFiles] = await Promise.all([collectFiles(codexSkill), collectFiles(claudeSkill)])

if (JSON.stringify(codexFiles) !== JSON.stringify(claudeFiles)) {
  throw new Error('Skill mirrors contain different file sets.')
}

const [codexHash, claudeHash] = await Promise.all([
  fingerprint(codexSkill, codexFiles),
  fingerprint(claudeSkill, claudeFiles),
])

if (codexHash !== claudeHash) {
  throw new Error('Skill mirrors have drifted. Keep both copies identical.')
}

console.log(`Skill mirrors match (${codexFiles.length} files, ${codexHash.slice(0, 12)}).`)
