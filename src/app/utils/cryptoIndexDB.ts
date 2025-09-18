import { CryptoCurrencyList } from "../http/crypto";
import { openDB } from "idb";

async function getDB() {
    return openDB("cryptoDataBase", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("cryptoCurrency")) {
          db.createObjectStore("cryptoCurrency", { keyPath: "cmcRank" });
        }
      },
    });
}

export async function getCrypto() {
    const db = await getDB();
    return db.getAll("cryptoCurrency");
}

export async function saveCryptoCurrency(cryptoCurrency: CryptoCurrencyList[]) {
    const db = await getDB();
    const tx = db.transaction("cryptoCurrency", "readwrite");
    const store = tx.objectStore("cryptoCurrency");
    for (const crypto of cryptoCurrency) {
      await store.put(crypto);
    }
    await tx.done;
}