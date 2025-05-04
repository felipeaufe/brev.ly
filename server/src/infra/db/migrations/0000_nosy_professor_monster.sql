CREATE TABLE "links" (
	"code" text NOT NULL,
	"link" text NOT NULL,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_code_unique" UNIQUE("code")
);
