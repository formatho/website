# Formatho Deployment Runbook

**Last Updated:** March 29, 2026
**Repository:** https://github.com/formatho/website
**Production URL:** https://formatho.com

---

## Quick Reference

| Service | Container | Purpose | Port |
|---------|-----------|---------|------|
| Nginx | `nginx_proxy` | Reverse proxy, SSL | 80, 443 |
| App | `formatho_app` | Static site (Vue.js) | Internal |
| WordPress | `wordpress_app` | Blog/insights | Internal |
| MariaDB | `wordpress_db` | Database | Internal |
| Certbot | `certbot` | SSL renewal | Internal |

### Essential Commands

```bash
# SSH into server
ssh root@157.245.249.105

# Navigate to project
cd /home/deploy/formatho

# Check status
docker compose ps

# View logs
docker compose logs -f app

# Restart services
docker compose restart
```

---

## Deployment Process

### Automatic (CI/CD)

Push to `main` triggers deployment via `.github/workflows/deploy-do.yml`

### Manual

```bash
ssh root@157.245.249.105
cd /home/deploy/formatho
docker compose pull
docker compose up -d
```

---

## Troubleshooting

### Site Not Loading

```bash
docker compose ps                    # Check status
docker compose logs nginx --tail=50  # Check nginx logs
docker compose restart app           # Restart app
```

### 502 Bad Gateway

```bash
docker compose restart app
docker compose logs app --tail=100
```

### SSL Issues

```bash
docker compose exec certbot certbot renew --dry-run
docker compose restart nginx
```

---

## Backup

### Database

```bash
docker compose exec db mysqldump -u root -p wordpress > backup.sql
```

### Restore

```bash
cat backup.sql | docker compose exec -T db mysql -u root -p wordpress
```

---

For detailed documentation, see the full runbook in the workspace.

*Last updated: March 29, 2026*
