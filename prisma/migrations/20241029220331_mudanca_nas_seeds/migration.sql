-- DropForeignKey
ALTER TABLE "record_video_type_cam_used" DROP CONSTRAINT "record_video_type_cam_used_camIdUsed_fkey";

-- AlterTable
ALTER TABLE "record_video_type_cam_used" ALTER COLUMN "camIdUsed" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "record_video_type_cam_used" ADD CONSTRAINT "record_video_type_cam_used_camIdUsed_fkey" FOREIGN KEY ("camIdUsed") REFERENCES "cam_info"("id") ON DELETE SET NULL ON UPDATE CASCADE;
