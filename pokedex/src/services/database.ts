
import { CaughtPokemon } from '../interfaces/pokemon'
import { store } from '../store';
import { updateCaughtPokemons } from '../store/modules/pokemonSlice'

export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('pokemonDB', 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      if (!db.objectStoreNames.contains('caughtPokemons')) {
        const store = db.createObjectStore('caughtPokemons', { keyPath: 'id' });
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('customPhoto', 'customPhoto', { unique: false });
      }
    };


    request.onsuccess = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      resolve(db);

    };

    request.onerror = (event) => {
      reject((event.target as IDBOpenDBRequest).error);
    };
  });
}

export function getAllCaughtPokemons(): Promise<CaughtPokemon[]> {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction('caughtPokemons', 'readonly');
        const store = transaction.objectStore('caughtPokemons');

        const request = store.getAll();

        request.onsuccess = () => {
          const pokemons: CaughtPokemon[] = request.result;
          resolve(pokemons);
        };

        request.onerror = () => {
          reject("Erro ao buscar pokemons");
        };
      })
      .catch(() => {
        reject("Erro ao buscar pokemons");
      });
  });
}

export function addMultipleCaughtPokemons(pokemons: CaughtPokemon[]): Promise<void> {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction('caughtPokemons', 'readwrite');
        const storeDB = transaction.objectStore('caughtPokemons');

        const promises: Promise<void>[] = [];

        pokemons.forEach((pokemon) => {
          const request = storeDB.add(pokemon);

          const promise = new Promise<void>((innerResolve, innerReject) => {
            request.onsuccess = () => {
              innerResolve();
            };

            request.onerror = () => {
              innerReject('Erro ao adicionar pokemons');
            };
          });

          promises.push(promise);
        });

        Promise.all(promises)
          .then(() => {
            resolve();

            handleDBChange()

          })
          .catch(() => {
            reject('Erro ao adicionar pokemons');
          });
      })
      .catch(() => {
        reject('Erro ao adicionar pokemons');
      });
  });
}

export function removeCaughtPokemon(id: number): Promise<void> {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction('caughtPokemons', 'readwrite');
        const store = transaction.objectStore('caughtPokemons');

        const request = store.delete(id);

        request.onsuccess = () => {
          resolve();

          handleDBChange()
        };

        request.onerror = () => {
          reject('Erro ao remover pokemon');
        };
      })
      .catch(() => {
        reject('Erro ao remover pokemon');
      });
  });
}

export function editCaughtPokemon(pokemon: CaughtPokemon): Promise<void> {
  return new Promise((resolve, reject) => {
    openDB()
      .then((db) => {
        const transaction = db.transaction('caughtPokemons', 'readwrite');
        const store = transaction.objectStore('caughtPokemons');

        const request = store.put(pokemon);

        request.onsuccess = () => {
          resolve();
          handleDBChange()
        };

        request.onerror = () => {
          reject('Erro ao editar pokemon');
        };
      })
      .catch(() => {
        reject('Erro ao editar pokemon');
      });
  });
}

export function handleDBChange() {
  getAllCaughtPokemons()
    .then((pokemons) => {
      store.dispatch(updateCaughtPokemons(pokemons));
    })
    .catch((error) => {
      console.error(error);
    });
}