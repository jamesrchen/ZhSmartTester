function getWord(ranking){
    return axios.get(`/api/word?ranking=${ranking}`).then((res)=>{
        return res.data
    })
}

function tts(phrase){
    console.log(`http://translate.google.com/translate_tts?ie=UTF-8&tl=zh&client=tw-ob&q=${(phrase)}`)
    var audio = new Audio(`http://translate.google.com/translate_tts?ie=UTF-8&tl=zh&client=tw-ob&q=${(phrase)}`);
    audio.play()
}