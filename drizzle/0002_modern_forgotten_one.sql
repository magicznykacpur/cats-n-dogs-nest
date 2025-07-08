CREATE TABLE "owners" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "cats" ADD COLUMN "owner_id" uuid DEFAULT null;--> statement-breakpoint
ALTER TABLE "dogs" ADD COLUMN "owner_id" uuid DEFAULT null;