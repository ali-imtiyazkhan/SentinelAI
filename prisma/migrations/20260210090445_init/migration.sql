/*
  Warnings:

  - You are about to drop the column `createdAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `emailVerified` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Collection` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Environment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Request` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `RequestRun` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Verification` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebSocketPreset` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebsocketMessage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Workspace` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceInvite` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkspaceMember` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_userId_fkey";

-- DropForeignKey
ALTER TABLE "Collection" DROP CONSTRAINT "Collection_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "Request" DROP CONSTRAINT "Request_collectionId_fkey";

-- DropForeignKey
ALTER TABLE "RequestRun" DROP CONSTRAINT "RequestRun_requestId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "WebSocketPreset" DROP CONSTRAINT "WebSocketPreset_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "WebsocketMessage" DROP CONSTRAINT "WebsocketMessage_presetId_fkey";

-- DropForeignKey
ALTER TABLE "Workspace" DROP CONSTRAINT "Workspace_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceInvite" DROP CONSTRAINT "WorkspaceInvite_createdById_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceInvite" DROP CONSTRAINT "WorkspaceInvite_workspaceId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_userId_fkey";

-- DropForeignKey
ALTER TABLE "WorkspaceMember" DROP CONSTRAINT "WorkspaceMember_workspaceId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdAt",
DROP COLUMN "emailVerified",
DROP COLUMN "image",
DROP COLUMN "updatedAt",
ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Collection";

-- DropTable
DROP TABLE "Environment";

-- DropTable
DROP TABLE "Request";

-- DropTable
DROP TABLE "RequestRun";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "Verification";

-- DropTable
DROP TABLE "WebSocketPreset";

-- DropTable
DROP TABLE "WebsocketMessage";

-- DropTable
DROP TABLE "Workspace";

-- DropTable
DROP TABLE "WorkspaceInvite";

-- DropTable
DROP TABLE "WorkspaceMember";

-- DropEnum
DROP TYPE "DIRECTION";

-- DropEnum
DROP TYPE "MEMBER_ROLE";

-- DropEnum
DROP TYPE "REST_METHOD";
