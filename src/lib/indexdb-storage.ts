// IndexedDB wrapper for storing editor content with images
const DB_NAME = "simple-editor-db"
const DB_VERSION = 1
const STORE_NAME = "editor-content"

interface EditorData {
  id: string
  title: string
  subtitle: string
  content: any
  images: { [key: string]: Blob }
  updatedAt: string
}

class EditorStorage {
  private db: IDBDatabase | null = null

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        this.db = request.result
        resolve()
      }

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME, { keyPath: "id" })
        }
      }
    })
  }

  async save(data: Omit<EditorData, "id" | "updatedAt">): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)

      const editorData: EditorData = {
        id: "main-editor",
        ...data,
        updatedAt: new Date().toISOString(),
      }

      const request = store.put(editorData)
      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }

  async load(): Promise<EditorData | null> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.get("main-editor")

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result || null)
    })
  }

  async clear(): Promise<void> {
    if (!this.db) await this.init()

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite")
      const store = transaction.objectStore(STORE_NAME)
      const request = store.delete("main-editor")

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve()
    })
  }
}

export const editorStorage = new EditorStorage()
