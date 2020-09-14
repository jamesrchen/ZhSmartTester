var app = new Vue({
    el: '#app',
    data: {
        rank: 0,
        word: "",
        pinyin: "",
        meaning: ""
    }
})

getWord(1).then((data) => {
    console.log(data)
    app.rank = parseInt(data.frequency_rank)
    app.word = data.charcter
    app.pinyin = data.pinyin
    app.meaning = data.definition
})

function traverse(count){
    getWord(parseInt(app.rank)+count).then((data) => {
        console.log(data)
        app.rank = data.frequency_rank
        app.word = data.charcter
        app.pinyin = data.pinyin
        app.meaning = data.definition
    })
}

document.addEventListener("keydown", function(event) {
    switch(event.key){
        case "Enter":
            tts(app.word)
            return
        case "ArrowRight":
            traverse(1)
            return
        case "ArrowLeft":
            traverse(-1)
            return
    }
});