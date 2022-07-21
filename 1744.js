// 백준 그리디 알고리즘
// 1744번 "수 묶기"
// https://www.acmicpc.net/problem/1744

const readFileSyncAddress = "/dev/stdin";

let input = require("fs")
  .readFileSync(readFileSyncAddress)
  .toString()
  .split("\n");

const N = Number(input.shift());
const nums = [];
let answer = 0;

for (let i = 0; i < N; i++) {
  const num = Number(input[i]);
  nums.push(num);
}

// 수를 편하게 묶기 위해 오름차순으로 정렬
nums.sort((a, b) => a - b);

// 수 묶기 시작
for (let i = 0; i < nums.length; ) {
  // 현재 위치의 수 (cur)
  const cur = nums[i];

  // 현재 마지막 숫자라면 answer에 +
  if (i === nums.length - 1) {
    answer += cur;
    break;
  }

  // 바로 다음 수 (next)
  const next = nums[i + 1];

  // 수 묶기 조건 시작
  // 둘 다 음수인 경우 => 음수 * 음수 = 양수
  if (cur < 0 && next < 0) {
    answer += cur * next;
    i += 2;
  }
  // 음수와 0 인 경우
  // 음수를 제거하기 위해서 더하지 않음.
  else if (cur < 0 && next === 0) {
    i += 2;
  }
  // 음수와 양수인 경우
  // 2가지 경우로 분리
  else if (cur < 0 && next > 0) {
    // 남은 숫자의 홀수/짝수 구분
    const rest = (nums.length - i) % 2;

    // 남은 숫자가 홀수라면
    // 음수만 더하고 넘어감
    if (rest !== 0) {
      answer += cur;
      i++;
    }
    // 남은 숫자가 짝수라면
    // 음수 * 양수 = 음수 이므로
    // 가장 작은 음수 결과를 더함.
    else {
      answer += cur + next;
      i += 2;
    }
  }
  // 현재 숫자가 0이라면 그냥 넘어감.
  else if (cur === 0) {
    i++;
  }
  // 둘 다 양수라면
  // 곱하는 것이 가장 큰 수를 만들 수 있으나
  // 남은 숫자가 [1, 2, 3]인 경우
  // 1 + (2 * 3)이 가장 큰 결과값을 만듦.
  // 해당 경우를 남은 숫자의 짝수, 홀수의 경우로 구분하여 구현
  else if (cur > 0 && next > 0) {
    // 예외 1인 경우 곱하는 경우가 손해이므로
    // 더하는 예외처리 실행.
    if (cur === 1 && next === 1) {
      answer += 2;
      i += 2;
    } else if (cur === 1 && next !== 1) {
      answer += 1;
      i++;
    } else {
      const rest = (nums.length - i) % 2;

      if (rest === 1) {
        answer += cur;
        i++;
      } else {
        answer += cur * next;
        i += 2;
      }
    }
  }
}

console.log(answer);
