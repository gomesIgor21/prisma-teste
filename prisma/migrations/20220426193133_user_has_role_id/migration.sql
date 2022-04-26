/*
  Warnings:

  - The primary key for the `user_has_roles` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `user_has_roles` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "user_has_roles" DROP CONSTRAINT "user_has_roles_roleId_fkey";

-- DropForeignKey
ALTER TABLE "user_has_roles" DROP CONSTRAINT "user_has_roles_userId_fkey";

-- AlterTable
ALTER TABLE "user_has_roles" DROP CONSTRAINT "user_has_roles_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "roleId" DROP NOT NULL,
ADD CONSTRAINT "user_has_roles_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "user_has_roles" ADD CONSTRAINT "user_has_roles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_has_roles" ADD CONSTRAINT "user_has_roles_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE SET NULL ON UPDATE CASCADE;
