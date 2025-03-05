-- CreateEnum
CREATE TYPE "StatusUser" AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "TypeUser" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "TypeUserToken" AS ENUM ('ACTIVE', 'REFRESH', 'PASSWORD', 'SESSION');

-- CreateEnum
CREATE TYPE "TypeClient" AS ENUM ('FISICA', 'JURIDICA');

-- CreateEnum
CREATE TYPE "StatusService" AS ENUM ('ACTIVE', 'PENDING', 'INACTIVE');

-- CreateEnum
CREATE TYPE "StatusInvoice" AS ENUM ('PENDING', 'SENDED', 'EXPIRED', 'PAID', 'CANCELED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" VARCHAR(255),
    "cellphone" VARCHAR(15),
    "avatar_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "status" "StatusUser" NOT NULL DEFAULT 'INACTIVE',
    "type" "TypeUser" NOT NULL DEFAULT 'CLIENT',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accounts" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessions" (
    "id" TEXT NOT NULL,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "type" "TypeUserToken" NOT NULL DEFAULT 'SESSION',
    "publicIP" VARCHAR(255),

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clients" (
    "id" TEXT NOT NULL,
    "idNumber" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "host" VARCHAR(255) NOT NULL,
    "token" VARCHAR(32) NOT NULL,
    "logo" VARCHAR(255),
    "user_id" VARCHAR(25) NOT NULL,
    "address_id" VARCHAR(25),
    "document" VARCHAR(15) NOT NULL,
    "type" "TypeClient" NOT NULL DEFAULT 'JURIDICA',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "client_emails" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "client_emails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "client_id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT,
    "complement" TEXT,
    "neighborhood" TEXT,
    "city" TEXT NOT NULL,
    "uf" TEXT NOT NULL,
    "zipcode" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "description" TEXT,
    "slug" VARCHAR(255) NOT NULL,
    "status" "StatusService" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans" (
    "id" TEXT NOT NULL,
    "service_id" VARCHAR(25) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "whm_name" VARCHAR(255),
    "quota" INTEGER NOT NULL,
    "bw_limit" INTEGER,
    "price" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "plans_clients" (
    "id" TEXT NOT NULL,
    "plan_id" VARCHAR(25) NOT NULL,
    "service_id" VARCHAR(25) NOT NULL,
    "client_id" VARCHAR(25) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "suspended_at" TIMESTAMP(3),
    "created_by" VARCHAR(25) NOT NULL,

    CONSTRAINT "plans_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoice_plans_clients" (
    "id" TEXT NOT NULL,
    "plansOnClientId" VARCHAR(25) NOT NULL,
    "invoiceId" VARCHAR(25) NOT NULL,

    CONSTRAINT "invoice_plans_clients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" TEXT NOT NULL,
    "reference" TEXT NOT NULL,
    "client_id" VARCHAR(25) NOT NULL,
    "amount" INTEGER NOT NULL,
    "due_date" DATE NOT NULL,
    "paid_at" TIMESTAMP(3),
    "payment_type" TEXT,
    "nossoNumero" TEXT,
    "barCode" TEXT,
    "digitableLine" TEXT,
    "status" "StatusInvoice" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_cellphone_key" ON "users"("cellphone");

-- CreateIndex
CREATE INDEX "accounts_user_id_idx" ON "accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");

-- CreateIndex
CREATE INDEX "sessions_user_id_idx" ON "sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_id_key" ON "clients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "clients_host_key" ON "clients"("host");

-- CreateIndex
CREATE UNIQUE INDEX "clients_token_key" ON "clients"("token");

-- CreateIndex
CREATE UNIQUE INDEX "clients_user_id_key" ON "clients"("user_id");

-- CreateIndex
CREATE INDEX "clients_user_id_idx" ON "clients"("user_id");

-- CreateIndex
CREATE INDEX "clients_address_id_idx" ON "clients"("address_id");

-- CreateIndex
CREATE INDEX "client_emails_client_id_idx" ON "client_emails"("client_id");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_id_key" ON "addresses"("id");

-- CreateIndex
CREATE UNIQUE INDEX "services_id_key" ON "services"("id");

-- CreateIndex
CREATE UNIQUE INDEX "services_slug_key" ON "services"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "plans_id_key" ON "plans"("id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_service_id_name_key" ON "plans"("service_id", "name");

-- CreateIndex
CREATE UNIQUE INDEX "plans_clients_id_key" ON "plans_clients"("id");

-- CreateIndex
CREATE INDEX "plans_clients_service_id_idx" ON "plans_clients"("service_id");

-- CreateIndex
CREATE INDEX "plans_clients_plan_id_idx" ON "plans_clients"("plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "plans_clients_client_id_service_id_plan_id_key" ON "plans_clients"("client_id", "service_id", "plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_plans_clients_id_key" ON "invoice_plans_clients"("id");

-- CreateIndex
CREATE INDEX "invoice_plans_clients_invoiceId_idx" ON "invoice_plans_clients"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "invoice_plans_clients_plansOnClientId_invoiceId_key" ON "invoice_plans_clients"("plansOnClientId", "invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_id_key" ON "invoices"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invoices_reference_key" ON "invoices"("reference");

-- CreateIndex
CREATE INDEX "invoices_client_id_idx" ON "invoices"("client_id");
