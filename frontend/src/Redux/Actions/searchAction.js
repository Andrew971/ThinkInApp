

export function searchWord (word){
  return {
    type:'SEARCH_WORD_REQUESTED',
    word: word
}
}

export function searchStatus (status){
  return {
    type:'SHOW_SEARCH_BOX',
    status: status
}
}