// 백준 그리디 알고리즘
// 10510번 "30"
// https://www.acmicpc.net/problem/10610

const readFileSyncAddress = "/dev/stdin";

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .trim()
  .split("")
  .map(Number);

// 예외조건.
// 0이 없는 경우 30의 배수를 만들 수 없음.
if (!input.includes(0)) {
  console.log(-1);
  return;
}

// 30의 배수가 될 수 있는 가장 큰 수의 조합을 찾기 위해서는
// 정수의 배수 규칙 상
// 1. 각 자릿수의 합이 3의 배수
// 2. 하나 이상의 0을 포함
// 3. 내림차순 정렬

// 각 자릿수 합을 구하고
const sum = input.reduce((acc, cur) => acc + cur, 0);

// 30의 배수를 만들 수 없음.
if (sum % 3 !== 0) {
  console.log(-1);
  return;
}
// 30의 배수를 만들 수 있으므로
// 내림차순 정렬 후, 합침.
else {
  input.sort((a, b) => b - a);
  console.log(input.join(""));
}
