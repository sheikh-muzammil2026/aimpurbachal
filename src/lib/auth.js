import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import dns from "node:dns";
import { siteConfig } from "@/config/siteConfig";

try {
  dns.setDefaultResultOrder("ipv4first");
} catch (_) {}

function sanitizeEnvValue(val, keyName = "") {
  if (!val || typeof val !== "string") return "";
  let cleaned = val.trim();
  // Strip accidental wrapping quotes ("..." or '...')
  while (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  // Strip accidental "KEY_NAME=" prefix if pasted into Vercel Value box
  if (keyName) {
    const prefixRegex = new RegExp(`^${keyName}\\s*=\\s*`, "i");
    cleaned = cleaned.replace(prefixRegex, "").trim();
  }
  // Also strip any wrapping quotes remaining after prefix removal
  while (
    (cleaned.startsWith('"') && cleaned.endsWith('"')) ||
    (cleaned.startsWith("'") && cleaned.endsWith("'"))
  ) {
    cleaned = cleaned.slice(1, -1).trim();
  }
  // If mongodb:// or mongodb+srv:// appears inside the string after an '=' sign, extract from there
  if (keyName === "MONGODB_URI" && !cleaned.startsWith("mongodb")) {
    const match = cleaned.match(/(mongodb(?:\+srv)?:\/\/.+)/i);
    if (match) {
      cleaned = match[1].trim().replace(/^["']|["']$/g, "");
    }
  }
  return cleaned;
}

const dbName =
  sanitizeEnvValue(process.env.MONGODB_DB_NAME, "MONGODB_DB_NAME") ||
  siteConfig.db.name ||
  "aimpurbachal";
const uri =
  sanitizeEnvValue(process.env.MONGODB_URI, "MONGODB_URI") ||
  `mongodb://127.0.0.1:27017/${dbName}`;

const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1,
};

function isClientClosed(client) {
  if (!client) return true;
  if (client.s?.hasBeenClosed) return true;
  if (
    client.topology &&
    (client.topology.isClosed?.() || client.topology.s?.state === "closed")
  ) {
    return true;
  }
  return false;
}

function getMongoClient() {
  if (
    isClientClosed(global._betterAuthMongoClient) ||
    global._betterAuthMongoUri !== uri
  ) {
    if (global._betterAuthMongoClient) {
      global._betterAuthMongoClient.close().catch(() => {});
    }
    global._betterAuthMongoClient = new MongoClient(uri, options);
    global._betterAuthMongoUri = uri;
  }
  return global._betterAuthMongoClient;
}

const clientProxy = new Proxy({}, {
  get(target, prop, receiver) {
    const client = getMongoClient();
    const val = Reflect.get(client, prop, receiver);
    return typeof val === "function" ? val.bind(client) : val;
  },
});

const dbProxy = new Proxy({}, {
  get(target, prop, receiver) {
    const client = getMongoClient();
    const db = client.db(dbName);
    const val = Reflect.get(db, prop, receiver);
    return typeof val === "function" ? val.bind(db) : val;
  },
});

const isReplicaSet =
  uri.includes("replicaSet") || uri.includes("mongodb+srv");

export const auth = betterAuth({
  database: mongodbAdapter(dbProxy, {
    client: clientProxy,
    transaction: isReplicaSet,
  }),
  secret:
    sanitizeEnvValue(process.env.BETTER_AUTH_SECRET, "BETTER_AUTH_SECRET") ||
    "build-time-secret-placeholder-minimum-32-characters-long",
  baseURL:
    sanitizeEnvValue(process.env.BETTER_AUTH_URL, "BETTER_AUTH_URL") ||
    sanitizeEnvValue(process.env.NEXT_PUBLIC_BASE_URI, "NEXT_PUBLIC_BASE_URI") ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  trustedOrigins: [
    "http://localhost:3000",
    "https://aimpurbachal.vercel.app",
    "https://aimpurbachal.com",
    "https://www.aimpurbachal.com",
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.BETTER_AUTH_URL
      ? [sanitizeEnvValue(process.env.BETTER_AUTH_URL, "BETTER_AUTH_URL")]
      : []),
    ...(process.env.NEXT_PUBLIC_BASE_URI
      ? [sanitizeEnvValue(process.env.NEXT_PUBLIC_BASE_URI, "NEXT_PUBLIC_BASE_URI")]
      : []),
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
      },
      permissions: {
        type: "string[]",
        defaultValue: [],
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "active",
        required: false,
      },
      isBanned: {
        type: "boolean",
        defaultValue: false,
        required: false,
      },
    },
  },
});
