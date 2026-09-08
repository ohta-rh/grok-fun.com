// wrangler の既定ルール（Text: **/*.txt）で moderation/blocklist.txt を文字列として import する
declare module '*.txt' {
  const content: string;
  export default content;
}
