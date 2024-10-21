document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('generate').addEventListener('click', generateCompoundWord);
    document.getElementById('clear').addEventListener('click', clearInput);
});

function generateCompoundWord() {
    const wordA = document.getElementById('wordA').value.trim();
    const wordB = document.getElementById('wordB').value.trim();
    const type = document.getElementById('type').value;
    const aspect = document.getElementById('aspect').value;
    const plural = document.getElementById('plural').checked;
    const oneWord = document.getElementById('oneWord').checked;

    let generatedWord = '';
    let warningMessage = '';

    // 男性母音の置換
    function maleVowelReplacement(word) {
        return word.replace(/e/g, 'a').replace(/i/g, 'ï').replace(/ö/g, 'o').replace(/ü/g, 'u');
    }

    // 女性母音の置換
    function femaleVowelReplacement(word) {
        return word.replace(/a/g, 'e').replace(/ï/g, 'i').replace(/o/g, 'ö').replace(/u/g, 'ü');
    }

    // 単語Aの処理
    if (type === 'noun+noun') {
        if (!plural) {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord += /m$|n$|l$|ng$/.test(wordA) ? 'e ' : 'ne ';
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord += /m$|n$|l$|ng$/.test(wordA) ? 'a ' : 'na ';
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord += /m$|n$|l$|ng$/.test(wordA) ? 'en ' : 'nen ';
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord += /m$|n$|l$|ng$/.test(wordA) ? 'an ' : 'nan ';
            }
        }
        generatedWord += wordB;
    } else if (type === 'adj/auto+noun') {
        if (aspect === 'incomplete') {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'setön');
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'saton');
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'seten');
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'satan');
            }
        }
        generatedWord += ' ' + wordB;

        if (plural) {
            if (aspect === 'incomplete') {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'seltön');
                } else if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'salton');
                }
            } else {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'selten');
                } else if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA).replace(/-n$|-an$|-en$/, 'saltan');
                }
            }
            generatedWord += ' ' + wordB;
        }
    } else if (type === 'trans+noun') {
        if (aspect === 'incomplete') {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'sitön');
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'sïton');
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'siten');
            } else if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'sïtan');
            }
        }
        generatedWord += ' ' + wordB;

        if (plural) {
            if (aspect === 'incomplete') {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'siltön');
                } else if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'sïlton');
                }
            } else {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'silten');
                } else if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA).replace(/-l$|-al$|-el$/, 'sïltan');
                }
            }
            generatedWord += ' ' + wordB;
        }
    }

    // 複数形語尾の設置
    if (plural) {
        if (/[e,i,ö,ü]/.test(wordB)) {
            generatedWord += /m$|n$|l$|ng$/.test(wordB) ? 'el' : 'nel';
        }
        if (/[a,ï,o,u]/.test(wordB)) {
            generatedWord += /m$|n$|l$|ng$/.test(wordB) ? 'al' : 'nal';
        }
    }

    // 1語にする処理
    if (oneWord) {
        generatedWord = generatedWord.replace(/ /g, '');
    }

    // 文字数制限の警告
    if (generatedWord.length > 15) {
        warningMessage = "「一語にする」をオフにすることを推奨します。";
    }

    // 結果を表示
    const resultDiv = document.getElementById('result');
    const warningDiv = document.getElementById('warning');
    resultDiv.textContent = "生成された単語: " + generatedWord;
    warningDiv.textContent = warningMessage;
}

function clearInput() {
    document.getElementById('wordA').value = '';
    document.getElementById('wordB').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('warning').textContent = '';
    document.getElementById('type').selectedIndex = 0;
    document.getElementById('aspect').selectedIndex = 0;
    document.getElementById('plural').checked = false;
    document.getElementById('oneWord').checked = false;
}
