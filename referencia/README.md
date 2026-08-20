# EcoTrack Wert — sistema funcional (congelado)

Cópia do software que já sobe. **Não editar** depois do freeze. A reconstrução do semestre vive em `../app/`.

## Subir

```bash
docker compose up --build
```

| Serviço | Porta no host |
|---|---|
| SQL Server | 1433 |
| API | 3000 |
| Front (Vite) | 5173 |

Health: [http://127.0.0.1:3000/health](http://127.0.0.1:3000/health)

Login seed (mesmo da cópia): `admin@wert.com.br` — senha no `backend/database/scripts/seed_admin.sql` / README do backend.
