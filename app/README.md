# EcoTrack Wert — reconstrução (app)

Cresce sprint a sprint pelo `ROADMAP.md` na raiz do repositório. O sistema que já funciona está congelado em `../referencia/`.

## Subir

```bash
docker compose up --build
```

| Serviço | Porta no host |
|---|---|
| SQL Server | 1434 |
| API | 3001 |
| Front (Vite) | 5174 |

Health: [http://127.0.0.1:3001/health](http://127.0.0.1:3001/health)

Banco: `EcoTrackWertApp` (container próprio, não mistura com a referência).
