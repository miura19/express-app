export const requiredMessage = (value: string) => `${value}は必須項目です`;
// メールアドレス
export const emailMessage = () => `メールアドレスの形式が正しくありません`;
// 最低文字数
export const minLengthMessage = (value: string, length: number) =>
    `${value}は${length}文字以上必要です`;
