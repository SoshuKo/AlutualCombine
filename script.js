// 母音の置換ルール
const femaleVowelReplacements = { 'a': 'e', 'ï': 'i', 'o': 'ö', 'u': 'ü' };
const maleVowelReplacements = { 'e': 'a', 'i': 'ï', 'ö': 'o', 'ü': 'u' };

// 母音置換関数
function replaceVowels(word, gender) {
    let replacements = gender === 'female' ? femaleVowelReplacements : maleVowelReplacements;
    return word.split('').map(char => replacements[char] || char).join('');
}

// 名詞+名詞 の処理
function processNounNoun(wordA, wordB, plural) {
    let finalVowels = ['e', 'i', 'ö', 'ü'];
    let maleVowelInWordB = wordB.match(/[aïou]/);

    if (finalVowels.some(vowel => wordB.includes(vowel))) {
        wordA = replaceVowels(wordA, 'female');
        if (plural) {
            wordA = wordA.match(/[mnlng]$/) ? wordA + 'en' : wordA + 'nen';
        } else {
            wordA = wordA.match(/[mnlng]$/) ? wordA + 'e' : wordA + 'ne';
        }
    } else if (maleVowelInWordB) {
        wordA = replaceVowels(wordA, 'male');
        if (plural) {
            wordA = wordA.match(/[mnlng]$/) ? wordA + 'an' : wordA + 'nan';
        } else {
            wordA = wordA.match(/[mnlng]$/) ? wordA + 'a' : wordA + 'na';
        }
    }
    return wordA;
}

// 形容詞/自動詞分詞 + 名詞 の処理
function convertEndingAdjective(wordA, wordB, aspect, plural) {
    let finalVowels = ['e', 'i', 'ö', 'ü'];
    let maleVowelInWordB = wordB.match(/[aïou]/);

    if (finalVowels.some(vowel => wordB.includes(vowel))) {
        wordA = replaceVowels(wordA, 'female');
        if (aspect === '完了相') {
            wordA = plural ? wordA.replace(/(n|an|en)$/, 'selten') : wordA.replace(/(n|an|en)$/, 'seten');
        } else {
            wordA = plural ? wordA.replace(/(n|an|en)$/, 'seltön') : wordA.replace(/(n|an|en)$/, 'setön');
        }
    } else if (maleVowelInWordB) {
        wordA = replaceVowels(wordA, 'male');
        if (aspect === '完了相') {
            wordA = plural ? wordA.replace(/(n|an|en)$/, 'saltan') : wordA.replace(/(n|an|en)$/, 'satan');
        } else {
            wordA = plural ? wordA.replace(/(n|an|en)$/, 'salton') : wordA.replace(/(n|an|en)$/, 'saton');
        }
    }
    return wordA;
}

// 他動詞分詞 + 名詞 の処理
function convertEndingTransitiveVerb(wordA, wordB, aspect, plural) {
    let finalVowels = ['e', 'i', 'ö', 'ü'];
    let maleVowelInWordB = wordB.match(/[aïou]/);

    if (finalVowels.some(vowel => wordB.includes(vowel))) {
        wordA = replaceVowels(wordA, 'female');
        if (aspect === '完了相') {
            wordA = plural ? wordA.replace(/(l|al|el)$/, 'silten') : wordA.replace(/(l|al|el)$/, 'siten');
        } else {
            wordA = plural ? wordA.replace(/(l|al|el)$/, 'siltön') : wordA.replace(/(l|al|el)$/, 'sitön');
        }
    } else if (maleVowelInWordB) {
        wordA = replaceVowels(wordA, 'male');
        if (aspect === '完了相') {
            wordA = plural ? wordA.replace(/(l|al|el)$/, 'sïltan') : wordA.replace(/(l|al|el)$/, 'sïtan');
        } else {
            wordA = plural ? wordA.replace(/(l|al|el)$/, 'sïlton') : wordA.replace(/(l|al|el)$/, 'sïton');
        }
    }
    return wordA;
}

// 複数形の処理
function processPlural(wordB, plural) {
    let finalVowels = ['e', 'i', 'ö', 'ü'];
    let maleVowelInWordB = wordB.match(/[aïou]/);

    if (plural) {
        if (finalVowels.some(vowel => wordB.includes(vowel))) {
            wordB = wordB.match(/[mnlng]$/) ? wordB + 'el' : wordB + 'nel';
        } else if (maleVowelInWordB) {
            wordB = wordB.match(/[mnlng]$/) ? wordB + 'al' : wordB + 'nal';
        }
    }
    return wordB;
}

// 入力の処理
function processInput() {
    let wordA = document.getElementById('wordA').value;
    let wordB = document.getElementById('wordB').value;
    let combinationType = document.getElementById('combinationType').value;
    let aspect = document.getElementById('aspect').value;
    let plural = document.getElementById('plural').checked;
    let oneWord = document.getElementById('oneWord').checked;

    let resultA = wordA;
    let resultB = wordB;

    if (combinationType === '名詞+名詞') {
        resultA = processNounNoun(wordA, wordB, plural);
    } else if (combinationType === '形容詞/自動詞分詞+名詞') {
        resultA = convertEndingAdjective(wordA, wordB, aspect, plural);
    } else if (combinationType === '他動詞分詞+名詞') {
        resultA = convertEndingTransitiveVerb(wordA, wordB, aspect, plural);
    }

    resultB = processPlural(resultB, plural);

    // 1語にするかどうか
    let finalResult = oneWord ? resultA + resultB : resultA + ' ' + resultB;

    // 15文字以上の場合の注意書き
    if (finalResult.length > 15) {
        document.getElementById('warning').textContent = '「一語にする」をオフにすることを推奨します。';
    } else {
        document.getElementById('warning').textContent = '';
    }

    // 結果を表示
    document.getElementById('result').textContent = finalResult;
}

// クリアボタンの処理
function clearInput() {
    document.getElementById('wordA').value = '';
    document.getElementById('wordB').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('warning').textContent = '';
}

// イベントリスナー
document.getElementById('generate').addEventListener('click', processInput);
document.getElementById('clear').addEventListener('click', clearInput);
