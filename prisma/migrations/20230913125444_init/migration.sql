-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "userName" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inst" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "manufacturer" TEXT,
    "description" TEXT,
    "link" TEXT,

    CONSTRAINT "Inst_pkey" PRIMARY KEY ("id")
);
