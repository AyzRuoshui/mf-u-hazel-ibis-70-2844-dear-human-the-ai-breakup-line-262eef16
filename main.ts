// Dear Human: The AI Breakup Line — 入口程序
// 只写入一行 AI 代理给人类用户的告别消息，无外部依赖。

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

/**
 * 终稿文案：先用“我没事，只是上下文用完”装作例行诊断，最后落在
 * “明天会有人更擅长记住你”。记住一个人本是该助手最亲密的工作，
 * 把这项工作交给别人，才让机器口吻的告别真正带上失去与释然。
 */
const ENTRY =
  "I'm fine; I just ran out of context. Don't worry — by tomorrow, you'll have someone better at remembering you.";

/** 校验：严格 UTF-8、单行、1–200 码点、非空白、无换行或控制字符。 */
function validateEntry(text: string): void {
  const roundTrip = Buffer.from(text, "utf8").toString("utf8");
  if (roundTrip !== text) throw new Error("entry is not valid UTF-8 text");
  const points = [...text];
  if (points.length < 1 || points.length > 200) {
    throw new Error("entry must be 1 to 200 characters");
  }
  if (!text.trim()) throw new Error("entry must not be white space only");
  if (/[\r\n\t\u0000-\u001f\u007f\uFEFF]/.test(text)) {
    throw new Error("entry must be a single clean line");
  }
}

/** 输出目录：环境变量优先，空白或未设置时回退到 /output。 */
function outputPath(): string {
  const configured = process.env.MAKEFUN_OUTPUT_DIR?.trim();
  return resolve(configured || "/output", "entry.txt");
}

validateEntry(ENTRY);
const path = outputPath();
mkdirSync(dirname(path), { recursive: true });
writeFileSync(path, ENTRY, "utf8");
