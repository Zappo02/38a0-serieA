# Serie A 38-0 ⚽

Gira la ruota, pesca un club e una stagione della Serie A, scegli un giocatore reale e costruisci il tuo undici ideale. Poi scopri se può chiudere una stagione perfetta: **38 vittorie, 0 sconfitte**.

App React + Vite, single-page, pronta per il deploy su Vercel.

## Caratteristiche

- **1680 giocatori reali** della Serie A, 7 stagioni (2019-20 → 2025-26), 31 club, con rating e ruoli basati sul database FC/FIFA.
- **8 formazioni**: 4-3-3, 4-4-2, 3-5-2, 4-2-3-1, 3-4-3, 4-3-1-2, 5-3-2, 4-1-4-1.
- **2 modalità di draft**: Position First (slot fisso, poi giri) e Squad First (giri, scegli, poi piazzi).
- **3 difficoltà**: Facile (3 reroll), Normale (0 reroll), Difficile (rating nascosti / blind mode).
- **Ruota animata** allo spin.
- **Infografica reparti** (Attacco / Centrocampo / Difesa / Portiere) in tempo reale durante il draft.
- **Simulazione stagione partita per partita** con marcatori e minuti, e tasto per saltare al risultato.
- **Regole ruoli realistiche**: ogni giocatore copre solo i ruoli che gioca davvero; i terzini destro/sinistro e mediano/mezzala sono intercambiabili.
- **Niente duplicati**: lo stesso giocatore non può essere scelto in due stagioni diverse nella stessa partita.

## Sviluppo locale

```bash
npm install
npm run dev
```

Apri l'indirizzo indicato (di solito `http://localhost:5173`).

## Build di produzione

```bash
npm run build      # genera la cartella dist/
npm run preview    # anteprima della build
```

## Deploy su Vercel

1. Carica questo repo su GitHub.
2. Su [vercel.com](https://vercel.com) → **New Project** → importa il repo.
3. Vercel rileva Vite in automatico. Impostazioni (se richieste):
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. **Deploy**.

## Aggiornare i dati dei giocatori

Tutti i giocatori sono nell'array `PLAYERS` in cima a `src/App.jsx`. Ogni voce ha:

```js
{ id, pid, n: "Nome", c: "Club", s: "2025-26", r: "ruolo principale", rt: 88, rg: ["ruoli","giocabili"] }
```

- `pid` = identificatore persona (stesso giocatore in stagioni diverse condivide lo stesso `pid`, così non può essere scelto due volte).
- `r` / `rg` usano i codici: `GK, RB, LB, CB, CDM, CM, CAM, RW, LW, ST`.

## Crediti

Ispirato a *38-0.app*. Dati giocatori basati sul database FC/FIFA.
