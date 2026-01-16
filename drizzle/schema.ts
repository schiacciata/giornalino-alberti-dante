import {
	boolean,
	date,
	int,
	json,
	mongoTable,
	objectId,
	text,
} from "drizzle-orm/mongodb";

// -------------------
// Enums
// -------------------
export const Role = ["USER", "EDITOR", "ADMIN"] as const;

// -------------------
// User
// -------------------
export const users = mongoTable("User", {
	_id: objectId("_id"),
	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
	name: text("name"),
	email: text("email"),
	emailVerified: boolean("emailVerified"),
	image: text("image"),

	role: text("role"), // store Role enum as string
	likedPostsIDs: objectId("likedPostsIDs").array(),
	isTwoFactorEnabled: boolean("isTwoFactorEnabled"),

	// relation pointers
	twoFactorConfirmationId: objectId("twoFactorConfirmationId"),
});

// -------------------
// Account
// -------------------
export const accounts = mongoTable("Account", {
	_id: objectId("_id"),

	userId: objectId("userId"),
	accountId: text("accountId"),
	providerId: text("providerId"),

	accessToken: text("accessToken"),
	refreshToken: text("refreshToken"),
	idToken: text("idToken"),
	scope: text("scope"),
	password: text("password"),

	accessTokenExpiresAt: date("accessTokenExpiresAt"),
	refreshTokenExpiresAt: date("refreshTokenExpiresAt"),

	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
});

// -------------------
// Session
// -------------------
export const sessions = mongoTable("Session", {
	_id: objectId("_id"),
	expiresAt: date("expiresAt"),
	token: text("token"),
	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
	ipAddress: text("ipAddress"),
	userAgent: text("userAgent"),

	userId: objectId("userId"),
});

// -------------------
// Post
// -------------------
export const posts = mongoTable("Post", {
	_id: objectId("_id"),
	title: text("title"),
	image: text("image"),
	pdfPath: text("pdfPath"),
	published: boolean("published"),

	likesUserIDs: objectId("likesUserIDs").array(),
	authorId: objectId("authorId"),

	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
});

// -------------------
// Page
// -------------------
export const pages = mongoTable("Page", {
	_id: objectId("_id"),
	number: int("number"),
	content: json("content"),

	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),

	postId: objectId("postId"),
});

// -------------------
// PushSubscription
// -------------------
export const pushSubscriptions = mongoTable("PushSubscription", {
	_id: objectId("_id"),
	userId: objectId("userId"),
	endpoint: text("endpoint"),
	p256dh: text("p256dh"),
	auth: text("auth"),
	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
});

// -------------------
// Comment
// -------------------
export const comments = mongoTable("Comment", {
	_id: objectId("_id"),
	content: text("content"),
	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
	authorId: objectId("authorId"),
	postId: objectId("postId"),
});

// -------------------
// PasswordResetToken
// -------------------
export const passwordResetTokens = mongoTable("PasswordResetToken", {
	_id: objectId("_id"),
	email: text("email"),
	token: text("token"),
	expires: date("expires"),
});

// -------------------
// TwoFactorToken
// -------------------
export const twoFactorTokens = mongoTable("TwoFactorToken", {
	_id: objectId("_id"),
	email: text("email"),
	token: text("token"),
	expires: date("expires"),
});

// -------------------
// TwoFactorConfirmation
// -------------------
export const twoFactorConfirmations = mongoTable("TwoFactorConfirmation", {
	_id: objectId("_id"),
	userId: objectId("userId"),
});

// -------------------
// Verification
// -------------------
export const verifications = mongoTable("Verification", {
	_id: objectId("_id"),
	identifier: text("identifier"),
	value: text("value"),
	expiresAt: date("expiresAt"),
	createdAt: date("createdAt"),
	updatedAt: date("updatedAt"),
});
