function generateCompoundWord() {
  const wordA = document.getElementById("wordA").value.trim();
  const wordB = document.getElementById("wordB").value.trim();
  const pattern = document.getElementById("pattern").value;
  const aspect = document.getElementById("aspect").value;
  const plural = document.getElementById("plural").checked;
  const combine = document.getElementById("combine").checked;
  
  if (!wordA || !wordB) {
    alert("単語Aと単語Bの両方を入力してください。");
    return;
  }

  let modifiedWordA = applyVowelChanges(wordA, wordB, plural);
  let finalWord = combineWords(modifiedWordA, wordB, pattern, aspect, plural);

  // 出力を列形式で表示
  document.getElementById("output").textContent = finalWord;

  // 出力された単語が15文字を超える場合
  if (finalWord.length > 15) {
    document.getElementById("suggestion").textContent = "「一語にする」をオフにすることを推奨します。";
  } else {
    document.getElementById("suggestion").textContent = "";
  }
}

function applyVowelChanges(wordA, wordB, plural) {
  const femaleVowels = { 'a': 'e', 'ï': 'i', 'o': 'ö', 'u': 'ü' };
  const maleVowels = { 'e': 'a', 'i': 'ï', 'ö': 'o', 'ü': 'u' };
  
  let modifiedWordA = wordA;

  // 単語Bの母音に応じた変更
  if (/[eiöü]/.test(wordB)) {
    modifiedWordA = wordA.replace(/[aïou]/g, match => femaleVowels[match] || match);
  } else if (/[aïou]/.test(wordB)) {
    modifiedWordA = wordA.replace(/[eiöü]/g, match => maleVowels[match] || match);
  }

  // 複数形かどうかの処理
  if (plural) {
    modifiedWordA += /[mnlng]$/.test(modifiedWordA) ? "en" : "nen";
  } else {
    modifiedWordA += /[mnlng]$/.test(modifiedWordA) ? "e" : "ne";
  }

  return modifiedWordA;
}

function combineWords(modifiedWordA, wordB, pattern, aspect, plural) {
  let finalWord = modifiedWordA;

  if (pattern === "adj+verb+noun") {
    if (aspect === "imperfective") {
      finalWord = finalWord.replace(/-n|-an|-en$/, plural ? "seltön" : "setön");
    } else {
      finalWord = finalWord.replace(/-n|-an|-en$/, plural ? "selten" : "seten");
    }
  } else if (pattern === "transitive+participle+noun") {
    if (aspect === "imperfective") {
      finalWord = finalWord.replace(/-l|-al|-el$/, plural ? "siltön" : "sitön");
    } else {
      finalWord = finalWord.replace(/-l|-al|-el$/, plural ? "silten" : "siten");
    }
  }

  // 1語にするチェックボックスがオンの場合
  if (document.getElementById("combine").checked) {
    finalWord += wordB;
  } else {
    finalWord += " " + wordB;
  }

  return finalWord;
}

function clearFields() {
  document.getElementById("wordA").value = "";
  document.getElementById("wordB").value = "";
  document.getElementById("output").textContent = "";
  document.getElementById("suggestion").textContent = "";
}
