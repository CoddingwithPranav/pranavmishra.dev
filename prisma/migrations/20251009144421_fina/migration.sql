/*
  Warnings:

  - You are about to drop the column `content` on the `aboutMe` table. All the data in the column will be lost.
  - You are about to drop the column `profilePic` on the `aboutMe` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `experiences` table. All the data in the column will be lost.
  - You are about to drop the column `thubnail` on the `projects` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."aboutMe" DROP COLUMN "content",
DROP COLUMN "profilePic",
ADD COLUMN     "bio" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "currentActivities" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "profileImage" TEXT,
ADD COLUMN     "techStack" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "title" TEXT NOT NULL DEFAULT '',
ALTER COLUMN "email" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."experiences" DROP COLUMN "location",
ADD COLUMN     "achievements" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "public"."projects" DROP COLUMN "thubnail",
ADD COLUMN     "thumbnail" TEXT;

-- AlterTable
ALTER TABLE "public"."skills" ALTER COLUMN "level" DROP NOT NULL;

-- CreateTable
CREATE TABLE "public"."retrospectives" (
    "id" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "aboutMeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "retrospectives_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."retrospectives" ADD CONSTRAINT "retrospectives_aboutMeId_fkey" FOREIGN KEY ("aboutMeId") REFERENCES "public"."aboutMe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
