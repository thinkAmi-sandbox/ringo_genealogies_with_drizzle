CREATE TABLE `apples` (
	`name` text PRIMARY KEY NOT NULL,
	`display_name` text NOT NULL,
	`color` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gen` (
	`parent_name` text NOT NULL,
	`child_name` text NOT NULL,
	`relation` text NOT NULL,
	PRIMARY KEY(`parent_name`, `child_name`, `relation`),
	FOREIGN KEY (`parent_name`) REFERENCES `apples`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`child_name`) REFERENCES `apples`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `genealogies` (
	`child_name` text NOT NULL,
	`pollen_name` text NOT NULL,
	`seed_name` text NOT NULL,
	PRIMARY KEY(`child_name`, `pollen_name`, `seed_name`),
	FOREIGN KEY (`child_name`) REFERENCES `apples`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`pollen_name`) REFERENCES `apples`(`name`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`seed_name`) REFERENCES `apples`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `apples_display_name_unique` ON `apples` (`display_name`);