#!/usr/bin/env node

import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const maximumDescriptorBytes = 64 * 1024;

function fail(message) {
  process.stderr.write(
    `${JSON.stringify({ ok: false, error: message })}\n`
  );
  process.exitCode = 1;
}

export function validateDescriptor(descriptor) {
  if (
    typeof descriptor !== "object" ||
    descriptor === null ||
    typeof descriptor.documentId !== "string" ||
    typeof descriptor.uploadUrl !== "string" ||
    typeof descriptor.expiresAt !== "string" ||
    typeof descriptor.maximumAcceptedBytes !== "number" ||
    typeof descriptor.requiredHeaders !== "object" ||
    descriptor.requiredHeaders === null ||
    !Number.isInteger(descriptor.maximumAcceptedBytes) ||
    descriptor.maximumAcceptedBytes < 0 ||
    !Object.values(descriptor.requiredHeaders).every(
      (value) => typeof value === "string"
    )
  ) {
    throw new Error("Invalid create_document_upload structured output");
  }
  return descriptor;
}

async function readDescriptor() {
  const chunks = [];
  let byteLength = 0;
  for await (const chunk of process.stdin) {
    byteLength += chunk.byteLength;
    if (byteLength > maximumDescriptorBytes) {
      throw new Error("Upload descriptor is too large");
    }
    chunks.push(chunk);
  }
  return validateDescriptor(
    JSON.parse(Buffer.concat(chunks).toString("utf8"))
  );
}

async function sha256(path) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(path)) {
    hash.update(chunk);
  }
  return hash.digest("hex");
}

export function validateLocalFile(file, descriptor) {
  if (!file.isFile()) {
    throw new Error("The local path is not a regular file");
  }
  if (file.size > descriptor.maximumAcceptedBytes) {
    throw new Error("The local file exceeds the accepted upload size");
  }
  const expiresAt = new Date(descriptor.expiresAt).getTime();
  if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
    throw new Error("The upload destination has expired");
  }
  const signedContentLength =
    descriptor.requiredHeaders["content-length"];
  if (
    signedContentLength !== undefined &&
    signedContentLength !== String(file.size)
  ) {
    throw new Error(
      "The local file size does not match the signed upload descriptor"
    );
  }
}

export async function uploadLocalFile(
  path,
  descriptor,
  fetchImplementation = fetch
) {
  const file = await stat(path);
  validateLocalFile(file, descriptor);
  const uploadUrl = new URL(descriptor.uploadUrl);
  if (
    uploadUrl.protocol !== "https:" &&
    process.env.SYNAPSE_ALLOW_INSECURE_UPLOAD_URL !== "true"
  ) {
    throw new Error("The upload destination must use HTTPS");
  }
  if (uploadUrl.username.length > 0 || uploadUrl.password.length > 0) {
    throw new Error("The upload destination must not contain user info");
  }
  const checksum = await sha256(path);
  const response = await fetchImplementation(uploadUrl, {
    method: "PUT",
    headers: {
      ...descriptor.requiredHeaders,
      "content-length": String(file.size)
    },
    body: createReadStream(path),
    duplex: "half",
    redirect: "error"
  });
  if (!response.ok) {
    throw new Error(`Direct upload failed with HTTP ${response.status}`);
  }
  return {
    ok: true,
    documentId: descriptor.documentId,
    sha256: checksum,
    nextTool: {
      name: "complete_document_upload",
      arguments: {
        documentId: descriptor.documentId,
        sha256: checksum,
        idempotencyKey: `upload-complete:${descriptor.documentId}:${checksum}`
      }
    }
  };
}

async function main() {
  const [path] = process.argv.slice(2);
  if (path === undefined) {
    throw new Error(
      "Usage: upload-document.mjs <local-path> with the upload descriptor on stdin"
    );
  }
  const descriptor = await readDescriptor();
  process.stdout.write(
    `${JSON.stringify(await uploadLocalFile(path, descriptor))}\n`
  );
}

const invokedPath = process.argv[1];
if (
  invokedPath !== undefined &&
  import.meta.url === pathToFileURL(resolve(invokedPath)).href
) {
  try {
    await main();
  } catch (error) {
    fail(error instanceof Error ? error.message : "Upload failed");
  }
}
