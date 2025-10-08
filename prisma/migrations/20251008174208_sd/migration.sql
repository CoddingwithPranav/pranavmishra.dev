/*
  Warnings:

  - You are about to drop the column `tagId` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the `tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."projects" DROP CONSTRAINT "projects_tagId_fkey";

-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "tagId";

-- DropTable
DROP TABLE "public"."tags";
