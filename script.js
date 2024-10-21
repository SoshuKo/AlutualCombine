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

    // 男性母音の置換関数
    function maleVowelReplacement(word) {
        return word.replace(/e/g, 'a').replace(/i/g, 'ï').replace(/ö/g, 'o').replace(/ü/g, 'u');
    }

    // 女性母音の置換関数
    function femaleVowelReplacement(word) {
        return word.replace(/a/g, 'e').replace(/ï/g, 'i').replace(/o/g, 'ö').replace(/u/g, 'ü');
    }

    if (type === 'noun+noun') {
        if (!plural) {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                if (/m$|n$|l$|ng$/.test(wordA)) {
                    generatedWord += 'e';
                } else {
                    generatedWord += 'ne';
                }
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                if (/m$|n$|l$|ng$/.test(wordA)) {
                    generatedWord += 'a';
                } else {
                    generatedWord += 'na';
                }
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                if (/m$|n$|l$|ng$/.test(wordA)) {
                    generatedWord += 'en';
                } else {
                    generatedWord += 'nen';
                }
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                if (/m$|n$|l$|ng$/.test(wordA)) {
                    generatedWord += 'an';
                } else {
                    generatedWord += 'nan';
                }
            }
        }
    } else if (type === 'adj/auto+noun') {
        if (aspect === 'incomplete') {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'setön');
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'saton');
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'seten');
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'satan');
            }
        }

        if (plural) {
            if (aspect === 'incomplete') {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'seltön');
                }
                if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'salton');
                }
            } else {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'selten');
                }
                if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-n$|-an$|-en$/, 'saltan');
                }
            }
        }
    } else if (type === 'trans+noun') {
        if (aspect === 'incomplete') {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'sitön');
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'sïton');
            }
        } else {
            if (/[e,i,ö,ü]/.test(wordB)) {
                generatedWord = femaleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'siten');
            }
            if (/[a,ï,o,u]/.test(wordB)) {
                generatedWord = maleVowelReplacement(wordA);
                generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'sïtan');
            }
        }

        if (plural) {
            if (aspect === 'incomplete') {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'siltön');
                }
                if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'sïlton');
                }
            } else {
                if (/[e,i,ö,ü]/.test(wordB)) {
                    generatedWord = femaleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'silten');
                }
                if (/[a,ï,o,u]/.test(wordB)) {
                    generatedWord = maleVowelReplacement(wordA);
                    generatedWord = generatedWord.replace(/-l$|-al$|-el$/, 'sïltan');
                }
            }
        }
    }

    // 複数形語尾の設置
    if (plural) {
        if (/[e,i,ö,ü]/.test(wordB)) {
            if (/m$|n$|l$|ng$/.test(wordB)) {
                generatedWord += 'el';
            } else {
                generatedWord += 'nel';
            }
        }
        if (/[a,ï,o,u]/.test(wordB)) {
            if (/m$|n$|l$|ng$/.test(wordB)) {
                generatedWord += 'al';
            } else {
                generatedWord += 'nal';
            }
        }
    }

    if (oneWord) {
        generatedWord = generatedWord.replace(/ /g, '');
    }

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
}
