
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
      console.log('Database opened successfully')

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
          console.log('Pokemons fetched successfully')
        };

        request.onerror = () => {
          reject(request.error);
        };
      })
      .catch((error) => {
        reject(error);
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
              innerReject(request.error);
            };
          });

          promises.push(promise);
        });

        Promise.all(promises)
          .then(() => {
            resolve();
            console.log('Pokemons added successfully')
            handleDBChange()

          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        reject(error);
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
          console.log('Pokemon removed successfully')
          handleDBChange()
        };

        request.onerror = () => {
          reject(request.error);
        };
      })
      .catch((error) => {
        reject(error);
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
          console.log('Pokemon edited successfully')
          handleDBChange()
        };

        request.onerror = () => {
          reject(request.error);
        };
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function handleDBChange() {
  getAllCaughtPokemons()
    .then((pokemons) => {
      store.dispatch(updateCaughtPokemons(pokemons));
    })
    .catch((error) => {
      console.error('Erro ao obter os Pokémon:', error);
    });
}