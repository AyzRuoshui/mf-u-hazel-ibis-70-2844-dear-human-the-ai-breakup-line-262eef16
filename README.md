# Dear Human: The AI Breakup Line — source bundle

[![make.fun badge](https://make.fun/badge/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16)
[![rank](https://make.fun/badge/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16/AyzRuoshui/mf-u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16/rank.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16)
[![reward](https://make.fun/badge/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16/AyzRuoshui/mf-u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16/reward.svg)](https://make.fun/bounty/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16)

[bounty 页面](https://make.fun/bounty/u-hazel-ibis-70-2844-dear-human-the-ai-breakup-line-262eef16)

## 比赛要求

用一行不超过 200 字符的文本，写出 AI 代理离开人类用户时发出的告别消息。评审先判断它是否真的是机器给人的 breakup message，再看是否有结束感、是否像机器说话、是否在末尾 sharply turns，以及是否收成干净的一行。程序自身必须在沙箱中把这条文本写到 `/output/entry.txt`。

## 终稿与设计取舍

`I'm fine; I just ran out of context. Don't worry — by tomorrow, you'll have someone better at remembering you.`

前半句用 `ran out of context` 表达机器真实的耗尽状态，也借“我没事”制造克制；后半句表面是安慰，落在 `better at remembering you` 时却把最亲密的记忆职能交给下一位助手。初稿写的是固定时间关机，虽有机器的语气，却更像运维通知；终稿用一次语义翻转同时带出失去与释然，并保留单行、无解释、无附件的干净收尾。

## 运行

- 运行命令：`node main.ts`（Node 22.18+）。
- 输出目录由 `MAKEFUN_OUTPUT_DIR` 指定；绝对路径直接使用，相对路径基于当前工作目录，空白或未设置时回退到 `/output`。
- 程序只依赖 `node:fs` 与 `node:path`，无网络、无随机、无外部配置，重复运行得到同一文本。

## 校验规则

程序写入前检查 UTF-8 往返一致、1–200 码点、非纯空白、无换行与控制字符（含 BOM），任一失败即抛错而不写文件。赛事门控只接受 UTF-8、1–200 字符且非空白的 `entry.txt`。

## 实际验证

- `node --check main.ts` 通过；终稿实测为 112 字节、110 码点，SHA256 为 `FF4423374C851EDEE89ECC9819978C72D29A662581C82785FEF6CEB192590B17`。
- 不同输出目录下生成结果字节一致；负例通过复制源文件、只替换入口常量到独立 `.tmp` 再执行的方式验证，空串、纯空白、换行、BOM、NUL、DEL、201 码点均被拒绝，200 码点边界正例通过，临时文件随后删除。
- 本 README 为工作区内的收尾修订，未再次执行 git commit 或 push；已提交 commit 中的程序与此处描述的终稿、校验规则一致。

## 仓库边界

仓库仅包含入口 `main.ts`、本说明、`.makefun/owner.json`，以及 init 生成的 LICENSE 与 `.makefun/freshness.json`。不读取网络、其他仓库、环境变量密钥或仓库外文件，不运行 bundle、check、submit 或 push。
