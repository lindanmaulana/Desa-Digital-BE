-- CreateTable
CREATE TABLE "staffs" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "profile_picture" VARCHAR(250),
    "identity_number" VARCHAR(20),
    "gender" "Gender" NOT NULL DEFAULT 'MALE',
    "date_of_birth" DATE,
    "phone_number" VARCHAR,
    "occupation" VARCHAR,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "staffs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "staffs_user_id_key" ON "staffs"("user_id");

-- AddForeignKey
ALTER TABLE "staffs" ADD CONSTRAINT "staffs_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
