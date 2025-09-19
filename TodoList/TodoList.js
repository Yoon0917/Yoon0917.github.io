let mockData = [
  { id: 0, isDone: false, content: "React study", date: new Date().getTime() },
  { id: 1, isDone: true, content: "친구만나기", date: new Date().getTime() },
  { id: 2, isDone: false, content: "낮잠자기", date: new Date().getTime() },
];
let dayList = ["일", "월", "화", "수", "목", "금", "토"];

onload = () => {
  let day = new Date();
  day.setMonth(day.getMonth() + 1);
  document.querySelector(
    "h1"
  ).innerHTML = `${day.getFullYear()} 년 ${day.getMonth()}월 ${day.getDate()}일 ${
    dayList[day.getDay() + 5]
  }요일`;

  initData(mockData);
};

const initData = (printDate) => {
  document.querySelector(".wrapList").innerHTML = "";
  let i = 0;
  for (let l = 0; l < printDate.length; l++) {
    const cdiv = document.createElement("div");
    cdiv.setAttribute("class", "listItem");
    const ckbox = document.createElement("input");
    ckbox.setAttribute("type", "checkbox");
    cdiv.append(ckbox);

    const icontent = document.createElement("span");
    icontent.setAttribute("class", "content");
    cdiv.append(icontent);

    const idate = document.createElement("span");
    idate.setAttribute("class", "date");
    cdiv.append(idate);

    const ibtn = document.createElement("button");
    ibtn.setAttribute("class", "del");
    ibtn.textContent = "삭제";
    cdiv.append(ibtn);
    document.querySelector(".wrapList").append(cdiv);
  }

  document.querySelectorAll(".listItem").forEach((e) => {
    console.log(printDate[i].content);
    e.children[1].innerHTML = printDate[i].content;
    e.children[2].innerHTML = printDate[i].date;

    i++;
  });
  let j = 0;
  document.querySelectorAll("[type=checkbox]").forEach((e) => {
    if (printDate[j].isDone) {
      e.setAttribute("checked", "true");
    }
    e.addEventListener("change", () => {
      onUpdate(e, j - 1);
    });

    j++;
  });

  k = 0;
  document.querySelectorAll(".del").forEach((e) => {
    e.setAttribute("value", printDate[k].id);
    e.addEventListener("click", () => {
      todoDel(e.getAttribute("value"));
    });
    k++;
  });
};

let idIndex = 3;

document.querySelector(".Editor > button").onclick = () => {
  event.preventDefault(); //전송기능 막음
  //id는 idIndex,
  // isDone은 기본 false,
  // content는 입력한 내용,
  // date는 new Date().getTime()
  // 준비된 하나의 레코드를 mokData에 push()함수를 이용해서 추가한다.
  let pcontent = document.querySelector(".newcontent").value;
  let pp = {
    id: idIndex,
    isDone: false,
    content: pcontent,
    date: new Date().getTime(),
  };
  mockData.push(pp);
  console.log(mockData);
  idIndex++;
  const cdiv = document.createElement("div");
  cdiv.setAttribute("class", "listItem");
  const ckbox = document.createElement("input");
  ckbox.setAttribute("type", "checkbox");
  cdiv.append(ckbox);

  const icontent = document.createElement("span");
  icontent.setAttribute("class", "content");
  cdiv.append(icontent);

  const idate = document.createElement("span");
  idate.setAttribute("class", "date");
  cdiv.append(idate);

  const ibtn = document.createElement("button");
  ibtn.setAttribute("class", "del");
  ibtn.textContent = "삭제";
  cdiv.append(ibtn);

  document.querySelector(".wrapList").append(cdiv);

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

const todoDel = (th) => {
  mockData = mockData.filter((data) => {
    return data.id != th;
  });

  initData(mockData); //호출한다.(다시 화면 랜더링)
};

const onUpdate = (targetId, j) => {
  if (targetId.getAttribute("checked")) mockData[j].isDone = true;
  else mockData[j].isDone = false;
};

document.querySelector("#keyword").onkeyup = (e) => {
  let searchedTodos = getFilterData(e.target.value);
  initData(searchedTodos);
};

const getFilterData = (search) => {
  //검색어가 없으면 mockData를 리턴한다.
  if (search === "") {
    return mockData;
  }
  //filter함수를 이용해서 search(검색어)를 포함하고 있는 todo들를 받는다

  let result = mockData.filter((data) => data.content.includes(search));
  console.log(result);
  return result;
};
