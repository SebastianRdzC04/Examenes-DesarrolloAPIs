DROP TYPE IF EXISTS "statusEvents";
CREATE TYPE "statusEvents" AS ENUM ('pending', 'on process', 'cancelled', 'done');
DROP TYPE IF EXISTS "status";
CREATE TYPE "status" AS ENUM ('pending', 'accepted', 'rejected');


DROP TABLE IF EXISTS "users" CASCADE;
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(50) NOT NULL,
	"phone" varchar(20) NOT NULL,
	"password" varchar NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"role_id" uuid,
	"is_on" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS "places" CASCADE;
CREATE TABLE "places" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" varchar(255) NOT NULL,
	"max_capacity" integer NOT NULL,
	"is_on" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS "events" CASCADE;
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"quote_id" uuid NOT NULL,
	"description" varchar(255) NOT NULL,
	"status" "statusEvents" DEFAULT 'pending' NOT NULL,
	"date" date NOT NULL,
	"time_toStart" time NOT NULL,
	"time_toEnd" time,
	"place_id" uuid,
	"total_price" integer NOT NULL,
	"total_payed" integer NOT NULL,
	"total_debt" integer NOT NULL,
	"is_on" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS "quotes" CASCADE;
CREATE TABLE "quotes" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid,
	"place_id" uuid,
	"title" varchar(255) NOT NULL,
	"date" date NOT NULL,
	"status" "status" DEFAULT 'pending' NOT NULL,
	"estimated_price" integer,
	"espected_advance" integer,
	"is_on" boolean DEFAULT true NOT NULL
);
--> statement-breakpoint
DROP TABLE IF EXISTS "roles" CASCADE;
CREATE TABLE "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_role_id_roles_id_fk" FOREIGN KEY ("role_id") REFERENCES "public"."roles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_quote_id_quotes_id_fk" FOREIGN KEY ("quote_id") REFERENCES "public"."quotes"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "quotes" ADD CONSTRAINT "quotes_place_id_places_id_fk" FOREIGN KEY ("place_id") REFERENCES "public"."places"("id") ON DELETE no action ON UPDATE no action;