-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('NEW_INVOICE', 'DELAYED_INVOICE');

-- CreateTable
CREATE TABLE "alerts" (
    "id" TEXT NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "text" TEXT NOT NULL,
    "type" "AlertType" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "alerts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alerts_id_key" ON "alerts"("id");

-- CreateIndex
CREATE UNIQUE INDEX "alerts_slug_key" ON "alerts"("slug");
