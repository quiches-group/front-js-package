type TokenAndRefreshType = { token: string; refreshToken: string }

class IndexedDBService {
    private readonly dbName = 'quiche-sso-db'

    private readonly tableName = 'tokenAndRefreshToken'

    // @ts-ignore
    private db: IDBDatabase;

    // @ts-ignore
    private table: IDBObjectStore;
    
    // @ts-ignore
    static private indexedDBServiceInstance: IndexedDBService;
    
    private setupConnection(): Promise<void> {
        return new Promise ((resolve, reject) => {
            // eslint-disable-next-line no-undef
            const request = window.indexedDB.open(this.dbName);

            request.onsuccess = (e: Event): void => {
                const target = e.target as IDBOpenDBRequest;
                this.db = target.result;

                resolve();
            };

            // TODO: Improve implementation by following the moz documentation
            // https://developer.mozilla.org/en-US/docs/Web/API/IDBOpenDBRequest/onupgradeneeded#example
            request.onupgradeneeded = (e: Event): void => {
                const target = e.target as IDBOpenDBRequest;
                this.db = target.result;

                this.table = this.db.createObjectStore(this.tableName, { autoIncrement: true });

                resolve();
            };

            request.onerror = (): void => {
                reject();
            }
        });
    }
    
    static getInstance = (): Promise<IndexedDBService | null> => {
        return new Promise(async (resolve, reject) => {
            if(!IndexedDBService.indexedDBServiceInstance) {
                try {
                    IndexedDBService.indexedDBServiceInstance = new IndexedDBService();
                    await IndexedDBService.indexedDBServiceInstance.setupConnection();
                } catch (e) {
                    return reject(null);
                }
            }
            
            return resolve(IndexedDBService.indexedDBServiceInstance);
        });
    };

    addToken = (data: TokenAndRefreshType): Promise<void> => new Promise((resolve, reject) => {
        const tx = this.db.transaction([this.tableName], 'readwrite');
        const store = tx.objectStore(this.tableName);

        store.add(data);

        tx.oncomplete = (): void => {
            resolve();
        };

        tx.onerror = (): void => {
            reject();
        };
    })

    getToken = (): Promise<TokenAndRefreshType> => new Promise((resolve: {(data: TokenAndRefreshType): void}, reject) => {
        const tx = this.db.transaction([this.tableName], 'readonly');
        const store = tx.objectStore(this.tableName);

        const request = store.openCursor();

        const dataArray: string[] = [];

        request.onsuccess = (e: Event): void => {
            const target = e.target as IDBRequest;
            const cursor = target.result;

            if (cursor != null) {
                dataArray.push(cursor.value);
                cursor.continue();
            } else {
                // @ts-ignore
                const data: TokenAndRefreshType = dataArray[dataArray.length - 1];

                if (!data) {
                    reject();
                } else {
                    resolve(data);
                }
            }
        };
    })
}

export default new IndexedDBService();
