-- AlterTable
ALTER TABLE "File" ADD COLUMN     "bundleSlug" TEXT;

-- CreateTable
CREATE TABLE "LinkTree" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "bio" TEXT,
    "links" JSONB NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LinkTree_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QRCode" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "qrStyle" TEXT NOT NULL DEFAULT 'squares',
    "qrColor" TEXT NOT NULL DEFAULT '#7c3aed',
    "bgColor" TEXT NOT NULL DEFAULT '#ffffff',
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LinkTree_slug_key" ON "LinkTree"("slug");

-- CreateIndex
CREATE INDEX "LinkTree_slug_idx" ON "LinkTree"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "QRCode_slug_key" ON "QRCode"("slug");

-- CreateIndex
CREATE INDEX "QRCode_slug_idx" ON "QRCode"("slug");

-- CreateIndex
CREATE INDEX "File_bundleSlug_idx" ON "File"("bundleSlug");
