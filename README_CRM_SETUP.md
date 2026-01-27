# Chillo CRM - Production Setup Guide

Follow these steps to enable the CRM features on your cPanel server.

## 1. Create Production Database
1. Log in to **cPanel**.
2. Go to **MySQL® Database Wizard**.
3. **Step 1: Create A Database**
   - Name: `chillo_crm` (or similar) -> Result: `yourusername_chillo_crm`
4. **Step 2: Create Database Users**
   - Username: `crm_admin`
   - Password: **Generate a strong password and save it!**
5. **Step 3: Add User to Database**
   - Select "ALL PRIVILEGES".
   - Click "Make Changes".

## 2. Configure Environment Variables
1. Go to **File Manager** in cPanel.
2. Navigate to your app directory (e.g., `/home/username/frontend` or where you deployed).
3. Create or Edit the `.env` file (ensure hidden files are visible in Settings).
4. Add the following lines (replace with your actual details):

```env
# Database Connection (Replace placeholders)
# Format: mysql://USER:PASSWORD@HOST:PORT/DATABASE
DATABASE_URL="mysql://yourusername_crm_admin:YourStrongPassword123!@localhost:3306/yourusername_chillo_crm"

# Authentication Secret (Keep this unique)
JWT_SECRET="generate-a-random-secure-string-here"

# Public URL
NEXT_PUBLIC_WORDPRESS_API_URL="https://chillocreative.com/wordpress/graphql"
```

## 3. Initialize the Database
Since you have SSH access (terminal) or via the Node.js App interface setup, run these commands from your app root folder:

### Option A: Using cPanel Terminal (Recommended)
1. Open **Terminal** in cPanel.
2. Navigate to your app folder:
   ```bash
   cd frontend
   # or
   cd /home/yourusername/frontend
   ```
3. Install dependencies and generate database client:
   ```bash
   npm install
   npx prisma generate
   ```
4. Run the database setup script to create tables and your admin user:
   ```bash
   # Create tables
   npx prisma db push

   # Seed admin user (rahim / Rahim1977@)
   npx prisma db seed
   ```

### Option B: Using NPM Script (If Terminal is tricky)
You can try adding a temporary route or using the Node.js selector "Run script" feature if available, but Terminal is best.

## 4. Restart Application
1. Go to **Setup Node.js App** in cPanel.
2. Click **Restart**.

## 5. Verify
Go to `https://chillocreative.com/admin` and log in with:
- **Username**: `rahim`
- **Password**: `Rahim1977@`
