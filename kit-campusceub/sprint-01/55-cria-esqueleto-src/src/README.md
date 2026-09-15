# EcoTrack — src (esqueleto)

Sobe com Docker. Sem login e sem cadastros nesta Task.

```bash
docker compose up --build
```

| Serviço | Porta no host |
|---|---|
| SQL Server | 1434 |
| API | 3001 |
| Front (Vite) | 5174 |

Health: http://127.0.0.1:3001/health

Banco: `EcoTrackWertApp`.
