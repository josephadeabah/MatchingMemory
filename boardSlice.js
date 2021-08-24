const initialState = [
    {id: 0, contents: 'Provider', visible: true, matched: true}, 
    {id: 1, contents: 'Provider', visible: true, matched: true}, 
    {id: 2, contents: 'selector', visible: true, matched: true}, 
    {id: 3, contents: 'selector', visible: true, matched: true}, 
    {id: 4, contents: 'useSelector()', visible: true, matched: true}, 
    {id: 5, contents: 'useSelector()', visible: true, matched: true}, 
    {id: 6, contents: 'useDispatch()', visible: true, matched: true}, 
    {id: 7, contents: 'useDispatch()', visible: true, matched: true}, 
    {id: 8, contents: 'Pure Function', visible: true, matched: true}, 
    {id: 9, contents: 'Pure Function', visible: true, matched: true}, 
    {id: 10, contents: 'react-redux', visible: true, matched: true}, 
    {id: 11, contents: 'react-redux', visible: true, matched: true}, 
  ];
  
  export const boardReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'board/setBoard':
        let setState = [];
        action.payload.forEach((element, index) => 
          setState.push({id: index, 
                        contents: element, 
                        visible: false, 
                        matched: false})
        );
        return setState;
      case 'board/flipCard':
        // card.visible is set by this reducer and visibleIDs is determined by this. 
        let flipState = [...state];
        const cardID = action.payload;
        flipState[cardID] = {...state[cardID], visible:true} // for the card clicked on, set visible=true;
        
        const [index1, index2] = flipState
          .filter(card => card.visible) // code expects expects two indexes at most. due to code on Card. if(visibleIDs.length===2){click = () => {};}
          .map(card => card.id);
        if (index2 !== undefined){
          // want to set flipState[index1] & flipState[index2] properties, so define in variables card1, card2, 
          // use spread operator on card1, card2 in new definition of of flipState[index1]
          const card1 = flipState[index1]; 
          const card2 = flipState[index2];
          if (card1.contents === card2.contents) {
            // if card 1 and card 2 have the same card contents. set both card's visible to be false, match to be true
            // this is to preserve rule that only two visible cards at most and matched cards are still displayed, both in Card.js
            flipState[index1] = {...card1, visible: false, matched: true}
            flipState[index2] = {...card2, visible: false, matched: true}
          }
        } 
  
        return flipState;
      case 'board/resetCards':
        return state.map(card => ({...card, visible: false}));
      default:
        return state;
    }
  }
  
  const wordPairs = [
    'Provider', 'Provider', 
    'selector', 'selector', 
    'useSelector()', 'useSelector()', 
    'useDispatch()', 'useDispatch()',
    'Pure Function', 'Pure Function',
    'react-redux', 'react-redux',
  ]
  
  const randomWords = () => {
    let words = []
    let newWordPairs = [...wordPairs]
    const reps = newWordPairs.length
    for (let i=0; i<reps; i++) {
      const wordIndex = Math.floor(Math.random()*newWordPairs.length);
      words.push(newWordPairs[wordIndex])
      newWordPairs.splice(wordIndex, 1)
    }
  
    return words;
  } 
  
  // action creators
  export const setBoard = () => {
    const words = randomWords()
    return {
      type: 'board/setBoard',
      payload: words
    }
  }
  
  export const flipCard = (id) => {
    return {
      type: 'board/flipCard',
      payload: id
    }
  }
  
  export const resetCards = (indices) => {
    return {
      type: 'board/resetCards'
    }
  }
  
  // Add selector export statments below

  /* 
  In order to create the grid of cards, the Board component will retrieve the id and contents properties from the state card objects. This will require a selector.
  */
  // check store, check initial state on boardSlice. state.board is an array of items {id: 0, contents: 'Provider', visible: true, matched: true}
  export const selectBoard = (state) => state.board.map(card => {
    return {
      id: card.id,
      contents: card.contents,
    }
  });

  // selector for getting card ids with visible boolean flag
  // it should return a array that filters the board array and then maps that array.

  export const selectVisibleIDs = (state) => state.board.filter(card => card.visible===true).map(card => card.id);

  // The last step of the game behavior is to identify matched cards on the board using the matched property of each card object in the store. This will require a final selector.
  // return an array of ids of cards with card.matched:true;

  export const selectMatchedIDs = (state) => state.board.filter(card => card.matched===true).map(card => card.id);