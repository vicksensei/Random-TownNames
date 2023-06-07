function AddName(data) {
  let iterations = 10;

  let names = [];

  let lastName = names.length;

  for (let i = 0; i < iterations; i++) {
    names.push(GenName(data));
  }
  return names;
}

function GenWord(rangeArr, compareStr) {
  let last = rangeArr.length;
  let randNum = getRandomInt(last);
  let val = rangeArr[randNum].toString();

  if (compareStr !== "") {
    while (val.toLowerCase() === compareStr.toLowerCase()) {
      randNum = getRandomInt(last);
      val = rangeArr[randNum].toString();
    }
  }
  return val;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function GenName(sheet) {
  let PRange = sheet.Prefix;
  let Plast = PRange.length;

  let usePrefix = getRandomInt(100) < Plast;

  let Prefix = "";
  if (usePrefix) {
    Prefix = GenWord(PRange, "");
  }

  let SRange = sheet.Start;
  let start = GenWord(SRange, Prefix);

  let ERange = sheet.Ending;
  let end = GenWord(ERange, start);

  let name = `${Prefix === "" ? "" : Prefix + " "}${start}${end}`;
  return name;
}

function OnClick() {
  const el = document.getElementById("list");
  let text = "";
  fetch("./pieces.JSON")
    .then((res) => res.json())
    .then((json) => {
      const data = json;
      const names = AddName(data);
      for (let i = 0; i < names.length; i++) {
        const na = names[i];
        text += `<div> ${na} </div>`;
      }
      el.innerHTML = text;
    });
}
