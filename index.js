var 답 = "abcde";
document.querySelector("button").addEventListener("click", function () {
  var input = document.querySelectorAll(".input");

  for (let i = 0; i < 답.length; i++) {
    if (input[i].value == 답[i]) {
      input[i].style.background = "lightgreen";
      // 1. 위치까지 맞으면 - 초록
    } else if (답.includes(input[i].value)) {
      //includes는 string에 뭐 들었는지 확인.
      input[i].style.background = "lightyellow";
      // 2. 위치 아니면 - 노랑
      // 비어있는 데 서밋하면 노랑이 됌...
    } else {
      input[i].style.background = "lightgrey";
      // 3. 다 안 맞으면 - 회색
    }

    input[i].classList.remove("input");

    let template = `
    <div>
      <input class="input" maxlength="1" />
      <input class="input" maxlength="1" />
      <input class="input" maxlength="1" />
      <input class="input" maxlength="1" />
      <input class="input" maxlength="1" />
    </div>`;
    document.querySelector("body").insertAdjacentHTML("beforeend", template);
  }
});

let inputs = document.querySelectorAll(".input");
inputs.forEach(function (input, index) {
  // 각 요소 별로 실행하려고, for of 대신 forEach
  input.addEventListener("keypress", function (e) {
    // key 누르면 event. e= event
    if (e.key === "Enter") {
      // enter key 확인
      if (index < inputs.length - 1) {
        // 배열의 마지막 요소가 아니라면
        // 다음 입력 필드로 포커스 이동
        inputs[index + 1].focus();
      } else {
        // 배열의 마지막 요소일 경우, 새로운 입력 필드 처음으로 이동.. 지금 이게 안돼 지피티가 망치기 전에 일단 업로드 하자..
      }
    }
  });
});
