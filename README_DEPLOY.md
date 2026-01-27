# Deployment Guide (DigitalOcean VPS)

This project runs on a VPS with **Nginx**, **PM2**, and **MySQL**.

## 1. Quick Update Workflow
When you make changes on your local computer:

1.  **Local:** Commit and push changes:
    ```bash
    git add .
    git commit -m "Describe your changes"
    git push origin main
    ```

2.  **Server:** Log in and pull changes:
    ```bash
    ssh root@157.245.153.209
    cd ~/chillocreative
    git pull origin main
    ```

3.  **Server:** Apply changes (Frontend):
    ```bash
    cd frontend
    npm install         # (Only if you added new packages)
    npx prisma db push  # (Only if you changed schema.prisma)
    npm run build       # (Rebuild the Next.js app)
    pm2 restart chillo-frontend
    ```

## 2. Server Architecture
-   **Frontend**: Next.js (running on port 3000 via PM2)
-   **Backend**: WordPress (running at `/var/www/html/wordpress` via PHP-FPM)
-   **Database**: MySQL (local)
-   **Web Server**: Nginx (Handles SSL and routes traffic to either Next.js or WordPress)

## 3. Important Paths
-   **Project Root**: `~/chillocreative`
-   **Frontend Config**: `~/chillocreative/frontend`
-   **WordPress Files**: `/var/www/html/wordpress` (Symlinked or copied)
-   **Nginx Config**: `/etc/nginx/conf.d/chillocreative.conf`
-   **Env Variables**: `~/chillocreative/frontend/.env.production`

## 4. Troubleshooting
-   **App Down?** Run `pm2 status` or `pm2 logs`.
-   **WordPress Down?** Run `systemctl status php8.4-fpm`.
-   **Site Error?** Run `nginx -t` and `tail -n 20 /var/log/nginx/error.log`.
